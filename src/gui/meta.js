// Sets meta information in document
FV.setMeta = function () {
  var head = document.getElementsByTagName('head')[0];

  var meta = {};

  meta.viewport = document.getElementsByTagName('meta')[0];
  meta.viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

  meta.apple_mobile_web_app_capable = document.createElement('meta');
  meta.apple_mobile_web_app_capable.setAttribute('name', 'apple-mobile-web-app-capable');
  meta.apple_mobile_web_app_capable.setAttribute('content', 'yes');
  head.appendChild(meta.apple_mobile_web_app_capable);

  meta.content_type = document.createElement('meta');
  meta.content_type.setAttribute('http-equiv', 'Content-Type');
  meta.content_type.setAttribute('content', 'text/html;charset=utf-8');
  head.appendChild(meta.content_type);

  meta.x_ua_compatible = document.createElement('meta');
  meta.x_ua_compatible.setAttribute('http-equiv', 'x-ua-compatible');
  meta.x_ua_compatible.setAttribute('content', 'IE=edge');
  head.appendChild(meta.x_ua_compatible);
};