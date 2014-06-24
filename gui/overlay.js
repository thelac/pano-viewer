define(['checks/isMobile', 'utils/addClickEvent'], function(isMobile, addClickEvent) {
  this.el = document.createElement('div');
  this.el.id = 'overlay';

  this.message = document.createElement('div');
  this.message.id = 'overlay-message';
  var messageText = document.createElement('p');
  if (isMobile) {
    messageText.innerHTML = 'Tap and drag to look, double tap to move. Tap the left icon for highlights.';
  } else {
    messageText.innerHTML = 'Click and drag to look, arrow keys to move. Click the left icon for highlights.<br />To view this space in 3D, please use a browser that supports <a href="http://get.webgl.org" target="_blank">WebGL</a>.';
  }
  
  this.message.appendChild(messageText);
  this.el.appendChild(this.message);

  this.close = document.createElement('div');
  this.close.id = 'overlay-close';

  var that = this;
  addClickEvent(this.close, function(e) {
    that.el.style.visibility = 'hidden';
  });

  this.el.appendChild(this.close);

  this.body = document.getElementsByTagName('body')[0];
  this.body.appendChild(this.el);
});