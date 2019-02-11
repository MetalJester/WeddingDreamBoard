

//Google Maps 
  var map;
  var infoWindow;
  var myLatLng = {lat: 38.575764, lng: -121.478851}


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 14
  });
  
  infoWindow = new google.maps.InfoWindow;

  // Geolocation
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

//Create Markers for Map
function createMarker() {
    var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
}

//Search Near By
function searchNearBy() {
  var request = {
    location: myLatLng,
    radius: "1500",
    types: ["store"]
  }
  service = new google.maps.places.PlacesService(map);
  service.nearBySearch(request, callback);
}

//Callback
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

//Button click event for searching vendors.
$("#location-search-btn").on("click", function(event){
    event.preventDefault();
    // console.log("clicky-click");

    //Variable to temporarily store user-input in the search box
    var locationInput = $("#location-input").val();
    console.log(locationInput);

    //Hooking in Query Text Field to Google Maps
    var service = new google.maps.places.PlacesServices(map);
    service.textSearch(locationInput);

});
