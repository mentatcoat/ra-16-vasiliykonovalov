//The module provide seirvices - object with helper and API functions

let services = {};
let global = 123; //временный вспомогательный объект для разработки
// https://neto-api.herokuapp.com/bosa-noga

//!!! нужно этот массив задавать пустым:
localStorage.favorites = JSON.stringify([66]);

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

function fetchCategories(callback) {
  fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
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

function fetchProducts(params, callback) {
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

  fetch(url)
    .then((res) => {
      return res;
    })
    .then(res => {
      return res.json();
    })
    .then(data=> {
      callback(data);
    })
    .catch((err) => {
    });
}

function fetchProduct(id, callback) {
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
      global = data;
    })
    .catch((err) => {
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
    })
    .catch((err) => {
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
