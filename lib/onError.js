define(['utils/addEvent', 'utils/addClickEvent'], function(addEvent, addClickEvent) {
  return function(options) {
    window.location('http://get.adobe.com/flashplayer/');
    // var bClick = false;
    // var ath = options.stView === undefined ? 0 : options.stView.poi[0].ath;
    // var side;
    // var hash = options.stView === undefined ? 0 : options.stView.poi[0].pano;

    // ath = ath % 360;
    // if (ath < 0) {
    //   ath += 360;
    // }
    // // console.log(ath);
    // if (ath < 45 || ath >= 315)
    //   side = 'f';
    // else if (ath < 135 && ath >= 45)
    //   side = 'r';
    // else if (ath < 225 && ath >= 135)
    //   side = 'b';
    // else if (ath < 315 && ath >= 225)
    //   side = 'l';

    // document.getElementById('overlay').style.visibility = 'hidden';
    // document.getElementById('menu-button').style.visibility = 'hidden';

    // var previewUrl;
    // if (options.stView === undefined)
    //   previewUrl = config.absModelURL + options.panoURL + '1/1.jpg';
    // else
    //   previewUrl = config.absModelURL + options.stViewImgURL + hash + '/img_f.jpg';

    // var element = document.getElementById('fallback');
    // var flashFallback = document.createElement('div');
    // flashFallback.id = 'flashFallback';

    // var body = document.getElementsByTagName('body')[0];
    // body.appendChild(flashFallback);

    // var flashFallbackMessage = document.createElement('div');
    // flashFallbackMessage.id = 'flashFallbackMessage';
    // flashFallbackMessage.innerHTML = '<a title="Download the Adobe Flash Player to view" href="http://get.adobe.com/flashplayer/"><img src="/build/img/flash.png"></a></br>Adobe Flash Player Required. Please click <a href="http://get.adobe.com/flashplayer/">here</a> to download.</br>Or switch to a modern browser such as <a href=https://www.google.com/chrome/browser/>Chrome</a> to experience the interactive content.';

    // flashFallback.appendChild(flashFallbackMessage);
    // flashFallback.style.background = "url('" + previewUrl + "') no-repeat center auto";

    // var flashFallbackBlock = document.createElement('div');
    // flashFallbackBlock.id = 'flashFallbackBlock';
    // flashFallback.appendChild(flashFallbackBlock);

    // flashFallbackMessage.style.visibility = 'hidden';
    // flashFallbackBlock.style.visibility = 'hidden';
    // addClickEvent(flashFallback, function(e) {
    //   if (!bClick) {
    //     flashFallbackMessage.style.visibility = 'visible';
    //     flashFallbackBlock.style.visibility = 'visible';
    //   } else {
    //     flashFallbackMessage.style.visibility = 'hidden';
    //     flashFallbackBlock.style.visibility = 'hidden';
    //   }
    //   bClick = !bClick;
    // });

    // addEvent(document, 'keydown', function(e) {

    //   if (!bClick) {
    //     flashFallbackMessage.style.visibility = 'visible';
    //     flashFallbackBlock.style.visibility = 'visible';
    //   } else {
    //     flashFallbackMessage.style.visibility = 'hidden';
    //     flashFallbackBlock.style.visibility = 'hidden';
    //   }
    //   bClick = !bClick;
    // });
  };
});