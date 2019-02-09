//Google Maps 
var map;
var infoWindow;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.575764, lng: -121.478851},
    zoom: 14
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

    //To add markers for vendors to the map
    function newMarker() {
      //Get markers for businesses
    }


//Button click event for searching vendors
$("#location-search-btn").on("click", function(event){
    event.preventDefault();
    console.log("clicky-click");

    //Variable to temporarily store user-input in the search box
    var locationInput = $("#location-input").val();
    console.log(locationInput);

});

