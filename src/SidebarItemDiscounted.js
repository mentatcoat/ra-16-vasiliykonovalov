import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import SidebarItemCatalogue from './SidebarItemCatalogue';
import SidebarItemColor from './SidebarItemColor';
import SidebarItemReason from './SidebarItemReason';
import SidebarItemSeason from './SidebarItemSeason';
import SidebarItemSlider from './SidebarItemSlider';
import SidebarItemSize from './SidebarItemSize';
import SidebarItemHeelSize from './SidebarItemHeelSize';
import services from './services';
import temps from './temps';
import PropTypes from 'prop-types';

function SidebarItemDiscounted(props) {
  function onChange(e) {
    props.onChangeParam(null, 'discounted', e.currentTarget.checked);
  }

  return (
    <section className="sidebar__division">

      <label for='discounted' >
      <input onChange={onChange} id='discounted' checked={props.value} type="checkbox" className="checkbox" name="discounted"/>
      <span className="checkbox-discount"></span>
      <span className="text-discount">Со скидкой</span>
      </label>

    </section>
  );
}

SidebarItemDiscounted.propTypes = {
  onChangeParam: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired
};

export default SidebarItemDiscounted;
