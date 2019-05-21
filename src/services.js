//The module provides services fetch functions

import helpers from './helpers';
import temps from './temps';

let services = {};

// ??? Я раскидал часть элементов из файла services.js. Правильно ли так делать? Итог такой: 1) в файле services остались функции касающиеся fetch API. 2) в файле helpers.js остались функции-помощники. 3) в файле temps.js остались временные вспомогательные переменные.

// https://neto-api.herokuapp.com/bosa-noga

//!! нужно этот массив задавать пустым:
if(!localStorage.favorites) localStorage.favorites = JSON.stringify([]);

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
  // helpers.preloaderOn && helpers.preloaderOn();
  return new Promise((resolve, reject)=>{
    fetch('https://neto-api.herokuapp.com/bosa-noga/featured')
    .then((res) => {
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      // helpers.preloaderOff && helpers.preloaderOff();
      resolve(data);
    })
    .catch((err) => {
    });
  });
}

function fetchProducts(params) {
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
    helpers.preloaderOn && helpers.preloaderOn();
    fetch(url)
      .then((res) => {
        return res;
      })
      .then(res => {
        return res.json();
      })
      .then(data=> {
        helpers.preloaderOff && helpers.preloaderOff();
        resolve(data);
      })
      .catch((err) => {
      });
  });
}

function fetchProduct(id) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products/';
  if(id) {
    helpers.preloaderOn && helpers.preloaderOn();
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
          helpers.preloaderOff && helpers.preloaderOff();
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
      helpers.preloaderOn && helpers.preloaderOn();
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
        helpers.preloaderOff && helpers.preloaderOff();
        resolve(data);
      })
      .catch((err) => {
      });
    });

  }
}

services.fetchCategories = fetchCategories;
services.fetchProducts = fetchProducts;
services.fetchFeatured = fetchFeatured;
services.fetchProduct = fetchProduct;
services.fetchCreateCart = fetchCreateCart;
services.fetchGetCart = fetchGetCart;
services.fetchUpdateProduct = fetchUpdateProduct;
services.fetchCreateOrder = fetchCreateOrder;

export default services;
