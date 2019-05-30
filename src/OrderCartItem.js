import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';
import services from './services';
import PropTypes from 'prop-types';

class OrderCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.item.amount
    };
    this.fetchUpdateItemAmount = debounce(services.fetchUpdateProduct, 1500);

    this.changeAmount = (step)=>{
      let result = this.state.amount + step;
      if(result < 0) result = 0;
      this.setState({amount: result});
      this.props.countOrderCart({[this.props.unique]:+this.props.product.price * +result});
      this.fetchUpdateItemAmount(localStorage.cartId, {id: this.props.item.id, size: this.props.item.size, amount: +result});
    }

    this.changeAmountPlus = this.changeAmount.bind(this, 1);
    this.changeAmountMinus = this.changeAmount.bind(this, -1);

  }


  render() {
    return (
              <div className="order-basket__item-list">

                <div className="basket-item">
                  <Link to={`/product-card/${this.props.product.id}`} className="basket-item__pic">
                    <img src={this.props.product.images[0]} alt="product_pic"/>
                  </Link>
                  <div className="basket-item__product">
                    <div className="basket-item__product-name">
                      <Link to={`/product-card/${this.props.product.id}`}>{this.props.product.title}</Link>
                    </div>
                    <div className="basket-item__product-features">
                      <div className="basket-item__size">Размер: <span>{this.props.item.size}</span></div>
                      <div className="basket-item__producer">Производитель: <span>{this.props.product.brand}</span></div>
                      <div className="basket-item__color">Цвет: <span>{this.props.product.color}</span></div>
                    </div>
                  </div>
                  <div className="basket-item__quantity__incart">

                    <div onClick={this.changeAmountMinus} className="basket-item__quantity-change basket-item-list__quantity-change_minus">-</div>
                    {this.state.amount}
                    <div onClick={this.changeAmountPlus} className="basket-item__quantity-change basket-item-list__quantity-change_plus">+</div>
                  </div>
                  <div className="basket-item__price">{(+this.props.product.price * +this.state.amount).toLocaleString()} <i className="fa fa-rub" aria-hidden="true"></i></div>
                </div>

              </div>
    );
  }
}

OrderCartItem.propTypes = {
  unique: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  counter: PropTypes.func.isRequired
};

function debounce(callback, delay) {
  let timeout;
  return (arg1, arg2) => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback(arg1, arg2);
    }, delay);
  };
};

export default OrderCartItem;
