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

class Catalogue extends Component {
  // props.catalogueParams ;
  constructor(props) {
    super(props);
    console.log('<Catalogue got props===', props);
    this.state = {
      sortedProducts: ''
      //!!! сюда в стейт нужно кидать обновленный фильтрованный массив продуктов, чтобы он далее перерисовывался
    };

    // THIS LISTENER функция собирает с фильта в Каталоге данные, создает catalogueParams, сравнивает его с this.props.catalogueParams => если отличается то высызвает getSortedProducts

    this.getSortedProducts = (params)=>{
      services.fetchProducts(params, (data)=>{
        console.log('<Catalogue fetch got json->data===', data);
        this.setState({sortedProducts: data.data});
      })
    };
    this.getSortedProducts(this.props.catalogueParams);
  }//END constructor

  shouldComponentUpdate(nextProps, nextState) {
  }//END shouldComponentUpdate

  render() {
    console.log('<Catalogue/> render() state.catalogueParams===', this.state.catalogueParams);
    console.log('<Catalogue/> render() props.catalogueParams===', this.props.catalogueParams);

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
                <h2 className="section-name">Женская обувь</h2><span className="amount"> 1 764 товара</span>
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
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-1" src="img/catalogue-pics/product-catalogue__item-1.png" alt="Босоножки женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-2" src="img/catalogue-pics/product-catalogue__item-2.png" alt="Ботинки женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-3" src="img/catalogue-pics/product-catalogue__item-3.png" alt="Босоножки женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-4" src="img/catalogue-pics/product-catalogue__item-4.png" alt="Кроссовки женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-5" src="img/catalogue-pics/product-catalogue__item-5.png" alt="Резиновые полусапоги женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-6" src="img/catalogue-pics/product-catalogue__item-6.png" alt="Полусапоги женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-7" src="img/catalogue-pics/product-catalogue__item-7.png" alt="Босоножки женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-8" src="img/catalogue-pics/product-catalogue__item-8.png" alt="Туфли женские"/>
                  <div className="product-catalogue__product_favorite-chosen">
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-9" src="img/catalogue-pics/product-catalogue__item-9.png" alt="Полуботинки женские"/>
                  <div className="product-catalogue__product_favorite-chosen">
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-10" src="img/catalogue-pics/product-catalogue__item-10.png" alt="Туфли женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-11" src="img/catalogue-pics/product-catalogue__item-11.png" alt="Ботинки женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-12" src="img/catalogue-pics/product-catalogue__item-12.png" alt="Туфли женские"/>
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
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-13" src="img/catalogue-pics/product-catalogue__item-13.png" alt="Ботинки женские"/>
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Ботинки женские</h4>
                  <p className="item-producer">Производитель: <span className="producer">Loriblu</span></p>
                  <p className="item-price">24 700</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
              <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-14" src="img/catalogue-pics/product-catalogue__item-14.png" alt="Босоножки женские"/>
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
                </div>
              </a>
               <a className="item-list__item-card item" href="product-card-desktop.html">
                <div className="item-pic"><img className="item-pic-15" src="img/catalogue-pics/product-catalogue__item-15.png" alt="Балетки женские"/>
                  <div className="product-catalogue__product_favorite">
                    <p></p>
                  </div>
                  <div className="arrow arrow_left"></div>
                  <div className="arrow arrow_right"></div>
                </div>
                <div className="item-desc">
                  <h4 className="item-name">Балетки женские</h4>
                  <p className="item-producer">Производитель: <span className="producer">Ballin</span></p>
                  <p className="item-price">20 730</p>
                  <div className="sizes">
                    <p className="sizes__title">Размеры в наличии:</p>
                    <p className="sizes__avalible">36, 37, 38, 39, 40, 41, 42</p>
                  </div>
                </div>
              </a>
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

        <OverlookedSlider />

      </div>
    );
  }
}

export default Catalogue;
