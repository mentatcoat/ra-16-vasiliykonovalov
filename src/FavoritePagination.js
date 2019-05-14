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
import PropTypes from 'prop-types';
import services from './services';
import helpers from './helpers';

class FavoritePagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: 0,
      pagesAmount: this.props.pagesAmount,
      currentPage: this.props.currentPage
    };
    this.counter;
    this.routIndex = ()=> {
      if (this.counter > this.state.pagesAmount) this.counter = 0;
      return this.counter++;
    };
    this.clickPage = (e,step)=>{
      if(!e) {
        this.setState({
          currentPage: this.state.currentPage+step
        }, ()=> this.props.onChangeCurrentPage(this.state.currentPage));
        window.scrollTo(0,0);
        return;
      }
      if(e.target.tagName === 'A') {
        this.setState({
          currentPage: +e.target.textContent
        }, ()=> this.props.onChangeCurrentPage(this.state.currentPage));
        window.scrollTo(0,0);
      }
    }
    this.clickNextPage = this.clickPage.bind(null,null, 1);
    this.clickPrevPage = this.clickPage.bind(null,null, -1);

    helpers.initFavoritePagination = this.initFavoritePagination;

  }

  initFavoritePagination = (page, pages)=>{
    this.setState({
          pagesAmount: pages,
          currentPage: page
        });
  }

  render() {
    let toShowAmount = this.state.pagesAmount - this.state.currentPage + 1;
    let show = [];
    let amount = toShowAmount;
    if(amount>5) amount = 5;
    this.counter = this.state.currentPage;
    for(let i = 0; i<amount; i++) {
      show.push(this.routIndex());
    }

    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">

          <input form='filterForm' name='page' type='hidden' value={this.state.currentPage} />
          {this.state.currentPage !== 1 && <div className="angle-back"><a onClick={this.clickPrevPage}></a></div>}
          <ul onClick={this.clickPage}>
            {show.map(
              pageNumber=>(
                <li key={pageNumber} className={pageNumber===this.state.currentPage ? "active" : ''}><a>{pageNumber}</a></li>
              )
            )
            }
            {toShowAmount > 5 && <li><p>...</p></li>}
            {toShowAmount > 5 && <li><a>{this.state.pagesAmount}</a></li>}
          </ul>
          {this.state.currentPage !== this.state.pagesAmount && <div className="angle-forward"><a onClick={this.clickNextPage}></a></div>}

        </div>
      </div>

    );
  }
}

FavoritePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagesAmount: PropTypes.number.isRequired, onChangeCurrentPage: PropTypes.func.isRequired
};

export default FavoritePagination;
