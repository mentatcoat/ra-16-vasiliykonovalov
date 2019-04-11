//The module provide seirvices - object with helper and API functions

let services = {};
let global = 123; //временный вспомогательный объект для разработки
services.categoryMaxPrice = 100000;

// https://neto-api.herokuapp.com/bosa-noga

//!!! нужно этот массив задавать пустым:
if(!localStorage.favorites) localStorage.favorites = JSON.stringify([]);
// if(localStorage.favorites) localStorage.favorites = JSON.stringify([20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39]);

function twinkleBasketPic() {
  services.basketTwinklePic.textContent = localStorage.cartProductsAmount;
  let twinklePicTop = services.basketTwinklePic.parentElement.getBoundingClientRect().top - 5;
  if(twinklePicTop < 0) {
    window.scrollTo(0,0);
  }
  var timerId = setInterval(function() {
    services.basketTwinklePic.classList.toggle('basket-visible');
  }, 300);
  setTimeout(function() {
    clearInterval(timerId);
  }, 1500);
  setTimeout(function() {
    services.basketTwinklePic.classList.toggle('basket-visible');
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

function fetchCategories() {
  return new Promise((resolve,reject)=>{
    fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
      .then((res) => {
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        resolve(data);
      })
      .catch((err) => {
      });
  });
}
function fetchFeatured() {
  services.preloaderOn && services.preloaderOn();
  return new Promise((resolve, reject)=>{
    fetch('https://neto-api.herokuapp.com/bosa-noga/featured')
    .then((res) => {
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      services.preloaderOff && services.preloaderOff();
      resolve(data);
    })
    .catch((err) => {
    });
  });
}

function fetchProducts(params) {
  console.log('fetchProducts() params===', params);
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products';
  if(params) {
    url = url + '?';
    params.forEach(
      param=>{
        url = url + param[0] + '=' + param[1] + '&';
      }
    );
  }
  return new Promise((resolve,reject)=>{
    services.preloaderOn && services.preloaderOn();
    fetch(url)
      .then((res) => {
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        console.log('fetchProducts() data===', data);
        services.preloaderOff && services.preloaderOff();
        resolve(data);
      })
      .catch((err) => {
      });
  });
}

function fetchProduct(id) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products/';
  if(id) {
    services.preloaderOn && services.preloaderOn();
    return new Promise((resolve, reject)=>{

      url = url + id;
      fetch(url)
        .then((res) => {
          return res;
        })
        .then(res => {
          return res.json();
        })
        .then(data=> {
          services.preloaderOff && services.preloaderOff();
          resolve(data.data);
        })
        .catch((err) => {
        });
    });
  }
}

function fetchCreateCart(cartObj) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
  if(cartObj) {
    return new Promise((resolve,reject)=>{
      const request = fetch(url, {
        body: JSON.stringify(cartObj),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
      }
      )
      .then((res) => {
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        localStorage.cartId = data.data.id;
        resolve(data);
      })
      .catch((err) => {
      });
    });
  }
}

function fetchGetCart(id) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
    return new Promise((resolve, reject)=>{
      if(!id) reject();
      // ??? верно ли применен reject() выше - в случае когда не передан аргумент в функцию? (Если не возвращать rejectedPromise то вылетет ошибка).
      url = url + id;
      fetch(url)
        .then((res) => {
          return res;
        })
        .then(res => {
          return res.json();
        })
        .then(data=> {
          if(data.status === 'error') reject();
          resolve(data.data);
        })
        .catch((err) => {
        });
    });
}

function fetchUpdateProduct(cartId, item) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
  if(cartId && item) {
    url = url + cartId;
    return new Promise((resolve,reject)=>{
      const request = fetch(url, {
        body: JSON.stringify(item),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
      }
      )
      .then((res) => {
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        resolve(data);
      })
      .catch((err) => {
      });
    });
  }
}

function fetchCreateOrder(info) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/order';
  if(info) {

    return new Promise((resolve, reject)=>{
      services.preloaderOn && services.preloaderOn();
      const request = fetch(url, {
        body: JSON.stringify(info),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
      }
      )
      .then((res) => {
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        // ??? ничего проще не придумал чем ставить функции вкл и выкл Прелоудера перед промисом и в .then. Так нормально?
        services.preloaderOff && services.preloaderOff();
        resolve(data);
      })
      .catch((err) => {
      });
    });

  }
}

function getCategoryMaxPrice(categoryIdNumber) {
  if(!categoryIdNumber) return;
  fetchProducts([
    ['categoryId', categoryIdNumber],
    ['sortBy', 'price'],
    ['maxPrice', 1000000]
  ]
).then(data=>{
    let result = data.data[0].price;
    result = Math.ceil(result/100) * 100;
    console.log('getCategoryMaxPrice() result===',result);
    services.categoryMaxPrice = result;
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

services.onChangeFilter;

services.preloaderOn;
services.preloaderOff;
services.preloaderElement;
services.initFavorite;
services.initFavoritePagination;
services.initCataloguePagination;
services.initProductSlider;
services.initProductInfo;
services.setStateCatalogueParams;

services.openBasketPanel;
services.resetBasketPanel = '';
services.cartTotal = '';
services.clearFilterForm = '';
services.debounce = debounce;
services.filterForm = '';
services.headerParam = '';
services.headerParamInput = '';
services.getCategoryMaxPrice = getCategoryMaxPrice;

services.isFavorite = isFavorite;
services.toggleFavorite = toggleFavorite;

services.basketTwinklePic = {};
services.twinkleBasketPic = twinkleBasketPic;


services.fetchCategories = fetchCategories;
services.fetchProducts = fetchProducts;
services.fetchFeatured = fetchFeatured;
services.fetchProduct = fetchProduct;
services.fetchCreateCart = fetchCreateCart;
services.fetchGetCart = fetchGetCart;
services.fetchUpdateProduct = fetchUpdateProduct;
services.fetchCreateOrder = fetchCreateOrder;

export default services;
export {global};
