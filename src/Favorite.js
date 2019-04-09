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
import FavoriteItem from './FavoriteItem';
import FavoritePagination from './FavoritePagination';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';

class Favorite extends Component {
  constructor(props) {
    super(props);
    this.sortingSelectElement;


    this.state = {
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
      console.log('filterFavoriteFromAll() favoritesIds===', this.state.favoritesIds);
      console.log('filterFavoriteFromAll() allProducts===', this.state.allProducts);
      let filtered = this.state.allProducts.filter(
        product=>this.state.favoritesIds.includes(product.id)
      );
      this.setState({
        favoriteProducts: filtered,
        favoriteProductsAmount: filtered.length,
        currentPage: 1,
        pagesAmount: Math.ceil(filtered.length / 12)
      }
      ,
      services.initFavoritePagination && services.initFavoritePagination(1, this.state.pagesAmount)

    );
    };

    this.getAllProducts = (params)=>{
      let pages;
      let products = [];
      services.fetchProducts(params)
        .then(data=>{
          console.log('getAllProducts() got data===', data);
          products = data.data;
          pages = data.pages;

          if(pages>1) {
            let promisesArray= [];
            for (let i = 2; i <= pages; i++) {
              let newParams = Array.from(params);
              console.log('Array.from newParams===', newParams);
              newParams.push([ 'page', i]);
              promisesArray.push(services.fetchProducts(newParams));
            }//END for
            Promise.all(promisesArray)
              .then(datas=>{
                console.log('promiseAll datas===', datas);
                console.log('promiseAll products===', products);
                datas.forEach(
                  data=>products.push(...data.data)
                );
                console.log('promiseAll productsAFTER===', products);
                this.setState({
                 favoritesIds: JSON.parse(localStorage.favorites),
                 allProducts: products
               }
               ,
               this.filterFavoriteFromAll
               );
              }
              );
          }//END if
        }); //END first then
    };//END f getAllProducts

    this.initFavorite = ()=>{
      let paramsArray = [];
      if(!this.sortingSelectElement) {
        paramsArray.push(['sortBy', 'price']);
      } else {
        paramsArray.push(['sortBy', this.sortingSelectElement.value]);
      }

      this.getAllProducts(paramsArray);
    };
    services.initFavorite = this.initFavorite;

    this.initFavorite();
  }// END constructor

  render() {
    console.log('Favorite.js render() state===', this.state);

    let isThereFavorites = this.state.favoriteProducts && this.state.favoriteProducts.length > 0;

    let showArray = [];
    let first = (this.state.currentPage - 1) * 12;
    if(isThereFavorites) {
      for (let i = 0; i < 12; i++) {
        showArray.push(this.state.favoriteProducts[first + i]);
      }
    };
    console.log('Favorite.js render() showArray===', showArray);

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
                // style: {color: 'red'}
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

                {/*<div className="product-catalogue__sort-by">
                  <p className="sort-by">Сортировать</p>
                  <select id="sorting" name="">
                    <option value="">по дате добавления</option>
                    <option value="">по размеру</option>
                    <option value="">по производителю</option>
                  </select>
                </div>*/}

                {isThereFavorites && <div className="product-catalogue__sort-by">
                  <p className="sort-by">Сортировать</p>
                  <select ref={el=>this.sortingSelectElement=el} onChange={this.initFavorite} form='favoriteForm' name="sortBy" id="sorting">
                    <option value="price">по цене</option>
                    <option value="popularity">по популярности</option>
                  </select>
                </div>}




              </section>

              <section className="product-catalogue__item-list product-catalogue__item-list_favorite">

                {isThereFavorites && showArray.map(
                  (product)=>product && <FavoriteItem key={product.id} product={product} />
                )}

              </section>






              {/*<section className="product-catalogue__item-list product-catalogue__item-list_favorite">
                <a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-1" src="img/catalogue-pics/product-catalogue__item-1.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Босоножки женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Damlax</span></p>
                    <p className="item-price">18 520</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-2" src="img/catalogue-pics/product-catalogue__item-2.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Ботинки женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
                    <p className="item-price">23 150</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-3" src="img/catalogue-pics/product-catalogue__item-3.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Босоножки женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Damlax</span></p>
                    <p className="item-price">5 390</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-4" src="img/catalogue-pics/product-catalogue__item-4.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Кроссовки женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Damlax</span></p>
                    <p className="item-price">6 520</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-5" src="img/catalogue-pics/product-catalogue__item-5.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Резиновые полусапоги женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Menghi Shoes</span></p>
                    <p className="item-price">10 030</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-6" src="img/catalogue-pics/product-catalogue__item-6.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Полусапоги женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Pegia</span></p>
                    <p className="item-price">10 140</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-7" src="img/catalogue-pics/product-catalogue__item-7.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Босоножки женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Baldinini</span></p>
                    <p className="item-price">25 020</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-8" src="img/catalogue-pics/product-catalogue__item-8.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Туфли женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Baldini</span></p>
                    <p className="item-price">18 520</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-9" src="img/catalogue-pics/product-catalogue__item-9.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Полуботинки женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
                    <p className="item-price">21 830</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-10" src="img/catalogue-pics/product-catalogue__item-10.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Туфли женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
                    <p className="item-price">20 830</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-11" src="img/catalogue-pics/product-catalogue__item-11.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Ботинки женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
                    <p className="item-price">26 240</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a><a className="item-list__item-card item" href="product-card-desktop.html">
                  <div className="item-pic"><img className="item-pic-12" src="img/catalogue-pics/product-catalogue__item-12.png" alt=""/>
                    <div className="product-catalogue__product_favorite">
                      <p></p>
                    </div>
                    <div className="arrow arrow_left"></div>
                    <div className="arrow arrow_right"></div>
                  </div>
                  <div className="item-desc">
                    <h4 className="item-name">Туфли женские</h4>
                    <p className="item-producer">Производитель: <span className="producer">Vittorio Virgili</span></p>
                    <p className="item-price">17 750</p>
                    <div className="sizes">
                      <p className="sizes__title">Размеры в наличии:</p>
                      <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                    </div>
                  </div></a>
                </section>*/}



















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

              {isThereFavorites && <FavoritePagination currentPage={this.state.currentPage} pagesAmount={this.state.pagesAmount} onChangeCurrentPage={this.changeCurrentPage}/>}


            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Favorite;
