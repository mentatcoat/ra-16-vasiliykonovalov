import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import CatalogueSidebar from './CatalogueSidebar';
import OverlookedSlider from './OverlookedSlider';
import CatalogueItem from './CatalogueItem';
import PropTypes from 'prop-types';
import services from './services';


class CataloguePagination extends Component {
  constructor(props) {
    super(props);
    console.log('CataloguePagination props===', props);
    this.state = {

    };



  }//END constructor




  render() {
    console.log('CataloguePagination render() state===', this.state);




    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">

          <div className="angle-back"><a href="#"></a></div>
          <ul>
            <li className="active"><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="">...</a></li>
            <li><a href="#">99</a></li>
          </ul>
          <div className="angle-forward"><a href="#"></a></div>

        </div>
      </div>
    );
  }
}

CataloguePagination.propTypes = {
};

export default CataloguePagination;
