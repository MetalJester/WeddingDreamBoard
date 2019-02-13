//Global Variables
var map;
var service;
var infoWindow = new google.maps.InfoWindow;
var LatLng = new google.maps.LatLng(38.575764, -121.478851);

$(document).ready(function() {

  //Initialize Map Function
  function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
      center: LatLng,
      zoom: 14
    });

    //Search nearby
    var request = {
      location: LatLng,
      radius: '500', //This is in meters
      type: ['florist']
    };
  
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  
    //Create Markers
    function createMarker() {
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map,
        title: name
      });
      marker.setMap(map);
    }
  
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
        console.log(results[i]);
      }
    }

    //geolocation
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('You are here.');
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

   initMap();


getLocation();


});

//////////////////// LOG-OUT ////////////////////

$("#logoutLink").on("click", function(){
  firebase.auth().signOut().then(function() {

      
      console.log("signout successful");

      var url = "index.html";
      $(location).attr('href', url);
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });

})
