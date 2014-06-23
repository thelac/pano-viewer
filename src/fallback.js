// lots of refactor/cleanup
// onerror
// noscript
// timeout to ensure all textures load
// automation script (rename 'test' prefix)

// object panoramas: http://krpano.com/tools/droplets/#makeobject
// Clean onPanoLoad once turntables are removed
// fix config file (reorganize: turntable -> POI)
// windows double touch

// overlaymap: http://krpano.com/examples/117/examples/plugin-examples/bingmaps/bingmaps.html
// arrow: http://krpano.com/forum/wbb/index.php?page=Thread&threadID=1223
if (!FV.utils.checkWebGL() && FV.isPerformant) {
  FV.init();
}