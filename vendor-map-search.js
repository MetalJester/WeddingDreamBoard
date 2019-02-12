//Global Variables
var map;
var myLatLng =new google.maps.LatLng(navigator.geolocation); //I may want to update this from html5 to api
var infoWindow = new google.maps.InfoWindow;

$(document).ready(function() {

  //Geolocator function to get user's device location
  function getLocation() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14
    });

    //Autocomplete start
    var input = document.getElementById('location-input');

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    autocomplete.setFields(
        ['address_components', 'geometry', 'icon', 'name', '']);
        
        var infowindowContent = document.getElementById('infowindow-content');
        infoWindow.setContent(infowindowContent);
        //Create Markers
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
          });

          autocomplete.addListener('place_changed', function() {
            infoWindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            console.log(place);
            if (!place.geometry) {

              window.alert("No details available for input: '" + place.name + "'");
              return;
            }
  
            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
              map.fitBounds(place.geometry.viewport);
            } else {
              map.setCenter(place.geometry.location);
              map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
  
            var address = '';
            if (place.address_components) {
              address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
              ].join(' ');
            }
  
            infowindowContent.children['place-icon'].src = place.icon;
            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-address'].textContent = address;
            infoWindow.open(map, marker);
          });


    //geolocation
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

    //Error. Handle it!
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    //Button click event for searching vendors.
// $("#location-search-btn").on("click", function(event){
//     event.preventDefault();
//     // console.log("clicky-click");

//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//       });


   
// });


getLocation();



});