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
import PropTypes from 'prop-types';
import services from './services';


class Catalogue extends Component {
  constructor(props) {
    super(props);
    console.log('Catalogue props===', props);
    this.state = {
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
          console.log('Catalogue getSortedProducts() data===', data);
          console.log('this PROPS===', this.props);
          console.log('new PARAMS===', params);


          this.setState({
            sortedProducts: data.data,
            sortedProductsAmount: data.goods,
            currentPage: data.page,
            pagesAmount: data.pages,
        });
        });
    };

    this.getSortedProducts(this.props.catalogueParams);


    this.getCurrentCategoryId = (catalogueParams)=>{
      if(!catalogueParams) return;
      this.categoryId = catalogueParams.find(el=>el[0]==='categoryId')[1];
    };
    this.getCurrentCategoryId(this.props.catalogueParams);

    services.getCategoryMaxPrice(this.categoryId);


    this.onChangeFilter = (e)=>{
      console.log('!!!onChangeFilter() event===',e);
      console.log('!!!onChangeFilter() services.filterForm===',services.filterForm);
      console.log('!!!onChangeFilter() services.filterForm===',services.filterForm.elements);

      let paramsArray = [];

      let formData = new FormData(services.filterForm);
      for (const [k, v] of formData) {
        if(v) {
          paramsArray.push([k,v]);
        }
      }
      console.log('RESULT formObj===', paramsArray);



      // formObj = inputsArray.reduce((memo, elem)=>{
      //   if(elem.type.checkbox value) {
      //     memo[elem.name] = elem.value;
      //   };
      //   return memo;
      // }, {});
      //
      // console.log('RESULT formObj===', formObj);


    }




  }//END constructor

  shouldComponentUpdate(nextProps, nextState) {
    console.log('SHOULDUPDATE Catalogue  nextProps===', nextProps);
    if( nextProps !== this.props) {
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

        <CatalogueSidebar onChangeFilter={this.onChangeFilter}/>



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
            <div className="product-catalogue__pagination">
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
            </div>
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
