//Global Variables
var map;
var service;
var infoWindow;
var LatLng = new google.maps.LatLng(38.575764, -121.478851);



  //Initialize Map Function
  function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
      center: LatLng, //Bias map to Sacramento, CA -- User can change this later on
      zoom: 12
    });

    //Adding some variables for the search box
    var input = document.getElementById('location-input');
    var searchBox = new google.maps.places.SearchBox(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
        // Function to retrieve locations based on what user types in
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

  }  

  initMap();


//////////////////// LOG-OUT ////////////////////
$(document).ready(function() {
$("#logoutLink").on("click", function(){
  firebase.auth().signOut().then(function() {

      
      console.log("signout successful");

      var url = "index.html";
      $(location).attr('href', url);
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });

});
});

