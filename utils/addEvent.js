define(function() {
  return function(el, e, callback) {
    if (!el.addEventListener) {
      el.attachEvent('on' + e, callback);
    } else {
      el.addEventListener(e, callback);
    }
  }
});