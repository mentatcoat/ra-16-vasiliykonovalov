import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link} from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import logotype from './img/header-logo.png';
import services from './services';
import PropTypes from 'prop-types';

class HeaderCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.removeItem = ()=>{
      let item = this.props.item;
      item.amount = 0;
      services.fetchUpdateProduct(localStorage.cartId, item)
        .then(data=> {
          if(this.props.items.length === 1) delete localStorage.cartId;
          this.props.resetBasketPanel();
        }
        );
    };
  }

  render() {
    let amountString = '';
    let priceString = this.props.product.price.toLocaleString() + ' ';
    if(this.props.item.amount > 1) {
      amountString = this.props.item.amount > 1 ? `, ${this.props.item.amount} шт` : '';
      priceString = (this.props.product.price * this.props.item.amount).toLocaleString() + ' ';
    }

    return (
      <div className="product-list__item">
        <Link to={`/product-card/${this.props.item.id}`} className="product-list__pic">
          <img src={this.props.product.images[0]} alt="product"/> </Link>
        <Link to={`/product-card/${this.props.item.id}`} className="product-list__product">{`${this.props.product.title} (размер: ${this.props.item.size})${amountString}`}</Link>
        <div className="product-list__fill"></div>
        <div className="product-list__price">{priceString}
          <i className="fa fa-rub" aria-hidden="true"></i>
        </div>
        <div onClick={this.removeItem} className="product-list__delete">
          <i  className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

HeaderCartItem.propTypes = {
  item: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default HeaderCartItem;
