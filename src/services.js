//The module provide seirvices - object with helper and API functions

let services = {};
let global = 123; //временный вспомогательный объект для разработки
services.categoryMaxPrice = '';

// https://neto-api.herokuapp.com/bosa-noga

//!!! нужно этот массив задавать пустым:
if(!localStorage.favorites) localStorage.favorites = JSON.stringify([]);

function twinkleBasketPic() {
  console.log('services.twinkleBasketPic() services.basketTwinklePic===', services.basketTwinklePic);
  // scroll:
  services.basketTwinklePic.textContent = localStorage.cartProductsAmount;
  let twinklePicTop = services.basketTwinklePic.parentElement.getBoundingClientRect().top - 5;
  console.log('twinklePicTop===', twinklePicTop);
  console.log('window===', window);
  if(twinklePicTop < 0) {
    console.log('twinklePicTop < 0===', twinklePicTop < 0);
    window.scrollTo(0,0);
  }
  // twinkling:
  var timerId = setInterval(function() {
    services.basketTwinklePic.classList.toggle('basket-visible');
  }, 300);
  // через 2 сек остановить повторы
  setTimeout(function() {
    clearInterval(timerId);
    // alert( 'стоп' );
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
  console.log('toggleFavorite() favorites===',favorites);
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
function fetchFeatured(callback) {
  fetch('https://neto-api.herokuapp.com/bosa-noga/featured')
    .then((res) => {
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      if(callback) callback(data);
    })
    .catch((err) => {
    });
}

function fetchProducts(params) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products';
  if(params) {
    url = url + '?';
    const paramsArr = Object.keys(params);
    paramsArr.forEach(
      param=>{
        url = url + param + '=' + `${params[param]}` + '&';
      }
    );
  }
  return new Promise((resolve,reject)=>{
    fetch(url)
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

function fetchProduct(id) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products/';
  if(id) {
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

function fetchGetCart(id, callback) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
  if(id) {
    url = url + id;
    fetch(url)
      .then((res) => {
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        if(callback) callback(data);
      })
      .catch((err) => {
      });
  }
}

function fetchUpdateProduct(cartId, product) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
  if(cartId && product) {
    url = url + cartId;
    return new Promise((resolve,reject)=>{
      const request = fetch(url, {
        body: JSON.stringify(product),
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
    })
    .catch((err) => {
    });
  }
}

function getCategoryMaxPrice(categoryIdNumber) {
  if(!categoryIdNumber) return;
  fetchProducts({
    categoryId: categoryIdNumber,
    sortBy: 'price',
    maxPrice: 1000000
  }).then(data=>{
    let result = data.data[0].price;
    result = Math.ceil(result/100) * 100;
    services.categoryMaxPrice = result;
    console.log('getCategoryMaxPrice() services.categoryMaxPrice===', services.categoryMaxPrice);
  });
}

function isFavorite() {
  let favorites = JSON.parse(localStorage.favorites);
  return favorites.includes(this.product.id);
}


services.getCategoryMaxPrice = getCategoryMaxPrice;
services.isFavorite = isFavorite;
services.basketTwinklePic = {};
services.twinkleBasketPic = twinkleBasketPic;
services.toggleFavorite = toggleFavorite;
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
