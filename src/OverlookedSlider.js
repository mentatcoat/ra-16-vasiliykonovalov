import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import services from './services';
import JSONproducts from './data/products.json';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

//!!! закинули в sessionStorage просмотренные id (это временный код для разработки)
let overlookedIds = [20, 21, 22,23,24,25,26,27,28,29,30,31,32,33,34,35];
sessionStorage.overlooked = JSON.stringify(overlookedIds);

class OverlookedSlider extends Component {
  constructor(props) {
    // console.log('OverlookedSlider got props===', props);
    super(props);
    this.state = {
      overlooked: sessionStorage.overlooked ?
      JSON.parse(sessionStorage.overlooked) : [],
      first: 0,
      filtered: null,
      page: ''
    }
    // это переменная массив из которой мы удаляем текущий товар, если мы находимся в ProductCard
    this.filteredOverlooked = this.state.overlooked;
    // console.log('firstly filteredOverlooked===', this.filteredOverlooked
    // );
    this.getProductsInfo = ()=>{
      // console.log('getProductsInfo this.state===', this.state);
      const productsArray = [];
      //если мы не в Catalogue то мы вырезаем просматриваемый товар
      if(!/^\/catalogue/.test(this.props.match.path)) {
        // console.log('regExp ===',/^\/catalogue/.test(this.props.match.path));

        this.filteredOverlooked.splice(this.filteredOverlooked.findIndex(id=>id===+this.props.match.params.id),1);
        // console.log('spliced filteredOverlooked===', this.filteredOverlooked);
      }

      this.filteredOverlooked.slice(-10).forEach(
        id=>productsArray.push(services.fetchProduct(id))
      );
      Promise.all(productsArray)
        .then(results=>{
          // console.log('Promise.all results===',results);
          this.setState({filtered: results});
        });
    };//END getProductsInfo()
    this.getProductsInfo();

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
  }

  render() {
    // console.log('OverlookedSlider render() this.state===', this.state);
    if(this.state.overlooked.length === 0) return null;
    if(!this.state.filtered) return null;

    let show = [];
    let amount = this.state.filtered.length;
    if(amount>5) amount = 5;
    this.counter = this.state.first;
    for(let i = 0; i<amount; i++) {
      show.push(this.state.filtered[this.routIndex()]);
    }

    // console.log('OverlookedSlider() render() filtered===', this.state.filtered);
    // console.log('OverlookedSlider() render() show===', show);

    // console.log('BrowserRouter===', BrowserRouter);
    return (
        <section className="product-catalogue__overlooked-slider">
          <h3>Вы смотрели:</h3>
          <div className="overlooked-slider" style={{
            justifyContent: 'center'}}>

            {this.state.filtered.length > 5 && <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={this.clickPrev}></div>}

            {show.map(
              product=>(
                <div key={product.id} className="overlooked-slider__item" style={{backgroundImage: `url(${product.images[0]})`}}>
                  <Link to={`/product-card/${product.id}`} ></Link>
                </div>
              )
            )
            }

            {this.state.filtered.length > 5 && <div onClick={this.clickNext} className="overlooked-slider__arrow overlooked-slider__arrow_right arrow"></div>}
          </div>
        </section>
    );
  }
}

OverlookedSlider.propTypes = {
  match: PropTypes.object.isRequired
};

export default OverlookedSlider;
