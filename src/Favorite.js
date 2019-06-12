import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';
import './css/style-catalogue.css';
import './css/style-favorite.css';
import PropTypes from 'prop-types';
import services from './services';
import CatalogueItem from './CatalogueItem';
import FavoritePagination from './FavoritePagination';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';

class Favorite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'price',
      favoritesIds: [],
      allProducts: [],
      favoriteProducts: '',
      favoriteProductsAmount: '',
      currentPage: '',
      pagesAmount: ''
    };

    this.changeCurrentPage = (page)=>{
      this.setState({
        currentPage: page
      });
    };

    this.filterFavoriteFromAll = ()=>{
      let filtered = this.state.allProducts.filter(
        product=>this.state.favoritesIds.includes(product.id)
      );

      this.setState({
        favoriteProducts: filtered,
        favoriteProductsAmount: filtered.length,
        currentPage: 1,
        pagesAmount: Math.ceil(filtered.length / 12)
      });

    };

    this.initFavorite();
  }

  initFavorite = (e)=>{
    if(!e) {
      services.fetchAllProducts({'sortBy': this.state.sortBy})
        .then(products=>{

          this.setState({
           favoritesIds: JSON.parse(localStorage.favorites),
           allProducts: products
           }
           ,
             this.filterFavoriteFromAll
           );

        });
    } else {
      this.setState({
        sortBy: e.currentTarget.value
      },
      () => {
        services.fetchAllProducts({'sortBy': this.state.sortBy})
          .then(products=>{

            this.setState({
             favoritesIds: JSON.parse(localStorage.favorites),
             allProducts: products
             }
             ,
               this.filterFavoriteFromAll
             );

          });
      }
      );
    }
  };

  render() {
    let isThereFavorites = this.state.favoriteProducts && this.state.favoriteProducts.length > 0;
    let showArray = [];
    let first = (this.state.currentPage - 1) * 12;
    if(isThereFavorites) {
      for (let i = 0; i < 12; i++) {
        showArray.push(this.state.favoriteProducts[first + i]);
      }
    };

    return (
      <div>
        <div className="preloader_wrapper hidden">
          <div className="preloader">
            <hr/><hr/><hr/><hr/>
          </div>
        </div>

        <div className="container">
          <div className="wrapper wrapper_favorite">

          {/*Breadcrumbs*/}

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
             to='/order'
             className='site-path__item'
            >
             Избранное
            </BreadcrumbsItem>


            {/*Breadcrumbs*/}

            <main className="product-catalogue product-catalogue_favorite">
              <section className="product-catalogue__head product-catalogue__head_favorite">
                <div className="product-catalogue__section-title">
                  <h2 className="section-name">{isThereFavorites ? 'В вашем избранном' : 'В вашем избранном пока ничего нет'}</h2><span className="amount amount_favorite">{isThereFavorites && `${this.state.favoriteProductsAmount} товаров`}</span>
                </div>

                {isThereFavorites && <div className="product-catalogue__sort-by">
                  <p className="sort-by">Сортировать</p>
                  <select onChange={this.initFavorite} form='favoriteForm' name="sortBy" id="sorting" value={this.state.sortBy}>
                    <option value="price">по цене</option>
                    <option value="popularity">по популярности</option>
                  </select>
                </div>}

              </section>

              <section className="product-catalogue__item-list product-catalogue__item-list_favorite">

                {isThereFavorites && showArray.map(
                  (product)=>product &&
                  <CatalogueItem
                  key={product.id}
                  product={product} onToggleFavorite={this.initFavorite}
                  breakHeart
                  />
                )}

              </section>

              {isThereFavorites &&
                <FavoritePagination currentPage={this.state.currentPage} pagesAmount={this.state.pagesAmount} onChangeCurrentPage={this.changeCurrentPage}
                />}

            </main>
          </div>
        </div>
      </div>
    );
  }
}

Favorite.propTypes = {
};

export default Favorite;
