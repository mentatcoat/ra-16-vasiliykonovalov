import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
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
import createHistory from 'history/createBrowserHistory'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      catalogueParams: '',
      products: ''
    };
    this.setCatalogueParams = (params)=>{
      this.setState({catalogueParams: params});
      createHistory().push('/catalogue');
    }
    services.fetchCategories()
      .then(data=>{
        this.setState({
          categories: data.data,
          // ниже ставим Первую категорию, она нужна на случай reload <Catalogue/> page, чтобы экран не был без товаров
          catalogueParams: {categoryId: data.data[0].id}
        });

      });
    services.fetchProducts((data)=>{
      this.setState({products: data.data});
    });
  }

  render() {
    console.log('App render() state===', this.state);
    return (
      <div className="App">
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
          <Route exact path='/product-card/:id' render={(props) => (
<ProductCard {...props}/>
)}/>
          <Route exact path='/order' render={(props) => (
<Order {...props} />
)}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
