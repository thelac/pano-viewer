// takes a relative URL to panorama folder, streetview json file, and streetview image URL

FV.init = function (opts) {
  if (!FV.utils.checkWebGL()) {

    FV.panoURL = opts.panoURL; // 'data/fallback/panoramas/'
    FV.stViewJSON = opts.stViewJSON; // 'data/fallback/streetview/streetview.json'
    FV.stViewImgURL = opts.stViewImgURL; // 'data/fallback/streetview/'
    FV.stView = opts.stView; // config.streetview
    FV.turntables = opts.turntables; //config.fallback.turntables
    FV.videos = opts.videos; // config.fallback.videos
    FV.overlayMap = opts.overlayMap; // config.overlaymap
    FV.stairBox = opts.stairBox; //config.stairBox

    FV.setMeta();

    var pano = new FV.pano();

    var head = document.getElementsByTagName('head')[0];
    var body = document.getElementsByTagName('body')[0];

    var fallback = document.createElement('div');
    fallback.id = 'fallback';
    body.appendChild(fallback);

    var style = document.getElementsByTagName('link')[0];
    head.removeChild(style);

    pano.embedpano({
      swf: "/build/swf/pano.swf",
      html5: "prefer",
      id: "image",
      target: "fallback",
      xml: "/build/xml/pano.xml",
      passQueryParameters: true,
      onready: FV.onPanoLoad,
      // consolelog: true,
      onerror: FV.onPanoError,
      wmode: "transparent"
    });
  }
};
