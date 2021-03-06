import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import './css/normalize.css';
import './css/font-awesome.min.css';
import './css/style.css';
import './css/style-catalogue.css';
import PropTypes from 'prop-types';
import SizeInput from './SizeInput';
import isEqual from 'react-fast-compare';

class SidebarItemSizeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
      sizes: this.props.sizes
    };

    this.clickSize = (event)=>{

      let sizesObject = Object.assign({}, this.state.sizes, {
        [event.target.value]: event.target.checked
      });

      this.props.onChangeParam(null, this.props.param, sizesObject);
    }
    this.clickDrawer = ()=>{
      this.setState({isShown: !this.state.isShown});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!isEqual(this.props.sizes, prevProps.sizes)) {
      this.setState({sizes: this.props.sizes});
    }
  }

  render() {
    if(!this.props.sizes) {
      return null;
    }

    let sizes = this.state.sizes;
    let keys = Object.keys(sizes);
    let inputs = keys.map(key=>{
      return <SizeInput key={key} size={key} value={sizes[key]}  />
    });

    return (
      <section className="sidebar__division">
        <div className="sidebar__size">

          <div className="sidebar__division-title">
            <h3>{this.props.header}</h3>
            <div onClick={this.clickDrawer} className={this.state.isShown ? 'opener-down' : 'opener-up'}>
            </div>
          </div>

          {this.state.isShown && <ul className="sizes-list" onChange={this.clickSize}>

              {inputs}

          </ul>
          }

        </div>
      </section>
    );
  }
}

SidebarItemSizeTable.propTypes = {
  header: PropTypes.string.isRequired,
  param: PropTypes.string.isRequired,
  sizes: PropTypes.object.isRequired,
  onChangeParam: PropTypes.func.isRequired
};

export default SidebarItemSizeTable;
