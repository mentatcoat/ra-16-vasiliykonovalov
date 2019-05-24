import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';
import './css/style-product-card.css';
import products from './data/products.json';
import PropTypes from 'prop-types';
import services from './services';
import helpers from './helpers';

class ProductSlider extends Component {
  constructor(props) {
    super(props);
    this.pushMainpic = this.props.onclick
    this.pics = this.props.product.images;
    this.state = {
      product: this.props.product,
      pics: this.props.product.images,
      first: 0
    }

    // helpers.initProductSlider = this.initProductSlider;

    this.clickArrow = (step)=>{
      let delta = this.state.first + step;
      if(delta > this.state.pics.length - 1) delta = 0;
      if(delta < 0) delta = this.state.pics.length - 1;
      this.setState({first: delta});
    }
    this.clickNext = this.clickArrow.bind(this,1);
    this.clickPrev = this.clickArrow.bind(this,-1);
    this.counter;
    this.routIndex = ()=> {
      if (this.counter > this.state.pics.length - 1) this.counter = 0;
      return this.counter++;
    };
  }

  initProductSlider = (product)=>{
    // this.pics = product.images;
    this.setState({
      product: product,
      pics: product.images,
      first: 0
    });
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(this.props.product !== prevProps.product) {
      this.initProductSlider(this.props.product);
    }
  }

  render() {
    if(this.state.pics.length < 2) return null;

    let show = [];
    let galleryAmount = this.state.pics.length;
    if(galleryAmount>3) galleryAmount = 3;
    this.counter = this.state.first;
    for(let i = 0; i<galleryAmount; i++) {
      show.push(this.state.pics[this.routIndex()]);
    }

    return (
        <section className="main-screen__favourite-product-slider">
          <div className="favourite-product-slider">
            {this.state.pics.length > 3 && <div onClick={this.clickPrev} className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"></div>}

            {show.map(
              pic=>(
              <img key={pic} onClick={this.pushMainpic} src={pic} alt="product picture" className="favourite-product-slider__item"/>
              )
            )
            }

            {this.state.pics.length > 3 &&  <div onClick={this.clickNext} className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"></div>}
          </div>
        </section>
    );
  }
}

ProductSlider.propTypes = {
  product: PropTypes.object.isRequired,
  onclick: PropTypes.func.isRequired
};

export default ProductSlider;
