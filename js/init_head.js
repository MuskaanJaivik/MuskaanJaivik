var head = document.getElementsByTagName("head")[0];

var path_suffix = "";

// Title
if (head.hasAttribute("id")) {
    var title = document.createElement("title");
    title.appendChild(document.createTextNode(head.getAttribute("id")));
    head.appendChild(title);
    if (head.getAttribute("id") != "Muskaan Jaivik SHG")
        path_suffix = "../";
} else {
    path_suffix = "../";
}

// Viewport
var vp = AddElement("meta");
vp.setAttribute("name", "viewport");
vp.setAttribute("content", "width=device-width, initial-scale=1.0");

// Fonts
AddExternCSS("https://fonts.googleapis.com/css?family=Open+Sans");
AddExternCSS("https://fonts.googleapis.com/css?family=Roboto");
AddExternCSS("https://fonts.googleapis.com/css?family=Slabo+27px");
AddExternCSS("https://fonts.googleapis.com/css?family=Laila");
AddExternCSS("https://fonts.googleapis.com/icon?family=Material+Icons");

// CSS
AddCSS("style");
AddCSS("topnav");
AddCSS("hamburgers");

// Icon
var icon = AddElement("link");
icon.setAttribute("rel", "icon");
icon.setAttribute("href", "icon.png");

// Google Analytics
var scr = AddElement("script");
scr.setAttribute("async", "true");
scr.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=UA-117704903-1");
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-117704903-1');

function AddElement(tag) {
    var element = document.createElement(tag);
    head.appendChild(element);
    return element;
}

function AddCSS(file) {
    var css = AddElement("link");
    css.setAttribute("href", path_suffix + "css/" + file + ".css");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
}

function AddExternCSS(url) {
    var css = AddElement("link");
    css.setAttribute("href", url);
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
}