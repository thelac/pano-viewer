FV.utils.checkWebGL = function () {
  var canvas = document.createElement('canvas');

  if (canvas.getContext) {
    var ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    var webgl = ctx !== undefined && ctx !== null;
    try {
      return !!window.WebGLRenderingContext && (ctx);
    } catch (e) {
      return false;
    }
  } else {
    return false;
  }
};