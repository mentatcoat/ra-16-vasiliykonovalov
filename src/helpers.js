//The module provides helper functions


import services from './services';
import temps from './temps';

let helpers = {};


function twinkleBasketPic() {
  temps.basketTwinklePic.textContent = localStorage.cartProductsAmount;
  let twinklePicTop = temps.basketTwinklePic.parentElement.getBoundingClientRect().top - 5;
  if(twinklePicTop < 0) {
    window.scrollTo(0,0);
  }
  var timerId = setInterval(function() {
    temps.basketTwinklePic.classList.toggle('basket-visible');
  }, 300);
  setTimeout(function() {
    clearInterval(timerId);
  }, 1500);
  setTimeout(function() {
    temps.basketTwinklePic.classList.toggle('basket-visible');
  }, 3000);
}

function toggleFavorite(id) {
  id = +id;
  let favorites = JSON.parse(localStorage.favorites);
  if(favorites.includes(id)) {
    favorites.splice(favorites.findIndex(el=> el===id), 1);
  } else {
    favorites.push(id);
  }
  localStorage.favorites = JSON.stringify(favorites);
}

function getCategoryMaxPrice(categoryIdNumber) {
  if(!categoryIdNumber) return;
  services.fetchProducts([
    ['categoryId', categoryIdNumber],
    ['sortBy', 'price'],
    ['maxPrice', 1000000]
  ]
).then(data=>{
    let result = data.data[0].price;
    result = Math.ceil(result/100) * 100;
    temps.categoryMaxPrice = result;
  });
}

function isFavorite() {
  let favorites = JSON.parse(localStorage.favorites);
  return favorites.includes(this.product.id);
}

function debounce(callback, delay) {
  let timeout;
  return (arg1, arg2) => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback(arg1, arg2);
    }, delay);
  };
};


helpers.clearFilterForm = '';
helpers.resetBasketPanel = '';
helpers.openBasketPanel;
helpers.setStateCatalogueParams;
helpers.initProductInfo;
helpers.initProductSlider;
helpers.initCataloguePagination;
helpers.initFavoritePagination;
helpers.initSimilarSlider;
helpers.initProductCard;
helpers.initFavorite;
helpers.preloaderOff;
helpers.preloaderOn;
helpers.onChangeFilter;

helpers.debounce = debounce;
helpers.isFavorite = isFavorite;
helpers.getCategoryMaxPrice = getCategoryMaxPrice;
helpers.toggleFavorite = toggleFavorite;
helpers.twinkleBasketPic = twinkleBasketPic;

export default helpers;
