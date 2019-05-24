import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import PropTypes from 'prop-types';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscribed: false,
      email: ''
    };
    // this.form;
    this.onSubmit = (e)=> {
      e.preventDefault();
      if(this.state.email==='') {
        this.setState({email: 'заполните email'})
      } else {
        let formData = new FormData(e.currentTarget);
        this.setState({isSubscribed: true});
      }
    };
    this.onСhange = (e)=> {
      this.setState({email: e.currentTarget.value});
    };
  }

  render() {
    return (
      <section className="subscribe">
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>

          {this.state.isSubscribed ?
            <p>Подписка оформлена!Спасибо!</p> :
          <form onSubmit={this.onSubmit} className="subscribe__radios" action="">
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="women"/>
              <div className="subscribe__radio_text">Женское</div>
            </label>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="men"/>
              <div className="subscribe__radio_text">Мужское</div>
            </label>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="both" defaultChecked/>
              <div className="subscribe__radio_text">Всё</div>
            </label>
            <input onChange={this.onСhange} className="subscribe__email" type="email" name="email" placeholder="Ваш e-mail" value={this.state.email}/>
            <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ"/>
          </form>
          }

        </div>
      </section>
    )
  }
}

Subscribe.propTypes = {
};

export default Subscribe;
