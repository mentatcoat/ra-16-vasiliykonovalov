import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';

class SidebarItemSeason extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: true,
      value: ''
    };

    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'A') return;
      event.preventDefault();

      event.target.dataset.value = event.target.textContent;

      this.setState({
        value: event.target.textContent
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
        <div className="sidebar__season">

          <input name='season' type='hidden' value={this.state.value} />
          <div className="sidebar__division-title">
            <h3>Сезон</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown && <ul onClick={this.clickSubcategory}>
            <li><a href="#">Зима</a></li>
            <li><a href="#">Весна</a></li>
            <li><a href="#">Лето</a></li>
            <li><a href="#">Осень</a></li>
          </ul>}

        </div>
      </section>
    );
  }
}

export default SidebarItemSeason;
