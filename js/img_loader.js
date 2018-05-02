var frame = document.getElementById("hpimgwall");

const pic_min_width = 350;
var image_list;
var on_display = []; // keep track of all images that are shown at a time
var parcels = Rasterize();
window.addEventListener("resize", ImgResizeHandler);

function Rasterize() {
  // Calc pics per row
  var pic_per_row = Math.floor(frame.offsetWidth / pic_min_width);
  if (pic_per_row == 0) pic_per_row = 1;

  const par_width = Math.floor(frame.offsetWidth / pic_per_row)-1;
  const par_height = 1080 / 1920 * par_width;

  // Calc pics per column
  var pic_per_column = Math.round(frame.offsetHeight / par_height);
  //frame.style.height = pic_per_column * par_height + "px !important";
  frame.style.setProperty("height", pic_per_column * par_height + "px", "important");

  // Load Pictures
  loadJSON(function(response) {
    image_list = JSON.parse(response).images;

    // Add Parcels to frame
    var pars = [];
    var margin = 0;
    for (var x = 0; x < pic_per_row; x++) {
      for (var y = 0; y < pic_per_column; y++) {
        pars.push(AddParcel(x * par_width, y * par_height, par_width - (pic_per_row + 1) * margin, par_height - (pic_per_column + 1) * margin, margin));
      }
    }
    return pars;
  }, "img/wall/imgdata.json");
}

function AddParcel(x, y, width, height, margin) {
  var par = document.createElement("div");
  frame.appendChild(par);
  par.setAttribute("class", "parcel");
  par.style.width = width + "px";
  par.style.height = height + "px";
  par.style.margin = margin + "px";

  var first = document.createElement("div");
  first.setAttribute("class", "first");
  first.style.position = "absolute";
  first.style.width = "100%";
  first.style.height = "100%";
  par.appendChild(first);
  var second = document.createElement("div");
  second.style.position = "absolute";
  second.setAttribute("class", "second");
  second.style.width = "100%";
  second.style.height = "100%";
  par.appendChild(second);

  // par.style.backgroundColor = RandomColor();
  //par.style.backgroundImage = "url(img/wall/img" + Math.floor(Math.random()*87) + ".jpg)";
  first.style.backgroundImage = "url(img/wall/" + GetRandomImgMultipleRatios(["0.6", "0.7", "0.8"]) + ")";
  second.style.backgroundImage = "url(img/wall/" + GetRandomImgMultipleRatios(["0.6", "0.7", "0.8"]) + ")";
  setTimeout(function(){ SwitchImage(par, ["0.6", "0.7", "0.8"]) }, 1000 + (Math.random()*20)*1000);
  return par;
}

// Potentially not terminating, add additional checks
function GetRandomImgMultipleRatios(ratios) {
    var pick;
    do {
        pick = Math.floor(Math.random() * image_list.length);
    } while (ratios.indexOf(image_list[pick].ratio) == -1 || on_display.indexOf(image_list[pick].file) != -1)
    on_display.push(image_list[pick].file);
    return image_list[pick].file;
}

function SwitchImage(parcel, ratios) {

    var first = parcel.getElementsByClassName("first")[0];
    var second = parcel.getElementsByClassName("second")[0];
    if (!first || !second)
        return;
    if (first.style.opacity == "0") {
        on_display.splice(on_display.indexOf(GetBackgroundImage(second)), 1);
        setTimeout(function(){ second.style.backgroundImage = "url(img/wall/" + GetRandomImgMultipleRatios(ratios) + ")" }, 2000);
        first.style.opacity = "1";
        second.style.opacity = "0";
    } else {
        on_display.splice(on_display.indexOf(GetBackgroundImage(first)), 1);
        setTimeout(function(){ first.style.backgroundImage = "url(img/wall/" + GetRandomImgMultipleRatios(ratios) + ")" }, 2000);
        first.style.opacity = "0";
        second.style.opacity = "1";
    }

    setTimeout(function(){ SwitchImage(parcel, ratios) }, 10000 + (Math.random()*20)*1000);
}

function GetBackgroundImage(parcel) {
    var name = parcel.style.backgroundImage.replace('url("img/wall/', "");
    return name.replace('")', "");
}

function ImgResizeHandler() {
  return; // buggy
  while (frame.getElementsByClassName("parcel").length > 0)
    frame.removeChild(frame.getElementsByClassName("parcel")[0]);
  parcels = Rasterize();
}

function loadJSON(callback, file) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", file, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}
