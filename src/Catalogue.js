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
    this.state = {
      catalogueParams: this.props.catalogueParams,
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

    this.getCurrentCategoryId = (catalogueParams)=>{
      if(!catalogueParams) return;
      this.categoryId = catalogueParams.find(el=>el[0]==='categoryId')[1];
    };

    // ??? Вместо shouldComponentUpdate который ниже закомментен сделал эту функцию init() и функцию this.setStateCatalogueParams, которая доступна из services, чтобы менять state этого компонента. Правильно ли так делать? Могу ли распространить подобный подход "обновлять state через services" на другие компоненты с shouldComponentUpdate?
    this.init = ()=>{
      if(this.state.catalogueParams) {
        this.getSortedProducts(this.state.catalogueParams);
        this.getCurrentCategoryId(this.state.catalogueParams);
        services.getCategoryMaxPrice(this.categoryId);
      }
    }
    this.init();

    this.resetFilter = ()=>{
      this.setState({isShownSidebar: !this.state.isShownSidebar},()=>this.setState({isShownSidebar: !this.state.isShownSidebar},this.onChangeFilter));
      services.headerParam = '';
    };

    this.clearFilterForm = ()=>{
      this.setState({isShownSidebar: !this.state.isShownSidebar},()=>this.setState({isShownSidebar: !this.state.isShownSidebar}));
    };
    services.clearFilterForm = this.clearFilterForm;

    this.setStateCatalogueParams = (params)=>{
      this.setState({
        catalogueParams: params
      }, this.init);
    }
    services.setStateCatalogueParams = this.setStateCatalogueParams;

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
      this.setStateCatalogueParams(paramsArray);
    }
  }//END constructor

  render() {

    let categoryIdPair, categoryTitle;

    if(this.props.categories && this.state.catalogueParams && this.categoryId) {
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
  catalogueParams : PropTypes.object,
  categories : PropTypes.array
};

export default Catalogue;
