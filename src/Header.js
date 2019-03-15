import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link} from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import logotype from './img/header-logo.png';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelView: null,
      chosenCategory: '',
      isCategoriesOpen: false
    };
    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'A') return;
      let params = {
        [event.currentTarget.dataset.subcategory]: event.target.textContent,
        categoryId: this.state.chosenCategory
      };
      this.props.setCatalogueParams(params);
    }

    this.clickCategory = (event)=>{
      if(!this.state.isCategoriesOpen) this.setState({
        isCategoriesOpen: true,
        chosenCategory: event.target.dataset.category
      });
      if(event.target.dataset.category == this.state.chosenCategory) this.setState({
        isCategoriesOpen: false,
        chosenCategory: ''
      });
      if(event.target.dataset.category != this.state.chosenCategory) this.setState({
        chosenCategory: event.target.dataset.category
      });
    };

    this.clickPictogram = (pictogram)=>{
      this.state.panelView === pictogram ? this.setState({panelView: null}) : this.setState({panelView: pictogram});
    };
    this.clickBasket = this.clickPictogram.bind(this, 'basket');
    this.clickProfile = this.clickPictogram.bind(this, 'profile');
  }

  render() {
    if(!this.props.categories) return null;

    return (
      <header className="header">
        <div className="top-menu">
          <div className="wrapper">
            <ul className="top-menu__items">
              <li className="top-menu__item">
                <a href="#">Возврат</a>
              </li>
              <li className="top-menu__item">
                <a href="#">Доставка и оплата</a>
              </li>
              <li className="top-menu__item">
                <a href="#">О магазине</a>
              </li>
              <li className="top-menu__item">
                <a href="#">Контакты</a>
              </li>
              <li className="top-menu__item">
                <a href="#">Новости</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-main">
          <div className="header-main__wrapper wrapper">
            <div className="header-main__phone">
              <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
              <p>Ежедневно: с 09-00 до 21-00</p>
            </div>
            <div className="header-main__logo">
              {/*Делаем Link вместо <a>*/}
              <Link to="/">
                <h1>
                  <img src={logotype} alt="logotype"/>
                </h1>
              </Link>
              <p>Обувь и аксессуары для всей семьи</p>
            </div>
            <div className="header-main__profile">
              <div className="header-main__pics">
                <div className="header-main__pic header-main__pic_search">

                </div>
                <div className="header-main__pic_border"></div>
                <div onClick={this.clickProfile} className="header-main__pic header-main__pic_profile">
                  <div className={`header-main__pic_profile_menu ${this.state.panelView === 'profile' && 'header-main__pic_profile_menu_is-active'}`}></div>
                </div>
                <div className="header-main__pic_border"></div>
                <div onClick={this.clickBasket} className="header-main__pic header-main__pic_basket">
                  <div className="header-main__pic_basket_full">1</div>
                  <div className={`header-main__pic_basket_menu ${this.state.panelView === 'basket' && 'header-main__pic_basket_menu_is-active'}`}></div>
                </div>
              </div>
              <form className="header-main__search" action="#">
                <input placeholder="Поиск"/>
                <i className="fa fa-search" aria-hidden="true"></i>
              </form>
            </div>

          </div>

          <div className={`header-main__hidden-panel hidden-panel ${this.state.panelView && 'header-main__hidden-panel_visible'}`}>
            <div className="wrapper">
              <div className={`hidden-panel__profile ${this.state.panelView === 'profile' && 'hidden-panel__profile_visible'}`}>
                <a href="#">Личный кабинет</a>
                <Link to='/favorite'>
                  <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</Link>
                <a href="#">Выйти</a>
              </div>
              <div className={`hidden-panel__basket basket-dropped ${this.state.panelView==='basket' && 'hidden-panel__basket_visible'}`}>
                <div className="basket-dropped__title">В вашей корзине:</div>
                <div className="basket-dropped__product-list product-list">
                  <div className="product-list__item">
                    <a className="product-list__pic">
                      <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                      <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                  </div>

                  <div className="product-list__item">
                    <a className="product-list__pic">
                      <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                      <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="product-list__item">
                    <a className="product-list__pic">
                      <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                      <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="product-list__item">
                    <a className="product-list__pic">
                      <img src="img/product-list__pic_1.jpg" alt="product"/> </a>
                    <a href="#" className="product-list__product">Ботинки женские, Baldinini</a>
                    <div className="product-list__fill"></div>
                    <div className="product-list__price">12 360
                      <i className="fa fa-rub" aria-hidden="true"></i>
                    </div>
                    <div className="product-list__delete">
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                  </div>

                </div>
                <Link to="/order" className="basket-dropped__order-button" href="order.html">Оформить заказ</Link>
              </div>
            </div>
          </div>

        </div>

        <nav className="main-menu">
          <div className="wrapper">
            <ul className="main-menu__items">

              {this.props.categories.map(
                category=>{
                  return (
                    <li key={category.id} className={`main-menu__item ${this.state.chosenCategory == category.id && 'main-menu__item_active'}`}>
                      <a onClick={this.clickCategory} data-category={category.id} >{category.title}</a>
                    </li>
                    );
                }
              )
              }

            </ul>
          </div>

        </nav>
        <div className={`dropped-menu ${this.state.isCategoriesOpen && 'dropped-menu_visible'}`}>
          <div className="wrapper">
            <div className="dropped-menu__lists dropped-menu__lists_women">
              <h3 className="dropped-menu__list-title">Повод:</h3>
              <ul onClick={this.clickSubcategory} data-subcategory='reason' className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Офис</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Вечеринка</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Свадьба</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Спорт</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Море</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Дом</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Повседневное</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
              <h3 className="dropped-menu__list-title">Категории:</h3>
              <ul onClick={this.clickSubcategory} data-subcategory='type' className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Балетки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Босоножки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботильоны</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботинки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботфорты</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Галоши</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Кеды и кроссовки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Мокасины</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Полусапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Резиновые сапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сабо</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сникерсы</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Тапочки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Туфли</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Шлёпанцы и вьетнамки</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Сезон:</h3>
              <ul onClick={this.clickSubcategory} data-subcategory='season' className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Зима</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Весна</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Лето</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Осень</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Бренды:</h3>
              <ul onClick={this.clickSubcategory} data-subcategory='brand' className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Albano</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ballin</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Baldinini</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Damlax</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Pegia</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Renzi</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Все</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  categories: PropTypes.array.isRequired,
  setCatalogueParams: PropTypes.func.isRequired
};

export default Header;
