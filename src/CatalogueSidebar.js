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
import PropTypes from 'prop-types';

class CatalogueSidebar extends Component {
  constructor(props) {
    super(props);
    // this.formElement;
    // this.state={reset: true};

    this.submitBrand = (e)=>{
      e.preventDefault();

      this.props.onChangeParam(null,'brand', e.currentTarget.elements[0].value);

    }
    }

  render() {
    return (
          <form id="filterForm" className="sidebar">

            {this.props.children}

            <section className="sidebar__division">
              <div className="separator-240"></div>
            </section>
            <section className="sidebar__division">
              <div className="drop-down">
                <a onClick={this.props.resetFilter} ><span className="drop-down-icon"></span>Сбросить</a>
              </div>
            </section>
          </form>
    );
  }
}

CatalogueSidebar.propTypes = {
  onChangeFilter: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired
};

export default CatalogueSidebar;
