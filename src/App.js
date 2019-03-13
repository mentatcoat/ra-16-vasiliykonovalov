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
      products: '',
      catalogueParams: '',
    };
    this.setCatalogueParams = (params)=>{
      this.setState({catalogueParams: params});
      //!!! ??? почему эта штука позволяет заменить Link? то есть без перезагрузки страницы/
      createHistory().push('/catalogue');
      //??? это ведь тоже самое что и window.history.pushState()
    }
    services.fetchCategories((data)=>{
      this.setState({categories: data.data});
    });
    services.fetchProducts((data)=>{
      this.setState({products: data.data});
    });
  }

  render() {
    console.log('<App render() catalogueParams===', this.state.catalogueParams);
    console.log('<App render() products===', this.state.products);
    console.log('<App render() createHistory()===', createHistory());
    console.log('<App render() window.history===', window.history);

    return (
      <div className="App">
        <Header categories={this.state.categories} setCatalogueParams={this.setCatalogueParams} />
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/catalogue' render={(props) => (
<Catalogue {...props} catalogueParams={this.state.catalogueParams}/>)}/>
          <Route exact path='/favorite'>
            <Favorite />
          </Route>
          <Route exact path='/product-card/:id' render={(props) => (
<ProductCard {...props}/>
)}/>
          <Route exact path='/order' render={(props) => (
<Order {...props} products={this.state.products}/>
)}/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
