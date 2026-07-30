console.log("Welcome to Crazymovie");


// ================================
// MOVIE DATA
// ================================

const movieData = {

    "Avengers": {
        poster: "assets/images/avengers.jpg",
        video: "assets/videos/avengers.mp4",
        description: "Earth's mightiest heroes come together to fight powerful enemies and protect the world.",
        year: "2012",
        genre: "Action, Adventure, Sci-Fi",
        rating: "8.0/10"
    },

    "Spider-Man": {
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        video: "assets/videos/spiderman.mp4.mp4",
        description: "A young hero discovers incredible powers and learns that great power comes with great responsibility.",
        year: "2021",
        genre: "Action, Adventure, Sci-Fi",
        rating: "8.2/10"
    },

    "Inception": {
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        video: "assets/videos/inception.mp4",
        description: "A skilled team enters the world of dreams to complete an impossible mission.",
        year: "2010",
        genre: "Action, Sci-Fi, Thriller",
        rating: "8.8/10"
    },

    "Interstellar": {
        poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        video: "assets/videos/interstellar.mp4",
        description: "A group of explorers travels through space in search of a new home for humanity.",
        year: "2014",
        genre: "Adventure, Drama, Sci-Fi",
        rating: "8.7/10"
    },

    "The Dark Knight": {
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        video: "assets/videos/dark-knight.mp4",
        description: "Batman faces a dangerous criminal mastermind who brings chaos and fear to Gotham City.",
        year: "2008",
        genre: "Action, Crime, Drama",
        rating: "9.0/10"
    },

    "Avatar": {
        poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        video: "assets/videos/avatar.mp4",
        description: "A former soldier enters the beautiful world of Pandora and becomes part of an extraordinary adventure.",
        year: "2009",
        genre: "Action, Adventure, Fantasy",
        rating: "7.8/10"
    },

    "Titanic": {
        poster: "assets/images/titanic.jpg",
        video: "assets/videos/titanic.mp4",
        description: "A young couple from different backgrounds fall in love during a historic voyage across the ocean.",
        year: "1997",
        genre: "Drama, Romance",
        rating: "7.9/10"
    },

    "Joker": {
        poster: "assets/images/joker.jpg",
        video: "assets/videos/joker.mp4",
        description: "A troubled man struggles with society and begins a dark transformation that changes Gotham forever.",
        year: "2019",
        genre: "Crime, Drama, Thriller",
        rating: "8.4/10"
    },

    "Black Panther": {
        poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
        video: "assets/videos/black-panther.mp4",
        description: "A powerful hero becomes the king of Wakanda and must protect his kingdom from a dangerous enemy.",
        year: "2018",
        genre: "Action, Adventure, Sci-Fi",
        rating: "7.3/10"
    }

};


// ================================
// HERO WATCH BUTTON
// ================================

function watchMovie() {

    localStorage.setItem(
        "selectedMovie",
        "Avengers"
    );

    localStorage.setItem(
        "selectedVideo",
        "assets/videos/avengers.mp4"
    );

    window.location.href = "watch.html";

}


// ================================
// OPEN MOVIE DETAILS
// ================================

function openMovie(movieName, videoOverride) {

    const modal =
        document.getElementById("movieModal");

    const title =
        document.getElementById("modalTitle");

    const description =
        document.getElementById("modalDescription");

    const poster =
        document.getElementById("modalPoster");

    const year =
        document.getElementById("modalYear");

    const genre =
        document.getElementById("modalGenre");

    const rating =
        document.getElementById("modalRating");


    // Check Admin Published Movies

    const publishedMovies =
        JSON.parse(
            localStorage.getItem(
                "crazymovieMovies"
            )
        ) || [];


    const publishedMovie =
        publishedMovies.find(
            function(movie) {

                return movie.title === movieName;

            }
        );


    // ================================
    // ADMIN MOVIE
    // ================================

    if (publishedMovie) {

        title.innerText =
            publishedMovie.title;

        description.innerText =
            publishedMovie.description;

        poster.src =
            publishedMovie.poster;

        year.innerText =
            "📅 Year: " +
            publishedMovie.year;

        genre.innerText =
            "🎭 Genre: " +
            publishedMovie.genre;

        rating.innerText =
            "⭐ Rating: " +
            publishedMovie.rating;


        localStorage.setItem(
            "selectedMovie",
            publishedMovie.title
        );

        localStorage.setItem(
            "selectedVideo",
            publishedMovie.video
        );


        // Save Download URL
        localStorage.setItem(
            "selectedDownload",
            publishedMovie.download
        );


        modal.style.display =
            "flex";

        return;

    }


    // ================================
    // NORMAL MOVIE
    // ================================

    const movie =
        movieData[movieName];


    if (!movie) {

        console.log(
            "Movie not found:",
            movieName
        );

        return;

    }


    title.innerText =
        movieName;

    description.innerText =
        movie.description;

    poster.src =
        movie.poster;

    year.innerText =
        "📅 Year: " +
        movie.year;

    genre.innerText =
        "🎭 Genre: " +
        movie.genre;

    rating.innerText =
        "⭐ Rating: " +
        movie.rating;


    localStorage.setItem(
        "selectedMovie",
        movieName
    );

    localStorage.setItem(
        "selectedVideo",
        videoOverride ||
        movie.video
    );


    modal.style.display =
        "flex";

}


