
var is_touch = HasTouchScreen();

var scroll_old = 0;
window.addEventListener("scroll", function(){
    if (is_touch)
        return;
    // Scroll whole screen when scrolling down from top
    if (scroll_old < window.scrollY && window.scrollY < document.getElementsByClassName("banner")[0].offsetHeight) {
        var tmp = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        var tmptouch = document.body.style.touchAction;
        document.body.style.touchAction = "none";
        window.scrollTo({
            /*top: document.getElementById("intro_text").getBoundingClientRect().top - document.getElementById("topnav_container").getBoundingClientRect().bottom,*/
            top: document.getElementsByClassName("banner")[0].offsetHeight,
            behavior: "smooth"
        });
        document.body.style.overflow = tmp;
        document.body.style.touchAction = tmptouch;
    }

    // Scroll whole screen when scrolling up in banner
    if (scroll_old > window.scrollY && window.scrollY < document.getElementsByClassName("banner")[0].offsetHeight) {
        var tmp = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.scrollTo({
            /*top: document.getElementById("intro_text").getBoundingClientRect().top - document.getElementById("topnav_container").getBoundingClientRect().bottom,*/
            top: 0,
            behavior: "smooth"
        });
        document.body.style.overflow = tmp;
    }
    scroll_old = window.scrollY;
})

window.addEventListener("resize", function() {
    FitBanner();
})

FitBanner();

function FitBanner(){
    document.getElementsByClassName("banner")[0].style.height = window.innerHeight - calcNavHeight() + "px";
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