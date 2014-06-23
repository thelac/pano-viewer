// var $ = require('jquery');
// var radio = require('radio');
FV.Stairs = function() {
  this.numFloors  = FV.overlayMap === undefined ? 0 : FV.overlayMap.length ;
  this.currentFloor = 0;
  var div = document.createElement('div');
  this.menu = document.getElementById('menu');

  this.menu.appendChild(div); //add to fallback menu

  div.id = 'stairs';

  div.innerHTML = '<div id="stairs-down" class="inactive">' +
                    '<div class=icon>' +
                      '<div class="arrow-1"></div>' +
                      '<div class="arrow-2"></div>' +
                      '<div class="stairs"></div>' +
                    '</div>' +
                  '</div>' +
                  '<div id="stairs-up">' +
                    '<div class=icon>' +
                      '<div class="arrow-1"></div>' +
                      '<div class="arrow-2"></div>' +
                      '<div class="stairs"></div>' +
                    '</div>' +
                  '</div>' ;

  if(config.browser.ie)
  {
    document.getElementById('stairs-up').style.backgroundImage = 'url("/build/img/stairs-up.png")'; 
    document.getElementById('stairs-down').style.backgroundImage = 'url("/build/img/stairs-down.png")';
    document.getElementById('stairs-up').style.display = 'inline';
    document.getElementById('stairs-down').style.display = 'inline';
  }
  document.getElementById('stairs').style.width = '100%';
};
FV.Stairs.prototype.registerElement = function(el, callback) {
  FV.utils.addClickEvent(el, callback);
};
FV.Stairs.prototype.up = function( callback) {
  var that = this;
  this.registerElement(document.getElementById('stairs-up'), function(e) {
    if (that.currentFloor + 1 == that.numFloors)
      return;
    
    that.currentFloor +=1 ;
    callback(e);
    that.check(that.currentFloor);

  });
};
FV.Stairs.prototype.down = function( callback) {
  var that = this;
  
  this.registerElement(document.getElementById('stairs-down'), function(e) {
    if (that.currentFloor === 0)
      return;
    that.currentFloor -= 1;
    callback(e);
    that.check(that.currentFloor);

  });
};
FV.Stairs.prototype.check = function(currentFloor) {
  this.currentFloor = currentFloor;
  if (currentFloor + 1 == this.numFloors)
  { 
    document.getElementById("stairs-up").className = "inactive";
    document.getElementById("stairs-down").className = "";
  }
  else if(currentFloor  === 0)
  {
    document.getElementById("stairs-down").className = "inactive";
    document.getElementById("stairs-up").className = "";
  }
};
FV.Stairs.prototype.hide = function() {
};

FV.Stairs.prototype.show = function() {
};