// ================================
// CLOSE MOVIE POPUP
// ================================

function closeMovie() {

    const modal =
        document.getElementById(
            "movieModal"
        );

    modal.style.display =
        "none";

}


// ================================
// WATCH NOW BUTTON
// ================================

function watchNow() {

    window.location.href =
        "watch.html";

}


// ================================
// SEARCH + FILTER
// ================================

let selectedCategory =
    "All";


function applyAllFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const genreFilter =
        document.getElementById(
            "genreFilter"
        );

    const yearFilter =
        document.getElementById(
            "yearFilter"
        );


    const searchText =
        searchInput
        ? searchInput.value
            .toLowerCase()
            .trim()
        : "";


    const selectedGenre =
        genreFilter
        ? genreFilter.value
        : "all";


    const selectedYear =
        yearFilter
        ? yearFilter.value
        : "all";


    const movieCards =
        document.querySelectorAll(
            ".movie-card"
        );


    movieCards.forEach(
        function(card) {

            const titleElement =
                card.querySelector(
                    "h3"
                );


            if (!titleElement) {
                return;
            }


            const movieName =
                titleElement.innerText
                .trim();


            let movie =
                movieData[movieName];


            // Check Admin Movie

            if (!movie) {

                const publishedMovies =
                    JSON.parse(
                        localStorage.getItem(
                            "crazymovieMovies"
                        )
                    ) || [];


                const publishedMovie =
                    publishedMovies.find(
                        function(item) {

                            return item.title ===
                                movieName;

                        }
                    );


                if (publishedMovie) {

                    movie = {

                        genre:
                            publishedMovie.genre,

                        year:
                            String(
                                publishedMovie.year
                            )

                    };

                }

            }


            if (!movie) {

                return;

            }


            // Search Match

            const searchMatch =
                movieName
                .toLowerCase()
                .includes(
                    searchText
                );


            // Category Match

            const categoryMatch =
                selectedCategory === "All" ||
                movie.genre
                .toLowerCase()
                .includes(
                    selectedCategory
                    .toLowerCase()
                );


            // Genre Match

            const genreMatch =
                selectedGenre === "all" ||
                movie.genre
                .toLowerCase()
                .includes(
                    selectedGenre
                    .toLowerCase()
                );


            // Year Match

            const yearMatch =
                selectedYear === "all" ||
                String(movie.year) ===
                    selectedYear;


            if (
                searchMatch &&
                categoryMatch &&
                genreMatch &&
                yearMatch
            ) {

                card.style.display =
                    "block";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


// ================================
// SEARCH MOVIES
// ================================

function searchMovies() {

    applyAllFilters();

}


// ================================
// CATEGORY FILTER
// ================================

function filterMovies(category) {

    selectedCategory =
        category;

    applyAllFilters();

}


// ================================
// LOAD ADMIN PUBLISHED MOVIES
// ================================

function loadPublishedMovies() {

    const dynamicMovies =
        document.getElementById(
            "dynamicMovies"
        );


    if (!dynamicMovies) {

        return;

    }


    const publishedMovies =
        JSON.parse(
            localStorage.getItem(
                "crazymovieMovies"
            )
        ) || [];


    dynamicMovies.innerHTML =
        "";


    publishedMovies.forEach(
        function(movie) {

            const movieCard =
                document.createElement(
                    "div"
                );


            movieCard.className =
                "movie-card";


            movieCard.setAttribute(
                "data-movie",
                movie.title
            );


            movieCard.setAttribute(
                "data-genre",
                movie.genre
            );


            movieCard.setAttribute(
                "data-year",
                movie.year
            );


            movieCard.innerHTML = `

                <img
                    src="${movie.poster}"
                    alt="${movie.title}"
                >

                <h3>
                    ${movie.title}
                </h3>

            `;


            movieCard.addEventListener(
                "click",
                function() {

                    openMovie(
                        movie.title,
                        movie.video
                    );

                }
            );


            dynamicMovies.appendChild(
                movieCard
            );

        }
    );

}


// ================================
// GENRE FILTER
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const genreFilter =
            document.getElementById(
                "genreFilter"
            );


        if (genreFilter) {

            genreFilter.addEventListener(
                "change",
                applyAllFilters
            );

        }


        const yearFilter =
            document.getElementById(
                "yearFilter"
            );


        if (yearFilter) {

            yearFilter.addEventListener(
                "change",
                applyAllFilters
            );

        }


        // Load Admin Movies

        loadPublishedMovies();

    }
);


// ================================
// CLOSE MODAL BY CLICKING OUTSIDE
// ================================

window.addEventListener(
    "click",
    function(event) {

        const movieModal =
            document.getElementById(
                "movieModal"
            );


        if (
            event.target ===
            movieModal
        ) {

            movieModal.style.display =
                "none";

        }

    }
);


// ================================
// CLOSE MODAL WITH ESC
// ================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            const modal =
                document.getElementById(
                    "movieModal"
                );


            if (
                modal &&
                modal.style.display ===
                "flex"
            ) {

                modal.style.display =
                    "none";

            }

        }

    }
);


// ================================
// CLOSE MOVIE MODAL
// ================================

function closeMovieModal() {

    const modal =
        document.getElementById(
            "movieModal"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}