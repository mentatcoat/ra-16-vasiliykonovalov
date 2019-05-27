import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';
import SidebarItemSizeTable from './SidebarItemSizeTable';

function SidebarItemSize(props) {
  console.log('SidebarItemSize props===', props);
  return <SidebarItemSizeTable
    header='Размер'
    param='size'
    sizes={props.sizes}
    onChangeParam={props.onChangeParam}
  />;
}

SidebarItemSize.propTypes = {
  sizes: PropTypes.object.isRequired,
  onChangeParam: PropTypes.func.isRequired
};

export default SidebarItemSize;
