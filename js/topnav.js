
var container = createNavContainer();
var navbar = createBar();

// Logo
//
var logo = createLogoContainer();
// Drawing
var logo_draw = document.createElement("canvas");
logo_draw.setAttribute("id", "logo_draw");
logo_draw.setAttribute("width", "100px");
logo_draw.setAttribute("height", "100");
drawLogo(logo_draw);
logo.appendChild(logo_draw);
// Text
var logo_text = document.createElement("div");
logo_text.setAttribute("id", "logo_text");
logo_text.appendChild(document.createTextNode("MUSKAAN JAIVIK SHG"));
logo.appendChild(logo_text);

// Add Logo Link
logo.addEventListener("click", function(){
    window.open("/MuskaanJaivik/index.html", "_self");
});
logo_text.addEventListener("click", function(){
    window.open("/MuskaanJaivik/index.html", "_self");
});

// Top Nav Entries
//
var contact = createTab("Contact", "/MuskaanJaivik/contact/index.html")
var photos = createTab("Photos", "/MuskaanJaivik/photos/index.html")
var blog = createTab("Blog", "/MuskaanJaivik/blog/index.html")
var projects = createTab("Projects", "/MuskaanJaivik/projects/index.html")
var produce = createTab("Produce", "/MuskaanJaivik/produce/index.html")

// Set Active
switch (document.getElementsByTagName("body")[0].getAttribute("id")) {
    case ("contact-page"):
        contact.setAttribute("id", "active");
        break;
    case ("photos-page"):
        photos.setAttribute("id", "active");
        break;
    case ("blog-page"):
        blog.setAttribute("id", "active");
        break;
    case ("projects-page"):
        projects.setAttribute("id", "active");
        break;
    case ("produce-page"):
        produce.setAttribute("id", "active");
        break;
}

// Hamburger Icon
createHamburgerIcon();

function createNavContainer() {
    var container = document.createElement("div");
    container.setAttribute("id", "topnav_container");
    container.style.zIndex = 40;
    document.getElementsByTagName("body")[0].appendChild(container);
    return container;
}

function createLogoContainer() {
    var logo_container = document.createElement("div");
    logo_container.setAttribute("class", "logo_container");
    container.appendChild(logo_container);
    container.setAttribute("class", "closed");
    return logo_container;
}

function createBar() {
    var bar = document.createElement("div");
    bar.setAttribute("id", "topnav");
    container.appendChild(bar);
    return bar;
}

function createTab(name, path) {
    var tab = document.createElement("li");
    tab.setAttribute("class", "tab");
    tab.setAttribute("id", name.toLowerCase());
    var link = document.createElement("a");
    link.setAttribute("href", path);
    link.appendChild(document.createTextNode(name));
    tab.appendChild(link);
    navbar.appendChild(tab);
    return tab;
}

function createLogo() {
    var logo = document.createElement("li");
    logo.setAttribute("class", "logo");
    navbar.appendChild(logo);
    var canvas = document.createElement("canvas");
    //canvas.style.width = "200px";
    //canvas.style.height = "100px";
    canvas.setAttribute("width", "100");
    canvas.setAttribute("height", "100");
    logo.appendChild(canvas);
    drawLogo(canvas);
}

function createHamburgerIcon() {
    var icon = document.createElement("button");
    icon.setAttribute("class", "hamburger hamburger--spin");
    icon.setAttribute("type", "button");
    container.appendChild(icon);
    var span = document.createElement("span");
    span.setAttribute("class", "hamburger-box");
    icon.appendChild(span);
    var span_inner = document.createElement("span");
    span_inner.setAttribute("class", "hamburger-inner");
    span.appendChild(span_inner);
    
    icon.addEventListener("click", function(){
        if (!icon.getAttribute("class").includes("is-active")) {
            icon.setAttribute("class", icon.getAttribute("class") + " is-active");
            container.setAttribute("class", "extended");
        }
        else {
            icon.setAttribute("class", icon.getAttribute("class").replace(" is-active", ""));
            container.setAttribute("class", "closed");
        }
    });
}

