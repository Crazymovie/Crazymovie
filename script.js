import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyC3Xo0G-Vs2ldLqUO54n7FBSdWlPPdoxsc",
  authDomain: "crazymovie-4a2ae.firebaseapp.com",
  projectId: "crazymovie-4a2ae",
  storageBucket: "crazymovie-4a2ae.firebasestorage.app",
  messagingSenderId: "1025439382279",
  appId: "1:1025439382279:web:2380f84d57e302bed023a2"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("🔥 Index Firebase Connected!");


console.log("Welcome to Crazymovie");


// ================================
// MOVIE DATA
// ================================

const movieData = {};


// ================================
// HERO WATCH BUTTON
// ================================

function watchMovie() {

    alert("No movie available yet. Please check back soon.");

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