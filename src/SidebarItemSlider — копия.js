import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
// import './css/style-noUiSlider.css';
import './css/style-new-nouislider.css';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

class SidebarItemSlider extends Component {
  constructor(props) {
    super(props);

    this.slider = null;
    this.state = {
      isShown: true,
      value: '',
      minPrice: '1 000',
      maxPrice: '10 000'
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
    this.onChangeSlider = (values)=>{
      console.log('onChangeSlider() values===', values);
      values = values.map(value=>
        Number.parseInt(value, 10).toLocaleString());
      this.setState({
        minPrice: values[0],
        maxPrice: values[1]
      });


    };



  }//END constructor

  componentDidMount() {
    console.log('noUiSlider===', noUiSlider);

    this.slider = document.getElementById('priceSlider');

    noUiSlider.create(this.slider, {
        start: [1000, 10000],
        connect: [false, true, false],
        range: {
            'min': 0,
            'max': 50000
        },
        step: 100,
        cssClasses: {
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
            }
      }
    );
    this.slider.noUiSlider.on('slide', this.onChangeSlider);




  }//END componentDidMount


  render() {
    console.log('SidebarItemSlider render() state===', this.state);


    return (
      <section className="sidebar__division">
        <div className="sidebar__price">

          {/*<input name='season' type='hidden' value={this.state.value} />*/}
          <div className="sidebar__division-title">
            <h3>Цена</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}></div>
          </div>

          {this.state.isShown &&
            <div className="sidebar__division__noUiSlider">
              <section  id='priceSlider' >
              </section>

              <div className="counter">
                <input name='minPrice' type="text" className="input-1" value={this.state.minPrice}/>
                <div className="input-separator"></div>
                <input name='maxPrice' type="text" className="input-2" value={this.state.maxPrice}/>
              </div>

            </div>
          }

        </div>
      </section>
    );
  }
}

export default SidebarItemSlider;
