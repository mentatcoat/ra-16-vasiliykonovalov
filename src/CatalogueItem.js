import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import services from './services';
import CatalogueSidebar from './CatalogueSidebar';
import OverlookedSlider from './OverlookedSlider';
import PropTypes from 'prop-types';

class CatalogueItem extends Component {
  constructor(props) {
    super(props);
    this.product = this.props.product;
    this.state = {
      isFavorite: isFavorite(this.props.product.id),
      images: this.props.product.images,
      currentImage: 0,
      isArrows: this.product.images.length > 1
    };
    this.clickArrow = (step, e)=>{
      e.preventDefault();
      let delta = this.state.currentImage + step;
      if(delta > this.state.images.length - 1) delta = 0;
      if(delta < 0) delta = this.state.images.length - 1;
      this.setState({currentImage: delta});
    }
    this.clickNext = this.clickArrow.bind(this,1);
    this.clickPrev = this.clickArrow.bind(this,-1);

    this.clickToggleFavorite = (e)=>{
      e.preventDefault();
      toggleFavorite(this.product.id);
      this.setState({isFavorite: isFavorite(this.props.product.id)});
    };

  }

  render() {

    return (
      <Link to={`/product-card/${this.product.id}`} className="item-list__item-card item" href="product-card-desktop.html">

        <div className="item-pic">

        <img className="item-pic-view" src={this.props.product.images[this.state.currentImage]} alt={this.props.product.title}/>

          <div onClick={this.clickToggleFavorite} className={`product-catalogue__product_favorite${isFavorite(this.props.product.id) ? '-chosen' : ''}`}>
            <p></p>
          </div>
          {this.state.isArrows && <div onClick={this.clickPrev} className="arrow arrow_left"></div>}
          {this.state.isArrows &&<div onClick={this.clickNext} className="arrow arrow_right"></div>}
        </div>
        <div className="item-desc">
          <h4 className="item-name">{this.props.product.title}</h4>
          <p className="item-producer">Производитель: <span className="producer">{this.props.product.brand}</span></p>
          <p className="item-price">{this.props.product.price.toLocaleString()}</p>
          <div className="sizes">
            <p className="sizes__title">Размеры в наличии:</p>
            <p className="sizes__avalible">33, 44, 55, 66</p>
          </div>
        </div>

      </Link>
    );
  }
}

function isFavorite(id) {
  let favorites = JSON.parse(localStorage.favorites);
  return favorites.includes(id);
}

function toggleFavorite(id) {
  id = +id;
  let favorites = JSON.parse(localStorage.favorites);
  if(favorites.includes(id)) {
    favorites.splice(favorites.findIndex(el=> el===id), 1);
  } else {
    favorites.push(id);
  }
  localStorage.favorites = JSON.stringify(favorites);
}

CatalogueItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default CatalogueItem;
