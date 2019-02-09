// need to add default search term
var keyword = "wedding-dress"; //$("#image-input").val().trim();// this is secondary search term that will be appended to the default search term
var queryURL = "https://api.unsplash.com/search/photos?per_page=30&query=" + keyword + 
"&client_id=9a85effe1f10fcad9e85e179b923e801807342ab6fb9db2a916cddc1003596ae";

$(document).on("click", "#image-search-btn", function (event) {
    event.preventDefault();
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
        console.log(queryURL);
        console.log(response);
        var results = response.results;
        for (var i = 0; i < results.length; i++) {

            // Dynamically adding images to page
            var imageDiv = $("<div>");  //dynamically create new div
            var newImage = $("<img>");  //dynamically create new image tage
            newImage.attr("src", results[i].urls.small); //add small image source from the results
            imageDiv.append(newImage);  //append images to the div
            $("#images-appear-here").prepend(imageDiv); //dynamically push images to the div

            //dynamically adding photographer
            var name = $("<p>").text("Photographer: " + results[i].user.name);            
            imageDiv.append(name);

            //dynamically add link to image source
            var portfolioLink = $("<a href='results[i].user.portfolio_url'>Visit photographer's portfolio</a>");
            imageDiv.append(portfolioLink);       
                                   
            // add styling to images on page
            newImage.addClass("mt-5 mb-1 mr-5 ml-5");
            newImage.attr('id', 'picture'); // add id to images for on-click function to save image

            //add styling to photographer name
            name.addClass("mb-0 mr-5 ml-5");
            name.attr('id', 'photoText');

            //add styilng to portfolio links
            portfolioLink.addClass("mt-0 mr-5 ml-5");
            portfolioLink.attr('id', 'photoText');

        
        }

    });


});