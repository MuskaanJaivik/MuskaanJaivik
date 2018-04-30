
var is_touch = HasTouchScreen();

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
    if (is_touch)
        return;
    // Scroll whole screen when scrolling down from top
    if (scroll_old < window.scrollY && window.scrollY < document.getElementsByClassName("banner")[0].offsetHeight && !is_scrolling) {
        is_scrolling = true;
        setTimeout(function(){is_scrolling = false}, 500);
        setTimeout(function(){ScrollDown()}, 1);
    }

    // Scroll whole screen when scrolling up in banner
    if (scroll_old > window.scrollY && window.scrollY < document.getElementsByClassName("banner")[0].offsetHeight && !is_scrolling) {
        is_scrolling = true;
        setTimeout(function(){is_scrolling = false}, 500);
        setTimeout(function(){ScrollUp()}, 1);
    }
    scroll_old = window.scrollY;
}

function ScrollDown() {
    var tmp = document.getElementsByTagName("body")[0].style.overflow;
    /*document.getElementsByTagName("body")[0].style.overflow = "hidden";
    setTimeout(function() { document.getElementsByTagName("body")[0].style.overflow = "initial"; }, 300);*/
    window.removeEventListener("scroll", ScrollHandler);
    window.scrollTo({
        top: document.getElementsByClassName("banner")[0].offsetHeight,
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

//document.getElementsByTagName("body")[0].style.overflow = "hidden";

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