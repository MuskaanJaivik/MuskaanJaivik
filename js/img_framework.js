var activate_log = false;

// Init Slideshow
//
function InitSlideShow(target, img_path = "img/slides/") {
    var slide1 = document.createElement("div");
    var slide2 = document.createElement("div");
    slide1.setAttribute("class", "img_slide");
    slide2.setAttribute("class", "img_slide");
    target.appendChild(slide1);
    target.appendChild(slide2);
    MatchSlideSize(target);
    slide1.style.left = "0%";
    slide2.style.left = "100%";
    slide1.style.backgroundImage = 'url("' + img_path + "img0.jpg" + '")';
    slide2.style.backgroundImage = 'url("' + img_path + "img1.jpg" + '")';

    setTimeout(function(){StartSlide(target, img_path)}, 4000);
    if (!IsMobilePhone()) OnResizeStop(function(){MatchSlideSize(target)});

}

// Detect Mobile Phone
//
function IsMobilePhone() {
    if (window.innerWidth <= 720 && window.innerHeight <= 1280 && HasTouchScreen() && typeof window.orientation !== 'undefined')
        return true;
    else
        return false;
}

function MatchSlideSize(target) {
    for (var i = 0; i < target.getElementsByClassName("img_slide").length; i++) {
        target.getElementsByClassName("img_slide")[i].style.top = GetTopnavHeight() + "px";
        target.getElementsByClassName("img_slide")[i].style.width = target.offsetWidth + "px";
        target.getElementsByClassName("img_slide")[i].style.height = target.offsetHeight + "px";
    }
}

// Start Slide
var slide_iteration = 0;
function StartSlide(target, img_path) {
    if (document.getElementById("banner_text"))
        document.getElementById("banner_text").style.opacity = "0";
    slide_iteration++;
    var left_slide;
    var right_slide;
    if (activate_log) console.log("[0]: " + parseInt(target.getElementsByClassName("img_slide")[0].style.left, 10) + " [1]: " + parseInt(target.getElementsByClassName("img_slide")[1].style.left, 10));
    if (parseInt(target.getElementsByClassName("img_slide")[0].style.left, 10) < parseInt(target.getElementsByClassName("img_slide")[1].style.left, 10)) {
        left_slide = target.getElementsByClassName("img_slide")[0];
        right_slide = target.getElementsByClassName("img_slide")[1];
    } else {
        left_slide = target.getElementsByClassName("img_slide")[1];
        right_slide = target.getElementsByClassName("img_slide")[0];
    }
    // Switch
    left_slide.style.transform = "translateX(-" + slide_iteration * 100 + "%)";
    right_slide.style.transform = "translateX(-" + slide_iteration * 100 + "%)";
    left_slide.style.webkitTransform = "translateX(-" + slide_iteration * 100 + "%)";
    right_slide.style.webkitTransform = "translateX(-" + slide_iteration * 100 + "%)";
    // Set Back Left
    setTimeout(function(){
        left_slide.style.left = (slide_iteration+1) * 100 + "%";
        var next_num = Number(parseInt(right_slide.style.backgroundImage.replace(/\D/g,''), 10)) + 1;
        var next_file = img_path + "img" + next_num + ".jpg";
        if (activate_log) console.log(next_file);
        if (FileExists(next_file))
            left_slide.style.backgroundImage = 'url("' + next_file + '")';
        else {
            left_slide.style.backgroundImage = 'url("' + img_path + "img0.jpg" + '")';
        }
        if (activate_log) console.log(left_slide.style.backgroundImage);
        setTimeout(function(){StartSlide(target, img_path)}, 9000);
    }, 1550);
}

