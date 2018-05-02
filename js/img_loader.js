var frame = document.getElementById("hpimgwall");

const pic_min_width = 400;
var image_list;
var on_display; // keep track of all images that are shown at a time
var parcels = Rasterize();
window.addEventListener("resize", ImgResizeHandler);

function Rasterize() {
  // Calc pics per row
  var pic_per_row = Math.floor(frame.offsetWidth / pic_min_width);
  if (pic_per_row == 0) pic_per_row = 1;

  const par_width = Math.floor(frame.offsetWidth / pic_per_row);
  const par_height = 1080 / 1920 * par_width;

  // Calc pics per column
  var pic_per_column = Math.round(frame.offsetHeight / par_height);
  frame.style.height = pic_per_column * par_height + "px";

  // Load Pictures
  loadJSON(function(response) {
    image_list = JSON.parse(response).images;

    // Add Parcels to frame
    var pars = [];
    for (var x = 0; x < pic_per_row; x++) {
      for (var y = 0; y < pic_per_column; y++) {
        pars.push(
          AddParcel(x * par_width, y * par_height, par_width, par_height)
        );
      }
    }
    return pars;
  }, "img/wall/imgdata.json");
}

function AddParcel(x, y, width, height) {
  var par = document.createElement("div");
  frame.appendChild(par);
  par.setAttribute("class", "parcel");
  par.style.width = width + "px";
  par.style.height = height + "px";

  // par.style.backgroundColor = RandomColor();
  //par.style.backgroundImage = "url(img/wall/img" + Math.floor(Math.random()*87) + ".jpg)";
  par.style.backgroundImage =
    "url(" + "img/wall/" + GetRandomImage("0.6") + ")";
  par.style.backgroundSize = "100% 100%";
  return par;
}

function GetRandomImage(ratio) {
  var pick;
  do {
    pick = Math.floor(Math.random() * image_list.length);
  } while (
    image_list[pick].ratio != ratio /*&& !OnDisplay(image_list[pick].file)*/
  );
  on_display += image_list[pick].file;
  return image_list[pick].file;
}

function OnDisplay(img) {
  for (var i = 0; i < image_list.length; i++) {
    if (image_list[i].file == img) return true;
  }
  return false;
}

function ImgResizeHandler() {
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
