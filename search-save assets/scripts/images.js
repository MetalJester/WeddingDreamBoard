
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDoqplrMza8y0-O47c4e8sbzL9j5kweS88",
    authDomain: "project-1-wedding.firebaseapp.com",
    databaseURL: "https://project-1-wedding.firebaseio.com",
    projectId: "project-1-wedding",
    storageBucket: "project-1-wedding.appspot.com",
    messagingSenderId: "753268659245"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click", "#picture", function () {
    console.log("clicked a picture");
    var favImage = $(this).attr('src');
    console.log(favImage);

    var uid = firebase.auth().currentUser.uid;

    var newFav = {
        image: favImage,
    };

    database.ref(
        '/' + uid + '/images'
    ).push(newFav);

});



firebase.auth().onAuthStateChanged(function(firebaseUser) {
    if (firebaseUser) {
            database.ref('/' + firebaseUser.uid + '/images').on("child_added", function (imageSnapshot) {
                var addFavImage = imageSnapshot.val().image;
                console.log(addFavImage);
                var addImageDiv = $("<div>");
                var newFavImage = $("<img>")
                newFavImage.attr("src", addFavImage); //add small image source from the results
                addImageDiv.append(newFavImage);  //append images to the div
                $("#saved-images").prepend(addImageDiv); //dynamically push images to the div

                //styling saved imaged in side panel
                newFavImage.addClass("mt-2 mb-2");
                newFavImage.attr('id', 'small'); 

            });
        }
})

//beginning of on click function that will grab a value from the button on index.html for the search
var startSearch = function(keyword){
    console.log("leo")

    var queryURL = "https://api.unsplash.com/search/photos?per_page=30&query=" + keyword +
    "&client_id=9a85effe1f10fcad9e85e179b923e801807342ab6fb9db2a916cddc1003596ae";

    console.log("I was clicked");
    // var detail = $("#image-input").val();
    // console.log(detail);
    $("#images-appear-here").empty();
    $.ajax({
        url: queryURL,
        method: "GET",
        page: 30,
        per_page: 30,
    }).then(function (response) {
        var results = response.results;
        localStorage.setItem("leo", JSON.stringify(results));
        window.location.href = "image-Search.html";
       
        

    });




}


// var keyword = "wedding-dress"; // need to change to default search term from home page button (data-val)
//$("#image-input").val().trim();// this is secondary search term that will be appended to the default search term
