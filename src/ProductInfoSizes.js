import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';
import './css/style-product-card.css';
import PropTypes from 'prop-types';

class ProductInfoSizes extends Component {
  constructor(props) {
    super(props);
    this.state= {
    };

  }
  render() {
    return (
      <div>
        <p className="size">Размер</p>
        <ul onClick={this.props.onclick} className="sizes">
            {this.props.sizes.map(
              elem=>{
                return <li key={elem.size} className={parseInt(elem.size, 10) === this.props.chosenSize ? 'active' : ''}><a href="#">{parseInt(elem.size, 10)}</a></li>
              }
            )}
        </ul>
        <div className="size-wrapper">
        <a href="#"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
        </div>
      </div>
    );
  }
}

ProductInfoSizes.propTypes = {
  chosenSize: PropTypes.number.isRequired,
  sizes: PropTypes.array.isRequired,
  onclick: PropTypes.func.isRequired
};

export default ProductInfoSizes;
