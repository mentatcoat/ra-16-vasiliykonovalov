import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';
import SidebarListItem from './SidebarListItem';

class SidebarItemColor extends Component {
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
        this.props.onChangeParam(null, 'color', event.target.textContent);
      } else {
        this.props.onChangeParam(null, 'color', '');
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
    let {items} = this.props;
    if(!items) return null;

    return (
      <section className="sidebar__division">

        <div className="sidebar__color">

          <div className="sidebar__division-title">
            <h3>Цвет</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown &&
            <div>

            <ul onClick={this.clickSubcategory}>

              {items.map(
                elem=>
                <SidebarListItem
                key={elem}
                elem={elem}
                chosen={elem === this.state.value ? true: false}
                showColor
                />
              )}

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
