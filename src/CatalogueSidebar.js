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
    this.state={reset: true};

    this.brand;
    // this.onChangeForm = (e)=>{
    //   // e.preventDefault();
    //   console.log('!!!!!!onChangeForm() event===', e);
    //
    //
    // };
    this.submitBrand = (e)=>{
      e.preventDefault();
      this.brand.value = e.target.elements[0].value;
      this.props.onChangeFilter();
          // && paramsArray.push(['brand', e.target.elements[0].value]);
      }

    this.reset = (e)=> {
      console.log("RESSSSSSSSSSSSSSET FORM");
      e.preventDefault();
      // console.log('services.filterForm===', services.filterForm.elements);
      for (let elem of services.filterForm.elements) {
        console.log('ELEM===', elem);
        elem.value = '';
      }
    }

    }

  componentDidMount() {

  }

  render() {


    return (
          <form  ref={el=>services.filterForm = el}  id="filterForm" className="sidebar">

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
                <input form='filterForm' ref={el=>this.brand=el} name='brand' type='hidden'  />
                <div className="sidebar__brand">
                  <h3>Бренд</h3>
                  <form onSubmit={this.submitBrand}  className="brand-search">
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
                <a onClick={this.props.resetFilter} ><span className="drop-down-icon"></span>Сбросить</a>
              </div>
            </section>
          </form>
    );
  }
}

export default CatalogueSidebar;
