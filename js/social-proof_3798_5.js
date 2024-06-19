(function() {
    var data = [];
    var dataIndex = 0;
    var url = '/getList/';
    var notificationTimeout, hideTimeout, showTimeout;
    var notificationElement = document.querySelector('.custom-social-proof'); // Cached reference to the DOM element
    var remainderElement = document.querySelector(".remainder");
    var bottleSelector = ".mobile .prdoucts__cont";
    var mobileATCHeight = remainderElement ? remainderElement.offsetHeight : 0; // Safely accessing offsetHeight
    var style = document.createElement('style');

    // Efficiently add CSS rules to the style element
    style.innerHTML = '@media (max-width: 767px) {' +
        '.showed.custom-social-proof.show {' +
            'transform: translateY(-' + mobileATCHeight + 'px);' +
        '}' +
    '}';
    document.head.appendChild(style); // Append the style element to the head of the document
    function isVisible(selector, partiallyVisible) {
        partiallyVisible = partiallyVisible || false; // Default to false if not provided
        var elements = document.querySelectorAll(selector);
        var innerHeight = window.innerHeight || document.documentElement.clientHeight;
        var innerWidth = window.innerWidth || document.documentElement.clientWidth;
    
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var rect = el.getBoundingClientRect();
            var isVisible = partiallyVisible
                ? ((rect.top > 0 && rect.top < innerHeight) || (rect.bottom > 0 && rect.bottom < innerHeight)) &&
                  ((rect.left > 0 && rect.left < innerWidth) || (rect.right > 0 && rect.right < innerWidth))
                : rect.top >= 0 && rect.left >= 0 && rect.bottom <= innerHeight && rect.right <= innerWidth;
    
            if (isVisible) {
                return true; // Return true immediately when a visible element is found
            }
        }
    
        return false; // Return false if no visible elements are found
    }
    function showNotification() {
        if (!notificationElement) {
            notificationElement = document.querySelector('.custom-social-proof');
        }
        if(isVisible(bottleSelector, true)) { 
            setTimeout(showNotification, 500); // Ensure display: block takes effect
            //console.log("show -stop");
        } else {
            if (notificationElement) {
                notificationElement.style.visibility = 'visible';
                setTimeout(function() {
                    notificationElement.classList.add('show');
                }, 10); // Ensure display: block takes effect
            }
            //console.log("show -go");
            clearTimeout(notificationTimeout);
            notificationTimeout = setTimeout(hideNotification, 5000); // Adjust time as needed
        }
        
    }

    function hideNotification() {
        if (!notificationElement) {
            notificationElement = document.querySelector('.custom-social-proof');
        }
        if (notificationElement) {
            notificationElement.classList.remove('show');
            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(function() {
                notificationElement.style.visibility = 'hidden';
                dataIndex = (dataIndex + 1) % data.length;
                updateNthHtmlContent(data, dataIndex);
            }, 600);
        }
    
        clearTimeout(showTimeout);
        var randomInterval = Math.random() * (12000 - 8000) + 8000;
        showTimeout = setTimeout(showNotification, randomInterval);
        //console.log("hide");
    }

    function addNotificationToBody() {
        var htmlContent = '<section class="custom-social-proof"></section>';
        document.body.insertAdjacentHTML('beforeend', htmlContent);
        notificationElement = document.querySelector('.custom-social-proof');
        addMouseEvents();
    }

    function updateNthHtmlContent(data, elementIndex) {
        if (data.length > elementIndex) {
            var item = data[elementIndex];
            var timeAgo = getTimeAgo(new Date(item.time));
            if (notificationElement) {
                var htmlContent = '<div class="custom-notification">' +
                    '<div class="custom-notification-container">' +
                    '<div class="custom-notification-image-wrapper">' +
                    '<img src="lib/img/prod1.png" alt="" class="middle-back-image"><img src="lib/img/prod1.png" alt="" class="left-back-image"><img src="lib/img/prod1.png" alt="" class="right-back-image">' +
                    '<img src="lib/img/prod1.png" alt="" class="left-front-image"><img src="lib/img/prod1.png" alt="" class="right-front-image"><img src="lib/img/prod1.png" alt="" class="middle-front-image">' +
                    '</div>' +
                    '<div class="custom-notification-content-wrapper"><b>' +
                    '<p class="custom-notification-content"><span class="secondary-color"><b>' +
                    item.name + '</b> from <b>'+item.state+'</b> </p><p class="custom-notification-content large"><b>Just Bought 6 Bottles</b></span></p>'+
                    '<p class="custom-notification-content"><small><span class="timeAgo">' + timeAgo + '</span> <span class="secondary-color">&nbsp;<span id="verified-badge"></span>&nbsp; <span class="secondary-color-lighter">VERIFIED</span></span></small>' +
                    '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                notificationElement.innerHTML = htmlContent;
                var contentElement = notificationElement.querySelector('.custom-notification-content');
                //setTimeout(adjustFontSize(contentElement, 5), 700)
                adjustFontSize(contentElement, 30); // Adjust font size with at least 5px padding
            }
        } else {
            clearTimeout(notificationTimeout);
            clearTimeout(hideTimeout);
            clearTimeout(showTimeout);
        }
    }

    function getTimeAgo(pastTime) {
        var currentDate = new Date();
        var timeDifference = currentDate.getTime() - pastTime.getTime();
        var minutesDifference = Math.floor(timeDifference / 60000);

        if (minutesDifference <= 1) {
            return "1 min ago";
        } else {
            return minutesDifference + ' min ago';
        }
    }

    function fetchData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var jsonData = JSON.parse(xhr.responseText);
                        data = jsonData;
                    } catch (e) {
                        console.error("Error parsing JSON:", e);
                    }
                } else {
                    console.error('HTTP error! status: ' + xhr.status);
                }
            }
        };
        xhr.send();
    }

    function addMouseEvents() {
        if (notificationElement) {
            notificationElement.addEventListener('click', function() {
                clearTimeout(notificationTimeout);
                hideNotification();
            });
            notificationElement.addEventListener('mouseenter', function() {
                clearTimeout(notificationTimeout);
            });
            notificationElement.addEventListener('mouseleave', function() {
                notificationTimeout = setTimeout(hideNotification, 5000);
            });
        }
    }

    function updateCustomStyles() {
        // Create a style element if it doesn't exist
        var style = document.getElementById('customStyles');
        if (!style) {
            style = document.createElement('style');
            style.id = 'customStyles';
            document.head.appendChild(style);
        }
    
        // Set CSS content with dynamic variables
        // Set CSS content with dynamic variables
        style.textContent = 
            '.custom-social-proof .custom-notification {' +
            '    background-color: ' + window.scbg + '!IMPORTANT;' +
            '}' +
            '.custom-social-proof .custom-notification .custom-notification-container .custom-notification-content-wrapper {' +
            '    color: ' + window.sctext + '!IMPORTANT;' +
            '}' +
            '.custom-social-proof .custom-notification .custom-notification-container .custom-notification-content-wrapper .custom-notification-content .secondary-color {' +
            '    color: ' + window.schighlight + '!IMPORTANT;' +
            '}';
    }
    
    function adjustFontSize(element, minimumPadding) {
        var parentWidth = element.parentNode.offsetWidth - minimumPadding;
        var fontSize = parseFloat(window.getComputedStyle(element, null).getPropertyValue('font-size'));
    
        element.style.whiteSpace = 'nowrap'; // Prevent wrapping into multiple lines
    
        var spanElement = element.querySelector("span");
        if (!spanElement) return;  // Exit if no span element is found
    
        // Decrease font size until the span's width fits the parent's width or reaches a minimum font size limit
        //console.log("Reducing font size: " + fontSize + ", span width: " + spanElement.offsetWidth + ", parent width: " + parentWidth);
        while (spanElement.offsetWidth > parentWidth && fontSize > 8) {
            fontSize -= 1;
            element.style.fontSize = fontSize + 'px';
            // Log each step, can be removed once confirmed working
            //console.log("Reducing font size: " + fontSize + ", span width: " + spanElement.offsetWidth + ", parent width: " + parentWidth);
        }
    }

    addNotificationToBody();
    updateCustomStyles();
    fetchData();
    showNotification();

    function handleScroll() {
        var steper = document.querySelector("#steper"),
            socialproof = notificationElement;
        if (window.scrollY < steper.offsetTop) {
            socialproof.classList.remove("showed");
        } else {
            socialproof.classList.add("showed");
        }
    }
    window.addEventListener("scroll", handleScroll);
})();
