import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';

class Subscribe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscribed: false,
      email: ''
    };
    this.form;
    this.onsubmit = (e)=> {
      e.preventDefault();
      if(this.state.email==='') {
        this.setState({email: 'заполните email'})
      } else {
        let formData = new FormData(this.form);
        this.setState({isSubscribed: true});
      }
    };
    this.onchange = (e)=> {
      this.setState({email: e.target.value});
    };
  }

  render() {
    return (
      <section className="subscribe">
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>

          {this.state.isSubscribed ?
            <p>Подписка оформлена!Спасибо!</p> :
          <form ref={el=>this.form = el} onSubmit={this.onsubmit} className="subscribe__radios" action="">
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
            <input onChange={this.onchange} className="subscribe__email" type="email" name="email" placeholder="Ваш e-mail" value={this.state.email}/>
            <input className="subscribe__submit" type="submit" value="ПОДПИСАТЬСЯ"/>
          </form>
          }

        </div>
      </section>
    )
  }
}

export default Subscribe;
