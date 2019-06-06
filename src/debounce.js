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

export default debounce;
