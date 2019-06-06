function isFavorite(id) {
  let favorites = JSON.parse(localStorage.favorites);
  return favorites.includes(id);
}

export default isFavorite;
