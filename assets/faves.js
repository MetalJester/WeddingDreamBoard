$().on('click', apiFunction)

$(document).ready(function() {
    //   if (firebase.auth().currentUser === null) {
    //     //window.location redirects user to given page
    //     window.location = "./index.html";
    //   }
    var likedImages = [];
    var currentUser;
    var database = firebase.database();
    firebase.auth().onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        currentUser = firebaseUser;
  
        var userId = currentUser.uid;
  
        database.ref("/" + userId + "/liked_images").on("value", function(snap) {
          if (snap.val() !== null) {
            likedImages = snap.val();
            showLikedImages();
          } else {
            var placeholder = $(`<div><p>You haven't liked any images</p></div>`);
            $("#dump-favs-here").append(placeholder);
          }
        });
      } else {
        window.location = "./index.html";
      }
    });
  
    function showLikedImages() {
      for (var favorites = 0; favorites < likedImages.length; favorites++) {
        var image = likedImages[favorites];
        console.log(image);
  
        var container = $(
          `<div data-image=${image} style="background: url(${image}); height: 265px; width: 400px; display:inline-block;"></div>`
        );
        // var imgId = ;
  
        container.addClass("imageresults");
  
        $("#dump-favs-here").prepend(container);
      }
    }
    // Logout event
    $("#logout").on("click", e => {
      e.preventDefault();
      firebase.auth().signOut();
    });
  });