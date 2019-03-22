import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
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
    // this.brand;

    this.getSortedProducts = (params)=>{
      console.log('Catalogue getSortedProducts() params===', params);
      // let isSortBy = params.find(el=>el[0]==='sortBy');

      services.fetchProducts(params)
        .then(data=>{
          console.log('Catalogue getSortedProducts() data===', data);
          console.log('Catalogue getSortedProducts() PARAMS===', params);

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
      console.log('getCurrentCategoryId() catalogueParams===', catalogueParams);
      if(!catalogueParams) return;
      this.categoryId = catalogueParams.find(el=>el[0]==='categoryId')[1];
    };
    this.getCurrentCategoryId(this.props.catalogueParams);

    services.getCategoryMaxPrice(this.categoryId);

    this.resetFilter = ()=>{
      console.log('RESET Sidebar()');
      this.setState({isShownSidebar: !this.state.isShownSidebar},()=>this.setState({isShownSidebar: !this.state.isShownSidebar},this.onChangeFilter));
      services.headerParam = '';
      // ??? строчка выше быстро делает ремаунт <CatalogueSidebar/>, так что сбрасываются все настройки фильтра.
      // this.onChangeFilter();
    };

    this.clearFilterForm = ()=>{
      this.setState({isShownSidebar: !this.state.isShownSidebar},()=>this.setState({isShownSidebar: !this.state.isShownSidebar}));
    };
    services.clearFilterForm = this.clearFilterForm;

    this.onChangeFilter = (e)=>{
      console.log('!!!onChangeFilter() services.filterForm===',services.filterForm);
      console.log('!!!onChangeFilter() services.filterForm===',services.filterForm.elements);

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
      console.log('RESULT paramsARRAY===', paramsArray);
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
    console.log('Catalogue render() props===', this.props);
    console.log('Catalogue render() state===', this.state);
    // console.log('Catalogue render() services.filterForm===', services.filterForm.elements);

    let categoryIdPair, categoryTitle;

    if(this.props.categories && this.props.catalogueParams) {
      // categoryIdPair = this.props.catalogueParams.find(el=>el[0]==='categoryId');
      categoryTitle = this.props.categories.find(el=>+el.id===+this.categoryId).title;
    }

    return (
      <div className="Just wrapper">

        {/*<!-- Breadcrumbs -->*/}
        <div className="site-path">
          <ul className="site-path__items">
            <li className="site-path__item"><a href="index.html">Главная</a></li>
            <li className="site-path__item"><a href="#">Женская обувь</a></li>
          </ul>
        </div>
        {/* //////done////// */}

        {/*<!-- Тело каталога с сайдбаром -->*/}
        <main className="product-catalogue">
        {/*<CatalogueSidebar />*/}

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
            {/*<div className="product-catalogue__pagination">
              <div className="page-nav-wrapper">
                <div className="angle-back"><a href="#"></a></div>
                <ul>
                  <li className="active"><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="">...</a></li>
                  <li><a href="#">99</a></li>
                </ul>
                <div className="angle-forward"><a href="#"></a></div>
              </div>
            </div>*/}

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
