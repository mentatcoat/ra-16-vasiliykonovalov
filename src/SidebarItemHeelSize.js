import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';

class SidebarItemHeelSize extends Component {
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
            <h3>Размер каблука</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}>
            </div>
          </div>

          {this.state.isShown && <ul onChange={this.props.onChangeFilter}>
            <div  className="list-1">
              <li><label><input value={1} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">1</span></label></li>
              <li><label><input value={3} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">3</span></label></li>
              <li><label><input value={5} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">5</span></label></li>
              <li><label><input value={7} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">7</span></label></li>
              <li><label><input value={9} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">9</span></label></li>
            </div>
            <div className="list-2">
              <li><label><input value={2} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">2</span></label></li>
              <li><label><input value={4} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">4</span></label></li>
              <li><label><input value={6} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">6</span></label></li>
              <li><label><input value={8} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">8</span></label></li>
              <li><label><input value={10} type="checkbox" className="checkbox" name="heelSize"/><span className="checkbox-custom"></span> <span className="label">10</span></label></li>
            </div>
          </ul>
          }

        </div>
      </section>
    );
  }
}

export default SidebarItemHeelSize;
