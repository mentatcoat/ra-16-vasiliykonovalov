import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';

class SidebarItemCatalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      value: this.props.value
    };

    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'A') return;
      event.preventDefault();

      if(this.state.value!==event.target.textContent) {
        this.props.onChangeParam(null, 'type', event.target.textContent);
      } else {
        this.props.onChangeParam(null, 'type', '');
      }
    }

    this.clickDrawer = ()=>{
      this.setState({isShown: !this.state.isShown});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.value !== prevProps.value) {
      this.setState({value: this.props.value});
    }
  }

  render() {
    return (
      <section className="sidebar__division">

              <div className="sidebar__catalogue-list">

                <div className="sidebar__division-title">
                  <h3>Каталог</h3>
                  <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
                </div>

                {this.state.isShown &&
                  <div>

                  <ul onClick={this.clickSubcategory}>
                  <li><a className={this.state.value==='Балетки' && 'chosen'} href="#">Балетки</a></li>
                  <li><a className={this.state.value==='Босоножки и сандалии' && 'chosen'} href="#">Босоножки и сандалии</a></li>
                  <li><a className={this.state.value==='Ботильоны' && 'chosen'} href="#">Ботильоны</a></li>
                  <li><a className={this.state.value==='Ботинки' && 'chosen'} href="#">Ботинки</a></li>
                  <li><a className={this.state.value==='Ботфорты' && 'chosen'} href="#">Ботфорты</a></li>
                  <li><a className={this.state.value==='Галоши' && 'chosen'} href="#">Галоши</a></li>
                  <li><a className={this.state.value==='Тапочки' && 'chosen'} href="#">Тапочки</a></li>
                  <li><a className={this.state.value==='Туфли' && 'chosen'} href="#">Туфли</a></li>
                  <li><a className={this.state.value==='Сапоги' && 'chosen'} href="#">Сапоги</a></li>
                </ul>

                </div>
                }

              </div>

            </section>
          );
  }
}

SidebarItemCatalogue.propTypes = {
  onChangeParam: PropTypes.func.isRequired
};

export default SidebarItemCatalogue;
