import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';

class SidebarItemSize extends Component {
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
      });
    }
    this.clickDrawer = ()=>{
      this.setState({isShown: !this.state.isShown});
    }
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__size">

          <div className="sidebar__division-title">
            <h3>Размер</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}>
            </div>
          </div>

          {this.state.isShown && <ul onChange={this.props.onChangeFilter}>
            <div className="list-1">
              <li><label><input value={8} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">8</span></label></li>
              <li><label><input value={12} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">12</span></label></li>
              <li><label><input value={15} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">15</span></label></li>
              <li><label><input value={18} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">18</span></label></li>
            </div>
            <div className="list-2">
              <li><label><input value={10} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">10</span></label></li>
              <li><label><input value={14} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">14</span></label></li>
              <li><label><input value={16} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">16</span></label></li>
              <li><label><input value={20} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">20</span></label></li>
            </div>
          </ul>
          }

        </div>
      </section>
    );
  }
}

export default SidebarItemSize;
