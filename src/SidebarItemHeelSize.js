import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';
import SidebarItemSizeTable from './SidebarItemSizeTable';


function SidebarItemHeelSize(props) {
  return <SidebarItemSizeTable
    header='Размер каблука'
    param='heelSize'
    sizes={props.sizes}
    onChangeParam={props.onChangeParam}
  />
}

SidebarItemHeelSize.propTypes = {
  sizes: PropTypes.object.isRequired,
  onChangeParam: PropTypes.func.isRequired
};

export default SidebarItemHeelSize;
