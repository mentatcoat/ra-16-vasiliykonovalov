import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';

class SidebarItemReason extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: false,
      value: ''
    };

    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'A') return;
      event.preventDefault();
      this.setState({
        value: this.state.value!==event.target.textContent ? event.target.textContent : ''
      }, this.props.onChangeFilter);
    }
    this.clickDrawer = ()=>{
      this.setState({isShown: !this.state.isShown});
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

            <input name='reason' type='hidden' value={this.state.value} />
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

export default SidebarItemReason;
