import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';

import OrderCart from './OrderCart';
import services from './services';
import JSONproducts from './data/products.json';
import PropTypes from 'prop-types';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };


  }



  render() {


    return (
      <div className="order-process__confirmed">
        <form onSubmit={this.props.onsubmit}>
          <div className="order-process__delivery">
            <h3 className="h3">кому и куда доставить?</h3>
            <div className="order-process__delivery-form">
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Имя</div>
                <input className="order-process__delivery-input" type="text" name="name" placeholder="Представьтесь, пожалуйста" required/>
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">Телефон</div>
                <input className="order-process__delivery-input" type="tel" name="phone" placeholder="Номер в любом формате" required/>
              </label>
              <label className="order-process__delivery-label">
                <div className="order-process__delivery-text">E-mail</div>
                <input className="order-process__delivery-input" type="email" name="email" placeholder="Укажите E-mail" required/>
              </label>
              <label className="order-process__delivery-label order-process__delivery-label_adress">
                <div className="order-process__delivery-text">Адрес</div>
                <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="address" placeholder="Ваша покупка будет доставлена по этому адресу" required/>
              </label>
            </div>
            <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
          </div>
          <div className="order-process__paid">
            <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
            <div className="order-process__paid-form">
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="onlineСard" required/><span className="order-process__paid-text">Картой онлайн</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCard"  required/><span className="order-process__paid-text">Картой курьеру</span>
              </label>
              <label className="order-process__paid-label">
                <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCash" required/><span className="order-process__paid-text">Наличными курьеру</span>
              </label>
            </div>
          </div>
          <button className="order-process__form-submit order-process__form-submit_click">Подтвердить заказ</button>
        </form>
      </div>
    );
  }
}

OrderForm.propTypes = {
  onsubmit: PropTypes.func
};

export default OrderForm;
