import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ========================================
// FIREBASE CONFIG
// ========================================

const firebaseConfig = {

    apiKey:
        "AIzaSyC3Xo0G-Vs2ldLqUO54n7FBSdWlPPdoxsc",

    authDomain:
        "crazymovie-4a2ae.firebaseapp.com",

    projectId:
        "crazymovie-4a2ae",

    storageBucket:
        "crazymovie-4a2ae.firebasestorage.app",

    messagingSenderId:
        "1025439382279",

    appId:
        "1:1025439382279:web:2380f84d57e302bed023a2"

};


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("🔥 Crazymovie Firebase Connected!");


// ========================================
// GLOBAL DATA
// ========================================

let allMovies = [];

let selectedCategory = "All";


// ========================================
// CREATE MOVIE CARD
// ========================================

function createMovieCard(movie, movieId) {

    const title =
        movie.title || "Untitled";

    const poster =
        movie.poster || "";

    const year =
        movie.year || "";

    const genre =
        movie.genre || "";

    const rating =
        movie.rating || "";


    const card =
        document.createElement("div");

    card.className =
        "movie-card";


    // ========================================
    // FILTER DATA
    // ========================================

    card.setAttribute(
        "data-genre",
        genre
    );

    card.setAttribute(
        "data-year",
        year
    );

    card.setAttribute(
        "data-id",
        movieId
    );


    // ========================================
    // CARD HTML
    // ========================================

    card.innerHTML = `

        <img
            src="${poster}"
            alt="${title}"
            class="movie-poster"
            loading="lazy"
        >

        <div class="movie-card-content">

            <h3>
                ${title}
            </h3>

            ${
                year
                    ? `
                        <p class="movie-year">
                            ${year}
                        </p>
                      `
                    : ""
            }

            ${
                genre
                    ? `
                        <p class="movie-genre">
                            ${genre}
                        </p>
                      `
                    : ""
            }

            ${
                rating
                    ? `
                        <p class="movie-rating">
                            ⭐ ${rating}
                        </p>
                      `
                    : ""
            }

        </div>

    `;


    // ========================================
    // MOVIE CLICK
    // ========================================

    card.addEventListener(
        "click",
        function() {

            window.location.href =
                "movie.html?id=" +
                encodeURIComponent(movieId);

        }
    );


    return card;

}


// ========================================
// LOAD ALL MOVIES
// ========================================

async function loadMovies() {

    const trendingContainer =
        document.getElementById(
            "trendingMovies"
        );


    const moviesContainer =
        document.getElementById(
            "dynamicMovies"
        );


    if (!trendingContainer) {

        console.log(
            "⚠️ trendingMovies element not found."
        );

    }


    if (!moviesContainer) {

        console.log(
            "⚠️ dynamicMovies element not found."
        );

    }


    // ========================================
    // LOADING
    // ========================================

    if (trendingContainer) {

        trendingContainer.innerHTML = `

            <p class="loading-message">
                Loading...
            </p>

        `;

    }


    if (moviesContainer) {

        moviesContainer.innerHTML = `

            <p class="loading-message">
                Loading...
            </p>

        `;

    }


    try {

        // ========================================
        // FIRESTORE
        // ========================================

        const moviesRef =
            collection(
                db,
                "movies"
            );


        const snapshot =
            await getDocs(
                moviesRef
            );


        // ========================================
        // CLEAR
        // ========================================

        if (trendingContainer) {

            trendingContainer.innerHTML = "";

        }


        if (moviesContainer) {

            moviesContainer.innerHTML = "";

        }


        // ========================================
        // STORE ALL MOVIES
        // ========================================

        allMovies = [];


        snapshot.forEach(
            function(docSnapshot) {

                const movie =
                    docSnapshot.data();


                const movieId =
                    docSnapshot.id;


                allMovies.push({

                    id: movieId,

                    ...movie

                });

            }
        );


        // ========================================
        // SORT MOVIES
        // NEWEST PUBLISHED MOVIES FIRST
        // ========================================

        allMovies.sort(
            function(a, b) {

                const timeA =
                    a.createdAt?.seconds ||
                    0;

                const timeB =
                    b.createdAt?.seconds ||
                    0;


                return timeB - timeA;

            }
        );


        let trendingCount = 0;

        let regularCount = 0;


        // ========================================
// SHOW TRENDING + ALL MOVIES
// ========================================

allMovies.forEach(
    function(movie) {

        const movieId =
            movie.id;


        // ========================================
        // TRENDING MOVIES
        // ========================================

        if (
            movie.trending === true
        ) {

            trendingCount++;

            if (trendingContainer) {

                const trendingCard =
                    createMovieCard(
                        movie,
                        movieId
                    );

                trendingContainer.appendChild(
                    trendingCard
                );

            }

        }


        // ========================================
        // ALL MOVIES
        // ========================================

        regularCount++;

        if (moviesContainer) {

            const movieCard =
                createMovieCard(
                    movie,
                    movieId
                );

            moviesContainer.appendChild(
                movieCard
            );

        }

    }
);


        // ========================================
        // NO TRENDING
        // ========================================

        if (
            trendingCount === 0 &&
            trendingContainer
        ) {

            trendingContainer.innerHTML = `

                <p class="no-movies-message">
                    No trending movies available.
                </p>

            `;

        }


        // ========================================
        // NO REGULAR MOVIES
        // ========================================

        if (
            regularCount === 0 &&
            moviesContainer
        ) {

            moviesContainer.innerHTML = `

                <p class="no-movies-message">
                    No movies available.
                </p>

            `;

        }


        // ========================================
        // FILTER
        // ========================================

        populateYearFilter();

        applyAllFilters();


        console.log(
            "🔥 Total Movies:",
            allMovies.length
        );

        console.log(
            "🔥 Trending Movies:",
            trendingCount
        );

        console.log(
            "🎬 Regular Movies:",
            regularCount
        );


    } catch (error) {

        console.error(
            "❌ Failed to load movies:",
            error
        );


        if (trendingContainer) {

            trendingContainer.innerHTML = `

                <p class="error-message">
                    Failed to load trending movies.
                </p>

            `;

        }


        if (moviesContainer) {

            moviesContainer.innerHTML = `

                <p class="error-message">
                    Failed to load movies.
                </p>

            `;

        }

    }

}


