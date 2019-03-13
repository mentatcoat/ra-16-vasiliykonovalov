//The module provide seirvices - object with helper and API functions

// !!! в <App/> подключаются services и выводится в консоль:
// console.log('services.js attached!');

let services = {};
let global = 123; //вспомогательный объект
// https://neto-api.herokuapp.com/bosa-noga

//////////////////////////
//!!! нужно этот массив задавать пустым:
localStorage.favorites = JSON.stringify([66]);
console.log('services localStorage.favorites===', localStorage.favorites);

function toggleFavorite(id) {
  id = +id;
  let favorites = JSON.parse(localStorage.favorites);
  console.log('services.toggleFavorite() first favorites===',favorites);
  if(favorites.includes(id)) {
    favorites.splice(favorites.findIndex(el=> el===id), 1);
  } else {
    favorites.push(id);
  }
  localStorage.favorites = JSON.stringify(favorites);
  console.log('services.toggleFavorite() localStorage.favorites===', localStorage.favorites);
}


function fetchCategories(callback) {
  console.log('services.fetchCategories() ==============');
  fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
    .then((res) => {
    // обрабатываем ответ
      console.log('res.status===', res.status);
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      if(callback) callback(data);
      console.log('fetchCategories got data===', data);
    })
    .catch((err) => {
    // обрабатываем ошибку
    });
}
function fetchFeatured(callback) {
  console.log('services.fetchFeatured() ==============');
  fetch('https://neto-api.herokuapp.com/bosa-noga/featured')
    .then((res) => {
    // обрабатываем ответ
      console.log('res.status===', res.status);
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      console.log('fetchFeatured got data===', data);
      if(callback) callback(data);
    })
    .catch((err) => {
    // обрабатываем ошибку
    });
}

// page — номер страницы (отступ от начала списка товаров), число;
// type — тип обуви (балетки, босоножки, ботильоны…), строка;
// color — цвет обуви, строка;

function fetchProducts(params, callback) {
  // params= {page: 10, discounted: true ...}
  console.log('services.fetchProducts() ==============');
  console.log('fetchProducts params===', params);
  console.log('fetchProducts args===', arguments);
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products';
  // если есть params то мы переопределим url
  //проверка: services.fetchProducts({color: 'черный', discounted: true});
  if(params) {
    url = url + '?';
    const paramsArr = Object.keys(params);
    paramsArr.forEach(
      param=>{
        url = url + param + '=' + `${params[param]}` + '&';
      }
    );
    console.log('fetchProducts url with params===', url);
  }

  fetch(url)
    .then((res) => {
    // обрабатываем ответ
      console.log('res.status===', res.status);
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      console.log('fetchProducts got data===', data);
      callback(data);
    })
    .catch((err) => {
      console.log('fetchProducts catch===', err);
    });
}

// GET /products/${id}
function fetchProduct(id, callback) {
  // params= {page: 10, discounted: true ...}
  console.log('services.fetchProduct() ==============');
  console.log('fetchProduct id===', id);
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products/';
  // если есть params то мы переопределим url
  //проверка: services.fetchProducts({color: 'черный', discounted: true});
  // Если передан id товара то вызываем fetch
  if(id) {
    return new Promise((resolve, reject)=>{

      url = url + id;
      console.log('fetchProduct url with ID===', url);
      fetch(url)
        .then((res) => {
        // обрабатываем ответ
          console.log('res.status===', res.status);
          return res;
        })
        .then(res => {
          return res.json();
        })
        .then(data=> {
          console.log('fetchProduct got data===', data);
          // callback(data);
          resolve(data.data);
        })
        .catch((err) => {
          console.log('fetchProduct catch===', err);
        });





    });//END Promise



  }//END if



}//END fetchProduct




