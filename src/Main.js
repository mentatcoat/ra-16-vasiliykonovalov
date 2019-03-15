import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import Slider from './Slider';
import Sales from './Sales';
import AboutUs from './AboutUs';
import Footer from './Footer';
import NewDeals from './NewDeals';

class Main extends Component {

  render() {
    return (
      <div>
        <Slider />
        <NewDeals />
        <Sales />
        <AboutUs />
      </div>
    )
  }
}

export default Main;
