import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';

import Footer from './Footer';

class MainPage extends Component {

  render() {
    return (
      <div>
        {this.props.children}

      </div>
    )
  }
}

export default MainPage;
