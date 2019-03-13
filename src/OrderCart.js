import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';

import OrderCartItem from './OrderCartItem';
import services from './services';
import JSONproducts from './data/products.json';

class OrderCart extends Component {
// props.products ; props.items - это массив покупок
  constructor(props) {
    super(props);
    // this.cart = services.fetchGetCart(localStorage.cartId);
    console.log('OrderCart props===', this.props);

    this.state = {
      products: this.props.products
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

  }

  componentDidMount() {
    // функция создает сумму карзины при Mount компонента:
    // this.props.items.forEach(
    //   item=> {
    //     console.log('in forEach item===', item);
    //     console.log('in forEach product===', this.props.products.find(el=>el.id === item.id));
    //     let summObj = {[item.id]: (this.props.products.find(el=> el.id === item.id).price *item.amount)};
    //     this.countOrderCart(summObj)
    //   }
    // )
  }

  render() {
    console.log('OrderCart render() props===', this.props);
    console.log('OrderCart render() state.products[0]===', this.state.products[0]);
    let cartItems = [];

    cartItems = this.props.items.map(
      item=>{
        console.log('MAP0======', this.props.items[0]);
        console.log('MAP1======', item.id);
        console.log('MAP2======', this.state.products[0]);
        console.log('MAP3======', this.props.products.find(el=>+el.id === +item.id));

        // let itemProduct = this.props.products.find(el=>+el.id === +item.id);
        let itemProduct = this.props.products[0];

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

export default OrderCart;
