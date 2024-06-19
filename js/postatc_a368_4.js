/* eslint-disable */
function updateTimer(e) {
  var t = parseInt(e.dataset.time, 10),
      r = setInterval(function () {
          if (t <= 0) return clearInterval(r), void(e.innerHTML = "00:00");
          var n = Math.floor(t / 60),
              o = t % 60,
              i = ("0" + n).slice(-2) + ":" + ("0" + o).slice(-2);
          e.innerHTML = i, t--
      }, 1e3)
}


function setupFaq() {
  var faqList = document.querySelector('.faq__list');
  var faqItems = faqList.querySelectorAll('.faq__item');

  faqItems.forEach(function(item) {
      var faqCtrl = item.querySelector('.faq__ctrl');
      var faqAnswer = item.querySelector('.faq__answer');

      faqCtrl.addEventListener('click', function() {
          faqAnswer.classList.toggle('opened');
          faqCtrl.classList.toggle('opened');
          faqAnswer.style.height = faqAnswer.classList.contains('opened') ? faqAnswer.scrollHeight + 'px' : null;
      });
  });
}
function orderButtonClick() {
  var selectionButtons = document.querySelectorAll(".section__second");
  var lastItem, closestItem;
  if (selectionButtons[0] && !selectionButtons[0].offsetParent) {
    return true;
  }

  selectionButtons.forEach(function(item) {
    distanceToItem =item.getBoundingClientRect().top ;
    if(lastItem ){
      if(distanceToItem >1) {
        closestItem = lastItem;
        return;
      }
    } 

    lastItem= item;
  });
  scrollToSmoothly(window.pageYOffset + lastItem.getBoundingClientRect().top, 1000);
  return false;
}

