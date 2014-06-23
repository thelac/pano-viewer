FV.utils.addClickEvent = function(el, callback) {
  var touch = 'ontouchstart' in document.documentElement;
  if (touch) el.addEventListener('touchstart', callback);
  else {
    if (!el.addEventListener) {
      el.attachEvent('onclick', callback);
    } else {
      el.addEventListener('click', callback);
    }
  }
};