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


    // this.initProductCard = (id)=>{
    //   console.log('init() in ProductCard');
    //   services.fetchProduct(id)
    //     .then(productInfo=>{
    //       this.setState({
    //         product:productInfo,
    //         mainpic: productInfo.images[0],
    //         category: this.props.categories.find(
    //           el=>el.id === productInfo.categoryId
    //         )
    //       });
    //     });
    //     this.makeProductOverlooked();
    // }

    this.initProductCard(+this.props.match.params.id);

    // ??? Так как нельзя использовать shouldComponentUpdate я решил использовать history.listen ниже. Верный такой подход?

    // this.props.history.listen((location, action)=>{
    //   console.log('history.listen loc===', location);
    //   console.log('history.listen act ===', action);
    //   console.log('history.listen param ===', this.props.match.params.id);
    //
    //
    //
    //   this.initProductCard(+this.props.match.params.id);
    //
    //
    // }

    // );

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
    // ??? Я выбирал между двумя альтернативами: 1) сделать хлебные крошки так, чтобы они выводили параметры фильтра в url страниы 2) сделать хлебные крошки так, чтобы они имели onclick-слушатели и слушатели уже запускали фильтрацию на странице КАТАЛОГ. Я быврал второй вариант, т к код уже имел для этого необходимые методы. Делают ли воодще на практике так - навешивают на хлебные крошки onclick-слушатели?

  }//END constructor

  // shouldComponentUpdate(nextProps, nextState){
  //   if(this.props.match.params.id !== nextProps.match.params.id) {
  //     this.init(+nextProps.match.params.id);
  //     // ??? Правильно ли использовать подобныеы init() функции, которые при обновлении props обновляют ключевые параметры компонента?
  //     return true;
  //   }
  //   if(this.state !== nextState) return true;
  // }

  initProductCard(id) {
    console.log('init() in ProductCard id===', id);
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
        services.initProductInfo && services.initProductInfo(productInfo)
        ,
        services.initProductSlider && services.initProductSlider(productInfo)
      );
      });
    this.makeProductOverlooked();
  }

  render() {
    console.log('ProductCard render() props===', this.props);
    console.log('ProductCard render() state===', this.state);
    console.log('ProductCard render() history.listen===', this.props.history.listen);

    // ??? это верный подход для перезагрузки стейта компонента?
    if(+this.props.match.params.id !== this.state.productId) {
      this.initProductCard(+this.props.match.params.id);

    }


    // ??? Ниже есть элемент <BreadcrumbsItem/> - это компонент-посредник, он принимает атрибудты и передает их в элемент, который будет отрендерен в качесвте хлебной-крошки-ссылки. Этот комопонент-посредник передает любые атрибуты в конечный элемент. Я передавал туда атрибут 'data-category'. Отрисованный элемент <a> получал этот дата-атрибут и показывал его в свойстве 'dataset'.  Но почему то когда я обращался к <a> как к 'event.target.dataset.category' выводилось undefined - то есть не читалось именно последнее свойство в записи - '.category'. Почему так?
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
                  <h2 className="section-name">{this.state.product && this.state.product.title}</h2>
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
