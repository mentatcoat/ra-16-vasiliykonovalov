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
import defaultCatalogueParams from './defaultCatalogueParams';
import PropTypes from 'prop-types';
import {Breadcrumbs, BreadcrumbsItem} from 'react-breadcrumbs-dynamic';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
      product: null,
      productId: null,
      mainpic: null,
      isMainPicBig: false,
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

    this.pushMainpic = (event)=> {
      this.setState({mainpic: event.target.src});
    }
    this.zoommer = (e)=>{
      e.preventDefault();
      this.setState({isMainPicBig: !this.state.isMainPicBig});
    };

    this.onClickBreadcrumbsCategory = ()=>{
      this.props.setCatalogueParams(
        Object.assign({}, defaultCatalogueParams, {'categoryId': this.state.product.categoryId})
      );
    }

    this.onClickBreadcrumbsType = ()=>{
      this.props.setCatalogueParams(
        Object.assign({}, defaultCatalogueParams, {
          'type': this.state.product.type
        })
      );
    }

  }

  initProductCard = (id) => {
    this.props.preloaderOn();
    services.fetchProduct(id)
      .then(productInfo=>{
        this.props.preloaderOff();
        this.setState({
          product:productInfo,
          productId: id,
          mainpic: productInfo.images[0],
          category: this.props.categories.find(
            el=>el.id === productInfo.categoryId
          )
        }
      );
      });
    this.makeProductOverlooked();
  }

  // ??? так верно перезагружать компонент? - в мануале по React говорится что этот метод идеален для отслеживания изменения props и как следствие вызова fetch:
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if(+this.props.match.params.id !== +prevProps.match.params.id) {
      this.initProductCard(+this.props.match.params.id);
    }
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

                  <div className="main-screen__favourite-product-pic">
                  <img className={this.state.isMainPicBig ? '' : 'zoom-out'} src={this.state.mainpic} alt="main pic"/>
                  <a href="#" onClick={this.zoommer} className="main-screen__favourite-product-pic__zoom"></a>
                </div>

                {this.state.product && <ProductInfo product={this.state.product} resetBasketPanel={this.props.resetBasketPanel}
                twinkleBasketPic={this.props.twinkleBasketPic}
                 />}

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
