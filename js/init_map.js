function InitMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 31.3847364, lng: 77.1246645},
        zoom: 16,
        mapTypeId: "hybrid",

        styles: [

            {
                "featureType": "all",
                "stylers": [ { "visibility": "off" } ]
            },

            {
                "featureType": "road",
                "stylers": [ { "visibility": "on" } ]
            },
            {
                "featureType": "administrative.locality",
                "stylers": [ { "visibility": "on" } ]
            }

            /*{
              "featureType": "all",
              "stylers": [
                { "color": "#C0C0C0" }
              ]
            },{
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                { "color": "#CCFFFF" }
              ]
            },{
              "featureType": "landscape",
              "elementType": "labels",
              "stylers": [
                { "visibility": "off" }
              ]
            }*/
          ]

});
}