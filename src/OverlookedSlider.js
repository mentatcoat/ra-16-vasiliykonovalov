import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import products from './data/products.json';
// ??? можно брать данные о просмотренных товарах из App.this.state или из localStorage или sessionStorage

//!!! закинули в sessionStorage просмотренные id (это временный код)
let massiv = [20, 21, 22,23,24,25];
sessionStorage.overlooked = JSON.stringify(massiv);

class OverlookedSlider extends Component {
  constructor(props) {
    super(props);
    // !!! тут должно быть:
    // this.products = props.products;
    this.products = products;
    this.state = {
      overlooked: sessionStorage.overlooked ?
      JSON.parse(sessionStorage.overlooked) : [],
      first: 0
    }
    this.filtered = this.products.filter(product=>
      this.state.overlooked.some(id => id === product.id)
    );
    this.counter;
    // функция для кликов по стрелкам:
    this.clickArrow = (step)=>{
      console.log('clickArrow() before state.first===', this.state.first);
      let delta = this.state.first + step;
      if(delta > this.filtered.length - 1) delta = 0;
      if(delta < 0) delta = this.filtered.length - 1;
      this.setState({first: delta});
    }
    this.clickNext = this.clickArrow.bind(this,1);
    this.clickPrev = this.clickArrow.bind(this,-1);
    // функция для прокрутки индекса массива по кругу, первое значение приходит от стрелки, задается в render()
    this.routIndex = ()=> {
      if (this.counter > this.filtered.length - 1) this.counter = 0;
      return this.counter++;
    };
  }//END construector

  render() {
    if(this.state.overlooked.length === 0) return null;
    console.log('OverlookedSlider this.state.overlooked===', this.state.overlooked);
    let show = [];
    let amount = this.filtered.length;
    if(amount>5) amount = 5;
    // тут должна быть функция для определния следующего индекса
    this.counter = this.state.first;
    for(let i = 0; i<amount; i++) {
      show.push(this.filtered[this.routIndex()]);
    }
    console.log('filtered===', this.filtered);
    console.log('show===', show);

    return (
        <section className="product-catalogue__overlooked-slider">
          <h3>Вы смотрели:</h3>
          <div className="overlooked-slider" style={{
            justifyContent: 'center'}}>

            {this.filtered.length > 5 && <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={this.clickPrev}></div>}

            {show.map(
              product=>(
                <div key={product.id} className="overlooked-slider__item" style={{backgroundImage: `url(${product.images[0]})`}}>
                  <a href="product-card-desktop.html"></a>
                </div>
              )
            )
            }

            {this.filtered.length > 5 && <div onClick={this.clickNext} className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>}
          </div>
        </section>
    );
  }
}

export default OverlookedSlider;
