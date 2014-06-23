define(['gui/meta', 'vendor/krpano', 'lib/onError', 'lib/onReady'], function(meta, krpano, onerror, onready) {
  return function(url, options) {

    options = options || {};
    options.url = url.substr(url.length - 1) === '/' ?
      url.substring(0, url.length - 1) : url;;
    options.redirect = options.redirect === null ? false : true;
    options.json = options.json || 'streetview.json';

    console.log(krpano)

    // meta();
    // FV.panoURL = options.panoURL; // 'data/fallback/panoramas/'
    // FV.stViewJSON = options.stViewJSON; // 'data/fallback/streetview/streetview.json'
    // FV.stViewImgURL = options.stViewImgURL; // 'data/fallback/streetview/'
    // FV.stView = options.stView; // config.streetview
    // FV.turntables = options.turntables; //config.fallback.turntables
    // FV.videos = options.videos; // config.fallback.videos
    // FV.overlayMap = options.overlayMap; // config.overlaymap
    // FV.stairBox = options.stairBox; //config.stairBox

    // FV.setMeta();

    // var krpano = new krpano();

    var head = document.getElementsByTagName('head')[0];
    var body = document.getElementsByTagName('body')[0];

    var fallback = document.createElement('div');
    fallback.id = 'fallback';
    body.appendChild(fallback);

    // TODO: This is really ghetto.
    var style = document.getElementsByTagName('link')[0];
    if (style) head.removeChild(style);

    var script = document.createElement('link');

    script.rel = 'stylesheet';
    script.type = 'text/css';
    script.href = '/assets/css/style.css';

    head.appendChild(script);

    krpano.embedpano({
      swf: "../assets/swf/pano.swf",
      html5: "prefer",
      id: "image",
      target: "fallback",
      xml: "../assets/xml/pano.xml",
      passQueryParameters: true,
      onready: function(kr) {
        onready(kr, options);
      },
      // consolelog: true,
      onerror: onerror,
      wmode: "transparent"
    });
  };
});