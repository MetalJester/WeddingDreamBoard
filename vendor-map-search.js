var map;
var markers = [];
var myLatLng =new google.maps.LatLng(navigator.geolocation);
var infoWindow;

$(document).ready(function() {

  //Geolocator function to get user's device location
  function getLocation() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14
    });

    infoWindow = new google.maps.InfoWindow;
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


    //Button click event for searching vendors.
$("#location-search-btn").on("click", function(event){
    event.preventDefault();
    // console.log("clicky-click");

    //Make some markers
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });
    //Variable to temporarily store user-input in the search box
    var searchBox = new google.maps.places.SearchBox(document.getElementById('location-input'));

    //Experimenting with this to see if it will help get it to work V
    google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
          return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }
    });
   
});


      //Call on back now, would ya? That is, if it's OK.
    function callback(results, status, name) {
        // console.log(results);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            var name = place.name;
            console.log(place);
            createMarker(results[i], name);
          }
        }
      }


getLocation();



});