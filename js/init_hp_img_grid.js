
var img_per_row = Math.round(window.innerWidth / 480);

setTimeout(function(){
    var grid = CreateStaticImageGrid(document.getElementById("hp_img_wall"), "img/wall/", 1920/1080, img_per_row, 2);
    //StartImgMapping(grid, "img/wall/");
}, 2000);