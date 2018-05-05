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

function loadJSON(callback, file) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
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

// click/touch handler
function ClickHandler() {
    if (this.getElementsByClassName("active").length == 0) {
        var t = document.createElement("div");
        t.setAttribute("class", "active");
        this.appendChild(t)
    }
    else
        this.removeChild(this.getElementsByClassName("active")[0]);
    UpdateRotation(this);
}

// hover start handler
function MouseEnter() {
    if (this.getElementsByClassName("hover").length == 0 && this.getElementsByClassName("active").length == 0){
        var t = document.createElement("div");
        t.setAttribute("class", "hover");
        this.appendChild(t)
    }
    UpdateRotation(this);
}

function isHover(e) {
    return (e.querySelector(':hover') === e);
}

// hover end handler
function MouseOut(e) {
    if (/*!isHover(this) && */this.getElementsByClassName("hover").length != 0)
        this.removeChild(this.getElementsByClassName("hover")[0]);
    UpdateRotation(this);
}

function UpdateRotation(cardcont) {
    var card = cardcont.getElementsByClassName("card")[0];
    if (cardcont.getElementsByClassName("active").length != 0 || cardcont.getElementsByClassName("hover").length != 0) {
        card.style.transform = "rotateY(-180deg)";
        card.style.webkitTransform = "rotateY(-180deg)";
    }
    else {
        card.style.transform = "rotateY(0deg)";
        card.style.webkitTransform = "rotateY(0deg)";
    }
}

function addCard(name, image, quantity, harvest, available, frame) {
    // card container
    var card_container = document.createElement("div");
    card_container.setAttribute("class", "card_container");
    //card_container.setAttribute("ontouchstart", "this.classList.toggle('hover');")
    //card_container.setAttribute("ontouchend", "this.classList.toggle('hover');")
    //card_container.addEventListener("click", TouchHandler);
    /*card_container.setAttribute("ontouchend", "this.classList.toggle('touch');");
    card_container.setAttribute("onhover", "this.classList.toggle('touch');");*/
    card_container.addEventListener("click", ClickHandler);
    card_container.addEventListener("mouseover", MouseEnter);
    card_container.addEventListener("mouseout", MouseOut);

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

    frame.appendChild(card_container);
}

// Use on Homepage
//
function LoadLine(products, frame) {
    LoadCards(products, frame);
    window.addEventListener("resize", function(){ setTimeout(TruncLine, 10)});
    //setTimeout(TruncLine, 10);
}

function TruncLine() {
    var resize_frame = document.getElementsByClassName("pr_frame")[0];
    if (resize_frame.getElementsByClassName("card_container").length == 0) {
        console.log("(TruncLine) no produce cards found");
        return;
    }
    var card = resize_frame.getElementsByClassName("card_container")[0];
    var style = card.currentStyle || window.getComputedStyle(card);
    var hpc = card.offsetHeight + parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    document.getElementsByClassName("pr_frame")[0].style.height = hpc + "px";
}

function LoadCards(products, frame) {
    if (frame.getAttribute("class") != "pr_frame")
        frame.setAttribute("class", "pr_frame");
    loadJSON(function(response) {
        produce_list = JSON.parse(response).produce;
        
        for (var i = 0; i < products.length; i++){
            var pr = FindProduct(products[i], produce_list);
            if (pr == -1) continue;
            else addCard(produce_list[pr].name, "../img/produce/" + produce_list[pr].name.toLowerCase() + ".jpg", produce_list[pr].quantity, produce_list[pr].harvest, produce_list[pr].available, frame);
        }
        ResizeCards();
        TruncLine();
    }, "produce/produce.json");
    
//    setTimeout(function(){ResizeCards()}, 50);
    window.addEventListener("resize", ResizeCards);
}

function FindProduct(product_name, list) {
    for (var i = 0; i < list.length; i++){
        if (list[i].name === product_name)
            return i;
    }
    return -1;
}

// Use on Produce Page
//
function LoadCompleteSet() {
    var card_frame = document.createElement("div");
    card_frame.setAttribute("class", "pr_frame");
    // add frame to body
    document.getElementsByTagName("body")[0].appendChild(card_frame);
    loadJSON(function(response) {
        // Parse JSON string into object
        produce_data = JSON.parse(response);
        var produce = produce_data.produce;

        for (var i = 0; i != produce.length; i++) {
            addCard(produce[i].name, "../img/produce/" + produce[i].name.toLowerCase() + ".jpg", produce[i].quantity, produce[i].harvest, produce[i].available, card_frame);
        }
        ResizeCards();
    }, "../produce/produce.json");

    //setTimeout(function(){ResizeCards()}, 50);
    window.addEventListener("resize", ResizeCards);

}

// returns  number of cards in one line
function ResizeCards() {
    var resize_frame = document.getElementsByClassName("pr_frame")[0];
    if (resize_frame.getElementsByClassName("card_container").length == 0) {
        console.log("(ResizeCards) no produce cards found");
        return;
    }
    var num_cards = 0;
    for (var i = 0; i < resize_frame.getElementsByClassName("card_container").length; i++){
        if (resize_frame.getElementsByClassName("card_container")[i].display != "none")
            num_cards++;
    }
    var card = resize_frame.getElementsByClassName("card_container")[0];
    var style = card.currentStyle || window.getComputedStyle(card);

    var wpc = card.offsetWidth + parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
    var min_margin = 0.22 * window.innerWidth;
    if (document.getElementsByTagName("body")[0].getAttribute("id") == "home-page")
        min_margin = window.innerWidth * 0.1;//10;
    if (Math.floor((window.innerWidth - min_margin) / wpc) < 2) {
        resize_frame.style.width = 2 * wpc + 2 + "px";
        return 2;
    } else if (Math.floor((window.innerWidth - min_margin) / wpc) > num_cards){
        resize_frame.style.width = wpc * num_cards + "px";
        return num_cards;
    }
    else {
        resize_frame.style.width = Math.floor((window.innerWidth - min_margin) / wpc) * wpc + "px";
        return resize_frame.offsetWidth / wpc;
    }
}