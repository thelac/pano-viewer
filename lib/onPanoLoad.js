// var Hammer = require('hammerjs');
var turntables = FV.turntables === undefined ? '': FV.turntables;
var videos = FV.videos;

var menu = new FV.Menu();
var overlay = new FV.Overlay();

// var JSON = require('../utils/json2');     don't need??

var position = {x:0, y:0, z:0};
var x, y, z;
var pressed = false;
var stairs;
FV.onPanoLoad = function(krpano, panoid) {
  var move;
  if (FV.stView) {
        var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState != 4) return false;
      var cfg = JSON.parse(this.responseText);
      var hash = FV.turntables.poi[0].pano;
      var url = config.absModelURL + FV.stViewImgURL + hash + '/img.xml';
      x = parseInt(hash.split('_')[0]);
      y = parseInt(hash.split('_')[1]);
      z = parseInt(hash.split('_')[2]);

      FV.getPano(krpano, hash);
      FV.lookAt(krpano, FV.turntables.poi[0].ath, FV.turntables.poi[0].atv);

      FV.utils.addEvent(document, 'mouseup', function(e) {
        setTimeout(function() {
          document.getElementsByTagName('body')[0].focus();
        }, 1);
      });

      move = function(orientation, floor) {
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
          FV.getPano(krpano, hash);
          FV.lookAt(krpano, hlookat, vlookat);
        }
      }

      // var arrow = Arrow(function() {
      //   return (move(1))
      // });
      if (document.addEventListener) {
        Hammer(document).on('doubletap', function(e) {
          move(1,0);
        });
      }  
      
      FV.utils.addEvent(document, 'keydown', function(e) {
        if (!pressed) {
          if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 40 || e.keyCode === 83) {
            var orientation = (e.keyCode === 38 || e.keyCode === 87) ? 1 : -1;
            move( orientation, 0);
          } else if (e.keyCode === 37 || e.keyCode === 65) {
            krpano.set('hlookat_moveforce', -1);
          } else if (e.keyCode === 39 || e.keyCode === 68) {
            krpano.set('hlookat_moveforce', 1);
          }else if (e.keyCode === 82) {
            // var orientation = (e.keyCode === 38 || e.keyCode === 87) ? 1 : -1;
            // move(0, 1);
            // stairs.up;
            // $('')
            document.getElementById('stairs-up').addEventListener('click');
            // $('#stairs-up').click();
            // FV.utils.addEvent(document.getElementById('stairs-up'), 'mouseup', function(e) {
              
            // });
          }else if (e.keyCode === 70) {
            // var orientation = (e.keyCode === 38 || e.keyCode === 87) ? 1 : -1;
            // move( 0, -1);
            // stairs.down;
            // FV.utils.addEvent(document.getElementById('stairs-down'), 'mouseup',  function(e) {
              
            // });
            document.getElementById('stairs-down').addEventListener('click');
          }
          pressed = true;
        }
      });

      FV.utils.addEvent(document, 'keyup', function(e) {
        if (e.keyCode === 37 || e.keyCode === 65) {
          krpano.set('hlookat_moveforce', 0);
        } else if (e.keyCode === 39 || e.keyCode === 68) {
          krpano.set('hlookat_moveforce', 0);
        }
        pressed = false;
      });
      if(FV.stairBox)
      {
        stairs = new FV.Stairs();
        stairs.up(function(){
          move(0, 1);
          menu.hide();
        });
        stairs.down(function(){
          move(0, -1);
          menu.hide();
        });
      }
    }//end of request.onreadystatechange = function() {

    request.open('GET', config.absModelURL + FV.stViewJSON, true);
    request.send(null);

    var poi = FV.stView.poi;

    for (var i in poi) {
      menu.addItem(poi[i].name, (function(name) {
        return (function(e) {
          var hash = poi[name].pano;
          FV.getPano(krpano, hash);
          FV.lookAt(krpano, poi[name].ath, poi[name].atv);

          x = parseInt(hash.split('_')[0]);
          y = parseInt(hash.split('_')[1]);
          z = parseInt(hash.split('_')[2]);
          if(FV.stairBox)
          {
            stairs.check(z);
          }
        })
      })(i));
    }
  } else {//old turntalbes
    FV.loadXML(krpano, '1');

    for (var i in turntables) {
      if (i > 0) {
        menu.addItem(turntables[i].name, (function(name) {
          return (function(e) {
            FV.loadXML(krpano, name);
          });
        }) (i));
      }
    }
  }
  for (var i in videos) {
    menu.addItem(videos[i].name, (function(id) {
      return (function(e) {
        var video = new FV.Vimeo(id);
        video.show();
      });
    })(videos[i].id));
  }
};

FV.getPano = function(krpano, hash) {
  var url = config.absModelURL + FV.stViewImgURL + hash + '/img.xml';
  krpano.call('loadpano("' + url + '",null,MERGE,BLEND(1));');
};

FV.lookAt = function(krpano, ath, atv) {
  krpano.call('lookat(' + ath + ',' + atv + ');');
};

FV.loadXML = function(krpano, panoid) {
  var url = config.absModelURL + FV.panoURL + panoid + '/' + panoid + '.xml';
  krpano.call('loadpano("' + url + '",null,MERGE,BLEND(1));');
};

FV.buildXML = function(url, name) {
  var xml = [];
  var url = url + name + '/' + name;

  xml.push('<krpano version="1.17">');

  // view settings
  xml.push('<view hlookat="0" vlookat="0" maxpixelzoom="1.0" fovmax="120" limitview="auto" />');

  // // preview settings
  xml.push('<preview url="' + url + '.tiles/preview.jpg" />');

  // // build image
  xml.push('<image type="CUBE" multires="true" tilesize="256" progressive="true" device="!mobile+!css3d">');

  xml.push('  <level tiledimagewidth="512" tiledimageheight="512" download="view" decode="view">');
  xml.push('    <cube url="' + url + '.tiles/l4_%s_%v_%h.jpg" />');
  xml.push('	</level>');

  xml.push('  <level tiledimagewidth="1024" tiledimageheight="1024" download="view" decode="view">');
  xml.push('    <cube url="' + url + '.tiles/l3_%s_%v_%h.jpg" />');
  xml.push('	</level>');

  xml.push('  <level tiledimagewidth="1024" tiledimageheight="1024" download="view" decode="view">');
  xml.push('    <cube url="' + url + '.tiles/l3_%s_%v_%h.jpg" />');
  xml.push('	</level>');

  xml.push('  <level tiledimagewidth="1024" tiledimageheight="1024" download="view" decode="view">');
  xml.push('    <cube url="' + url + '.tiles/l3_%s_%v_%h.jpg" />');
  xml.push('	</level>');

  xml.push('</image>');

  xml.push('<image type="CUBE" multires="true" tilesize="256" progressive="true" device="mobile|css3d">');
  xml.push('  <level tiledimagewidth="512" tiledimageheight="512" download="view" decode="view">');
  xml.push('    <cube url="' + url + '.tiles/l4_%s_%v_%h.jpg" />');
  xml.push('	</level>');
  xml.push('</image>');

  xml.push('</krpano>');

  xml = xml.join('\n');

  return (xml);
};
