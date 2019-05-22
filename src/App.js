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
import helpers from './helpers';
import temps from './temps';
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
      isPreloader: false
    };

    this.setCatalogueParams = (params)=>{
      this.setState({catalogueParams: params});
      if(helpers.setStateCatalogueParams) helpers.setStateCatalogueParams(params);
      this.props.history.push('/catalogue');
    }
    services.fetchCategories()
      .then(data=>{
        this.setState({
          categories: data.data,
          // ниже ставим Первую категорию, она нужна на случай reload <Catalogue/> page, чтобы экран не был без товаров
          catalogueParams: [['categoryId', data.data[0].id]]
        },
        ()=>{
          if(helpers.setStateCatalogueParams) helpers.setStateCatalogueParams(this.state.catalogueParams);
          // без этого не будет работать каталог, когда загружаешь сразу страницу каталога
        });

    });
  } //end Constructor

  preloaderOn = () => this.setState({isPreloader: true});
  preloaderOff = () => this.setState({isPreloader: false});



  componentDidMount() {
    //??? Вот этот подход с включением-выключением статуса Прелоудера в state этого компонента сразу вызывает ошибку "Maximum update depth exceeded". Оставляю переключение через смену класса "hidden" - так работает быстро и эффективно.
    // this.preloaderOn = ()=>{
    //   // this.setState({isPreloader: true}); - этот подход вызывает ошибку максимума
    //   temps.preloaderElement.classList.remove('hidden');
    // };
    // this.preloaderOff = ()=>{
    //   // this.setState({isPreloader: false}); - этот подход вызывает ошибку максимума
    //   temps.preloaderElement.classList.add('hidden');
    // };
    /*
    Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
    */
    // helpers.preloaderOn = this.preloaderOn;
    // helpers.preloaderOff = this.preloaderOff;
  }

  render() {

    return (
      <div className="App">
        {/*{this.state.isPreloader &&   - вот такой подход условного рендеринга не работоспособен
          !!! надо  в дальнейшем заменить preloadr div на компонент с атрибутом status*/}
        <div className={`preloader_wrapper ${this.state.isPreloader ? '' : 'hidden'}`}>
          <div className="preloader">
            <hr/><hr/><hr/><hr/>
          </div>
        </div>

        <Header categories={this.state.categories} setCatalogueParams={this.setCatalogueParams} />

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
<Catalogue {...props} catalogueParams={this.state.catalogueParams} categories={this.state.categories} setCatalogueParams={this.setCatalogueParams}/>)} />

          <Route exact path='/favorite'>
            <Favorite />
          </Route>

          <Route exact path='/product-card/:id' render={(props) =>
            {
              // ??? Правильно ли здесь использовать фукнцию helpers.initProductCard? Я меняю таким образом state в <ProductCard/>, который уже отображен на странице.

              // if(helpers.initProductCard) helpers.initProductCard(props.match.params.id);

              return (
                <ProductCard {...props}
                  categories={this.state.categories}
                  setCatalogueParams={this.setCatalogueParams}
                  preloaderOn={this.preloaderOn}
                  preloaderOff={this.preloaderOff}
                />
              );}
            }
            />

          <Route exact path='/order' render={(props) => (
<Order {...props} />
)}/>
        </Switch>

        <Footer />

      </div>
    );
  }
}

const App = withRouter(AppComponent);

export default App;
