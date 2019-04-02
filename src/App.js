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
      // createHistory().push('/catalogue');
      // ??? заменил предыдущую строчку на следующую:
      this.props.history.push('/catalogue');
      // ??? это ты подразумевал "сделай чрез router"?

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
    services.fetchProducts().then((data)=>this.setState({products: data.data}));

  }

  render() {
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
<ProductCard {...props}
categories={this.state.categories}
setCatalogueParams={this.setCatalogueParams}
/>
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

const App = withRouter(AppComponent);

export default App;
