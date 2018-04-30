function InitMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 31.3847364, lng: 77.1246645},
    zoom: 16,
    mapTypeId: "hybrid",
    disableDefaultUI: true,
    //fullscreenControl: true,
  });

  SetStyle(map);

  // example marker:
  var marker = new google.maps.Marker({
    map: map, 
    position: new google.maps.LatLng(31.381108, 77.124379)
  });

  map.addListener('zoom_changed', function() { 
    SetStyle(map);
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);

}


function SetStyle(map) {
  if (map.getZoom() < 6) {
    map.setOptions({styles : [
      {
        "featureType": "all",
        "stylers": [ { "visibility": "off" } ]
    },
    {
      "featureType": "administrative.country",
      "stylers": [ { "visibility": "on" } ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [ { "weight": "2" } ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [ { "visibility": "on" }, { "weight": "2" } ]
    },
    ]});
  } else {
    map.setOptions({styles : [
      {
        "featureType": "all",
        "stylers": [ { "visibility": "off" } ]
    },
    {
      "featureType": "administrative.country",
      "stylers": [ { "visibility": "on" } ]
    },
    {
      "featureType": "administrative.province",
      "stylers": [ { "visibility": "on" } ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [{ "weight": "3" } ]
    },
    ]});
  }
}


function CenterControl(controlDiv, map) {
  
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to change map zoom';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = "Zoom to India";
  controlUI.appendChild(controlText);

  controlUI.addEventListener('click', function() {
    //controlUI.childNodes[0].innerHTML = ChangeZoom(map);
    var cur = TransferToNextState(map);
    if (cur == "India") {
      controlUI.childNodes[0].innerHTML = "Zoom to Himachal";
    }
    else if (cur == "Himachal") {
      controlUI.childNodes[0].innerHTML = "Zoom to Pangna";
    }
    else {
      controlUI.childNodes[0].innerHTML = "Zoom to India";
    }
  });

}

function ChangeZoom(map, pan_adjust) {
  if (map.getZoom() <= 5) {
    SmoothZoom(map, 9, pan_adjust);
    return "Himachal";
  }
  else if (map.getZoom() >= 15) {
    SmoothZoom(map, 5, pan_adjust);
    return "India";
  }
  else {
    SmoothZoom(map, 16, pan_adjust);
    return "Pangna";
  }
}

function TransferToNextState(map) {
  if (map.getZoom() < 15)
    map.panTo(new google.maps.LatLng(31.383381, 77.123322));
  return ChangeZoom(map, function() { map.panTo(new google.maps.LatLng(24.040319, 77.755619)); } );
}

function SmoothZoom(map, tar_zoom, pan_adjust) {
  var zoom_steps = Math.abs(map.getZoom() - tar_zoom);
  var zoom_interval = (tar_zoom - map.getZoom()) / zoom_steps;
  var time_interval = 220;
  for (var i = 0; i < zoom_steps; i++) {
    setTimeout(function(){ map.setZoom(map.getZoom() + zoom_interval) }, time_interval * i);
  }
  if (tar_zoom <= 5)
    setTimeout(function(){pan_adjust()}, zoom_steps * zoom_interval + 2500)
}