function FileExists(file_url) {
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

// Create Static Image Grid
//
function CreateStaticImageGrid(container, img_path="/img/wall/", img_ratio = 1920 / 1080, img_per_row = 4, img_margin_px = 4) {
    var org_width = container.offsetWidth;

    // Insert frame to html
    var frame = document.createElement("div");
    container.appendChild(frame);
    frame.setAttribute("class", "static_img_grid");

    // Calculate Picture width & height
    var data = RasterizeContainerStatic(container, img_ratio, img_per_row);
    var par_width = data[0];
    var par_height = data[1];
    var par_num_x = data[2];
    var par_num_y = data[3];

    // Adjust Frame Size
    AdjustFrameSize(container, frame, par_width, par_height);

    // Init Img Mapping
    InitImgMapping(img_path, function() {

        // Create Img Parcels
        for (var i = 0; i < par_num_x * par_num_y; i++)
            frame.appendChild(CreateParcel(par_width - 2 * img_margin_px, par_height - 2 * img_margin_px, img_margin_px));

        StartAnimation(frame);

        // On Resize
        OnResizeStop(function() {
            // Delete Img Parcels
            while (frame.getElementsByClassName("img_parcel").length > 0)
                frame.removeChild(frame.getElementsByClassName("img_parcel")[0]);
            // Rasterize & Adjust Frame Size
            data = RasterizeContainerStatic(container, img_ratio, Math.round((container.offsetWidth / org_width) * img_per_row));
            par_width = data[0];
            par_height = data[1];
            par_num_x = data[2];
            par_num_y = data[3];
            AdjustFrameSize(container, frame, par_width, par_height);
            // Reset on Display
            img_on_display = [];
            // Create Parcels
            for (var i = 0; i < par_num_x * par_num_y; i++)
                frame.appendChild(CreateParcel(par_width - 2 * img_margin_px, par_height - 2 * img_margin_px, img_margin_px));
            // Restart Animation
            if (is_animated)
                StartAnimation(frame, switch_time, true);
            
        });

    });
}

// Rasterize Container to Static Image Grid
//
function RasterizeContainerStatic(container, img_ratio, img_per_row) {
    var width = container.offsetWidth / img_per_row;
    //var height = container.offsetHeight / Math.floor(container.offsetHeight / (width / img_ratio));
    var height = width / img_ratio;

    if (height > container.offsetHeight) {
        height = container.offsetHeight;
        width = container.offsetWidth / Math.floor(container.offsetWidth / (height * img_ratio));
    }

    return [width, height, Math.floor(container.offsetWidth / width), Math.floor(container.offsetHeight / height)];
}

// Adjust Frame Size
//
function AdjustFrameSize(container, frame, par_width, par_height) {
    frame.style.width = Math.floor(container.offsetWidth / par_width) * par_width + "px";
    frame.style.height = Math.floor(container.offsetHeight / par_height) * par_height + "px";
    frame.style.transform = "translateY(" + (container.offsetHeight - frame.offsetHeight) / 2 + "px)";
    frame.style.webkitTransform = "translateY(" + (container.offsetHeight - frame.offsetHeight) / 2 + "px)";
}

// Create Parcel
//
function CreateParcel(width, height, margin) {
    var parcel = document.createElement("div");
    parcel.setAttribute("class", "img_parcel");
    parcel.style.width = width + "px";
    parcel.style.height = height + "px";
    parcel.style.margin = margin + "px";
    var front = document.createElement("div");
    front.setAttribute("class", "img_parcel_face");
    //front.style.backgroundColor = "white";
    front.style.zIndex = "15";
    front.style.opacity = "1";
    LoadImage(front);
    parcel.appendChild(front);
    var back = document.createElement("div");
    back.setAttribute("class", "img_parcel_face");
    //back.style.backgroundColor = "black";
    back.style.zIndex = "5";
    back.style.opacity = "0";
    LoadImage(back);
    parcel.appendChild(back);
    // Switch face to load image
    SwitchFace(parcel);
    SwitchFace(parcel);
    return parcel;
}

var is_animated = false;
var switch_time;

// Start Animation
//
function StartAnimation(frame, average_swich_time = 2000) {
    is_animated = true;
    switch_time = average_swich_time;
    var parcels = frame.getElementsByClassName("img_parcel");
    for (var i = 0; i < parcels.length; i++)
        AnimationLoop(parcels[i], 2000 * parcels.length, true);
}

function AnimationLoop(parcel, average_timeout, first_loop=false) {
    if (!parcel)
        return;
    var timeout = (Math.random()*(average_timeout))+average_timeout/2;
    if (first_loop)
        timeout = Math.random()*average_timeout;
    setTimeout(function(){
        SwitchFace(parcel);
        AnimationLoop(parcel, average_timeout);
    }, timeout);
}

// Switch Face
//
function SwitchFace(parcel) {
    // Identify Front & Back Face
    var faces = parcel.getElementsByClassName("img_parcel_face");
    var front_face;
    var back_face;
    if (parseInt(faces[0].style.zIndex, 10) > 10) {
        front_face = faces[0];
        back_face = faces[1];
    } else {
        front_face = faces[1];
        back_face = faces[0];
    }
    // Blend Faces
    front_face.style.opacity = "0";
    back_face.style.opacity = "1";
    // Switch Faces
    front_face.style.zIndex = "5";
    back_face.style.zIndex = "15";
    // Load Image and update img_on_display
    if (load_images) {
        var temppath = front_face.style.backgroundImage.replace('url("', "");
        temppath = temppath.replace('")', "");
        setTimeout(function(){ LoadImage(front_face) }, 1000);
        setTimeout(function(){ if (img_on_display.indexOf(temppath) != -1) img_on_display.splice(img_on_display.indexOf(temppath), 1); }, 1005);
    }
}


//
// Image Loading
//
var load_images = false;
var img_path;
var img_data;
var img_on_display = [];

// Init Image Mapping
//
function InitImgMapping(path = "/img/wall/", reaction) {
    // complete path
    if (path.indexOf("imgcat.json") == -1){
        if (path.charAt(path.length-1) != "/")
            path += "/";
        path += "imgcat.json";
    }
    img_path = path.replace("imgcat.json", "");
    // load image data
    loadJSON(function(response) {
        img_data = JSON.parse(response).images;
        load_images = true;
        reaction();
    }, path)
}

// Load Image
//
function LoadImage(face) {
    var face_ratio = face.offsetWidth / face.offsetHeight;
    // search for valid image (img has correct ratio and is not on display)
    var search_start = Math.floor(Math.random() * img_data.length);
    var hit = -1;
    var ratio_tolerance = 0.1;
    for (var i = search_start; i < img_data.length; i++) {
        if (img_data[i].ratio > face_ratio - ratio_tolerance && img_data[i].ratio < face_ratio + ratio_tolerance && img_on_display.indexOf(img_path + img_data[i].file) == -1) {
            hit = i;
            break;
        }
    }
    if (hit == -1) {
        for (var i = 0; i < search_start; i++) {
            if (img_data[i].ratio > face_ratio - ratio_tolerance && img_data[i].ratio < face_ratio + ratio_tolerance && img_on_display.indexOf(img_path + img_data[i].file) == -1) {
                hit = i;
                break;
            }
        }
    }
    
    // no image matches criteria
    if (hit == -1) {
        face.style.backgroundImage = "";
        return;
    }

    // set background image
    face.style.backgroundImage = "url(" + img_path + img_data[hit].file + ")";
    img_on_display.push(img_path + img_data[hit].file);

}

// Helper Functions
//
function OnResizeStop(callback) {
    var in_process = false;
    var timeout;
    var delay = 100;
    window.addEventListener("resize", function() {
        if (!in_process) {
            in_process = true;
            timeout = setTimeout(function() {
                in_process = false;
                callback();
            }, delay);
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                in_process = false;
                callback();
            }, delay);
        }
    });
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

// Get Topnav Height
//
function GetTopnavHeight() {
    var bottom;
    if (window.innerWidth < 800 && window.innerHeight < 900)
        bottom = 0.11 * window.innerHeight;
    else
        bottom = 100;
    return bottom;
}