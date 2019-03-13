import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';

import OrderCartItem from './OrderCartItem';
import services from './services';
import JSONproducts from './data/products.json';
import PropTypes from 'prop-types';

class OrderCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.totalField;
    this.total;
    this.totalCollector = {};
    this.countOrderCart = (summObj) => {
      Object.assign(this.totalCollector, summObj);
      this.total = Object.values(this.totalCollector).reduce(
        (memo, value)=>{
          return memo+value;
        },0
      );
      this.totalField.textContent = this.total.toLocaleString();
    };
  }

  componentDidMount() {
    this.props.items.forEach(
      item=> {
        let summObj = {[item.id]: (this.props.products.find(el=> el.id === item.id).price *item.amount)};
        this.countOrderCart(summObj)
      }
    )
  }

  render() {
    let cartItems = [];

    cartItems = this.props.items.map(
      item=>{
        let itemProduct = this.props.products.find(el=>+el.id === +item.id);
        return <OrderCartItem key={item.id} item={item} product={itemProduct} counter={this.countOrderCart} />;
      }
    );

    return (
      <div className="order-process__basket order-basket">
        <div className="order-basket__title">в вашей корзине:</div>

        <div className="order-basket__item-list">

          {cartItems}

        </div>

        <div className="order-basket__summ">Итого: <span><span ref={el=>this.totalField=el}></span> <i className="fa fa-rub" aria-hidden="true"></i></span></div>
      </div>
    );
  }
}

OrderCart.propTypes = {
  products: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired
};

export default OrderCart;
