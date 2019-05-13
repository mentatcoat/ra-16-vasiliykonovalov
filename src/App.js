import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import Main from './Main';
import Catalogue from './Catalogue';
import Header from './Header';
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
      products: ''
    };

    this.setCatalogueParams = (params)=>{
      this.setState({catalogueParams: params});
      if(services.setStateCatalogueParams) services.setStateCatalogueParams(params);
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
          if(services.setStateCatalogueParams) services.setStateCatalogueParams(this.state.catalogueParams);
          // без этого не будет работать каталог, когда загружаешь сразу страницу каталога
        });

    });
  }


  componentDidMount() {
    this.preloaderOn = ()=>{
      services.preloaderElement.classList.remove('hidden');
    };
    this.preloaderOff = ()=>{
      services.preloaderElement.classList.add('hidden');
    };
    // ??? Я изначально менял класс hidden на div.preloader. Почему-то ref не успевал прописать дом-элемент прелоадера. В итоге я сделал функцию меняюую state с целью показа прелоадера. Что лучше? И почему ref отрисовывал дом-элемент расположенный в самом верху верстки позже чем рендерился компонент из середины верстки <NewDeals/>?
    // ??? изза множества вызовов setState для смены статуса прелоадера React выбросил исключение сообщася, что глубина апдейтов достигнута. Это как расценивать? Как признак чего в моем коде?
    /*
    Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
    */
    services.preloaderOn = this.preloaderOn;
    services.preloaderOff = this.preloaderOff;
  }

  render() {

    return (
      <div className="App">
        <div ref={el=>services.preloaderElement=el} className={`preloader_wrapper`}>
          <div className="preloader">
            <hr/><hr/><hr/><hr/>
          </div>
        </div>
        <Header categories={this.state.categories} setCatalogueParams={this.setCatalogueParams} />

        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/catalogue' render={(props) => (
<Catalogue {...props} catalogueParams={this.state.catalogueParams} categories={this.state.categories} setCatalogueParams={this.setCatalogueParams}/>)} />
          <Route exact path='/favorite'>
            <Favorite />
          </Route>
          <Route exact path='/product-card/:id' render={(props) =>
            {
              // ??? Правильно ли здесь использовать фукнцию services.initProductCard? Я меняю таким образом state в <ProductCard/>, который уже отображен на странице.
              if(services.initProductCard) services.initProductCard(props.match.params.id);
              return (
                <ProductCard {...props}
                categories={this.state.categories}
                setCatalogueParams={this.setCatalogueParams}
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
