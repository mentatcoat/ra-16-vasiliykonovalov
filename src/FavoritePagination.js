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
import CataloguePagination from './CataloguePagination';
import PropTypes from 'prop-types';
import services from './services';

function FavoritePagination(props) {
  // ??? не затратно придумывать такую функцию-прослойку? Может лучше приспособить входящую функцию props.onChangeCurrentPage?
  function onChangeParam(x, y, page) {
    props.onChangeCurrentPage(page);
  }

  return <CataloguePagination
    currentPage={props.currentPage}
    pagesAmount={props.pagesAmount}
    onChangeParam={onChangeParam}
  />;
}

FavoritePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagesAmount: PropTypes.number.isRequired,
  onChangeCurrentPage: PropTypes.func.isRequired
};

export default FavoritePagination;
