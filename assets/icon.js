$(document).ready(function () {

    // Initial array of Disney movies
    var topics = ['Frozen', 'The Lion King', 'Tangled', 'Peter Pan', 'Cinderella', 'Beauty and the Beast', 'Moana', 'The Princess and the Frog', 'Lady and the Tramp', 'Marry Poppins', 'Pocahontas'];

    // displayInfo function re-renders the HTML to display the appropriate content
    function displayInfo() {
        $('#disney-view').empty();
        var topic = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=WLKnOtwLbYAQXac3qWl9wBxw5tZKKbis&limit=10';

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // If no information on topics is found, the alert the user
            if (response.pagination.total_count == 0) {
                alert('Sorry, there are no Gifs for this topic');
                var itemindex = topics.indexOf(topic);
                // otherwise display button
                if (itemindex > -1) {
                    topics.splice(itemindex, 1);
                    renderButtons();
                }
            }

            // Save response from API call (JSON) to a variable results
            var results = response.data;
            for (var j = 0; j < results.length; j++) {
                // Creating a div to hold the movie
                var newTopicDiv = $("<div class='disney-name'>");
                // GIF Rating
                var pRating = $('<p>').text('Rating: ' + results[j].rating.toUpperCase());
                // GIF Title
                var pTitle = $('<p>').text('Title: ' + results[j].title.toUpperCase());
                // GIF URL
                var gifURL = results[j].images.fixed_height_still.url;
                var gif = $('<img>');
                gif.attr('src', gifURL);
                gif.attr('data-still', results[j].images.fixed_height_still.url);
                gif.attr('data-animate', results[j].images.fixed_height.url);
                gif.attr('data-state', 'still');
                gif.addClass('animate-gif');
                // Appending info 
                newTopicDiv.append(pRating);
                newTopicDiv.append(pTitle);
                newTopicDiv.append(gif);
                // Putting the saved info to new div
                $('#disney-view').prepend(newTopicDiv);
            }
        });
    };

    // Function for displaying movie data
    function renderButtons() {
        // Deletes the movies prior to adding new movies
        $('.buttons-view').empty();
        // Loops through the array of topics to create buttons for all topics
        for (var i = 0; i < topics.length; i++) {
            var createButtons = $('<button>');
            // Adding a class of movie-btn to our button
            createButtons.addClass('topic btn btn-info');
            // Adding a data-attribute
            createButtons.attr('data-name', topics[i]);
            // Providing the initial button text
            createButtons.text(topics[i]);
            // Adding the button to the buttons-view div
            $('.buttons-view').append(createButtons);
        }
    }

    // Function to remove buttons
    function removeButton() {
        $("#disney-view").empty();
        var topic = $(this).attr('data-name');
        var itemindex = topics.indexOf(topic);
        if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
        }
    }

    // Function to play or still Gif images
    function playGif() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }

    // Click on the submit button to add a new disney button
    $("#add-disney").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the form
        var disney = $("#disney-input").val().trim();
        // check if topic exsits already
        if (topics.toString().toLowerCase().indexOf(disney.toLowerCase()) != -1) {
            alert("Topic already exists");
        }
        else {
            topics.push(disney);
            renderButtons();
        }
    });

    // Click on disney button to display Gifs and other info from API
    $(document).on("click", ".topic", displayInfo);
    // Click on the Gif image to animate or make it still
    $(document).on("click", ".animate-gif", playGif);

    // Calling renderButtons which handles the processing of our topic/movie array
    renderButtons();


}); 