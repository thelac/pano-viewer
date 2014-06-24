define(function() {
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

  return {
    registerElement: function(el, callback) { //when click on el, callback will be called
      FV.utils.addClickEvent(el, callback);
    },

    show: function() {
      this.btn.style.backgroundImage = 'url("../assets/img/x.png")';
      this.el.style.visibility = 'visible';
      this.visible = true;
    },

    hide: function() {
      this.btn.style.backgroundImage = 'url("../assets/img/hamburger.png")';
      this.el.style.visibility = 'hidden';
      this.visible = false;
    },

    addItem: function(name, callback) {
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
    },

    addButton: function(name, img, callback) {}
  }
});