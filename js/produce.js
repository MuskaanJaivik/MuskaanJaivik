/*
    Add Produce Cards
*/
function doesFileExist(file_url) {
    try {
        var http = new XMLHttpRequest();
        http.open('HEAD', file_url, false);
        http.send();
        return http.status != 404;
    }
    catch(err) {
        return false;
    }
}

// card_frame
var card_frame = document.createElement("div");
card_frame.setAttribute("class", "pr_frame");
// add frame to body
document.getElementsByTagName('body')[0].appendChild(card_frame);

for (var i = 0; i != 27; i++) {

    // card container
    var card_container = document.createElement("div");
    card_container.setAttribute("class", "card_container");
    card_container.setAttribute("ontouchstart", "this.classList.toggle('hover');")

    // card
    var card = document.createElement("div");
    card.setAttribute("class", "card");

    // front
    var front = document.createElement("div");
    front.setAttribute("class", "front");

    // image
    var img = document.createElement("img");

    if (doesFileExist("../img/produce/rice.jpg"))
        img.setAttribute("src", "../img/produce/rice.jpg");
    else
        img.setAttribute("src", "../img/produce/placeholder.png");
    img.setAttribute("alt", "image of rice");

    // add image to front
    front.appendChild(img);

    // textbox
    var pr_textbox = document.createElement("div");
    pr_textbox.setAttribute("class", "pr_textbox");

    // textbox text
    var tbt = document.createElement("p");
    tbt.appendChild(document.createTextNode("foo"));

    // add text to textbox
    pr_textbox.appendChild(tbt);

    // add textbox to front
    front.appendChild(pr_textbox);

    // add front to card
    card.appendChild(front);

    // back
    var back = document.createElement("div");
    back.setAttribute("class", "back");

    // back text
    var bt = document.createElement("p");
    //bt.appendChild(document.createTextNode("<b>Annual Production</b><br>700kg<br><br><b>Month Harvested</b><br>October<br><br><b>Availability</b><br>Full Year<br><br>"));
    bt.appendChild(document.createTextNode("foo"));
    bt.appendChild( document.createElement("b").appendChild(document.createTextNode("foo")) );

    // add text to back
    back.appendChild(bt);

    // add back to card
    card.appendChild(back);

    // add card to cardcontainer
    card_container.appendChild(card);

    card_frame.appendChild(card_container);

}

//var ww = document.getElementsByTagName("body")[0].offsetWidth;
var ww = window.innerWidth;
var p = document.getElementsByClassName("card_container")[0];
var style = p.currentStyle || window.getComputedStyle(p);
var wpc = document.getElementsByClassName("card_container")[0].offsetWidth + 2 * parseInt(style.marginLeft, 10);
var margin = (ww - Math.floor(ww/wpc) * wpc) / 2 - 12;
card_frame.setAttribute("style", "margin: " + margin + "px;");