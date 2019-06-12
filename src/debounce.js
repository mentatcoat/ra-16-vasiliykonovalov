function debounce(callback, delay) {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback(...rest);
    }, delay);
  };
};

export default debounce;
