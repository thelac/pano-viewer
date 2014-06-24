// Assumes that panoer is deployed to root of folder

require.config({
  baseUrl: '/',
  paths: {
    'fallback': 'fallback'
  }
});

require(['fallback'], function(fallback) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    console.log(fallback.shouldShow);
    fallback.show('/tests/streetview', {});
});