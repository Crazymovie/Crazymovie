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


const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


console.log(
    "🔥 Index Firebase Connected!"
);


// ========================================
// SEARCH + FILTER
// ========================================

let selectedCategory = "All";


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


            const movieGenre =
                card.getAttribute(
                    "data-genre"
                ) || "";


            const movieYear =
                card.getAttribute(
                    "data-year"
                ) || "";


            // ================================
            // SEARCH MATCH
            // ================================

            const searchMatch =
                movieName
                .toLowerCase()
                .includes(
                    searchText
                );


            // ================================
            // CATEGORY MATCH
            // ================================

            const categoryMatch =
                selectedCategory === "All" ||
                movieGenre
                .toLowerCase()
                .includes(
                    selectedCategory
                    .toLowerCase()
                );


            // ================================
            // GENRE MATCH
            // ================================

            const genreMatch =
                selectedGenre === "all" ||
                movieGenre
                .toLowerCase()
                .includes(
                    selectedGenre
                    .toLowerCase()
                );


            // ================================
            // YEAR MATCH
            // ================================

            const yearMatch =
                selectedYear === "all" ||
                String(movieYear) ===
                    String(selectedYear);


            // ================================
            // SHOW / HIDE
            // ================================

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


// ========================================
// SEARCH MOVIES
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
// LOAD MOVIES FROM FIREBASE
// ========================================

async function loadPublishedMovies() {

    const dynamicMovies =
        document.getElementById(
            "dynamicMovies"
        );


    if (!dynamicMovies) {

        return;

    }


    try {

        // ========================================
        // GET MOVIES FROM FIRESTORE
        // ========================================

        const moviesSnapshot =
            await getDocs(
                collection(
                    db,
                    "movies"
                )
            );


        // ========================================
        // CLEAR OLD MOVIES
        // ========================================

        dynamicMovies.innerHTML =
            "";


        // ========================================
        // NO MOVIES
        // ========================================

        if (moviesSnapshot.empty) {

            dynamicMovies.innerHTML = `
                <p style="
                    color: #aaa;
                    text-align: center;
                    width: 100%;
                    padding: 30px;
                ">
                    No movies available yet.
                </p>
            `;

            return;

        }


        // ========================================
        // LOAD EACH MOVIE
        // ========================================

        moviesSnapshot.forEach(
            function(movieDoc) {

                const movie = {

                    id:
                        movieDoc.id,

                    ...movieDoc.data()

                };


                // ========================================
                // MOVIE CARD
                // ========================================

                const movieCard =
                    document.createElement(
                        "div"
                    );


                movieCard.className =
                    "movie-card";


                movieCard.setAttribute(
                    "data-movie",
                    movie.title || ""
                );


                movieCard.setAttribute(
                    "data-genre",
                    movie.genre || ""
                );


                movieCard.setAttribute(
                    "data-year",
                    movie.year || ""
                );


                movieCard.innerHTML = `

                    <img
                        src="${movie.poster || ""}"
                        alt="${movie.title || "Movie"}"
                    >

                    <h3>
                        ${movie.title || "Untitled Movie"}
                    </h3>

                `;


                // ========================================
                // OPEN MOVIE DETAILS
                // ========================================

                movieCard.addEventListener(
                    "click",
                    function() {

                        window.location.href =
                            "movie.html?id=" +
                            encodeURIComponent(
                                movie.id
                            );

                    }
                );


                dynamicMovies.appendChild(
                    movieCard
                );

            }
        );


        console.log(
            "🔥 Firebase Movies Loaded Successfully!"
        );


        // ========================================
        // CREATE YEAR FILTER
        // ========================================

        populateYearFilter();


        // ========================================
        // APPLY INITIAL FILTERS
        // ========================================

        applyAllFilters();


    } catch (error) {

        console.error(
            "❌ Error Loading Movies From Firebase:",
            error
        );


        dynamicMovies.innerHTML = `
            <p style="
                color: #ff4d4d;
                text-align: center;
                width: 100%;
                padding: 30px;
            ">
                Failed to load movies.
            </p>
        `;

    }

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


    const movieCards =
        document.querySelectorAll(
            ".movie-card"
        );


    const years =
        new Set();


    movieCards.forEach(
        function(card) {

            const year =
                card.getAttribute(
                    "data-year"
                );


            if (year) {

                years.add(
                    String(year)
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
        // GENRE FILTER
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
        // YEAR FILTER
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
        // LOAD FIREBASE MOVIES
        // ========================================

        loadPublishedMovies();

    }
);