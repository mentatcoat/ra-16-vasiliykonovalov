import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';

class OrderCartItem extends Component {
// props.product ; props.item данные покупки ; props.counter - отправляет свою сумму родителю
  constructor(props) {
    super(props);
    this.state = {
      amount: this.props.item.amount
    };
    this.changeAmount = (step)=>{
      let result = this.state.amount + step;
      if(result < 0) result = 0;

      this.setState({amount: result});
      this.props.counter({[this.props.item.id]:+this.props.product.price * +result});
    }

    this.changeAmountPlus = this.changeAmount.bind(this, 1);
    this.changeAmountMinus = this.changeAmount.bind(this, -1);
    console.log('OrderCartItem props===', props);
  }//END constructor

  render() {

    return (
              <div className="order-basket__item-list">

                <div className="basket-item">
                  <div className="basket-item__pic"><img src={this.props.product.images[0]} alt="product_pic"/></div>
                  <div className="basket-item__product">
                    <div className="basket-item__product-name"><a href="#">{this.props.product.title}</a></div>
                    <div className="basket-item__product-features">
                      <div className="basket-item__size">Размер: <span>{this.props.item.size}</span></div>
                      <div className="basket-item__producer">Производитель: <span>{this.props.product.manufacturer}</span></div>
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

export default OrderCartItem;
