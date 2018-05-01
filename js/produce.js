/*
    Add Produce Cards
*/

// card_frame
var card_frame = document.createElement("div");
card_frame.setAttribute("class", "pr_frame");
// add frame to body
document.getElementsByTagName("body")[0].appendChild(card_frame);

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

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../produce/produce.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

function getRandomColor() {
    var letters = '456789AB';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 8)];
    }
    return color;
}

function addCard(name, image, quantity, harvest, available) {
    // card container
    var card_container = document.createElement("div");
    card_container.setAttribute("class", "card_container");
    //card_container.setAttribute("ontouchstart", "this.classList.toggle('hover');")
    card_container.setAttribute("ontouchend", "this.classList.toggle('hover');")

    // card
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", name);

    // front
    var front = document.createElement("div");
    front.setAttribute("class", "front");

    // image
    if (doesFileExist(image)) {
        var img = document.createElement("img");
        img.setAttribute("src", image);
        img.setAttribute("alt", "image of " + name);
        front.appendChild(img);
    }
    else {
        var back = document.createElement("div");
        //img.setAttribute("src", "../img/produce/placeholder.png");
        back.setAttribute("style", "width: 100%; height: 100%; background-color: " + getRandomColor() + ";");
        back.setAttribute("alt", "random color");
        front.appendChild(back);
    }

    // textbox
    var pr_textbox = document.createElement("div");
    pr_textbox.setAttribute("class", "pr_textbox");

    // textbox text
    var tbt = document.createElement("p");
    tbt.appendChild(document.createTextNode(name));

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
    var b0 = document.createElement("b");
    b0.appendChild(document.createTextNode(name.toUpperCase()));
    bt.appendChild(b0);
    bt.appendChild(document.createElement("br"));
    bt.appendChild(document.createElement("br"));
    var b0 = document.createElement("b");
    b0.appendChild(document.createTextNode("Annual Production"));
    bt.appendChild(b0);
    bt.appendChild(document.createElement("br"));
    bt.appendChild(document.createTextNode(quantity+"kg"));
    bt.appendChild(document.createElement("br"));
    bt.appendChild(document.createElement("br"));
    var b0 = document.createElement("b");
    b0.appendChild(document.createTextNode("Month Harvested"));
    bt.appendChild(b0);
    bt.appendChild(document.createElement("br"));
    bt.appendChild(document.createTextNode(harvest));
    bt.appendChild(document.createElement("br"));
    bt.appendChild(document.createElement("br"));
    var b0 = document.createElement("b");
    b0.appendChild(document.createTextNode("Availability"));
    bt.appendChild(b0);
    bt.appendChild(document.createElement("br"));
    bt.appendChild(document.createTextNode(available));
    bt.appendChild(document.createElement("br"));
    bt.appendChild(document.createElement("br"));

    back.appendChild(bt);

    // add back to card
    card.appendChild(back);

    // add card to cardcontainer
    card_container.appendChild(card);

    card_frame.appendChild(card_container);
}


function LoadCompleteSet() {

    loadJSON(function(response) {
        // Parse JSON string into object
        produce_data = JSON.parse(response);
        var produce = produce_data.produce;

        for (var i = 0; i != produce.length; i++) {
            addCard(produce[i].name, "../img/produce/" + produce[i].name.toLowerCase() + ".jpg", produce[i].quantity, produce[i].harvest, produce[i].available);
        }

        ResizeCards();

    });

}

function ResizeCards() {

    var card = document.getElementsByClassName("card_container")[0];
    var style = card.currentStyle || window.getComputedStyle(card);

    var wpc = card.offsetWidth + parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    var min_margin = 0.22 * window.innerWidth;
    if (Math.floor((window.innerWidth - min_margin) / wpc) < 2) {
        card_frame.style.width = 2 * wpc;
        return;
    }
    card_frame.style.width = Math.floor((window.innerWidth - min_margin) / wpc) * wpc + "px";
}

window.addEventListener("resize", ResizeCards);