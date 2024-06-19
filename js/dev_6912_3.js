//TODO cleanup/refactor this file
var devtoolControls = '<div class="dev-controls"><div class="headline"><h2>Dev Controls</h2><div class="close"></div></div><div class="controls"><div class="flex control-item"><p>Video Controls</p><div id="video-switch" class="switch"><div class="circle"></div><div class="bar"></div></div></div><div class="flex control-item"><p>Color Control</p><div id="color-switch" class="switch"><div class="circle"></div><div class="bar"></div></div></div><div class="flex control-item"><p>Add To Cart</p><div id="atc-state" class="switch"><div class="circle"></div><div class="bar"></div></div></div></div></div></div><div class="picker hide" acp-color="#EFE9E7" acp-show-rgb="no" acp-show-hsl="yes" acp-show-hex="yes" acp-show-alpha style="position: fixed;top: 0;right: 0;"></div>';
document.body.insertAdjacentHTML('beforeend', devtoolControls);

var colorPicker = document.createElement('script');
colorPicker.setAttribute('src','https://cdn.jsdelivr.net/npm/a-color-picker@1.2.1/dist/acolorpicker.min.js');
document.head.appendChild(colorPicker);


var devControlHolder = document.querySelector('.dev-controls');
devControlHolder.classList.add('active');

var controlsSwitch = document.querySelectorAll('.switch');

controlsSwitch.forEach(function (i){
  i.addEventListener('click', function(){
    this.classList.toggle('active');
  });
});

var atcStateSwitch       = document.querySelector('#atc-state'),
      videoControlsSwitch  = document.querySelector('#video-switch'),
      colorSwitch  = document.querySelector('#color-switch');

colorSwitch.addEventListener('click', function(){
  if(this.classList.contains('active')){
    if(document.querySelector(".a-color-picker")) {
      document.querySelector(".picker").classList.remove("hide");
      return;
    }
   document.querySelector(".picker").classList.remove("hide");
   AColorPicker.from('.picker')
  .on('change', function(picker, color) {
    document.documentElement.style.setProperty('--main-color', AColorPicker.parseColor(color, "rgb"));
    document.documentElement.style.setProperty('--main-color-hue', AColorPicker.parseColor(color, "hsl")[0]+"deg");
    document.documentElement.style.setProperty('--main-color-saturation', AColorPicker.parseColor(color, "hsl")[1]+"%");
    document.documentElement.style.setProperty('--main-color-lightness', AColorPicker.parseColor(color, "hsl")[2]+"%");
  });
  }else{
    document.querySelector(".picker").classList.add("hide");
    //location.reload();
  }
});

atcStateSwitch.addEventListener('click', function(){
  if(this.classList.contains('active')){
    if(window.videoTech == "youtube") {
      player.seekTo(window.buttonTiming -4);
    } else if(window.videoTech == "wistia") {
      if(wsFlags.isMobile.phone) {
        Wistia.api(window.videoidM).time(window.buttonTimingMobile -4);
      } else {
        Wistia.api(window.videoidD).time(window.buttonTiming -4);
      }
    } else if(window.videoTech == "test") {
      if(wsFlags.isMobile.phone) {
        Wistia.api(window.videoidM).time(window.buttonTimingMobile -4);
      } else {
        Wistia.api(window.videoidD).time(window.buttonTiming -4);
      }
    } else if(window.videoTech == "vturb") {
      if(wsFlags.isMobile.phone) {
        smartplayer.instances[0].seek(window.buttonTimingMobile -4);
      } else {
        smartplayer.instances[0].seek(window.buttonTiming -4);
      }
    }
  }else{
    if(window.videoTech == "youtube") {
      player.seekTo(0);
    } else if(window.videoTech == "wistia") {
      if(wsFlags.isMobile.phone) {
        Wistia.api(window.videoidM).time(0);
      } else {
        Wistia.api(window.videoidD).time(0);
      }
    }  else if(window.videoTech == "test") {
      if(wsFlags.isMobile.phone) {
        Wistia.api(window.videoidM).time(0);
      } else {
        Wistia.api(window.videoidD).time(0);
      }
    } else if(window.videoTech == "vturb") {
      if(wsFlags.isMobile.phone) {
        smartplayer.instances[0].seek(0);
      } else {
        smartplayer.instances[0].seek(0);
      }
    }
    window.localStorage.clear();
    location.reload();
  }
});

// Dev Controls for video
videoControlsSwitch.addEventListener('click', function(){
  var videoPlayBtnOverlay = document.querySelector('.playbutton-overlay');
  var videoPauseBtnOverlay = document.querySelector('.pausebutton-overlay');
        videoPlayBtnOverlay.style.display = 'none';
      videoPauseBtnOverlay.style.display = 'block';

  if(this.classList.contains('active')){
    console.log("active");
    //jwplayer().setControls(1);
    window.localStorage.setItem('controls',1)
    videoPauseBtnOverlay.style.display = 'none';
    videoPlayBtnOverlay.style.display = 'none';
    var params = new URLSearchParams(window.location.search);
    params.set("cntrl", 1);
    var newUrl = window.location.host+window.location.pathname+"?"+params.toString()
    window.location = newUrl;
  }
  if(!this.classList.contains('active')){
    console.log("inactive");
    //jwplayer().setControls(0);
    window.localStorage.setItem('controls',0)

    var params = new URLSearchParams(window.location.search);
    params.set("cntrl", 0);
    var newUrl = window.location.host+window.location.pathname+"?"+params.toString()
    window.location = newUrl;
  }
})

var closeBtn   = document.querySelector('.close');

closeBtn.addEventListener('click', function(){
  document.querySelector(".picker").classList.add("hide");
  devControlHolder.classList.remove('active')
})
