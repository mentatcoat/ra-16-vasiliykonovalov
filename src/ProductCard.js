import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-product-card.css';
import './css/style-order.css';

import OverlookedSlider from './OverlookedSlider';
import SimilarSlider from './SimilarSlider';
import ProductSlider from './ProductSlider';
import ProductInfo from './ProductInfo';
import services from './services';
import PropTypes from 'prop-types';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
      mainpic: null,
      product: null
    };

    this.makeProductOverlooked = ()=>{
      if (!sessionStorage.overlooked) {
        let array = [+this.props.match.params.id];
        sessionStorage.overlooked = JSON.stringify(array);
      } else {
        let array = JSON.parse(sessionStorage.overlooked);
        if (array.includes(+this.props.match.params.id)) {
          return;
        } else {
          array.push(+this.props.match.params.id);
          sessionStorage.overlooked = JSON.stringify(array);
        }
      }
    };

    this.init = (id)=>{
      services.fetchProduct(id)
        .then(productInfo=>{
          this.setState({product:productInfo});
          this.setState({mainpic: productInfo.images[0]});
        });
        this.makeProductOverlooked();
    }
    this.init(+this.props.match.params.id);

    this.mainpicElement;
    this.pushMainpic = (event)=> {
      this.setState({mainpic: event.target.src});
    }
    this.zoommer = (e)=>{
      e.preventDefault();
      this.mainpicElement.classList.toggle('zoom-out')};
  }
  shouldComponentUpdate(nextProps, nextState){
    if(this.props.match.params.id !== nextProps.match.params.id) {
      this.init(+nextProps.match.params.id);
      // ??? Правильно ли использовать подобныеы init() функции, которые при обновлении props обновляют ключевые параметры компонента?
      return true;
    }
    if(this.state !== nextState) return true;
  }
  render() {
    return (
      <div>
        <div className="site-path">
          <ul className="site-path__items">
            <li className="site-path__item"><a href="index.html">Главная</a></li>
            <li className="site-path__item"><a href="#">Женская обувь</a></li>
            <li className="site-path__item"><a href="#">Ботинки</a></li>
            <li className="site-path__item"><a href="#">Ботинки женские</a></li>
          </ul>
        </div>

        <main className="product-card">
              <section className="product-card-content">
                  <h2 className="section-name">Ботинки женские</h2>
                  <section className="product-card-content__main-screen">

                      {/*<!-- Слайдер выбранного товара -->*/}
                      {this.state.product && <ProductSlider onclick={this.pushMainpic} product={this.state.product}  />}

                      {/*<!-- Изображение выбранного товара -->*/}
                      {/*class .main-screen__favourite-product-pic img*/}

                      <div className="main-screen__favourite-product-pic">
                      <img ref={e=>this.mainpicElement=e} className='zoom-out' src={this.state.mainpic} alt="main pic"/>
                      <a href="#" onClick={this.zoommer} className="main-screen__favourite-product-pic__zoom"></a>
                    </div>

                    {this.state.product && <ProductInfo product={this.state.product} />}

                    {/*тут будут два слайдера */}

                  </section>
              </section>
        </main>

        <OverlookedSlider match={this.props.match} />

        {this.state.product && <SimilarSlider product={this.state.product}/>}


      </div>
    );
  }
}

ProductCard.propTypes = {
  match: PropTypes.object.isRequired
};

export default ProductCard;
