import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-order.css';
import './css/style-product-card.css';

class ProductInfoSizes extends Component {
  // компонент принимает this.props.product
  constructor(props) {
    // props.sizes массив из product.sizes ; listener clickSize из родителя, чтобы прописать size в state.chosenSize ; props.chosenSize чтобы присловить <li> класс active
    super(props);
    this.state= {
    };

  }
  render() {
    console.log(`ProductInfoSizes this.props===`, this.props);
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

export default ProductInfoSizes;
