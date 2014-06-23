define(['vendor/hammer.min'], function(Hammer) {

  var getPano = function(krpano, url, hash) {
    var url = url + '/' + hash + '/img.xml';
    console.log(url)
    krpano.call('loadpano("' + url + '",null,MERGE,BLEND(1));');
  };

  var lookAt = function(krpano, ath, atv) {
    krpano.call('lookat(' + ath + ',' + atv + ');');
  };

  var loadXML = function(krpano, panoid) {
    var url = config.absModelURL + options.panoURL + panoid + '/' + panoid + '.xml';
    krpano.call('loadpano("' + url + '",null,MERGE,BLEND(1));');
  };

  var move = function(x, y, z, orientation, floor) {
    var hlookat = krpano.get('view.hlookat');
    var vlookat = krpano.get('view.vlookat');

    var dir = Math.round((((hlookat % 360) + 360) % 360) / 45) * 45;
    console.log(dir);
    console.log(hlookat, vlookat);

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

    if (hash in cfg) {
      x = xt;
      y = yt;
      z = zt;
      console.log(x, y, z)
      getPano(krpano, hash);
      lookAt(krpano, hlookat, vlookat);
    }
  }

  return function(krpano, options) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState != 4) return false;
      var cfg = JSON.parse(this.responseText);

      getPano(krpano, options.url, '0_10_0')

      console.log(krpano.call);
    };
    request.open('GET', options.url + '/' + options.json, true);
    request.send(null);


    // var turntables = options.turntables === undefined ? '' : options.turntables;
    // var videos = options.videos;

    // var menu = new options.Menu();
    // var overlay = new options.Overlay();

    // // var JSON = require('../utils/json2');     don't need??

    // var position = {
    //   x: 0,
    //   y: 0,
    //   z: 0
    // };

    // var x, y, z;
    // var pressed = false;
    // var stairs;

    // var move;
    //     var hash = options.turntables.poi[0].pano;
    //     var url = config.absModelURL + options.stViewImgURL + hash + '/img.xml';
    //     x = parseInt(hash.split('_')[0]);
    //     y = parseInt(hash.split('_')[1]);
    //     z = parseInt(hash.split('_')[2]);

    //     options.getPano(krpano, hash);
    //     options.lookAt(krpano, options.turntables.poi[0].ath, options.turntables.poi[0].atv);

    //     options.utils.addEvent(document, 'mouseup', function(e) {
    //       setTimeout(function() {
    //         document.getElementsByTagName('body')[0].focus();
    //       }, 1);
    //     });



    //     // var arrow = Arrow(function() {
    //     //   return (move(1))
    //     // });
    //     if (document.addEventListener) {
    //       Hammer(document).on('doubletap', function(e) {
    //         move(1, 0);
    //       });
    //     }

    //     options.utils.addEvent(document, 'keydown', function(e) {
    //       if (!pressed) {
    //         if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 40 || e.keyCode === 83) {
    //           var orientation = (e.keyCode === 38 || e.keyCode === 87) ? 1 : -1;
    //           move(orientation, 0);
    //         } else if (e.keyCode === 37 || e.keyCode === 65) {
    //           krpano.set('hlookat_moveforce', -1);
    //         } else if (e.keyCode === 39 || e.keyCode === 68) {
    //           krpano.set('hlookat_moveforce', 1);
    //         } else if (e.keyCode === 82) {
    //           // var orientation = (e.keyCode === 38 || e.keyCode === 87) ? 1 : -1;
    //           // move(0, 1);
    //           // stairs.up;
    //           // $('')
    //           document.getElementById('stairs-up').addEventListener('click');
    //           // $('#stairs-up').click();
    //           // options.utils.addEvent(document.getElementById('stairs-up'), 'mouseup', function(e) {

    //           // });
    //         } else if (e.keyCode === 70) {
    //           // var orientation = (e.keyCode === 38 || e.keyCode === 87) ? 1 : -1;
    //           // move( 0, -1);
    //           // stairs.down;
    //           // options.utils.addEvent(document.getElementById('stairs-down'), 'mouseup',  function(e) {

    //           // });
    //           document.getElementById('stairs-down').addEventListener('click');
    //         }
    //         pressed = true;
    //       }
    //     });

    //     options.utils.addEvent(document, 'keyup', function(e) {
    //       if (e.keyCode === 37 || e.keyCode === 65) {
    //         krpano.set('hlookat_moveforce', 0);
    //       } else if (e.keyCode === 39 || e.keyCode === 68) {
    //         krpano.set('hlookat_moveforce', 0);
    //       }
    //       pressed = false;
    //     });
    //     if (options.stairBox) {
    //       stairs = new options.Stairs();
    //       stairs.up(function() {
    //         move(0, 1);
    //         menu.hide();
    //       });
    //       stairs.down(function() {
    //         move(0, -1);
    //         menu.hide();
    //       });
    //     }
    //   } //end of request.onreadystatechange = function() {

    //   
    //   

    //   var poi = options.stView.poi;

    //   for (var i in poi) {
    //     menu.addItem(poi[i].name, (function(name) {
    //       return (function(e) {
    //         var hash = poi[name].pano;
    //         options.getPano(krpano, hash);
    //         options.lookAt(krpano, poi[name].ath, poi[name].atv);

    //         x = parseInt(hash.split('_')[0]);
    //         y = parseInt(hash.split('_')[1]);
    //         z = parseInt(hash.split('_')[2]);
    //         if (options.stairBox) {
    //           stairs.check(z);
    //         }
    //       })
    //     })(i));
    //   }
    // for (var i in videos) {
    //   menu.addItem(videos[i].name, (function(id) {
    //     return (function(e) {
    //       var video = new options.Vimeo(id);
    //       video.show();
    //     });
    //   })(videos[i].id));
    // }
  };

});