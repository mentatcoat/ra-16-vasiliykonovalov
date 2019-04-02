import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import CatalogueSidebar from './CatalogueSidebar';
import OverlookedSlider from './OverlookedSlider';
import CatalogueItem from './CatalogueItem';
import CataloguePagination from './CataloguePagination';
import PropTypes from 'prop-types';
import services from './services';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';



class Catalogue extends Component {
  constructor(props) {
    super(props);
    console.log('Catalogue props===', props);
    this.state = {
      isShownSidebar: true,
      categories: this.props.categories,
      sortedProducts: '',
      sortedProductsAmount: null,
      currentPage: '',
      pagesAmount: ''
    };
    this.categoryId;

    this.getSortedProducts = (params)=>{

      services.fetchProducts(params)
        .then(data=>{

          this.setState({
            sortedProducts: data.data,
            sortedProductsAmount: data.goods,
            currentPage: data.page,
            pagesAmount: data.pages,
        });
        });
    };

    if(this.props.catalogueParams) this.getSortedProducts(this.props.catalogueParams);

    this.getCurrentCategoryId = (catalogueParams)=>{
      if(!catalogueParams) return;
      this.categoryId = catalogueParams.find(el=>el[0]==='categoryId')[1];
    };
    this.getCurrentCategoryId(this.props.catalogueParams);

    services.getCategoryMaxPrice(this.categoryId);

    this.resetFilter = ()=>{
      console.log('RESET Sidebar()');
      this.setState({isShownSidebar: !this.state.isShownSidebar},()=>this.setState({isShownSidebar: !this.state.isShownSidebar},this.onChangeFilter));
      services.headerParam = '';
      // ??? строчка выше быстро делает ремаунт <CatalogueSidebar/> рендер которого зависит от стейт, сбрасываются все настройки фильтра находящегося в этом компоненте. Здоровый подход?.
    };

    this.clearFilterForm = ()=>{
      this.setState({isShownSidebar: !this.state.isShownSidebar},()=>this.setState({isShownSidebar: !this.state.isShownSidebar}));
    };
    services.clearFilterForm = this.clearFilterForm;

    this.onChangeFilter = (e)=>{

      let paramsArray = [];

      let formData = new FormData(services.filterForm);
      for (const [k, v] of formData) {
        if(services.headerParam) {
          if(k===services.headerParam[0] && v) services.headerParam = '';
        }
        if(v) {
          paramsArray.push([k,v]);
        }
      }

      if(services.headerParam) paramsArray.push(services.headerParam);
      paramsArray.push(['categoryId', this.categoryId]);
      this.props.setCatalogueParams(paramsArray);
    }
  }//END constructor

  shouldComponentUpdate(nextProps, nextState) {
    console.log('SHOULDUPDATE Catalogue  nextProps===', nextProps);
    if(nextProps &&  nextProps !== this.props) {
      this.getCurrentCategoryId(nextProps.catalogueParams);

      services.getCategoryMaxPrice(this.categoryId);

      this.getSortedProducts(nextProps.catalogueParams);
      // ??? это зачем то заправшивается 2 раза - почему?
      return true;
    }
    return true;
  }

  render() {

    let categoryIdPair, categoryTitle;

    if(this.props.categories && this.props.catalogueParams) {
      categoryTitle = this.props.categories.find(el=>+el.id===+this.categoryId).title;
    }

    return (
      <div className="just-wrapper">

        <Breadcrumbs
          item={Link}
          container={'div'}
          containerProps={{
            className: 'site-path__items'
          }}
          finalItem={'span'}
          finalProps={{
            className: 'site-path__item',
            onClick: null
            // style: {color: 'red'}
          }}
        />

        <BreadcrumbsItem
          to='/'
          className='site-path__item'
        >
          Главная
        </BreadcrumbsItem>

        <BreadcrumbsItem
         to='/catalogue'
         className='site-path__item'
        >
         {categoryTitle}
        </BreadcrumbsItem>

        {/*<!-- Тело каталога с сайдбаром -->*/}
        <main className="product-catalogue">

        {this.state.isShownSidebar && <CatalogueSidebar onChangeFilter={this.onChangeFilter} resetFilter={this.resetFilter}/>}

        {/*<!-- Основной контент каталога -->*/}
          <section className="product-catalogue-content">
            {/*<!-- Голова каталога с названием раздела и сортировкой -->*/}
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{categoryTitle}</h2><span className="amount">{typeof this.state.sortedProductsAmount === 'number' && `${this.state.sortedProductsAmount.toLocaleString()} товара`}</span>
              </div>

              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select onChange={this.onChangeFilter} form='filterForm' name="sortBy" id="sorting">
                  <option value="price">по цене</option>
                  <option value="popularity">по популярности</option>
                </select>
              </div>

            </section>

            {/*<!-- Список товаров каталога -->*/}

            <section  className="product-catalogue__item-list">
              {/*<!-- Товары -->*/}

              {this.state.sortedProducts && this.state.sortedProducts.map(
                product=><CatalogueItem key={product.id} product={product} />

              )}

            </section>

            {/*<!-- Пагинация под каталогом -->*/}

            <CataloguePagination currentPage={this.state.currentPage} pagesAmount={this.state.pagesAmount} onChangeFilter={this.onChangeFilter}/>

          </section>

        </main>

        {/*<!-- Слайдер внизу каталога  -->*/}

        <OverlookedSlider match={this.props.match} />

      </div>
    );
  }
}

Catalogue.propTypes = {
  catalogueParams : PropTypes.object.isRequired
};

export default Catalogue;
