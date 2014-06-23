FV.Vimeo = function(id) {
  this.iframe = document.createElement('iframe');
  this.iframe.src = '//player.vimeo.com/video/' + id + '?color=7270B1';
  this.iframe.frameBorder = 0;
  this.iframe.webkitallowfullscreen = true;
  this.iframe.mozallowfullscreen = true;
  this.iframe.allowfullscreen = true;
  this.iframe.className = 'video';

  var body = document.getElementsByTagName('body')[0];
  body.appendChild(this.iframe);
};

FV.Vimeo.prototype.show = function() {
  this.iframe.style.visibility = 'visible';
};

FV.Vimeo.prototype.hide = function() {
  this.iframe.style.visibility = 'hidden';
};