function drawLogo(canvas) {
    var h = canvas.height;
    var w = canvas.width;
    //var scale = h/643;
    var scale = w/643;
    
    //var off_y = (h-463)/2;
    //var off_y = (h-scale*463/1.5)/2;
    var off_y = (h-scale)/2;
    var top_w = 112;
    var top_h = 54;
    var off_interseg_y = top_h+4 + off_y;
    var interseg_w = 78;
    var interseg_h = 29;
    var off_cup_y = off_interseg_y + interseg_h + 4;
    var cupola_h = 142;
    var cupola_w = 642;
    var off_cup_base_x = 64;
    var off_cup_base_y = 25;
    var cup_top_w = 104;
    var cup_top_h = 14;
    var off_win_x = 54;
    var off_win_y = cupola_h+7+off_cup_y;
    var win_small_w = 76;
    var win_big_w = 186;
    var win_spacing = 5;
    var win_y = off_win_y;
    var win1_x = off_win_x;
    var win2_x = win1_x+win_small_w+win_spacing;
    var win3_x = win2_x+win_big_w+win_spacing;
    var win4_x = win3_x+win_big_w+win_spacing;
    // polygons
    //
    function Point(x, y){
        this.x = x;
        this.y = y;
    }
    var win1 = [new Point(win1_x, win_y), new Point(win1_x, win_y+169), new Point(win1_x+win_small_w, win_y+216), new Point(win1_x+win_small_w, win_y)];
    var win1a = [new Point(win1_x, win_y+114), new Point(win1_x+22, win_y+114), new Point(win1_x+54, win_y+125), new Point(win1_x+win_small_w, win_y+125), new Point(win1_x+win_small_w, win_y+216), new Point(win1_x, win_y+169)];
    var win1b = [new Point(win1_x, win_y+114), new Point(win1_x, win_y), new Point(win1_x+win_small_w, win_y), new Point(win1_x+win_small_w, win_y+126), new Point(win1_x+win_small_w-22, win_y+126), new Point(win1_x+win_small_w-22, win_y+38), new Point(win1_x+22, win_y+38), new Point(win1_x+22, win_y+114)];
    var win2a = [new Point(win2_x, win_y+142), new Point(win2_x+62, win_y+142), new Point(win2_x+124, win_y+144), new Point(win2_x+win_big_w, win_y+144), new Point(win2_x+win_big_w, win_y+229), new Point(win2_x, win_y+218)];
    var win2b = [new Point(win2_x, win_y+143), new Point(win2_x, win_y), new Point(win2_x+186, win_y), new Point(win2_x+186, win_y+145), new Point(win2_x+124, win_y+145), new Point(win2_x+124, win_y+38), new Point(win2_x+62, win_y+38), new Point(win2_x+62, win_y+144)];
    var win3a = [new Point(win3_x, win_y+144), new Point(win3_x+62, win_y+144), new Point(win3_x+124, win_y+142), new Point(win3_x+186, win_y+142), new Point(win3_x+186, win_y+219), new Point(win3_x, win_y+229)];
    var win3b = [new Point(win3_x, win_y+146), new Point(win3_x, win_y), new Point(win3_x+186, win_y), new Point(win3_x+186, win_y+144), new Point(win3_x+124, win_y+144), new Point(win3_x+124, win_y+38), new Point(win3_x+62, win_y+38), new Point(win3_x+62, win_y+146)];
    var win4a = [new Point(win4_x, win_y+216), new Point(win4_x+76, win_y+169), new Point(win4_x+76, win_y+114), new Point(win4_x+54, win_y+114), new Point(win4_x+22, win_y+125), new Point(win4_x, win_y+125)];
    var win4b = [new Point(win4_x, win_y+126), new Point(win4_x, win_y), new Point(win4_x+76, win_y), new Point(win4_x+76, win_y+114), new Point(win4_x+54, win_y+114), new Point(win4_x+54, win_y+38), new Point(win4_x+22, win_y+38), new Point(win4_x+22, win_y+126)];
    
    var cup_base = [new Point(0, off_cup_y+cupola_h), new Point(off_cup_base_x, off_cup_y+cupola_h-off_cup_base_y), new Point(cupola_w-off_cup_base_x, off_cup_y+cupola_h-off_cup_base_y), new Point(cupola_w, off_cup_y+cupola_h)];
    var cup_top = [new Point(cupola_w/2-cup_top_w/2, off_cup_y+cup_top_h), new Point(cupola_w/2-cup_top_w/2, off_cup_y), new Point(cupola_w/2+cup_top_w/2, off_cup_y), new Point(cupola_w/2+cup_top_w/2, off_cup_y+cup_top_h)];
    var interseg = [new Point(cupola_w/2-interseg_w/2, off_interseg_y), new Point(cupola_w/2-interseg_w/2, off_interseg_y+interseg_h), new Point(cupola_w/2+interseg_w/2, off_interseg_y+interseg_h), new Point(cupola_w/2+interseg_w/2, off_interseg_y)];
    var topseg = [new Point(cupola_w/2-top_w/2, off_y+top_h), new Point(cupola_w/2, off_y), new Point(cupola_w/2+top_w/2, off_y+top_h)];
    var polygons = [win1a, win1b, win2a, win2b, win3a, win3b, win4a, win4b, cup_base, cup_top, interseg, topseg];
    // apply scale
    for (var p = 0; p < polygons.length; p++) {
        for (var i = 0; i < polygons[p].length; i++) {
            polygons[p][i].x *= scale;
            polygons[p][i].y *= scale;
        }
    }
    // draw
    //
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#f7f4f4";
    for (var p = 0; p < polygons.length; p++) {
        ctx.beginPath();
        for (var i = 0; i < polygons[p].length; i++){
            if (i==0)
                ctx.moveTo(polygons[p][i].x, polygons[p][i].y);
            else
                ctx.lineTo(polygons[p][i].x, polygons[p][i].y);
        }
        ctx.closePath();
        ctx.fill();
    }
    // draw dome
    ctx.beginPath();
    ctx.moveTo(scale*(off_cup_base_x), scale*(off_cup_y+cupola_h-off_cup_base_y));
    ctx.bezierCurveTo(scale*(cupola_w/3), scale*(off_cup_y-30), scale*(cupola_w-cupola_w/3), scale*(off_cup_y-30), scale*(cupola_w-off_cup_base_x), scale*(off_cup_y+cupola_h-off_cup_base_y));
    ctx.closePath();
    ctx.fill();
}

// Hide Navbar when scrolling down

var scroll_old = 0;
window.addEventListener("scroll", function() {
    
});
