var tvShows = ['Game of Thrones', 'Breaking Bad', 'Scandal', 'The Walking Dead', 'Sherlock', 'The Big Bang Theory', 'Friends', 'Grey\'s Anatomy', 'How I Met Your Mother', 'True Detective', 'Modern Family', 'Suits', 'The Office', 'Riverdale', 'Arrested Development', 'Westworld', 'Brooklyn Nine-Nine', 'Law & Order', 'The Mindy Project', 'Saturday Night Live',]

function createButtons() {
	$('#buttons').empty();
	for (i = 0; i < tvShows.length; i++) {
		var button = $('<button>');
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

function showGifs() {
	var searchShow = $(this).attr('data-name');
	var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=LlJgG7J6XDVPjYjF5Ejp51Qu9w4Edb76&q=' + searchShow + '&limit=10&offset=0&rating=PG&lang=en';
	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function(response) {
		console.log(response);
		for (i = 0; i < response.data.length; i++) {
			var gif = response.data[i];
			console.log(gif.bitly_gif_url);
			console.log(gif.rating);
			$('#gifs').append('<iframe src="' + gif.bitly_gif_url + '"></iframe>')
		}
	}).fail(function(err) {
		throw err;
		console.log('ERROR!');
	});
}

$(document).on('click', '#tvShowButton', showGifs);
createButtons();