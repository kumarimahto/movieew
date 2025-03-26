document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    const movieContainer = document.getElementById("movie-container");

    searchBtn.addEventListener("click", () => {
        const movieName = searchInput.value.trim();

        if (movieName === "") {
            alert("Please enter a movie name!");
            return;
        }

        fetchMovieDetails(movieName);
    });



    async function fetchMovieDetails(movie) {
        const apiKey = "6fac0e6b";
        const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movie)}&apikey=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.Response === "True") {
                displayMovie(data);
            } else {
                movieContainer.innerHTML = `<p style="color:red;">Movie not found! Try again.</p>`;
            }
        } catch (error) {
            console.error("Error fetching movie data:", error);
            movieContainer.innerHTML = `<p style="color:red;">Failed to fetch movie details.</p>`;
        }
    }



    function displayMovie(data) {
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(data.Title + " full movie")}`;

        movieContainer.innerHTML = `
            <a href="${youtubeSearchUrl}" target="_blank">
                <img src="${data.Poster !== "N/A" ? data.Poster : "default-movie.jpg"}" alt="Movie Poster">
            </a>
            <h2>${data.Title} (${data.Year})</h2>
            <p><strong>Genre:</strong> ${data.Genre}  </p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>IMDB Rating:</strong> ⭐ ${data.imdbRating}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
        `;
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "🌙 Dark Mode";
    toggleBtn.classList.add("toggle-mode");
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
});

