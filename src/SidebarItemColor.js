import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';

class SidebarItemColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      value: this.props.value
    };

    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'SPAN') return;
      event.preventDefault();

      if(this.state.value!==event.target.textContent) {
        this.props.onChangeParam(null, 'color', event.target.textContent);
      } else {
        this.props.onChangeParam(null, 'color', '');
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

        <div className="sidebar__color">

          <div className="sidebar__division-title">
            <h3>Цвет</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown &&
            <div>

            {/*<input name='color' type='hidden' value={this.state.value} />*/}
            <ul onClick={this.clickSubcategory}>
              <li><a className={this.state.value==='Бежевый' && 'chosen'} href="#"><div className="color beige"></div><span className="color-name">Бежевый</span></a></li>
              <li><a className={this.state.value==='Белый' && 'chosen'} href="#"><div className="color whitesnake"></div><span className="color-name">Белый</span></a></li>
              <li><a className={this.state.value==='Голубой' && 'chosen'} href="#"><div className="color shocking-blue"></div><span className="color-name">Голубой</span></a></li>
              <li><a className={this.state.value==='Жёлтый' && 'chosen'} href="#"><div className="color yellow"></div><span className="color-name">Жёлтый</span></a></li>
              <li><a className={this.state.value==='Алый' && 'chosen'} href="#"><div className="color king-crimson"></div><span className="color-name">Алый</span></a></li>
              <li><a className={this.state.value==='Фиолетовый' && 'chosen'} href="#"><div className="color deep-purple"></div><span className="color-name">Фиолетовый</span></a></li>
              <li><a className={this.state.value==='Чёрный' && 'chosen'} href="#"><div className="color black-sabbath"></div><span className="color-name">Чёрный</span></a></li>
            </ul>

            </div>
        }

        </div>
      </section>
      );
  }
}

SidebarItemColor.propTypes = {
  onChangeParam: PropTypes.func.isRequired
};

export default SidebarItemColor;
