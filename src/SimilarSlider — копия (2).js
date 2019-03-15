import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import './css/style-product-card.css';
import './css/style-order.css';
import services from './services';
import JSONproducts from './data/products.json';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class SimilarSlider extends Component {
  constructor(props) {
    console.log('SimilarSlider got props===', props);
    super(props);
    this.state = {
      type: this.props.type,
      color: this.props.color,
      similarProducts: []
    };

    this.getSimilarProducts = ()=>{
      let params = {
        type: this.state.type,
        color: this.state.color
      };
      services.fetchProducts(params, data=>{
        console.log('fetch similarProducts===', data.data);
        this.setState({similarProducts: data.data})
      });
    };
    this.getSimilarProducts();



  }//END constructor

  render() {
    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">

          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"></div>






            <div className="similar-products-slider__item-list__item-card item">
              <div className="similar-products-slider__item">
                <a href="product-card-desktop.html"><img src="img/product-card-pics/product-card__similar-products-slider-item-1.png" className="similar-products-slider__item-pic-1" alt="Ботинки женские"/>
                </a>
              </div>
              <div className="similar-products-slider__item-desc">
                <h4 className="similar-products-slider__item-name">Ботинки женские</h4>
                <p className="similar-products-slider__item-producer">Производитель: <span className="producer">Norma J.Baker</span></p>
                <p className="similar-products-slider__item-price">23 150</p>
              </div>
            </div>









          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"></div>

        </div>
      </section>
    );
  }
}

SimilarSlider.propTypes = {
};

export default SimilarSlider;
