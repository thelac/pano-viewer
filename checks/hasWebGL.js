define(function() {
  var canvas = document.createElement('canvas');

  // Test if browser knows what WebGL is and if so, whether or not it can start a WebGL context
  return !!window.WebGLRenderingContext && !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
});