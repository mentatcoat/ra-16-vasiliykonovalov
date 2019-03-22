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
    console.log('SidebarItemSize render() state===', this.state);
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
              <li><label><input value={31} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">31</span></label></li>
              <li><label><input value={33} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">33</span></label></li>
              <li><label><input value={35} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">35</span></label></li>
              <li><label><input value={37} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">37</span></label></li>
              <li><label><input value={39} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">39</span></label></li>
            </div>
            <div className="list-2">
              <li><label><input value={32} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">32</span></label></li>
              <li><label><input value={34} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">34</span></label></li>
              <li><label><input value={36} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">36</span></label></li>
              <li><label><input value={38} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">38</span></label></li>
              <li><label><input value={40} type="checkbox" className="checkbox" name="size"/><span className="checkbox-custom"></span> <span className="label">40</span></label></li>
            </div>
          </ul>
          }

        </div>
      </section>
    );
  }
}

export default SidebarItemSize;
