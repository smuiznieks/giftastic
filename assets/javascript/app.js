var tvShows = ['Game of Thrones', 'Breaking Bad', 'Scandal', 'The Walking Dead', 'Sherlock', 'The Big Bang Theory', 'Friends', 'Grey\'s Anatomy', 'How I Met Your Mother', 'True Detective', 'Modern Family', 'Suits', 'The Office', 'Riverdale', 'Arrested Development', 'Westworld', 'Brooklyn Nine-Nine', 'Law & Order', 'The Mindy Project', 'Saturday Night Live',]

function createButtons() {
	$('#buttons').empty();
	for (i = 0; i < tvShows.length; i++) {
		var button = $('<button>');
		button.attr('type', 'button');
		button.attr('class', 'btn btn-default')
		button.attr('id','tvShowButton');
		button.attr('data-name', tvShows[i]);
		button.text(tvShows[i]);
		$('#buttons').append(button);
	}
}

$('#addButton').on('click', function(event) {
	event.preventDefault();
	var newShow = $("#userInput").val().trim();
	tvShows.push(newShow);
	createButtons();
})

function animateGifs() {
	console.log('click');
	var img = $(this);
	console.log(img);
    var state = img.attr('data-state')
    console.log(state);
	if (state === 'still') {
		img.attr('src', img.attr('data-animate'));
        img.attr('data-state', 'animate');
	}
	if (state === 'animate') {
      img.attr('src', img.attr('data-still'));
      img.attr('data-state', 'still');
    }
}

function showGifs() {
	$('#gifs').empty();
	var searchShow = $(this).attr('data-name');
	var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=LlJgG7J6XDVPjYjF5Ejp51Qu9w4Edb76&q=' + searchShow + '&limit=10&offset=0&rating=PG&lang=en';
	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function(response) {
		console.log(response);
		for (i = 0; i < response.data.length; i++) {
			var gif = response.data[i];
			console.log(gif.images.fixed_height_still.url);
			console.log(gif.images.fixed_height.url);
			console.log(gif.rating);
			var newDiv = $('<div>');
			newDiv.attr('class', 'col-md-6');
			var newImage = $('<img src="' + gif.images.fixed_height_still.url + '"/>');
			newImage.attr('id', 'clickToAnimate');
			newImage.attr('data-state', 'still');
			newImage.attr('data-still', gif.images.fixed_height_still.url);
			newImage.attr('data-animate', gif.images.fixed_height.url);
			newDiv.append(newImage);
			newDiv.append('<h6>Rating: ' + gif.rating + '</h6>');
			$('#gifs').append(newDiv);
		}
	}).fail(function(err) {
		throw err;
		console.log('ERROR!');
	});
}

$(document).on('click', '#tvShowButton', showGifs);
createButtons();
$(document).on('click', '#clickToAnimate', animateGifs);