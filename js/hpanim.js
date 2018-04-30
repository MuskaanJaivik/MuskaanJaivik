
var is_touch = HasTouchScreen();

var scroll_old = 0;
var scroll_icon = document.getElementsByClassName("material-icons")[0];
window.addEventListener("scroll", function(){
    if (window.scrollY > 0.2*window.innerHeight && scroll_icon.style.display != "none")
        scroll_icon.style.display = "none";
    else {
        if (scroll_icon.style.display == "none")
            scroll_icon.style.display = "initial";
        scroll_icon.style.opacity = 1 - window.scrollY / (window.innerHeight * 0.2);
    }
    if (is_touch)
        return;
    // Scroll whole screen when scrolling down from top
    if (scroll_old < window.scrollY && window.scrollY < document.getElementsByClassName("banner")[0].offsetHeight) {
        ScrollDown();
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
});

document.getElementsByClassName("material-icons")[0].addEventListener("click", function(){ScrollDown();});

function ScrollDown() {
    var tmp = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({
        /*top: document.getElementById("intro_text").getBoundingClientRect().top - document.getElementById("topnav_container").getBoundingClientRect().bottom,*/
        top: document.getElementsByClassName("banner")[0].offsetHeight,
        behavior: "smooth"
    });
    document.body.style.overflow = tmp;
}

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