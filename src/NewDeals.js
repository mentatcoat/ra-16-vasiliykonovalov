import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import services from './services';
import toggleFavorite from './toggleFavorite';
import PropTypes from 'prop-types';

class NewDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {

      //??? верно так? - оставил в state, только то что меняется:
      chosenCategory: '',
      first: 0,
      filtered: []
    };


    this.featured;
    this.categories;
    this.activeProduct;

    this.props.preloaderOn();
    services.fetchFeatured()
      .then(
        (data)=>{
          this.props.preloaderOff();

          this.featured = data.data;
          this.categoriseFeatured();
      });

    services.fetchCategories()
      .then((data)=>{
        this.categories = data.data;
        this.setState({chosenCategory: data.data[1].id});
        this.categoriseFeatured();
    });

    this.clickCategory = (event)=> {
      event.preventDefault();
      this.setState({chosenCategory: event.target.dataset.id}, this.categoriseFeatured);
    };

    this.clickToggleFavorite = (event)=>{
      event.target.classList.toggle('new-deals__product_favorite_chosen')
      toggleFavorite(event.target.dataset.id);

    };

    this.categoriseFeatured = ()=>{
      if(!this.featured) return;
      this.setState({filtered: this.featured.filter(el=> el.categoryId == this.state.chosenCategory)});
    };

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
    let favorites = JSON.parse(localStorage.favorites);

    this.activeProduct = '';

    let show = [];
    let amount = this.state.filtered.length;
    if(amount>3) amount = 3;
    this.counter = this.state.first;
    for(let i = 0; i<amount; i++) {
      show.push(this.state.filtered[this.routIndex()]);
    }

    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>

        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            {this.categories && this.categories.map(
              category=>{
                return <li key={category.id}  className={`new-deals__menu-item ${+this.state.chosenCategory === +category.id && 'new-deals__menu-item_active'}`}>
                  <a onClick={this.clickCategory} data-id={category.id} href="#">{category.title}</a>
                </li>;
              }
            )}
          </ul>
        </div>

        {show.length !==0 && (

          <div className="new-deals__slider">

          {this.state.filtered.length>3 && <div onClick={this.clickPrev} className="new-deals__arrow new-deals__arrow_left arrow"></div>}

          {show.map(
            (elem, i, array)=>{
              if(i===1 || (i===0 && array.lengh===1)){
                this.activeProduct = elem;
                return (<div key={elem.id} style={{backgroundImage: `url(${elem.images[0]})`}} className="new-deals__product new-deals__product_active">
                    <Link to={`/product-card/${elem.id}`}/>
                    <div onClick={this.clickToggleFavorite} data-id={elem.id} className={`new-deals__product_favorite ${favorites.includes(elem.id) && 'new-deals__product_favorite_chosen'}`}></div>
                  </div>);
              } else if(i===2 || i===0) {
                return (<div key={elem.id} style={{backgroundImage: `url(${elem.images[0]})`,backgroundSize: 'contain'}} className="new-deals__product new-deals__product_first">
                  <Link to={`/product-card/${elem.id}`}/>
                </div>)
              }
              }
          )}

          {this.state.filtered.length>3 && <div onClick={this.clickNext} className="new-deals__arrow new-deals__arrow_right arrow"></div>}

        </div>

        )}

        {this.activeProduct && <div className="new-deals__product-info">
          <Link to={`/product-card/${this.activeProduct.id}`} className="h3">{this.activeProduct.title}</Link>
          <p>Производитель:
            <span> {this.activeProduct.brand}</span>
          </p>
          <h3 className="h3">{(this.activeProduct.price).toLocaleString()} ₽</h3>
        </div>}

      </section>
    )
  }
}

// function toggleFavorite(id) {
//   id = +id;
//   let favorites = JSON.parse(localStorage.favorites);
//   if(favorites.includes(id)) {
//     favorites.splice(favorites.findIndex(el=> el===id), 1);
//   } else {
//     favorites.push(id);
//   }
//   localStorage.favorites = JSON.stringify(favorites);
// }

NewDeals.propTypes = {};

export default NewDeals;
