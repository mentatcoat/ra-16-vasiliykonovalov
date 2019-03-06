import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';

import OrderCartItem from './OrderCartItem';
import services from './services';

class OrderCart extends Component {
// props.products ; props.items - это массив покупок
  constructor(props) {
    super(props);
    // this.cart = services.fetchGetCart(localStorage.cartId);
    this.state = {
    };
    this.totalField; //дом-поле куда падает cart total
    this.total;
    this.totalCollector = {};//объект-сборщик сумм по каждому товару
    // функция принимает от Айтемов-компонентов их новые суммы, складываем в одно, присваивает в totalField, и в total
    this.countOrderCart = (summObj) => {
      console.log('countOrderCart() args==', summObj);
      Object.assign(this.totalCollector, summObj);
      console.log('OrderCart totalCollector===', this.totalCollector);
      this.total = Object.values(this.totalCollector).reduce(
        (memo, value)=>{
          return memo+value;
        },0
      );
      this.totalField.textContent = this.total.toLocaleString();
    };

    console.log('OrderCart props===', props);
  }//END constructor
  componentDidMount() {
    // функция создает сумму карзины при Mount компонента:
    this.props.items.forEach(
      item=> {
        console.log('in forEach item===', item);
        console.log('in forEach product===', this.props.products.find(el=>el.id === item.id));
        let summObj = {[item.id]: (this.props.products.find(el=> el.id === item.id).price *item.amount)};
        this.countOrderCart(summObj)
      }
    )
  }//END componentDidMount

  render() {

    return (
      <div className="order-process__basket order-basket">
        <div className="order-basket__title">в вашей корзине:</div>

        <div className="order-basket__item-list">

          {this.props.items.map(
            item=>{
              return <OrderCartItem key={item.id} item={item} product={this.props.products.find(el=>el.id === item.id )} counter={this.countOrderCart} />

            }
          )}

        </div>

        <div className="order-basket__summ">Итого: <span><span ref={el=>this.totalField=el}></span> <i className="fa fa-rub" aria-hidden="true"></i></span></div>
      </div>
    );
  }
}

export default OrderCart;
