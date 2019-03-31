import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';

import OrderCart from './OrderCart';
import OrderForm from './OrderForm';
import services from './services';
import JSONproducts from './data/products.json';
import PropTypes from 'prop-types';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProductsInfo: null,
      isDone: false,
      total: '',
      paymentType: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      cart: ''
    };
    this.cart;

    this.getCartProductsInfo = ()=>{
      const array = [];
      console.log('getCartProductsInfo() state===', this.state);
      this.state.cart.products.forEach(
        product=>{
          array.push(services.fetchProduct(
            product.id
          ));
        }
      );
      Promise.all(array)
        .then(results=>{
          this.setState({cartProductsInfo: results});
        });
    };//END getCartProductsInfo

    services.fetchGetCart(localStorage.cartId)
      .then((data)=> {
        this.setState({cart: data}, this.getCartProductsInfo);
      }
      );

    this.submitCreateOrder = (event) => {
      event.preventDefault();
      console.log('submitCreateOrder() event===', event);
      console.log('submitCreateOrder() event===', event.target);

      let form = event.target;

      let orderInfo = {
        cart: localStorage.cartId,
        paymentType: form.paid.value,
        name: form.name.value,
        address: form.address.value,
        phone: form.phone.value,
      };
      console.log('submitCreateOrder() orderInfo===', orderInfo);
      services.fetchCreateOrder(orderInfo)
        .then(data=>{
          console.log('createdOrder() data===', data);
          if(data.status === 'ok') {
            this.setState({
              isDone: true,
              total: services.cartTotal,
              paymentType: form.paid.value,
              name: form.name.value,
              address: form.address.value,
              phone: form.phone.value,
              email: form.email.value
            });
            delete localStorage.cartId;
            services.resetBasketPanel();
          }
        });
    };

    this.backToOrder = ()=>{
      this.setState({
        isDone: false,
        cart: null,
        cartProductsInfo: null
      });
    };
  }

  render() {
    console.log('Order render() state===', this.state);

    let paymentType;
    switch(this.state.paymentType) {
      case 'onlineСard':
        paymentType = 'Картой онлайн';
        break;
      case 'offlineCard':
        paymentType = 'Картой курьеру';
        break;
      case 'offlineCash':
        paymentType = 'Наличными курьеру';
        break;
    }

// ??? В breadcrumb КОРЗИНА, ниже по коду, я использую слушатель services.openBasketPanel, чтобы просто развернуть карзину. Мне не понятно что должно произойти при клике на корзину? Так как одноименной страницы в задании не предусмотрено, то я просто открываю корзину и не ухожу с текущей страницы. А как надо было это сделать? Или это неразъясненная часть задания и разработчик сам должен сделать как считает нужным?
    return (
        <div className="wrapper order-wrapper">

          <BreadcrumbsItem
            to='/'
            className='site-path__item'
          >
            Главная
          </BreadcrumbsItem>

          <BreadcrumbsItem
           to='/order'
           className='site-path__item'
           onClick={services.openBasketPanel}
          >
           Корзина
          </BreadcrumbsItem>

          <BreadcrumbsItem
           to='/order/'
           className='site-path__item'
           onClick={this.backToOrder}
          >
           Оформление заказа
          </BreadcrumbsItem>

          {this.state.isDone && <BreadcrumbsItem
            to='/fourth/fifth'
          >
           Заказ принят
          </BreadcrumbsItem>}



          <section className="order-process">
            {!this.state.isDone && <h2 className="order-process__title">Оформление заказа</h2>}

            {this.state.cartProductsInfo && !this.state.isDone && <OrderCart products={this.state.cartProductsInfo} items={this.state.cart.products} />}

            {!this.state.isDone && <OrderForm onsubmit={this.submitCreateOrder}/>}

            </section>

            {this.state.isDone &&
            <section className="order-done">
            <h2 className="order-process__title">Заказ принят, спасибо!</h2>

            <div className="order-done__information order-info">
              <div className="order-info__item order-info__item_summ">
                <h3>Сумма заказа:</h3>
                <p>{`${this.state.total.toLocaleString()} `}<i className="fa fa-rub" aria-hidden="true"></i></p>
              </div>
              <div className="order-info__item order-info__item_pay-form">
                <h3>Способ оплаты:</h3>
                <p>{paymentType}</p>
              </div>
              <div className="order-info__item order-info__item_customer-name">
                <h3>Имя клиента:</h3>
                <p>{this.state.name}</p>
              </div>
              <div className="order-info__item order-info__item_adress">
                <h3>Адрес доставки:</h3>
                <p>{this.state.address}</p>
              </div>
              <div className="order-info__item order-info__item_phone">
                <h3>Телефон:</h3>
                <p>{this.state.phone}</p>
              </div>
            </div>
            <p className="order-done__notice">Данные о заказе отправлены на адрес <span>{`${this.state.email}.`}</span></p>
            <Link to={'/catalogue'} className="order-done__continue">продолжить покупки</Link>

            </section>
          }

        </div>
    );
  }
}

Order.propTypes = {
};

export default Order;
