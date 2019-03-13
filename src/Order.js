import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';

import OrderCart from './OrderCart';
import services from './services';
import JSONproducts from './data/products.json';


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: null,
      isDone: false,
      total: '',
      cart: null
    };
    this.cart;

    this.getCartProducts = ()=>{
      const array = [];





      this.state.cart.products.forEach(
        product=>{
          services.fetchProduct(
            product.id,
            (data)=>array.push(data.data)
          );
        }
      );
      console.log('getCartProducts() array===', array);
      this.setState({cartProducts: array});
    };

    services.fetchGetCart(localStorage.cartId, (data)=> {
      this.setState({cart : data.data}, this.getCartProducts);
    });
  // ??? делаю fetchProduct отправляю массви продуктов далее в OrderCart, но туда массив не доходит, почему?
  }

  render() {
    console.log('Order render() state===', this.state);
    // console.log('Order render() state.cartProducts===', this.state.cartProducts[0]);
    console.log('Order render() this.cart===', this.cart);

    return (
        <div className="wrapper order-wrapper">
          <div className="site-path">
            <ul className="site-path__items">
              <li className="site-path__item"><a href="index.html">Главная</a></li>
              <li className="site-path__item"><a href="#">Корзина</a></li>
              <li className="site-path__item"><a href="#">Оформление заказа</a></li>
            </ul>
          </div>

          <section className="order-process">
            <h2 className="order-process__title">Оформление заказа</h2>

            {this.state.cartProducts && <OrderCart products={this.state.cartProducts} items={this.state.cart.products} />}

            <div className="order-process__confirmed">
              <form action="#">
                <div className="order-process__delivery">
                  <h3 className="h3">кому и куда доставить?</h3>
                  <div className="order-process__delivery-form">
                    <label className="order-process__delivery-label">
                      <div className="order-process__delivery-text">Имя</div>
                      <input className="order-process__delivery-input" type="text" name="delivery" placeholder="Представьтесь, пожалуйста"/>
                    </label>
                    <label className="order-process__delivery-label">
                      <div className="order-process__delivery-text">Телефон</div>
                      <input className="order-process__delivery-input" type="tel" name="delivery" placeholder="Номер в любом формате"/>
                    </label>
                    <label className="order-process__delivery-label">
                      <div className="order-process__delivery-text">E-mail</div>
                      <input className="order-process__delivery-input" type="email" name="delivery" placeholder="Укажите E-mail"/>
                    </label>
                    <label className="order-process__delivery-label order-process__delivery-label_adress">
                      <div className="order-process__delivery-text">Адрес</div>
                      <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу"/>
                    </label>
                  </div>
                  <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
                </div>
                <div className="order-process__paid">
                  <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                  <div className="order-process__paid-form">
                    <label className="order-process__paid-label">
                      <input className="order-process__paid-radio" type="radio" name="paid" value="card-online"/><span className="order-process__paid-text">Картой онлайн</span>
                    </label>
                    <label className="order-process__paid-label">
                      <input className="order-process__paid-radio" type="radio" name="paid" value="card-courier" checked=""/><span className="order-process__paid-text">Картой курьеру</span>
                    </label>
                    <label className="order-process__paid-label">
                      <input className="order-process__paid-radio" type="radio" name="paid" value="cash"/><span className="order-process__paid-text">Наличными курьеру</span>
                    </label>
                  </div>
                </div>
                <button className="order-process__form-submit order-process__form-submit_click">Подтвердить заказ</button>
              </form>
            </div>
          </section>
        </div>
    );
  }
}

export default Order;