(function () {

  document.querySelector(".remider__button").onclick = orderButtonClick;
  document.querySelector(".qual__btn").onclick = orderButtonClick;

  function handleScroll() {
    window.scrollY < steper.offsetTop ? remainder.classList.remove("showed") : remainder.classList.add("showed")
  }

  var steper = document.querySelector("#steper"),
    remainder = document.querySelector(".remainder");
  window.addEventListener("scroll", handleScroll);
  //setTimeout(atcViewCheck, 500);
  //var buylink = document.querySelectorAll(".buyLink");
  if (wsFlags.noredirect !== null) {
    /*
   buylink.forEach(function (i) {
     i.href = window.mwdomain + window.mwid + "/" + wsFlags.noredirect + "/" + window.mwint + "/?" + window.variables;
     //i.onclick = orderButtonClick;
   })
   //buylink[0].onclick = orderButtonClick;
   */
    window.oneBottle = window.mwdomain + window.mwid + "/" + wsFlags.noredirect + "/" + window.mw1 + "/?" + window.variables;
    window.threeBottle = window.mwdomain + window.mwid + "/" + wsFlags.noredirect + "/" + window.mw3 + "/?" + window.variables;
    window.sixBottle = window.mwdomain + window.mwid + "/" + wsFlags.noredirect + "/" + window.mw6 + "/?" + window.variables;

  } else {
    //buylink[0].onclick = orderButtonClick;
    if (window.redirectM) {
      window.oneBottle += "&redirect=" + btoa("https://" + window.location.hostname + "/options-bg/1/1/");
      window.threeBottle += "&redirect=" + btoa("https://" + window.location.hostname + "/options-bg/1/3/");
      window.sixBottle += "&redirect=" + btoa("https://" + window.location.hostname + "/options-bg/1/6/");
    }
    window.oneBottle += "&" + window.variables;
    window.threeBottle += "&" + window.variables;
    window.sixBottle += "&" + window.variables;

    var cookieMatch = document.cookie.toString().match('(^|;)\\s*ab-test-cookie\\s*=\\s*([^;]+)');
    var test = (cookieMatch && cookieMatch.pop()) || '';
    if ((test == "new" || test == "new-b" || test == "current") && typeof convert !== "undefined") {
      window.oneBottle += '&_conv_v=' + encodeURIComponent(convert.getCookie("_conv_v")) + '&_conv_s=' + encodeURIComponent(convert.getCookie("_conv_s"));
      window.threeBottle += '&_conv_v=' + encodeURIComponent(convert.getCookie("_conv_v")) + '&_conv_s=' + encodeURIComponent(convert.getCookie("_conv_s"));
      window.sixBottle += '&_conv_v=' + encodeURIComponent(convert.getCookie("_conv_v")) + '&_conv_s=' + encodeURIComponent(convert.getCookie("_conv_s"));
    }

    /*
    buylink.forEach(function (i) {
      i.href = window.orderLinkM + "&" + window.variables;
      //i.onclick = orderButtonClick;
    }); */

  }
  var oneBottleLink = document.querySelectorAll(".order-link-1-bottle");
  var threeBottleLink = document.querySelectorAll(".order-link-3-bottle");
  var sixBottleLink = document.querySelectorAll(".order-link-6-bottle");
  oneBottleLink.forEach(function (link) {
    link.href = window.oneBottle;
    link.addEventListener('click', function (event) {

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "ecommerce": null
      }, {
        "event": "dl_add_to_cart",
        "event_id": window.tm.generate_event_id(),
        "funnel": window.productName,
        "processor": window.processor,
        "affiliate": getUrlParam('aff_id')||getUrlParam('affiliate')||getUrlParam('shield')||getUrlParam('affiliate')||getUrlParam('aff')||null,
		    "subid": getUrlParam('subid')||getUrlParam('subid2')||getUrlParam('tid')||getUrlParam('cid')||null,
        "ecommerce": {
          "currency": "USD",
          "value": window.oneBottlePrice,
          "items": window.tm.oneBottle // see products array below
        }
      });
      // window.location.href = this.href;
      // console.log(window.dataLayer);
    });
  });
  sixBottleLink.forEach(function (link) {
    link.href = window.sixBottle;
    link.addEventListener('click', function (event) {

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "ecommerce": null
      }, {
        "event": "dl_add_to_cart",
        "event_id": window.tm.generate_event_id(),
        "funnel": window.productName,
        "processor": window.processor,
        "affiliate": getUrlParam('aff_id')||getUrlParam('affiliate')||getUrlParam('shield')||getUrlParam('affiliate')||getUrlParam('aff')||null,
		    "subid": getUrlParam('subid')||getUrlParam('subid2')||getUrlParam('tid')||getUrlParam('cid')||null,
        "ecommerce": {
          "currency": "USD",
          "value": window.sixBottlePrice,
          "items": window.tm.sixBottle // see products array below
        }
      });
      // window.location.href = this.href;
      // console.log(window.dataLayer);
    });
  });
  threeBottleLink.forEach(function (link) {
    link.href = window.threeBottle;
    link.addEventListener('click', function (event) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "ecommerce": null
      }, {
        "event": "dl_add_to_cart",
        "event_id": window.tm.generate_event_id(),
        "funnel": window.productName,
        "processor": window.processor,
        "affiliate": getUrlParam('aff_id')||getUrlParam('affiliate')||getUrlParam('shield')||getUrlParam('affiliate')||getUrlParam('aff')||null,
		    "subid": getUrlParam('subid')||getUrlParam('subid2')||getUrlParam('tid')||getUrlParam('cid')||null,
        "ecommerce": {
          "currency": "USD",
          "value": window.threeBottlePrice,
          "items": window.tm.threeBottle // see products array below
        }
      });
      // window.location.href = this.href;
      // console.log(window.dataLayer);
    });
  });

  for (var timerElements = document.querySelectorAll(".timer"), i = 0; i < timerElements.length; i++) updateTimer(timerElements[i]);

  setupFaq();

  if (window.wsFlags.nocountdown && window.wsFlags.nocountdown) {
    var timers = document.querySelectorAll('.timer');

    timers.forEach(function (timer) {
      timer.classList.remove("show");
      timer.classList.add("hide");
    });
  }


})();


