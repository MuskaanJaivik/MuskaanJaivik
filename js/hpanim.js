
var is_touch = HasTouchScreen();
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;
// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


if (isIE)
    alert("This website currently has a lot of bugs in Internet Explorer. Please use Firefox or Google Chrome to view the website as intended.");


var scroll_old = 0;
var scroll_icon = document.getElementsByClassName("material-icons")[0];
var is_scrolling = false;

function ScrollHandler() {
    if (window.scrollY > 0.2*window.innerHeight && scroll_icon.style.display != "none")
        scroll_icon.style.display = "none";
    else {
        if (scroll_icon.style.display == "none")
            scroll_icon.style.display = "initial";
        scroll_icon.style.opacity = 1 - window.scrollY / (window.innerHeight * 0.2);
    }
    if (is_touch || isEdge || isSafari)
        return;
    // Scroll whole screen when scrolling down from top
    if (scroll_old < window.scrollY && window.scrollY < document.getElementById("hp_banner").offsetHeight && !is_scrolling) {
        is_scrolling = true;
        setTimeout(function(){is_scrolling = false}, 500);
        setTimeout(function(){ScrollDown()}, 1);
    }

    // Scroll whole screen when scrolling up in banner
    if (scroll_old > window.scrollY && window.scrollY < document.getElementById("hp_banner").offsetHeight && !is_scrolling) {
        is_scrolling = true;
        setTimeout(function(){is_scrolling = false}, 500);
        setTimeout(function(){ScrollUp()}, 1);
    }
    scroll_old = window.scrollY;
}

function ScrollDown() {
    var tmp = document.getElementsByTagName("body")[0].style.overflow;
    window.removeEventListener("scroll", ScrollHandler);
    window.scrollTo({
        top: document.getElementById("hp_banner").offsetHeight,
        behavior: "smooth"
    });
    window.addEventListener("scroll", ScrollHandler);
}

function ScrollUp() {
    window.removeEventListener("scroll", ScrollHandler);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    window.addEventListener("scroll", ScrollHandler);
}

window.addEventListener("resize", function() {
    FitBanner();
})

window.addEventListener("scroll", ScrollHandler);
FitBanner();
document.getElementsByClassName("material-icons")[0].addEventListener("click", function(){ScrollDown();});

function FitBanner(){
    document.getElementById("hp_banner").style.height = window.innerHeight - calcNavHeight() + "px";
}

function calcNavHeight() {
    var bottom;
    if (window.innerWidth < 800 && window.innerHeight < 900)
        bottom = 0.11 * window.innerHeight;
    else
        bottom = 100;
    return bottom;
}

function HasTouchScreen() {
    return (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
}