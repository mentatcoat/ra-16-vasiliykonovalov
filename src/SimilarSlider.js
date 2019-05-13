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
    super(props);
    this.state = {
      type: this.props.product.type,
      color: this.props.product.color,
      id: this.props.product.id,
      filtered: [],
      first: 0
    };

    this.getSimilarProducts = ()=>{
      let params = [
        ['type', this.state.type],
        ['color',this.state.color]
      ];

      services.fetchProducts(params)
        .then(data=>{
          let duplicate = data.data.findIndex(el=>el.id===this.state.id);
          if(duplicate !== -1) data.data.splice(duplicate, 1);
          this.setState({filtered: data.data.slice(-10)});
      });
    };
    this.getSimilarProducts();

    this.counter;
    this.clickArrow = (step)=>{
      let delta = this.state.first + step;
      if(delta > this.state.filtered.length - 1) delta = 0;
      if(delta < 0) delta = this.state.filtered.length - 1;
      this.setState({first: delta});
    }
    this.clickNext = this.clickArrow.bind(this,1);
    this.clickPrev = this.clickArrow.bind(this,-1);
    this.routIndex = ()=> {
      if (this.counter > this.state.filtered.length - 1) this.counter = 0;
      return this.counter++;
    };

    services.initSimilarSlider = this.initSimilarSlider;
  }

  initSimilarSlider = (productInfo) => {
    this.setState({
      type: productInfo.type,
      color: productInfo.color,
      id: productInfo.id,
      filtered: [],
      first: 0
    },
      this.getSimilarProducts
    );
  }


  render() {
    if(this.state.filtered.length === 0) return null;
    let show = [];
    let amount = this.state.filtered.length;
    if(amount>3) amount = 3;
    this.counter = this.state.first;
    for(let i = 0; i<amount; i++) {
      show.push(this.state.filtered[this.routIndex()]);
    }

    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">

          {this.state.filtered.length > 3 && <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow" onClick={this.clickPrev}></div>}


          {show.map(
            product=>(
              <div key={product.id} className="similar-products-slider__item-list__item-card item">
                <div className="similar-products-slider__item">
                  <Link to={`/product-card/${product.id}`}><img src={product.images[0]} className="similar-products-slider__item-pic-1" alt={product.title}/>
                  </Link>
                </div>
                <div className="similar-products-slider__item-desc">
                  <h4 className="similar-products-slider__item-name">{product.title}</h4>
                  <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{product.brand}</span></p>
                  <p className="similar-products-slider__item-price">{product.price.toLocaleString()}</p>
                </div>
              </div>
            )
          )
          }
          {this.state.filtered.length > 3 && <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow" onClick={this.clickNext}></div>}

        </div>
      </section>
    );
  }
}

SimilarSlider.propTypes = {
  product: PropTypes.object.isRequired
};

export default SimilarSlider;
