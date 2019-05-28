import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';

class SidebarItemReason extends Component {
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
        this.props.onChangeParam(null, 'reason', event.target.textContent);
      } else {
        this.props.onChangeParam(null, 'reason', '');
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
        <div className="sidebar__occasion">


          <div className="sidebar__division-title">
            <h3>Повод</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown &&
            <div>

            <ul onClick={this.clickSubcategory}>
            <li><a className={this.state.value==='Офис' && 'chosen'} href="#">Офис</a></li>
            <li><a className={this.state.value==='Вечеринка' && 'chosen'} href="#">Вечеринка</a></li>
            <li><a className={this.state.value==='Свадьба' && 'chosen'} href="#">Свадьба</a></li>
            <li><a className={this.state.value==='Спорт' && 'chosen'} href="#">Спорт</a></li>
            <li><a className={this.state.value==='Путешествие' && 'chosen'} href="#">Путешествие</a></li>
            <li><a className={this.state.value==='Свидание' && 'chosen'} href="#">Свидание</a></li>
            <li><a className={this.state.value==='Дома' && 'chosen'} href="#">Дома</a></li>
            <li><a className={this.state.value==='Произвести впечатление' && 'chosen'} href="#">Произвести впечатление</a></li>
          </ul>

          </div>
        }

        </div>
      </section>
    );
  }
}

SidebarItemReason.propTypes = {
  onChangeParam: PropTypes.func.isRequired
};

export default SidebarItemReason;
