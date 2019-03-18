import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';

class SidebarItemColor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: true,
      value: ''
    };

    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'SPAN') return;
      event.preventDefault();
      this.setState({
        value: this.state.value!==event.target.textContent ? event.target.textContent : ''
      });
    }
    this.clickDrawer = ()=>{
      this.setState({isShown: !this.state.isShown});
    }

  }


  render() {
    console.log('SidebarItemCatalogue render() state===', this.state);
    return (
      <section className="sidebar__division">
        <input name='color' type='hidden' value={this.state.value} />
        <div className="sidebar__color">

          <div className="sidebar__division-title">
            <h3>Цвет</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown && <ul onClick={this.clickSubcategory}>
            <li><a className={this.state.value==='Бежевый' && 'chosen'} href="#"><div className="color beige"></div><span className="color-name">Бежевый</span></a></li>
            <li><a className={this.state.value==='Белый' && 'chosen'} href="#"><div className="color whitesnake"></div><span className="color-name">Белый</span></a></li>
            <li><a className={this.state.value==='Голубой' && 'chosen'} href="#"><div className="color shocking-blue"></div><span className="color-name">Голубой</span></a></li>
            <li><a className={this.state.value==='Жёлтый' && 'chosen'} href="#"><div className="color yellow"></div><span className="color-name">Жёлтый</span></a></li>
            <li><a className={this.state.value==='Алый' && 'chosen'} href="#"><div className="color king-crimson"></div><span className="color-name">Алый</span></a></li>
            <li><a className={this.state.value==='Фиолетовый' && 'chosen'} href="#"><div className="color deep-purple"></div><span className="color-name">Фиолетовый</span></a></li>
            <li><a className={this.state.value==='Чёрный' && 'chosen'} href="#"><div className="color black-sabbath"></div><span className="color-name">Чёрный</span></a></li>
          </ul>}

        </div>
      </section>



      );
  }
}

export default SidebarItemColor;
