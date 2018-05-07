function drawLogo(canvas, color) {
    console.log("drawLogo");
    var h = canvas.offsetHeight;
    var w = canvas.offsetWidth;
    var scale = w/643;

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
    ctx.fillStyle = color;
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

function HpDrawLogo(canvas, color) { setTimeout(function(){drawLogo(canvas, color)} , 200)}