function fetchCreateCart(cartObj) {
  // cartObj json {"id": 42, "size": 14, "amount": 12}
  console.log('services.fetchCreateCart() ==============');
  console.log('fetchCreateCart cartObj===', cartObj);
  // ответ { "id": "-LGp7nXm_acnkzaFQU4Y", "status": "ok"}
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
  //проверка:
  if(cartObj) {
    const request = fetch(url, {
      body: JSON.stringify(cartObj),
      credentials: 'same-origin', // 'include' | 'omit'
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
    }
    )
    .then((res) => {
    // обрабатываем ответ
      console.log('res.status===', res.status);
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      console.log('fetchCreateCart got data===', data);
      // закидываем в localStorage id карзины
      localStorage.cartId = data.data.id;
      global = data;
      console.log('change global===', global);
    })
    .catch((err) => {
      console.log('fetchCreateCart catch===', err);
    });
  }
}

// GET /cart/${cartId}
function fetchGetCart(id, callback) {
  console.log('services.fetchGetCart() ==============');
  console.log('fetchGetCart id===', id);
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
  if(id) {
    url = url + id;
    console.log('fetchGetCart url with ID===', url);
    fetch(url)
      .then((res) => {
      // обрабатываем ответ
        console.log('res.status===', res.status);
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        console.log('fetchGetCart got data===', data);
        if(callback) callback(data);
      })
      .catch((err) => {
        console.log('fetchGetCart catch===', err);
      });
  }
}

// POST /cart/${cartId}
function fetchUpdateProduct(cartId, product) {
  // cartObj json {"id": 42, "size": 14, "amount": 12}
  console.log('services.fetchUpdateProduct() ==============');
  console.log('fetchUpdateProduct cartId===', cartId);
  // ответ { "id": "-LGp7nXm_acnkzaFQU4Y", "status": "ok"}
  let url = 'https://neto-api.herokuapp.com/bosa-noga/cart/';
  //проверка:
  if(cartId && product) {
    url = url + cartId;
    const request = fetch(url, {
      body: JSON.stringify(product),
      credentials: 'same-origin', // 'include' | 'omit'
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
    }
    )
    .then((res) => {
    // обрабатываем ответ
      console.log('res.status===', res.status);
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      console.log('fetchUpdateProduct got data===', data);
    })
    .catch((err) => {
      console.log('fetchUpdateProduct catch===', err);
    });
  }
}

// POST /order
function fetchCreateOrder(info) {
  // cartObj json {"id": 42, "size": 14, "amount": 12}
  console.log('services.fetchCreateOrder() ==============');
  console.log('fetchCreateOrder info===', info);
  // ответ { "id": "-LGp7nXm_acnkzaFQU4Y", "status": "ok"}
  let url = 'https://neto-api.herokuapp.com/bosa-noga/order';
  //проверка:
  if(info) {
    // let {name, phone, address, paymentType, cart} = info;
    const request = fetch(url, {
      body: JSON.stringify(info),
      credentials: 'same-origin', // 'include' | 'omit'
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
    }
    )
    .then((res) => {
    // обрабатываем ответ
      console.log('res.status===', res.status);
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      console.log('fetchCreateOrder got data===', data);
    })
    .catch((err) => {
      console.log('fetchCreateOrder catch===', err);
    });
  }
}





//!!! При добавлении товара в корзину в localStorage проверяется наличие идентификатора корзины, если он доступен, то запрос отправляется вместе в ним. В противном случае запрос отправляется без идентификатора, полученный ответ сохраняется в localStorage.
// --1 создаем карзину если ее нет в localStorage
// --2 обновляем карзину если она есть в localStorage

services.toggleFavorite = toggleFavorite;
services.fetchCategories = fetchCategories;
services.fetchProducts = fetchProducts;
services.fetchFeatured = fetchFeatured;
services.fetchProduct = fetchProduct;
services.fetchCreateCart = fetchCreateCart;
services.fetchGetCart = fetchGetCart;
services.fetchUpdateProduct = fetchUpdateProduct;
services.fetchCreateOrder = fetchCreateOrder;

// console.log('services.js contents===', services);
export default services;
export {global};

// console.log('first edit!');
