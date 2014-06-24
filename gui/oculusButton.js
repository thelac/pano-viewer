define(['checks/hasOculus', 'lib/oculus'], function(hasOculus, oculus) {
  if (hasOculus) {

    // Initialize Oculus
    // ...

    // addEvent

    var show = function() {
      // TODO: update image
      this.btn.style.backgroundImage = 'url("../assets/img/x.png")';
      this.el.style.visibility = 'visible';
      this.visible = true;
    };

    var hide = function() {
      // TODO: update image
      this.btn.style.backgroundImage = 'url("../assets/img/hamburger.png")';
      this.el.style.visibility = 'hidden';
      this.visible = false;
    };
  }



  return {}
});