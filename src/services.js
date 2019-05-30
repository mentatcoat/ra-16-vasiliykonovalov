//The module provides services fetch functions


let services = {};

// ??? Как правильно поступить с файлом services.js - в нем вынесены функции для связи с сервером. Эти функции подложить в модули (тогда они будут дублироваться), или оставить в services.js?

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
  return new Promise((resolve, reject)=>{
    fetch('https://neto-api.herokuapp.com/bosa-noga/featured')
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

function fetchProducts(params) {
  let url = 'https://neto-api.herokuapp.com/bosa-noga/products';
  if(params) {
    url = url + '?';
    let paramsList = Object.keys(params);
    paramsList.forEach(param =>{
      if(!params[param]) {
        return;
      } else if (Array.isArray(params[param])) {
        params[param].forEach(elem => {
          url = url + param + '=' + elem + '&';
        });
      } else if(param === 'size' || param === 'heelSize') {
        let sizes = params[param];
        for (let size in sizes) {
          console.log('size===', size);
          if(sizes[size]) {
            url = url + param + '=' + size + '&';
          }
        }
      } else {
        url = url + param + '=' + params[param] + '&';
      }
    });
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
