/*
    Add Produce Cards
*/

// card_frame
var card_frame = document.createElement("div");
card_frame.setAttribute("class", "card_frame");
// add frame to body
document.getElementsByTagName('body')[0].appendChild(card_frame);

for (var i = 0; i != 100; i++) {

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
    img.setAttribute("src", "../img/produce/rice.jpg");
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
    bt.appendChild(document.createTextNode("foofoo"));

    // add text to back
    back.appendChild(bt);

    // add back to card
    card.appendChild(back);

    // add card to cardcontainer
    card_container.appendChild(card);

    card_frame.appendChild(card_container);

}