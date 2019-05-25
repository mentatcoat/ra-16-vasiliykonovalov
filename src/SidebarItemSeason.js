import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import services from './services';
import PropTypes from 'prop-types';

class SidebarItemSeason extends Component {
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
        this.props.onChangeParam(null, 'season', event.target.textContent);
      } else {
        this.props.onChangeParam(null, 'season', '');
      }

      // this.setState({
      //   value: this.state.value!==event.target.textContent ? event.target.textContent : ''
      // }, this.props.onChangeFilter);
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
        <div className="sidebar__season">


          <div className="sidebar__division-title">
            <h3>Сезон</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown &&
            <div>

            {/*<input name='season' type='hidden' value={this.state.value} />*/}
            <ul onClick={this.clickSubcategory}>
            <li><a className={this.state.value==='Зима' && 'chosen'} href="#">Зима</a></li>
            <li><a className={this.state.value==='Весна' && 'chosen'} href="#">Весна</a></li>
            <li><a className={this.state.value==='Лето' && 'chosen'} href="#">Лето</a></li>
            <li><a className={this.state.value==='Осень' && 'chosen'} href="#">Осень</a></li>
          </ul>

            </div>
            }

        </div>
      </section>
    );
  }
}

SidebarItemSeason.propTypes = {
  onChangeParam: PropTypes.func.isRequired
};

export default SidebarItemSeason;
