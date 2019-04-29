import React, { Component } from 'react';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import sliderimg from './img/slider.jpg';
import sliderimg180 from './img/slider180deg.jpeg';
import sliderFunction from './js/slider';

class Slider extends Component {
  componentDidMount() {
    sliderFunction();
  }

  render() {
    return (
      <section className="slider">
        <div className="wrapper">
          <div className="slider__pictures">
            <a className="slider__image" href="#">
              <img src={sliderimg} alt="slide picture"/>
            </a>
            <a className="slider__image" href="#">
              <img src={sliderimg180} alt="slide picture"/>
            </a>
            <a className="slider__image" href="#">
              <img src={sliderimg} alt="slide picture"/>
            </a>
            <a className="slider__image" href="#">
              <img src={sliderimg180} alt="slide picture"/>
            </a>
            <div className="arrow slider__arrow slider__arrow_left"></div>
            <div className="arrow slider__arrow slider__arrow_right"></div>
            <div className="slider__circles">
              <button className="slider__circle" value="0"></button>
              <button className="slider__circle" value="1"></button>
              <button className="slider__circle" value="2"></button>
              <button className="slider__circle" value="3"></button>
            </div>
            <h2 className="h2">К весне готовы!</h2>
          </div>
        </div>
      </section>
    )
  }
}

Slider.propTypes = {
};

export default Slider;
