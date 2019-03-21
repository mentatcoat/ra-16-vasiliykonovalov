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

class CatalogueSidebar extends Component {
  // тут есть this.props.onChangeFilter
  constructor(props) {
    super(props);
    this.formElement;


    // this.onChangeForm = (e)=>{
    //   // e.preventDefault();
    //   console.log('!!!!!!onChangeForm() event===', e);
    //
    //
    // };

  }


  componentDidMount() {


  }

  render() {


    return (
          <form onChange={this.onChangeForm} ref={el=>services.filterForm = el} id="filterForm" className="sidebar">

            <SidebarItemCatalogue onChangeFilter={this.props.onChangeFilter}/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemSlider onChangeFilter={this.props.onChangeFilter}/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemColor onChangeFilter={this.props.onChangeFilter}/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemSize onChangeFilter={this.props.onChangeFilter}/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemHeelSize onChangeFilter={this.props.onChangeFilter}/>
            <div className="separator-150 separator-150-5"></div>
            <SidebarItemReason onChangeFilter={this.props.onChangeFilter}/>
            <div className="separator-150 separator-150-1"></div>
            <SidebarItemSeason onChangeFilter={this.props.onChangeFilter}/>

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
                  <input onChange={this.props.onChangeFilter} id='discounted' value={true} type="checkbox" className="checkbox" name="discounted"/><span className="checkbox-discount"></span> <span className="text-discount">Со скидкой</span></label>

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
