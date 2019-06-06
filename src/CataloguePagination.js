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

    function clickPage(e,step) {
      if(!e) {
        props.onChangeParam(null,'page', props.currentPage+step);
        window.scrollTo(0,0);
        return;
      }

      if(e.target.tagName === 'A') {
        props.onChangeParam(null,'page', +e.target.textContent);
        // ??? ниже дергается window, а его использование как то влияет на производительность? Или не связано с DOM и можно использовать как угодно?
        window.scrollTo(0,0);
      }
    }
    let clickNextPage = clickPage.bind(null,null, 1);
    let clickPrevPage = clickPage.bind(null,null, -1);
    let pagesLimit = 5;
    let current = props.currentPage;
    let all = props.pagesAmount;
    if(all < pagesLimit) pagesLimit = all;

    let step = -1;
    let navPages = [];
    navPages.push(current);

    if(props.currentPage) {
      while (navPages.length < pagesLimit) {
        let page = current + step;
        if(step > 0) ++step;
        step = -step;
        if(page > 0 && page <= all) navPages.push(page);
      }
      navPages.sort(function(a,b) {
        return a - b;
      });
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

CataloguePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pagesAmount: PropTypes.number.isRequired,
  onChangeParam: PropTypes.func.isRequired
};

export default CataloguePagination;
