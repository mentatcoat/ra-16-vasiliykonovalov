import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-product-card.css';
import './css/style-order.css';

import OverlookedSlider from './OverlookedSlider';
import ProductSlider from './ProductSlider';
import ProductInfo from './ProductInfo';

class ProductCard extends Component {
  // компонент принимает this.props.match.params.id и this.props.products массив всех товаров
  constructor(props) {
    super(props);
    console.log(`ProductCard this.props===`, this.props);
    this.product = this.props.products.find(product=>product.id === +this.props.match.params.id);
    this.state= {
      mainpic: this.product.images[0]
    };
    this.mainpicElement; //это ДОМ элемент главной картинки
    // mainpic - src большого фото товара
    // pushMainpic функция для задания большой фотки
    this.pushMainpic = (event)=> {
      this.setState({mainpic: event.target.src});
    }//нажимаешь на мелкое фото=>выставляеся большое
    // функция онклик Лупа - снимает класс уменьшающий размеры .zoom-out
    this.zoommer = (e)=>{
      e.preventDefault();
      this.mainpicElement.classList.toggle('zoom-out')};
  }
  render() {
    console.log('ProductCard props===', this.props);

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
                      <ProductSlider onclick={this.pushMainpic} product={this.product}  />

                      {/*<!-- Изображение выбранного товара -->*/}
                      {/*class .main-screen__favourite-product-pic img*/}

                      <div className="main-screen__favourite-product-pic">
                      <img ref={e=>this.mainpicElement=e} className='zoom-out' src={this.state.mainpic} alt="main pic"/>
                      <a href="#" onClick={this.zoommer} className="main-screen__favourite-product-pic__zoom"></a>
                    </div>

                    <ProductInfo product={this.product} />

                    {/*тут будут два слайдера */}

                  </section>
              </section>
        </main>
      </div>
    );
  }
}

export default ProductCard;
