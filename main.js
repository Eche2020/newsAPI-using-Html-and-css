const apiKey = "b1d432b5d28f4bcbaa8f2f1c275556f1";

// Fetch articles based on category
function fetchArticles(category = "general") {
	const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			displayArticles(data.articles);
		})
		.catch((error) => {
			console.error("There was an error with the fetch operation:", error);
		});
}

// Display articles in the DOM
function displayArticles(articles) {
	const container = document.getElementById("news-container");
	container.innerHTML = ""; // Clear previous articles

	articles.forEach((news) => {

        const imageUrl = news.urlToImage ? news.urlToImage : "./img/News.jpg";

		const newsCard = `
					<div class="card">
						<img src="${imageUrl}" alt="News Image" class="card-img-top" />
						<div class="card-body">
							<h5 class="card-title">${
								news.title ? news.title.slice(0, 50) : "Title about the news"
							}</h5>
							<p class="card-text">${
								news.description
									? news.description.slice(0, 90)
									: "Description about the news happening around you"
							}</p>
							<a href="${news.url}" class="btn" target="_blank">Read More..</a>
						</div>
					</div>
				`;
		container.innerHTML += newsCard;
	});
}


// Fetch default category on page load
window.onload = function () {
	fetchArticles();
};
