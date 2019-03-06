import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import services from './services';

class NewDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featured: '',
      categories: false,
      chosenCategory: '',
      first: 0,
      filtered: []
    };
    this.activeProduct;
    // вызываем сервис получения новинок:
    services.fetchFeatured((data)=>{
      this.setState({featured: data.data},this.categoriseFeatured);
      console.log('NewDeals fetch data===', data.data);
    });
    services.fetchCategories((data)=>{
      this.setState({categories: data.data});
      //ниже загружаем вторую Категорию как выбранную по умолнчанию, т к в ней есть продукты:
      this.setState({chosenCategory: data.data[1].id}, this.categoriseFeatured);
      console.log('NewDeals fetch data===', data.data);
    });
    // когда мы выберем категоию, у нас профильтруется массив НОВИНОК для рендера в слайдер
    this.clickCategory = (event)=> {
      event.preventDefault();
      this.setState({chosenCategory: event.target.dataset.id}, this.categoriseFeatured);
    };
    this.toggleFavorite = (event)=>{
      event.target.classList.toggle('new-deals__product_favorite_chosen')
      services.toggleFavorite(event.target.dataset.id);

    };
    // функция фильтрует НОВИНКИ под выбранную категорию
    this.categoriseFeatured = ()=>{
      if(!this.state.featured) return;
      this.setState({filtered: this.state.featured.filter(el=> el.categoryId == this.state.chosenCategory)});
      console.log('categorise() filtered===', this.state.filtered);
    };
    this.counter;
    // функция для кликов по стрелкам:
    this.clickArrow = (step)=>{
      console.log('clickArrow() before state.first===', this.state.first);
      let delta = this.state.first + step;
      if(delta > this.state.filtered.length - 1) delta = 0;
      if(delta < 0) delta = this.state.filtered.length - 1;
      this.setState({first: delta});
    }
    this.clickNext = this.clickArrow.bind(this,1);
    this.clickPrev = this.clickArrow.bind(this,-1);
    // функция для прокрутки индекса массива по кругу, первое значение приходит от стрелки, задается в render()
    this.routIndex = ()=> {
      if (this.counter > this.state.filtered.length - 1) this.counter = 0;
      return this.counter++;
    };
  }//END constructor

  render() {
    console.log('NewDeals render() state.chosenCategory===', this.state.chosenCategory);
    console.log('NewDeals render() state.featured===', this.state.featured);
    let favorites = JSON.parse(localStorage.favorites);
    console.log('NewDeals render() favorites===',favorites);

    this.activeProduct = '';

    //массив продуктов который будет отобразаться на странице:
    let show = [];
    let amount = this.state.filtered.length;
    if(amount>3) amount = 3;
    // тут должна быть функция для определния следующего индекса
    this.counter = this.state.first;
    for(let i = 0; i<amount; i++) {
      show.push(this.state.filtered[this.routIndex()]);
    }
    console.log('this.state.filtered===', this.state.filtered);

    return (
      <section className="new-deals wave-bottom">
        <h2 className="h2">Новинки</h2>

        <div className="new-deals__menu">
          <ul className="new-deals__menu-items">
            {this.state.categories && this.state.categories.map(
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
                console.log('elem1');
                this.activeProduct = elem;
                return (<div key={elem.id} style={{backgroundImage: `url(${elem.images[0]})`}} className="new-deals__product new-deals__product_active">
                    <Link to={`/product-card/${elem.id}`}/>
                    <div onClick={this.toggleFavorite} data-id={elem.id} className={`new-deals__product_favorite ${favorites.includes(elem.id) && 'new-deals__product_favorite_chosen'}`}></div>
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

export default NewDeals;
