import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';

class SidebarItemCatalogue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: true,
      value: ''
    };

    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'A') return;
      event.preventDefault();
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

              <input name='type' type='hidden' value={this.state.value} />
              <div className="sidebar__catalogue-list">

                <div className="sidebar__division-title">
                  <h3>Каталог</h3>
                  <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
                </div>

                {this.state.isShown && <ul onClick={this.clickSubcategory}>
                  <li><a href="#">Балетки</a></li>
                  <li><a href="#">Босоножки и сандалии</a></li>
                  <li><a href="#">Ботильоны</a></li>
                  <li><a href="#">Ботинки</a></li>
                  <li><a href="#">Ботфорты</a></li>
                  <li><a href="#">Галоши</a></li>
                  <li><a href="#">Тапочки</a></li>
                  <li><a href="#">Туфли</a></li>
                  <li><a href="#">Сапоги</a></li>
                </ul>}




              </div>




            </section>

          );
  }
}

export default SidebarItemCatalogue;
