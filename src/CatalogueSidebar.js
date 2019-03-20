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

class CatalogueSidebar extends Component {


  render() {
    return (
          <form className="sidebar">

            <SidebarItemCatalogue/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemSlider/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemColor/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemSize/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemHeelSize/>
            <div className="separator-150 separator-150-5"></div>
            <SidebarItemReason/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemSeason/>

            <div className="separator-150 separator-150-7"></div>

            <section className="sidebar__division">
                <div className="sidebar__brand">
                  <h3>Бренд</h3>
                  <form action="post" className="brand-search">
                    <input type="search" name='brand' className="brand-search" id="brand-search" placeholder="Поиск"/>
                    <input type="submit" name="" value="" className="submit"/>
                  </form>
                </div>

                  <label for='discounted' >
                  <input id='discounted' value="true" type="checkbox" className="checkbox" name="discounted"/><span className="checkbox-discount"></span> <span className="text-discount">Со скидкой</span></label>

              <div className="separator-240"></div>
            </section>

            <section className="sidebar__division">
              <div className="drop-down">
                <a href="#"><span className="drop-down-icon"></span>Сбросить</a>
              </div>
            </section>
          </form>
    );
  }
}

export default CatalogueSidebar;
