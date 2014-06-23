FV.Menu = function() {
  var that = this;
  // debugger
  this.visible = false;

  this.el = document.createElement('div');
  this.el.id = 'menu';
  this.container = document.createElement('div');
  this.container.id = 'menu-item-container';
  this.el.appendChild(this.container);
  this.btn = document.createElement('div');
  this.btn.id = 'menu-button';

  this.registerElement(this.btn, function(e) {
    if (!that.visible) that.show();
    else that.hide();
  });

  this.body = document.getElementsByTagName('body')[0];
  this.body.appendChild(this.el);
  this.body.appendChild(this.btn);
};

FV.Menu.prototype.registerElement = function(el, callback) {//when click on el, callback will be called
  FV.utils.addClickEvent(el, callback);
};

FV.Menu.prototype.show = function() {
  this.btn.style.backgroundImage = 'url("/build/img/x.png")';
  this.el.style.visibility = 'visible';
  this.visible = true;
};
FV.Menu.prototype.hide = function() {
  this.btn.style.backgroundImage = 'url("/build/img/hamburger.png")';
  this.el.style.visibility = 'hidden';
  this.visible = false;
};

FV.Menu.prototype.addItem = function(name, callback) {
  var div = document.createElement('div');
  div.className = 'menu-item';
  div.innerHTML = name;

  var that = this;
  this.registerElement(div, function(e) {
    // TODO: clean up this atrocity
    var iframe = document.getElementsByTagName('iframe')[0];
    if (iframe !== undefined) {
      iframe.parentNode.removeChild(iframe);
    }
    callback(e);
    that.hide();
  });
  this.container.appendChild(div);
};

FV.Menu.prototype.addButton = function(name, img, callback) {};
