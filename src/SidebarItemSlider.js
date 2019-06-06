import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import './css/style-new-nouislider.css';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import debounce from './debounce';
import services from './services';
import PropTypes from 'prop-types';

class SidebarItemSlider extends Component {
  constructor(props) {
    super(props);
    this.DOMslider = null;
    this.state = {
      isShown: false,
      value: '',
      minPrice: '0',
      maxPrice: '100000',
      categoryMaxPrice: this.props.categoryMaxPrice
    };
    this.shouldCreateSlider = true;
    this.debouncedOnChangeParamMin = debounce( this.props.onChangeParam, 2000);
    this.debouncedOnChangeParamMax = debounce( this.props.onChangeParam, 2000);

    this.clickSubcategory = (event)=>{
      if(event.target.tagName !== 'A') return;
      event.preventDefault();
      this.setState({
        value: this.state.value!==event.target.textContent ? event.target.textContent : ''
      });
    }
    this.clickDrawer = ()=>{
      if (!this.state.isShown) {
        this.shouldCreateSlider = true;
        this.setState({
          isShown: !this.state.isShown,
        });
      } else {
        this.setState({isShown: !this.state.isShown});
      }
    }

    this.onChangeSlider = (values)=>{
      let minMax = [];
      values = values.map((value, index)=>{
        minMax[index] = Number.parseInt(value, 10);
        return minMax[index].toLocaleString();
      });
      // эти идут в фильтр:
      this.minPrice = minMax[0];
      this.maxPrice = minMax[1];
      this.setState({
        minPrice: values[0],
        maxPrice: values[1]
      });

      this.debouncedOnChangeParamMin(null, 'minPrice', minMax[0]);
      this.debouncedOnChangeParamMax(null, 'maxPrice', minMax[1]);

    };

    this.noUiSliderClasses = {
            target: "nus_target",
            base: "base",
            origin: "origin",
            handle: "nus_handle",
            handleLower: "handle-lower",
            handleUpper: "handle-upper",
            touchArea: "touch-area",
            horizontal: "nus_horizontal",
            vertical: "vertical",
            background: "background",
            connect: "nus_connect",
            connects: "connects",
            ltr: "ltr",
            rtl: "rtl",
            draggable: "draggable",
            drag: "state-drag",
            tap: "state-tap",
            active: "active",
            tooltip: "tooltip",
            pips: "pips",
            pipsHorizontal: "pips-horizontal",
            pipsVertical: "pips-vertical",
            marker: "marker",
            markerHorizontal: "marker-horizontal",
            markerVertical: "marker-vertical",
            markerNormal: "marker-normal",
            markerLarge: "marker-large",
            markerSub: "marker-sub",
            value: "value",
            valueHorizontal: "value-horizontal",
            valueVertical: "value-vertical",
            valueNormal: "value-normal",
            valueLarge: "value-large",
            valueSub: "value-sub"
        };
  }

  createSlider() {
    if(this.state.isShown && this.shouldCreateSlider) {
        this.DOMslider = document.getElementById('priceSlider');

      noUiSlider.create(this.DOMslider, {
          start: [this.minPrice || 0, this.maxPrice || 1000000],
          connect: [false, true, false],
          range: {
              'min': 0,
              'max': this.state.categoryMaxPrice || 100000
          },
          step: 100,
          cssClasses: this.noUiSliderClasses
        }
      );
      this.DOMslider.noUiSlider.on('slide', this.onChangeSlider);
      this.shouldCreateSlider = false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.categoryMaxPrice !== prevProps.categoryMaxPrice) {
      this.setState({
        maxPrice: this.props.categoryMaxPrice.toLocaleString(),
        categoryMaxPrice: this.props.categoryMaxPrice
      }, this.createSlider);
    }
    this.createSlider();
  }

  render() {
    return (
      <section className="sidebar__division">

        <div className="sidebar__price">

          <div className="sidebar__division-title">
            <h3>Цена</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown &&
            <div className="sidebar__division__noUiSlider">
              <section  id='priceSlider' >
              </section>

              <div className="counter">
                <input form='123' name='minPrice' type="text" className="input-1" value={this.state.minPrice}/>
                <div className="input-separator"></div>
                <input form='123' name='maxPrice' type="text" className="input-2" value={this.state.maxPrice || this.state.categoryMaxPrice}/>
              </div>

            </div>
          }

        </div>
      </section>
    );
  }
}

SidebarItemSlider.propTypes = {
  onChangeFilter: PropTypes.func.isRequired
};

export default SidebarItemSlider;
