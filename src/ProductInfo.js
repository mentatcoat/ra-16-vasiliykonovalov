import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';
import './css/style-product-card.css';
import ProductInfoSizes from './ProductInfoSizes';
import services from './services';
import helpers from './helpers';
import PropTypes from 'prop-types';

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.product = this.props.product;
    this.isFavorite = helpers.isFavorite;
    this.state= {
      chosenSize: '',
      chosenAmount: 1,
      isFavorite: this.isFavorite(),
      buttonTitle: 'В корзину'
    };

    helpers.initProductInfo = this.initProductInfo;

    this.clickInBasket = ()=> {
      if(!this.state.chosenSize) {
        this.setState({buttonTitle: 'Выберите размер!'});
        return;
      }
      let productObj = {
        id: this.product.id,
        size: this.state.chosenSize,
        amount: this.state.chosenAmount
      };
      if(localStorage.cartId) {
        services.fetchUpdateProduct(localStorage.cartId, productObj)
          .then(data=>{
            if(data.status === 'ok') {
              localStorage.cartProductsAmount=data.data.products.length;
              helpers.twinkleBasketPic();
              helpers.resetBasketPanel();
            }

          });
      } else {
        services.fetchCreateCart(productObj)
          .then(data=>{
            if(data.status === 'ok') {
              localStorage.cartProductsAmount=1;
              helpers.twinkleBasketPic();
              helpers.resetBasketPanel();
            }
          });
      }
    };
    this.toggleFavorite = ()=>{
      helpers.toggleFavorite(this.product.id);
      this.setState({isFavorite: this.isFavorite()});
    };
    this.isAvailable = ()=> {
      let foundSize;
      if(this.product.sizes) foundSize = this.product.sizes.find(el=>parseInt(el.size,10)===this.state.chosenSize);
      if(!foundSize) return false;
      return foundSize.available;
    };
    this.clickSize = (e)=>{
      e.preventDefault();
      this.setState({chosenSize: +e.target.textContent});
      this.setState({buttonTitle: 'В корзину'});
    }
    this.basketAmountChange = (step)=>{
      let result = this.state.chosenAmount + step;
      if(result < 1) result = 1;
      this.setState({chosenAmount: result});
    }
    this.basketAmountPlus = this.basketAmountChange.bind(this, 1);
    this.basketAmountMinus = this.basketAmountChange.bind(this, -1);
  }

  initProductInfo = (productInfo)=>{
    this.product = productInfo;
    this.setState({
      chosenSize: '',
      chosenAmount: 1,
      isFavorite: this.isFavorite(),
      buttonTitle: 'В корзину'
    });
  }

  render() {
    return (
      <div>ProductInfo Component here

        {/*<!-- Блок информации о товаре -->*/}
        <div className="main-screen__product-info">

          <div className="product-info-title">
            <h2>{this.product.title}</h2>
            <div className="in-stock">
              {this.isAvailable() ? 'В наличии' : 'Нет в наличии'}
            </div>
          </div>

          <div className="product-features">
            <table className="features-table">
              <tr>
                <td className="left-col">Артикул:</td>
                <td className="right-col">{this.product.sku}</td>
              </tr>
                <tr>
                  <td className="left-col">Производитель:</td>
                  <td className="right-col"><a href="#"><span className="producer">{this.product.manufacturer}</span></a></td>
              </tr>
                <tr>
                  <td className="left-col">Цвет:</td>
                  <td className="right-col">{this.product.color}</td>
              </tr>
                <tr>
                  <td className="left-col">Материалы:</td>
                  <td className="right-col">{this.product.material}</td>
              </tr>
                <tr>
                  <td className="left-col">Сезон:</td>
                  <td className="right-col">{this.product.season}</td>
              </tr>
                <tr>
                  <td className="left-col">Повод:</td>
                  <td className="right-col">{this.product.reason}</td>
              </tr>
            </table>
          </div>

            <ProductInfoSizes chosenSize={this.state.chosenSize} onclick={this.clickSize} sizes={this.product.sizes}/>

            <a onClick={this.toggleFavorite} className="in-favourites-wrapper">
              <div className={`favourite ${this.state.isFavorite && 'favourite-fill'}`} href="#"></div><p className="in-favourites">{this.state.isFavorite ? 'В избранном' : 'В избранное'}</p>
            </a>
          <div className="basket-item__quantity">
            <div onClick={this.basketAmountMinus} className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>{this.state.chosenAmount}
            <div onClick={this.basketAmountPlus} className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
          </div>
          <div className="price">{(this.product.price * this.state.chosenAmount).toLocaleString()} ₽</div>
          <button onClick={this.clickInBasket} className={`in-basket in-basket-click ${!this.state.chosenSize && 'in-basket_disabled'}`}>{this.state.buttonTitle}</button>
        </div>

      </div>
    );
  }
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductInfo;
