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

function CataloguePagination(props) {
  // constructor(props) {
    // super(props);
    // this.state = {
      // first: 0,
      // pagesAmount: this.props.pagesAmount,
      // currentPage: this.props.currentPage
    // };
    // this.counter;

    // this.clickArrow = (step)=>{
    //   let delta = this.state.first + step;
    //   if(delta > this.state.filtered.length - 1) delta = 0;
    //   if(delta < 0) delta = this.state.filtered.length - 1;
    //   this.setState({first: delta});
    // }
    // this.clickNext = this.clickArrow.bind(this,1);
    // this.clickPrev = this.clickArrow.bind(this,-1);

    // this.getNextIndex = ()=> {
    //   if (this.counter > this.state.pagesAmount) this.counter = 0;
    //   return this.counter++;
    // };

    function clickPage(e,step) {
      if(!e) {
        // this.setState({
        //   currentPage: this.state.currentPage+step
        // });
        props.onChangeParam(null,'page', props.currentPage+step);
        window.scrollTo(0,0);
        return;
      }

      if(e.target.tagName === 'A') {
        // this.setState({
        //   currentPage: +e.target.textContent
        // });
        props.onChangeParam(null,'page', +e.target.textContent);
        // ??? ниже дергается window, а его использование как то влияет на производительность? Или не связано с DOM и можно использовать как угодно?
        window.scrollTo(0,0);
      }
    }
    let clickNextPage = clickPage.bind(null,null, 1);
    let clickPrevPage = clickPage.bind(null,null, -1);

  // }

  // initCataloguePagination = (page, pages)=>{
  //   this.setState({
  //         pagesAmount: pages,
  //         currentPage: page
  //       });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if(prevProps.pagesAmount !== this.props.pagesAmount || prevProps.currentPage !== this.props.currentPage) {
  //     this.setState({
  //           pagesAmount: this.props.pagesAmount,
  //           currentPage: this.props.currentPage
  //     });
  //   }
  // }

  // render() {
    // let toShowAmount = this.state.pagesAmount - this.state.currentPage + 1;
    // let show = [];
    // let amount = toShowAmount;
    // if(amount>5) amount = 5;
    // this.counter = this.state.currentPage;
    // for(let i = 0; i<amount; i++) {
    //   show.push(this.getNextIndex());
    // }
    let pagesLimit = 5;
    let current = props.currentPage;
    let all = props.pagesAmount;
    if(all < pagesLimit) pagesLimit = all;

    let step = -1;
    let navPages = [];
    navPages.push(current);

    if(props.currentPage) {
      while (navPages.length < pagesLimit) {
        console.log('step===', step);
        let page = current + step;
        if(step > 0) ++step;
        step = -step;
        if(page > 0 && page <= all) navPages.push(page);
        console.log('navPages page===', page);
        console.log('step===', step);
        console.log('navPages length===', navPages.length);
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
      }
      navPages.sort(function(a,b) {
        return a - b;
      });
      console.log('final navPages-===', navPages);
    }

    let firstPage;
    if(!navPages.includes(1)) firstPage = 1;

    let lastPage;
    if(!navPages.includes(all)) lastPage = all;

    return (
      <div className="product-catalogue__pagination">
        <div className="page-nav-wrapper">

          {props.currentPage !== 1 &&
            <div className="angle-back"><a onClick={clickPrevPage}></a></div>}

          <ul onClick={clickPage}>

            {firstPage && <li><a>{firstPage}</a></li>}
            {firstPage && <li><p>...</p></li>}

            {navPages.map(
              pageNumber=>(
                <li key={pageNumber} className={pageNumber===props.currentPage ? "active" : ''}>
                <a>{pageNumber}</a>
                </li>
              )
            )}

            {lastPage && <li><p>...</p></li>}
            {lastPage && <li><a>{lastPage}</a></li>}

          </ul>

          {props.currentPage !== props.pagesAmount && <div className="angle-forward"><a onClick={clickNextPage}></a></div>}

        </div>
      </div>

    );
  }
// }

CataloguePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagesAmount: PropTypes.number.isRequired,
  onChangeParam: PropTypes.func.isRequired
};

export default CataloguePagination;
