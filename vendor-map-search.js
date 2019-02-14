//Global Variables
var map;
var service;
var infoWindow;
var LatLng = new google.maps.LatLng(38.575764, -121.478851);

$(document).ready(function() {

  //Initialize Map Function
  function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
      center: LatLng,
      zoom: 12
    });

    infoWindow = new google.maps.InfoWindow();
    //Bridal shops
    createMarker({lat: 38.521190, lng: -121.440830 })
    createMarker({lat: 38.565030, lng: -121.407840 })
    createMarker({lat: 38.575010, lng: -121.407000 })
    createMarker({lat: 38.580200, lng: -121.490640 })
    createMarker({lat: 38.567650, lng: -121.464880 })
    //Create Markers
    function createMarker(LatLng) {
      var marker = new google.maps.Marker({
        position: LatLng,
        map: map
      });
      marker.setMap(map);
    }

    /////Out of time to debug this////
    /*
    //Search nearby
    var request = {
      location: LatLng,
      radius: '500', //This is in meters
      type: ['florist']
    };
  
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  
    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        createMarker(results[i]);
        console.log(results[i]);
      }
    }
    
    //geolocation
    
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
      */
    }

   initMap();

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

});


