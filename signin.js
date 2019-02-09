$(document).ready(function(){

  $("#signUpContainer").hide();

  var database = firebase.database();



  // LOG IN /////////////////////////
  $("#signInBtn").on("click", function(event){

    event.preventDefault();

    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();

    firebase.auth().signInWithEmailAndPassword(email, password)

      .then(function(user){

        var url = "index.html";
        $(location).attr('href', url);
        console.log(user);

      })
      .catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode == 'auth/weak-password') {
          alert('The password does not contain at least six characters.');
        } else {
          alert("User does not exist. Please sign up.");
          $("#signInBtn").reset();
        }

      });



    // SIGN UP //////////////////////

    $("#signInLink").on("click", function(event){

      event.preventDefault();
      $("#signInContainer").hide();
      $("#signUpContainer").show();

    });
  
    $("#signUpBtn").on("click", function(event){

      event.preventDefault();

      var email = $("#emailInput").val();
      var password = $("#passwordInput").val();

      firebase.auth().createUserWithEmailAndPassword(email, password)

        .then(function(user){

          var url = "index.html";
          $(location).attr('href', url);

        })
        
        .catch(function(error){
          // Handle Errors here.
          var errorCode = error.code;
          // var errorMessage = error.message;
          if (errorCode == 'auth/weak-password') {
            alert('The password does not contain at least six characters.');
            $("#signUpBtn").reset();
          }

        })
    });

  });

});

