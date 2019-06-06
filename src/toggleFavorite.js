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

export default toggleFavorite;
