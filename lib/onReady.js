define(['checks/isIE', 'vendor/hammer.min', 'utils/objectKeys', 'utils/json2', 'utils/addEvent', 'gui/overlay'], 
  function(isIE, Hammer, objectKeys, JSON, addEvent, overlay) {

  if (!isIE) {
    require(['gui/oculusButton']);
  }

  var x, y, z;
  var pressed = false;
  var stairs;
  var config;
  var url;

  var getPano = function(krpano, url, hash) {
    var url = url + '/' + hash + '/img.xml';
    krpano.call('loadpano("' + url + '",null,MERGE,BLEND(1));');
  };

  var lookAt = function(krpano, ath, atv) {
    krpano.call('lookat(' + ath + ',' + atv + ');');
  };

  var move = function(krpano, url, orientation, floor) {
    var hlookat = krpano.get('view.hlookat');
    var vlookat = krpano.get('view.vlookat');

    var dir = Math.round((((hlookat % 360) + 360) % 360) / 45) * 45;

    var xt = x;
    var yt = y;
    var zt = z + floor;
    if (dir === 0 || dir === 360 || dir === 45 || dir === 315) {
      xt += orientation;
    }
    if (dir === 180 || dir === 135 || dir === 225) {
      xt -= orientation;
    }
    if (dir === 45 || dir === 90 || dir === 135) {
      yt -= orientation;
    }
    if (dir === 225 || dir === 270 || dir === 315) {
      yt += orientation;
    }

    var hash = xt + '_' + yt + '_' + zt;

    if (hash in config) {
      x = xt;
      y = yt;
      z = zt;
      console.log(x, y, z)
      getPano(krpano, url, hash);
      lookAt(krpano, hlookat, vlookat);
    }
  };

  var handleEvents = function(krpano, url) {
    if (document.addEventListener) {
      Hammer(document).on('doubletap', function(e) {
        move(krpano, url, 1, 0);
      });
    }

    addEvent(document, 'mouseup', function(e) {
      setTimeout(function() {
        document.getElementsByTagName('body')[0].focus();
      }, 1);
    });

    addEvent(document, 'keydown', function(e) {
      if (!pressed) {
        if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 40 || e.keyCode === 83) {
          var orientation = (e.keyCode === 38 || e.keyCode === 87) ? 1 : -1;
          move(krpano, url, orientation, 0);
        } else if (e.keyCode === 37 || e.keyCode === 65) {
          krpano.set('hlookat_moveforce', -1);
        } else if (e.keyCode === 39 || e.keyCode === 68) {
          krpano.set('hlookat_moveforce', 1);
        } else if (e.keyCode === 82) {
          document.getElementById('stairs-up').addEventListener('click');
        } else if (e.keyCode === 70) {
          document.getElementById('stairs-down').addEventListener('click');
        }
        pressed = true;
      }
    });

    addEvent(document, 'keyup', function(e) {
      if (e.keyCode === 37 || e.keyCode === 65) {
        krpano.set('hlookat_moveforce', 0);
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        krpano.set('hlookat_moveforce', 0);
      }
      pressed = false;
    });
  };

  return function(krpano, options) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState != 4) return false;

      config = JSON.parse(this.responseText);

      var hash = Object.keys(config)[0];

      getPano(krpano, options.url, hash);

      x = parseInt(hash.split('_')[0]);
      y = parseInt(hash.split('_')[1]);
      z = parseInt(hash.split('_')[2]);

      handleEvents(krpano, options.url);
    };
    request.open('GET', options.url + '/' + options.json, true);
    request.send(null);

  };
});