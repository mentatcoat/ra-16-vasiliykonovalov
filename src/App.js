import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import MainPage from './MainPage';
import Catalogue from './Catalogue';
import Header from './Header';
import Slider from './Slider';
import NewDeals from './NewDeals';
import Sales from './Sales';
import AboutUs from './AboutUs';
import services from './services';
import {global} from './services';
import Footer from './Footer';
import Favorite from './Favorite';
import ProductCard from './ProductCard';
import Order from './Order';
import JSONproducts from './data/products.json';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';

class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      catalogueParams: '',
      products: '',
      isPreloader: false,
      resetBasketDate: '',
      panelView: null,
      reasons: '',
      types: '',
      brands: '',
      colors: ''
    };

    //??? полагаю что мигающий кружок получаемый через  ref не нужно записывать в состояние и дергать рендер?
    this.basketTwinklePic;

    this.resetBasketPanel = () => {
      this.setState({
        resetBasketDate: new Date()
      });
    }

    this.changeHeaderPanel = (view) => {
      this.setState({
        panelView: view
      });
    }

    this.setCatalogueParams = (params)=>{
      this.setState({catalogueParams: params});
      this.props.history.push('/catalogue');
    }
    services.fetchCategories()
      .then(data=>{
        this.setState({
          categories: data.data,
        }
      );

    });

    services.fetchAllProducts({'sortBy': this.state.sortBy})
      .then(products=>{
        this.preloaderOn();
        const ids = products.map(product=>product.id);

        const promisesArray = [];
        ids.forEach(
          id=> promisesArray.push(services.fetchProduct(id))
        );
        Promise.all(promisesArray)
          .then(infos => {
// ??? В ТЗ не было предоставлено механизма по загрузке таких данных как массивы ниже. Я их в этой функции собираю пробегаясь по всем товарам. Механизма для подгрзуки этих характеристик товаров не было создано, чтобы не нагружать сервер лишней логикой? Или я его не заметил? 
            const reasons = [];
            const types = [];
            const brands = [];
            const colors = [];

            infos.forEach(
              info=>{
                if(!reasons.includes(info.reason)) reasons.push(info.reason);
                if(!types.includes(info.type)) types.push(info.type);
                if(!brands.includes(info.brand)) brands.push(info.brand);
                if(!colors.includes(info.color)) colors.push(info.color);
              }
            );
            reasons.sort();
            types.sort();
            brands.sort();
            colors.sort();

            this.preloaderOff();
            this.setState({
              reasons: reasons,
              types: types,
              brands: brands,
              colors: colors
            });

          }
          );

      });

  }

  twinkleBasketPic = () => {
    let pic = this.basketTwinklePic;
    pic.textContent = localStorage.cartProductsAmount;
    let twinklePicTop = pic.parentElement.getBoundingClientRect().top - 5;
    if(twinklePicTop < 0) {
      window.scrollTo(0,0);
    }
    var timerId = setInterval(function() {
      pic.classList.toggle('basket-visible');
    }, 300);
    setTimeout(function() {
      clearInterval(timerId);
    }, 1500);
    setTimeout(function() {
      pic.classList.toggle('basket-visible');
    }, 3000);
  }

  preloaderOn = () => this.setState({isPreloader: true});
  preloaderOff = () => this.setState({isPreloader: false});

  getBasketTwinklePic = (domEl) => {
    this.basketTwinklePic = domEl;
// ??? эта функция будет брошена как коллбек в ref в <Header/>, чтобы получить доступ к мигающему кружку с количеством покупок. Я правильно понимаю, что именно в таких случаях и используют ref для анимаций и подобного?
  };

  render() {
    return (
      <div className="App">
        <div className={`preloader_wrapper ${this.state.isPreloader ? '' : 'hidden'}`}>
          <div className="preloader">
            <hr/><hr/><hr/><hr/>
          </div>
        </div>

        <Header
          categories={this.state.categories} setCatalogueParams={this.setCatalogueParams}
          resetBasketDate={this.state.resetBasketDate}
          panelView={this.state.panelView}
          changeHeaderPanel={this.changeHeaderPanel}
          getBasketTwinklePic={this.getBasketTwinklePic}
          reasons={this.state.reasons}
          types={this.state.types}
          brands={this.state.brands}
        />

        <Switch>
          <Route exact path='/'>
            <MainPage >
              <Slider />
              <NewDeals preloaderOn={this.preloaderOn} preloaderOff={this.preloaderOff} />
              <Sales />
              <AboutUs />
            </MainPage>
          </Route>

          <Route exact path='/catalogue' render={(props) => (
            <Catalogue {...props} catalogueParams={this.state.catalogueParams} categories={this.state.categories} setCatalogueParams={this.setCatalogueParams}
            preloaderOn={this.preloaderOn}
            preloaderOff={this.preloaderOff}
            types={this.state.types}
            colors={this.state.colors}
            reasons={this.state.reasons}
            />)}
          />

          <Route exact path='/favorite'>
            <Favorite
              preloaderOn={this.preloaderOn}
              preloaderOff={this.preloaderOff}
            />
          </Route>

          <Route exact path='/product-card/:id' render={(props) =>
            {
              return (
                <ProductCard {...props}
                  categories={this.state.categories}
                  setCatalogueParams={this.setCatalogueParams}
                  preloaderOn={this.preloaderOn}
                  preloaderOff={this.preloaderOff}
                  resetBasketPanel={this.resetBasketPanel}
                  twinkleBasketPic={this.twinkleBasketPic}
                />
              );}
            }
            />

          <Route exact path='/order' render={(props) => (
            <Order
              {...props}
              resetBasketPanel={this.resetBasketPanel}
              changeHeaderPanel={this.changeHeaderPanel}
              preloaderOn={this.preloaderOn}
              preloaderOff={this.preloaderOff}
            />
            )}/>
        </Switch>

        <Footer />

      </div>
    );
  }
}

const App = withRouter(AppComponent);

export default App;