// ========================================
// APPLY ALL FILTERS
// ========================================

function applyAllFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    // ========================================
    // SEARCH MODE
    // ========================================

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";

    const trendingContainer =
        document.getElementById(
            "trendingMovies"
        );

    // Search করলে Trending hide হবে
    if (trendingContainer) {

        const trendingSection =
            trendingContainer.closest("section");

        if (searchText !== "") {

            if (trendingSection) {
                trendingSection.style.display = "none";
            } else {
                trendingContainer.style.display = "none";
            }

        } else {

            if (trendingSection) {
                trendingSection.style.display = "";
            } else {
                trendingContainer.style.display = "";
            }

        }

    }


        // ========================================
    // NATIVE BANNER POSITION
    // ========================================

    const nativeBanner =
        document.getElementById("nativeBanner");

    const moviesSection =
        document.getElementById("movies");

    if (
        nativeBanner &&
        moviesSection &&
        trendingContainer
    ) {

        const trendingSection =
            trendingContainer.closest("section");

        if (searchText !== "") {

            // Search করলে Banner Movies section-এর নিচে যাবে
            moviesSection.insertAdjacentElement(
                "afterend",
                nativeBanner
            );

        } else {

            // Search clear করলে Banner আগের জায়গায় ফিরে আসবে
            if (trendingSection) {

                trendingSection.insertAdjacentElement(
                    "afterend",
                    nativeBanner
                );

            }

        }

    }


    const genreFilter =
        document.getElementById(
            "genreFilter"
        );


    const yearFilter =
        document.getElementById(
            "yearFilter"
        );


    


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
                card.querySelector("h3");


            if (!titleElement) {

                return;

            }


            const movieName =
                titleElement.innerText
                    .trim();


            const movieGenre =
                card.getAttribute(
                    "data-genre"
                ) || "";


            const movieYear =
                card.getAttribute(
                    "data-year"
                ) || "";


            // ========================================
            // SEARCH
            // ========================================

            const searchMatch =
                movieName
                    .toLowerCase()
                    .includes(
                        searchText
                    );


            // ========================================
            // CATEGORY
            // ========================================

            const categoryMatch =
                selectedCategory === "All" ||
                movieGenre
                    .toLowerCase()
                    .includes(
                        selectedCategory
                            .toLowerCase()
                    );


            // ========================================
            // GENRE
            // ========================================

            const genreMatch =
                selectedGenre === "all" ||
                movieGenre
                    .toLowerCase()
                    .includes(
                        selectedGenre
                            .toLowerCase()
                    );


            // ========================================
            // YEAR
            // ========================================

            const yearMatch =
                selectedYear === "all" ||
                String(movieYear) ===
                    String(selectedYear);


            // ========================================
            // SHOW / HIDE
            // ========================================

            if (
                searchMatch &&
                categoryMatch &&
                genreMatch &&
                yearMatch
            ) {

                card.style.display =
                    "";


            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


// ========================================
// SEARCH
// ========================================

function searchMovies() {

    applyAllFilters();

}


// ========================================
// CATEGORY FILTER
// ========================================

function filterMovies(category) {

    selectedCategory =
        category;

    applyAllFilters();

}


// ========================================
// YEAR FILTER
// ========================================

function populateYearFilter() {

    const yearFilter =
        document.getElementById(
            "yearFilter"
        );


    if (!yearFilter) {

        return;

    }


    const years =
        new Set();


    allMovies.forEach(
        function(movie) {

            if (movie.year) {

                years.add(
                    String(movie.year)
                );

            }

        }
    );


    const sortedYears =
        Array.from(years)
            .sort(
                function(a, b) {

                    return Number(b) -
                        Number(a);

                }
            );


    yearFilter.innerHTML = `

        <option value="all">
            All Years
        </option>

    `;


    sortedYears.forEach(
        function(year) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                year;


            option.textContent =
                year;


            yearFilter.appendChild(
                option
            );

        }
    );

}


// ========================================
// PAGE READY
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        // ========================================
        // SEARCH
        // ========================================

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                searchMovies
            );

        }


        // ========================================
        // GENRE
        // ========================================

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


        // ========================================
        // YEAR
        // ========================================

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


        // ========================================
        // LOAD MOVIES
        // ========================================

        loadMovies();

    }
);


// ========================================
// GLOBAL FUNCTIONS
// ========================================

window.searchMovies =
    searchMovies;


window.filterMovies =
    filterMovies;


window.applyAllFilters =
    applyAllFilters;