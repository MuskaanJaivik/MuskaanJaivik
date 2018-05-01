window.addEventListener("resize", ResizeContent);
ResizeContent();

function ResizeContent() {
    var textsecs = document.getElementsByClassName("textsec");
    //for (var i = 0; i != textsecs.length; i++) {
    //    if (textsecs[i].offsetWidth > window.innerWidth) {
    //        //textsecs[i].style.width = window.innerWidth * 0.95 + "px";
    //        textsecs[i].style.width = "95vw";
    //    } else {
    //        textsecs[i].style.width = "50em";
    //    }
    //}

    return;
    var default_font_size = 20;
    var default_char_per_line = 50;

    for (var i = 0; i < textsecs.length; i++) {
        
        // Small Screen
        if (default_char_per_line*default_font_size >= window.innerWidth) {
            textsecs[i].style.width = window.innerWidth - 50 + "px";
            if (textsecs[i].style.fontSize = Math.floor(textsecs[i].offsetWidth / 10) < default_font_size) 
                textsecs[i].style.fontSize = Math.floor(textsecs[i].offsetWidth / 10) + "px";
        }
        // Big Screen
        else {
            textsecs[i].style.fontSize = default_font_size + "px";
            //textsecs[i].style.width = default_char_per_line * default_font_size + "px"; /*default_char_per_line + "em";*/
            textsecs[i].style.width = default_char_per_line + "rem";
        }

        // margin
        var marginSide = Math.floor((window.innerWidth-textsecs[i].offsetWidth)/2);
        textsecs[i].style.marginLeft = marginSide + "px";
        textsecs[i].style.marginRight = marginSide + "px";
        textsecs[i].style.marginTop = "2em";
        textsecs[i].style.marginBottom = "2em";

    }

}