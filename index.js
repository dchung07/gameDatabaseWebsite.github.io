

async function fetchData() {
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7865302cdfmsh24a775c14867db6p1e6254jsnab93cb233787',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	let filteredResult = [...result];

	let card = document.getElementById("card");
	let card_content = document.getElementById("card-content");
	let left_arrow = document.getElementById("left_arrow");
	let right_arrow = document.getElementById("right_arrow");
	let image = document.getElementById("image");
	image.setAttribute("preload", "");
	let title = document.getElementById("title");
	let genre = document.getElementById("genre");
	let publisher = document.getElementById("publisher");
	let release_date = document.getElementById("release_date");

	var genres = result.map(function(result) {
		return result.genre;
	});

	var uniqueGenres = genres.filter(function(genre, index, self) {
		return self.indexOf(genre) === index;
	});

	var dropdown = document.getElementById("dropdown");
	var defaultOption = document.createElement("option");
	defaultOption.text = "Select a genre";
	dropdown.add(defaultOption);

	uniqueGenres.forEach(function(genre) {
		var option = document.createElement("option");
		option.text = genre;
		dropdown.add(option);
	});

	document.getElementById("card-content").append(dropdown);

    dropdown.addEventListener("change", function () {
		var selectedGenre = dropdown.value;
		if (selectedGenre === "Select a genre") {
		  filteredResult = [...result];
		} else {
		  filteredResult = result.filter(function (game) {
			return game.genre === selectedGenre;
		  });
		}
	
		i = 0;
	
		setItems(i);
	  });


	var i = 0;
	

	left_arrow.addEventListener("click", function(){
		if(i == 0) {
			i = filteredResult.length;
		} i--;
		setItems(i);
	});

	right_arrow.addEventListener("click", function(){
		if(i == filteredResult.length - 1) {
			i = -1;
		} i++;
		setItems(i);
	});


	function setItems(index) {
		image.src = filteredResult[index].thumbnail;
		title.innerHTML = filteredResult[index].title;
		genre.innerHTML = filteredResult[index].genre;
		release_date.innerHTML = filteredResult[index].release_date;
		publisher.innerHTML = filteredResult[index].publisher;
	}
	

} catch (error) {
	console.error(error);
}
}


fetchData(); 
