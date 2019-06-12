import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link} from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import logotype from './img/header-logo.png';
import services from './services';
import HeaderCartItem from './HeaderCartItem';
import defaultCatalogueParams from './defaultCatalogueParams';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchOpen: false,
      panelView: this.props.panelView,
      chosenCategory: '',
      isCategoriesOpen: false,
      searchField: '',
      items: null,
      products: null
    };

    this.onChangeSearchField = (e) => {
      this.setState({
        searchField: e.currentTarget.value
      });
    };

    this.loadProducts = ()=>{
      let productsArray = [];
      this.state.items.forEach(item=>{
        productsArray.push(services.fetchProduct(item.id));
      });
      Promise.all(productsArray)
        .then(products=>{
          this.setState({
            products: products
          });
        });
    };

    this.loadItems = ()=>{
      if(localStorage.cartId) {
        services.fetchGetCart(localStorage.cartId)
          .then(data=>{
            this.setState({
              items: data.products
            }, this.loadProducts);
        });
      } else {
        this.setState({
          items: null,
          products: null
        });
      }
    };

    this.loadItems();

    this.onSubmitHeaderSearch = (e)=>{
      e.preventDefault();
      let params = {};
      Object.assign(params, defaultCatalogueParams, {
        search :this.state.searchField.trim()
      });
      this.props.setCatalogueParams(params);
    };
    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'A') return;

      let params = {};
      Object.assign(params, defaultCatalogueParams, {
        categoryId: this.state.chosenCategory,
        [event.currentTarget.dataset.subcategory]: event.target.textContent === 'Все'
        ? ''
        : event.target.textContent
      });

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
      this.state.panelView === pictogram ? this.props.changeHeaderPanel(null) : this.props.changeHeaderPanel(pictogram);
    };
    this.clickBasket = this.clickPictogram.bind(this, 'basket');
    this.clickProfile = this.clickPictogram.bind(this, 'profile');

    this.openSearchForm = ()=>{
      this.setState({
        isSearchOpen: !this.state.isSearchOpen
      });
    };

  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.props.resetBasketDate !== prevProps.resetBasketDate)
      this.loadItems();
      // ??? чтобы из других главныъ страниц не влохенных в Header можно было влиять на поведения Header я решил закидывать туда текущее время и действовать, если оно обновилось. React flow разве может еще как то тут помоч?
    if(this.props.panelView !== this.state.panelView)
      this.setState({panelView: this.props.panelView});
  }

  render() {

    if(!this.props.categories) return null;
    let isItemsShown = false;
    if(this.state.items && this.state.products) {
      if (this.state.items.length === this.state.products.length) isItemsShown = true;
    }

    let {reasons} = this.props;
    let {types} = this.props;
    let {brands} = this.props;

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
                <div className={`header-main__pic header-main__pic_search ${this.state.isSearchOpen ? 'header-main__pic_search_is-hidden' : ''}`} onClick={this.openSearchForm}>
                </div>
                <div className="header-main__pic_border"></div>
                <div onClick={this.clickProfile} className="header-main__pic header-main__pic_profile">
                  <div className={`header-main__pic_profile_menu ${this.state.panelView === 'profile' && 'header-main__pic_profile_menu_is-active'}`}></div>
                </div>
                <div className="header-main__pic_border"></div>
                <div onClick={this.clickBasket} className="header-main__pic header-main__pic_basket">
                  <div ref={this.props.getBasketTwinklePic} className="header-main__pic_basket_full">1</div>
                  <div className={`header-main__pic_basket_menu ${this.state.panelView === 'basket' && 'header-main__pic_basket_menu_is-active'}`}></div>
                </div>
              </div>
              <form className={`header-main__search ${this.state.isSearchOpen ? 'header-main__search_active' : ''}`} onSubmit={this.onSubmitHeaderSearch}>
                <input placeholder="Поиск" value={this.state.searchField}
                onChange={this.onChangeSearchField}
                />
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
                <div className="basket-dropped__title">{localStorage.cartId ? 'В вашей корзине:' : 'В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!'}</div>

                {isItemsShown &&
                  <div className={`basket-dropped__product-list product-list ${this.state.items.length>3 ? 'basket-dropped__product-list-scroll' : ''}`}>

                  {this.state.items.map((item, index)=>{
                    return <HeaderCartItem
                    key={`${item.id}` + `${item.size}`}
                    item={item}
                    product={this.state.products[index]} items={this.state.items}
                    resetBasketPanel={this.loadItems}
                    />;
                  }
                  )}
                  </div>
                }

                {localStorage.cartId && <Link to="/order" className="basket-dropped__order-button"
                onClick={this.clickBasket} >Оформить заказ</Link>}
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
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Повод:</h3>
              <ul onClick={this.clickSubcategory} data-subcategory='reason' className="dropped-menu__list">

                {reasons && reasons.map(
                  elem=>(
                    <li key={elem} className="dropped-menu__item">
                      <a href="#">{elem}</a>
                    </li>
                  )
                )}

              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Категории:</h3>
              <ul onClick={this.clickSubcategory} data-subcategory='type' className="dropped-menu__list">
              {types && types.map(
                elem=>(
                  <li key={elem} className="dropped-menu__item">
                    <a href="#">{elem}</a>
                  </li>
                )
              )}
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
                {brands && brands.slice(0, 8).map(
                  elem=>(
                    <li key={elem} className="dropped-menu__item">
                      <a href="#">{elem}</a>
                    </li>
                  )
                )}

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
