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
      orderCartTotal: this.props.total
    };
    // this.totalField;
    // this.total;

    // ??? эта переменая объект хранит значения стоимостей покупок, и используется для подсчета общей суммы заказа. Храню ее в this. а не в state - это соответствует react-подходу?
    this.itemsTotalCollector = {};

    this.countOrderCart = (itemSumm) => {
      Object.assign(this.itemsTotalCollector, itemSumm);
      let orderCartTotal = Object.values(this.itemsTotalCollector).reduce(
        (memo, value)=>{
          return memo+value;
        },0
      );
      // ??? то что функция ниже многократно забирает отсюда сумму и отправляет наверх в родительский компонент и там прописывает в state нормально? Далее сумма приходит сюда как новый prop и прописывается в текущем state.
      this.props.updateOrderTotal(orderCartTotal);
      // this.setState({orderCartTotal: orderCartTotal});

      // this.totalField.textContent = this.total.toLocaleString();
    };

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.total !== prevProps.total) this.setState({orderCartTotal: this.props.total});
  }

  componentDidMount() {
    this.props.items.forEach(
      item=> {
        // сюда тоже добавил unique номер:
        let summObj = {[`${item.id}` + `${item.size}`]: (this.props.products.find(el=> el.id === item.id).price *item.amount)};
        this.countOrderCart(summObj)
      }
    )
  }


  render() {
    let cartItems = [];

    cartItems = this.props.items.map(
      item=>{
        let itemProduct = this.props.products.find(el=>+el.id === +item.id);
        return <OrderCartItem key={item.id} unique={`${item.id}` + `${item.size}`} item={item} product={itemProduct} countOrderCart={this.countOrderCart} />;
      }
    );

    return (
      <div className="order-process__basket order-basket">
        <div className="order-basket__title">в вашей корзине:</div>

        <div className="order-basket__item-list">

          {cartItems}

        </div>

        <div className="order-basket__summ">
          Итого:
          <span>
            <span>
            {` ${this.state.orderCartTotal.toLocaleString()} `}
            </span>
            <i className="fa fa-rub" aria-hidden="true"></i>
          </span>
        </div>

      </div>
    );
  }
}

OrderCart.propTypes = {
  products: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired
};

export default OrderCart;
