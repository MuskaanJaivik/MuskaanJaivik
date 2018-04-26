function Resize() {
    return;
    var items = document.getElementById("navbar").childNodes;
    var title;
    for (var i = 0; i != items.length; i++){
        if (items[i].id == "title") {
            title = items[i].childNodes[0];
            break;
        }
    }
    var leftmost = 10000;
    if (items.length > 0) {
        for (var i = 0; i != items.length; i++) {
            if ((items[i].id != "title") && (items[i].id != "home_element") && (items[i].getBoundingClientRect().left < leftmost))
                leftmost = items[i].getBoundingClientRect().left;
        }
    }
    if (leftmost <= title.getBoundingClientRect().right) {
        title.style.color = "red";
        alert("title right: " + title.getBoundingClientRect().right + "; leftmost: " + leftmost);

        for (var i = 0; i != items.length; i++){
            if (items[i].getBoundingClientRect().left == leftmost)
                alert("id: " + items[i].id);
        }

    }
}