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

function SidebarItemBrand(props) {
  function submitBrand(e) {
    e.preventDefault();
    props.onChangeParam(null,'brand', e.currentTarget.elements[0].value);
  }

  return (
    <section className="sidebar__division">
        <div className="sidebar__brand">
          <h3>Бренд</h3>
          <form onSubmit={submitBrand}  className="brand-search">
            <input type="search" name='brand' className="brand-search" id="brand-search" placeholder="Поиск"/>
            <input type="submit" name="" value="" className="submit"/>
          </form>
        </div>
    </section>
  );
}

SidebarItemBrand.propTypes = {
  onChangeParam: PropTypes.func.isRequired,
};

export default SidebarItemBrand;
