
var browser = DetectBrowser();
console.log("Detected browser: " + browser);

// Adjust Banner Height
HandleResize();

var is_mobile = IsMobilePhone();

// Resize Handler
//
RegisterOnResize();
function RegisterOnResize() {
    if (is_mobile) {
        document.getElementById("hp_banner").style.height = document.getElementById("hp_banner").offsetHeight + "px";
        return;
    }
    try {
        OnResizeStop(HandleResize);
    } catch(err) {
        setTimeout(RegisterOnResize, 500);
    }
}
function HandleResize() {
    try {
        document.getElementById("hp_banner").style.height = window.innerHeight - GetTopnavHeight() + "px";
        document.getElementById("hp_banner").style.top = GetTopnavHeight() + "px";
    }
    catch(err) {
        setTimeout(HandleResize, 500);
    }
}

// Detect Browser
//
function DetectBrowser() {
    if( (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0 ) return "opera";
    // Firefox 1.0+
    if ( typeof InstallTrigger !== 'undefined' ) return "firefox";
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    if ( /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)) ) return "safari";
    // Internet Explorer 6-11
    if ( /*@cc_on!@*/false || !!document.documentMode ) return "internet explorer";
    // Edge 20+
    if (!!window.StyleMedia ) return "edge";
    // Chrome 1+
    if ( !!window.chrome && !!window.chrome.webstore ) return "chrome";
    return "unknown";
}

// Detect Mobile Phone
//
function IsMobilePhone() {
    if (window.innerWidth <= 720 && window.innerHeight <= 1280 && HasTouchScreen() && typeof window.orientation !== 'undefined')
        return true;
    else
        return false;
}

// Detect Touch Screen
//
function HasTouchScreen() {
    return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}

// Get Topnav Height
//
function GetTopnavHeight() {
    var bottom;
    if (window.innerWidth < 800 && window.innerHeight < 900)
        bottom = 0.11 * window.innerHeight;
    else
        bottom = 100;
    return bottom;
}


/***********************
    Scroll Animation
***********************/

var scroll_position = 0;
var scroll_position_old = 0;
var delta_scroll = 0;
var body = document.getElementById("hp_content");

// Scroll Event Listener
//
window.addEventListener("scroll", function(){
    scroll_position_old = scroll_position
    scroll_position = window.pageYOffset;
    delta_scroll = scroll_position - scroll_position_old;
    HandleScroll();
});

// Scroll Button Click
//
AddButtonClick();
function AddButtonClick() {
    try {
        document.getElementById("scroll_down_button").addEventListener("click", function(){
            delta_scroll = 1;
            HandleScroll();
        });
    } catch(err) {
        setTimeout(AddButtonClick, 500);
    }
}

// Handle Scroll Event
//
function HandleScroll() {
    if (HasTouchScreen())
        return;
    document.getElementById("scroll_down_button").style.opacity = 1 - window.scrollY / (window.innerHeight * 0.2);
    if (in_scroll)
        return;
    // Scrolled Down
    if (delta_scroll > 0) {
        // from top of page
        if (scroll_position  < document.getElementById("hp_banner").offsetHeight) {
            //window.scrollTo(0, document.getElementById("hp_banner").offsetHeight);
            TransferTo(document.getElementById("hp_banner").offsetHeight);
        }
    }
    // Scrolled Up
    else if (delta_scroll < 0) {
        if (scroll_position < document.getElementById("hp_banner").offsetHeight) {
            TransferTo(0);
        }
    }
}

// Transfer To
//
var in_scroll = false;
function TransferTo(target_top, time = 500) {
    if (target_top < 0 || target_top == scroll_position)
        return;
    in_scroll = true;
    var org1 = document.getElementById("hp_content").style.width;
    var org2 = document.getElementById("topnav_container").style.width;
    var org3 = document.getElementById("hp_banner").style.width;
    document.getElementById("hp_content").style.width = document.getElementById("hp_content").clientWidth + "px";
    document.getElementById("topnav_container").style.width = document.getElementById("topnav_container").clientWidth + "px";
    document.getElementById("hp_banner").style.width = document.getElementById("hp_banner").clientWidth + "px";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    window.scrollTo({top: target_top, behavior: "smooth"});
    OnScrollStop(function() {
        document.getElementsByTagName("body")[0].style.overflowY = "initial";
        document.getElementById("hp_content").style.width = org1;
        document.getElementById("topnav_container").style.width = org2;
        document.getElementById("hp_banner").style.width = org3;
        in_scroll = false;
    });
}



function OnScrollStop(callback) {
    var in_process = false;
    var timeout;
    var delay = 50;
    window.addEventListener("scroll", function() {
        if (!in_process) {
            in_process = true;
            timeout = setTimeout(function() {
                in_process = false;
                callback();
            }, delay);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                in_process = false;
                callback();
            }, delay);
        }
    });
}