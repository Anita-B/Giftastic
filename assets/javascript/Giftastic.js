var title = ["Metropolis 1927", 
			"A Streetcar Named Desire", 
			"Mildred Pierce", 
			"Whatever Happened To Baby Jane", 
			"Vertigo",
			"To Catch A Thief",
			"12 Angry Men",
			"Casablanca",
			"Nosferatu",
			"Maltese Falcon",
			"All About Eve",
			"Sunset Boulevard",
			"Double Indemnity",
			"On The Waterfront",
			"Dial M For Murder",
			"Double Indemnity",
			"The Third Man",
			"Rear Window",
			"Bride Of Frankenstein",
			"North By Northwest",
			"La Grande Illusion",
			"The 400 Blows"
			];


// Function for displaying movie data
function renderButtons(){

	// Delete the content inside the movies-view div prior to adding new movies
	// (this is necessary otherwise you will have repeat buttons)
	$("#movie-buttons").empty();


	// Loop through the array of movies, then generate buttons for each movie in the array
	for (var i = 0; i < title.length; i++){

		// Then dynamicaly generating buttons for each movie in the array.
		// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class
		a.addClass("movie");
		// Adding a data-attribute with a value of the movie at index i
		a.attr("data-name", title[i]);
		// Providing the button's text with a value of the movie at index i
		a.text(title[i]);
		// Adding the button to the HTML
		$("#movie-buttons").append(a);

		//$("#movies-view").html("<a href=\"#\" id=\"\" class=\"\" role=\"button\">" + "</a>");
		//$("#movie-buttons").append("<button type=\"button\">" + title[i] + "</button>");
	}
}

// Calling the renderButtons function to display the initial list of movies
renderButtons();


// Event listener for all button elements
$("#movie-buttons").on("click", "button", function() { console.log("in button click");

	console.log("in button click");

	$("#movie-gifs").empty();

	// In this case, the "this" keyword refers to the button that was clicked
	var movieTitle = $(this).attr("data-name");	
	movieTitleMovie = "movie " + "\"" + movieTitle + "\"";		

	//var queryURL = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movieTitleMovie + "&rating=g&api_key=57a4cd4305724cc3b94810aebc921aad&limit=10";
	//console.log("http://api.giphy.com/v1/gifs/search?q=" + title[0] + "&rating=g&api_key=57a4cd4305724cc3b94810aebc921aad&limit=10");

	$.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {

	    	var results = response.data;

	    	for (var i = 0; i < results.length; i++){

	    		// Saving the animated gif property
		        var stillUrl = results[i].images.fixed_height_still.url;
		        var animateUrl = results[i].images.fixed_height.url;


		        // Creating and storing an image tag
		        var movieImage = $("<img>");

		        // Setting the movieImage src attribute to imageUrl
		        movieImage.attr("src", stillUrl);
		        movieImage.attr("alt", movieTitle);
		        movieImage.attr("data-still", stillUrl);
		        movieImage.attr("data-animate", animateUrl);
		        movieImage.attr("data-state", "still");
		        movieImage.attr("class", "gif");

		        // Prepending the catImage to the images div
		        $("#movie-gifs").append(movieImage);

	    	}

	    });

});


$("#movie-gifs").on("click", ".gif", function() { 

	console.log("in gif click");

	// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
	var state = $(this).attr("data-state");


	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
	// Then, set the image's data-state to animate
	// Else set src to the data-still value
	if (state === "still") { console.log("in still");
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else { console.log("in animate");
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}

});

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) { console.log("in add movie click");
	// event.preventDefault() prevents the form from trying to submit itself.
	// We're using a form so that the user can hit enter instead of clicking the button if they want
	event.preventDefault();

	// This line will grab the text from the input box
	var movie = $("#movie-input").val().trim();
	// The movie from the textbox is then added to our array
	title.push(movie);

	// calling renderButtons which handles the processing of our movie array
	renderButtons();

	// Then dynamicaly generating buttons for each movie in the array.
	// This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
	// var a = $("<button>");
	// // Adding a class
	// a.addClass("movie");
	// // Adding a data-attribute with a value of the movie at index i
	// a.attr("data-name", movie);
	// // Providing the button's text with a value of the movie at index i
	// a.text(movie);
	// // Adding the button to the HTML
	// $("#movie-buttons").append(a);
});


    