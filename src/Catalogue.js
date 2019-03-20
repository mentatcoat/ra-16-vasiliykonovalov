import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import services from './services';
import CatalogueSidebar from './CatalogueSidebar';
import OverlookedSlider from './OverlookedSlider';
import CatalogueItem from './CatalogueItem';
import PropTypes from 'prop-types';

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

    services.getCategoryMaxPrice(this.props.catalogueParams.categoryId);


  }//END constructor

  shouldComponentUpdate(nextProps, nextState) {
    console.log('SHOULDUPDATE Catalogue  nextProps===', nextProps);
    if( nextProps !== this.props) {
      services.getCategoryMaxPrice(nextProps.catalogueParams.categoryId);

      this.getSortedProducts(nextProps.catalogueParams);
      // ??? это зачем то заправшивается 2 раза - почему?
      return true;
    }

    return true;



  }

  render() {
    console.log('Catalogue render() props===', this.props);
    console.log('Catalogue render() state===', this.state);

    let categoryTitle = (this.props.categories && this.props.catalogueParams) && this.props.categories.find(el=>+el.id===+this.props.catalogueParams.categoryId).title;


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

        <CatalogueSidebar />



        {/*<!-- Основной контент каталога -->*/}
          <section className="product-catalogue-content">
            {/*<!-- Голова каталога с названием раздела и сортировкой -->*/}
            <section className="product-catalogue__head">
              <div className="product-catalogue__section-title">
                <h2 className="section-name">{categoryTitle}</h2><span className="amount">{typeof this.state.sortedProductsAmount === 'number' && `${this.state.sortedProductsAmount.toLocaleString()} товара`}</span>
              </div>
              <div className="product-catalogue__sort-by">
                <p className="sort-by">Сортировать</p>
                <select name="" id="sorting">
                  <option value="">по популярности</option>
                  <option value="">по размеру</option>
                  <option value="">по производителю</option>
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
