import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
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
import helpers from './helpers';
import PropTypes from 'prop-types';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
      productId: null,
      mainpic: null,
      product: null,
      category: null
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

    this.initProductCard(+this.props.match.params.id);

    this.mainpicElement;
    this.pushMainpic = (event)=> {
      this.setState({mainpic: event.target.src});
    }
    this.zoommer = (e)=>{
      e.preventDefault();
      this.mainpicElement.classList.toggle('zoom-out')
    };

    this.onClickBreadcrumbsCategory = ()=>{
      let params;
      if(this.state.product) {
        params = [
          ['categoryId', this.state.product.categoryId],
        ];
      }
      this.props.setCatalogueParams(params);
    }

    this.onClickBreadcrumbsType = ()=>{
      let params;
      if(this.state.product) {
        params = [
          ['categoryId', this.state.product.categoryId],
          ['type', this.state.product.type]
        ];
      }
      this.props.setCatalogueParams(params);
    }

    helpers.initProductCard = this.initProductCard;

  }

  initProductCard = (id) => {
    services.fetchProduct(id)
      .then(productInfo=>{
        this.setState({
          productId: id,
          product:productInfo,
          mainpic: productInfo.images[0],
          category: this.props.categories.find(
            el=>el.id === productInfo.categoryId
          )
        }
        ,
        helpers.initProductInfo && helpers.initProductInfo(productInfo)
        ,
        helpers.initProductSlider && helpers.initProductSlider(productInfo)
        ,
        helpers.initSimilarSlider && helpers.initSimilarSlider(productInfo)
      );
      });
    this.makeProductOverlooked();
  }

  render() {

    return (
      <div>

        <Breadcrumbs
          item={Link}
          container={'div'}
          containerProps={{
            className: 'site-path__items'
          }}
          finalItem={'span'}
          finalProps={{
            className: 'site-path__item',
            onClick: null
          }}
        />

        <BreadcrumbsItem
          to='/'
          className='site-path__item'
        >
          Главная
        </BreadcrumbsItem>

        <BreadcrumbsItem
         to='/catalogue'
         className='site-path__item'
         onClick={this.onClickBreadcrumbsCategory}
        >
         {this.state.product && this.state.category.title}
        </BreadcrumbsItem>

        <BreadcrumbsItem
         to='/catalogue/'
         className='site-path__item'
         onClick={this.onClickBreadcrumbsType}
        >
         {this.state.product && this.state.product.type}
        </BreadcrumbsItem>

        <BreadcrumbsItem
          to='/fourth/fifth'
        >
         {this.state.product && this.state.product.title}
        </BreadcrumbsItem>


        <main className="product-card">
              <section className="product-card-content">
                  <h2 className="product-card_section-name">{this.state.product && this.state.product.title}</h2>
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
  match: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  setCatalogueParams: PropTypes.func
};

export default ProductCard;
