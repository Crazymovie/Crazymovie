import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ================================
// FIREBASE CONFIG
// ================================

const firebaseConfig = {
    apiKey: "AIzaSyC3Xo0-GVs2ldLqUO54n7FBSdWlPPdoxsc",
    authDomain: "crazymovie-4a2ae.firebaseapp.com",
    projectId: "crazymovie-4a2ae",
    storageBucket: "crazymovie-4a2ae.firebasestorage.app",
    messagingSenderId: "1025439382279",
    appId: "1:1025439382279:web:2380f84d57e302bed023a2"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ================================
// GET MOVIE ID FROM URL
// ================================

const params = new URLSearchParams(
    window.location.search
);

const movieId = params.get("id");


if (!movieId) {

    alert("Movie not found.");

    window.location.href = "index.html";

}


// ================================
// LOAD MOVIE
// ================================

async function loadMovie() {

    try {

        const movieRef = doc(
            db,
            "movies",
            movieId
        );

        const movieSnap = await getDoc(
            movieRef
        );


        if (!movieSnap.exists()) {

            alert("Movie not found.");

            window.location.href = "index.html";

            return;

        }


        const movie = movieSnap.data();


        // ================================
        // MOVIE HERO BANNER
        // ================================

        const heroBanner =
            document.getElementById("heroBanner");

        if (heroBanner) {

            heroBanner.src =
                movie.banner || "";

        }


        // ================================
        // MOVIE POSTER
        // ================================

        const moviePoster =
            document.getElementById("moviePoster");

        if (moviePoster) {

            moviePoster.src =
                movie.poster || "";

        }


        // ================================
        // MOVIE TITLE
        // ================================

        const movieTitle =
            document.getElementById("movieTitle");

        if (movieTitle) {

            movieTitle.innerText =
                movie.title || "";

        }


        // ================================
        // DESCRIPTION
        // ================================

        const movieDescription =
            document.getElementById("movieDescription");

        if (movieDescription) {

            movieDescription.innerText =
                movie.description || "";

        }


        // ================================
        // RATING
        // ================================

        const movieRating =
            document.getElementById("movieRating");

        if (movieRating) {

            movieRating.innerText =
                movie.rating || "N/A";

        }


        // ================================
        // YEAR
        // ================================

        const movieYear =
            document.getElementById("movieYear");

        if (movieYear) {

            movieYear.innerText =
    movie.releaseDate || movie.year || "N/A";

        }


        // ================================
        // GENRE
        // ================================

        const movieGenre =
            document.getElementById("movieGenre");

        if (movieGenre) {

            movieGenre.innerText =
                movie.genre || "N/A";

        }


        // ================================
        // LANGUAGE
        // ================================

        const movieLanguage =
            document.getElementById("movieLanguage");

        if (movieLanguage) {

            movieLanguage.innerText =
                movie.language || "N/A";

        }


        // ================================
        // QUALITY
        // ================================

        const movieQuality =
            document.getElementById("movieQuality");

        if (movieQuality) {

            movieQuality.innerText =
                movie.quality || "N/A";

        }


        // ================================
        // DURATION
        // ================================

        const movieDuration =
            document.getElementById("movieDuration");

        if (movieDuration) {

            movieDuration.innerText =
                movie.duration || "N/A";

        }


        // ================================
        // MOVIE SCREENSHOTS
        // ================================

        const screenshot1 =
            document.getElementById("screenshot1");

        const screenshot2 =
            document.getElementById("screenshot2");

        const screenshot3 =
            document.getElementById("screenshot3");

        const screenshot4 =
            document.getElementById("screenshot4");


        if (screenshot1) {

            screenshot1.src =
                movie.screenshot1 || "";

        }

        if (screenshot2) {

            screenshot2.src =
                movie.screenshot2 || "";

        }

        if (screenshot3) {

            screenshot3.src =
                movie.screenshot3 || "";

        }

        if (screenshot4) {

            screenshot4.src =
                movie.screenshot4 || "";

        }


        // ================================
        // DOWNLOAD BUTTON
        // ================================

        const downloadButton =
            document.getElementById(
                "downloadButton"
            );


        if (downloadButton) {

            downloadButton.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "download.html?id=" +
                        encodeURIComponent(movieId);

                }
            );

        }


        // ================================
        // LOAD RELATED MOVIES
        // ================================

        await loadRelatedMovies(movie);


        // ================================
        // SUCCESS LOG
        // ================================

        console.log(
            "🎬 Movie Loaded Successfully:",
            movie.title
        );


    } catch (error) {

        console.error(
            "❌ Failed to load movie:",
            error
        );

        alert(
            "Failed to load movie."
        );

    }

}


// ========================================
// LOAD RELATED MOVIES
// ========================================

async function loadRelatedMovies(currentMovie) {

    const relatedGrid =
        document.getElementById(
            "relatedMoviesGrid"
        );


    const relatedSection =
        document.querySelector(
            ".related-movies-section"
        );


    // ================================
    // CHECK CONTAINER
    // ================================

    if (!relatedGrid) {

        console.warn(
            "⚠️ Related Movies container not found."
        );

        return;

    }


    // ================================
    // SHOW LOADING
    // ================================

    relatedGrid.innerHTML = `
        <p style="
            color:#aaa;
            font-size:14px;
        ">
            Loading related movies...
        </p>
    `;


    try {

        // ================================
        // GET ALL MOVIES
        // ================================

        const moviesRef =
            collection(
                db,
                "movies"
            );


        const moviesSnap =
            await getDocs(
                moviesRef
            );


        const allMovies = [];


        moviesSnap.forEach(
            (movieDoc) => {

                // Current movie বাদ
                if (
                    movieDoc.id === movieId
                ) {

                    return;

                }


                allMovies.push({

                    id: movieDoc.id,

                    ...movieDoc.data()

                });

            }
        );


        // ================================
        // CURRENT MOVIE GENRE
        // ================================

        const currentGenre =
            normalizeValue(
                currentMovie.genre
            );


        // ================================
        // CURRENT MOVIE LANGUAGE
        // ================================

        const currentLanguage =
            normalizeValue(
                currentMovie.language
            );


        // ================================
        // SAME GENRE MOVIES
        // ================================

        let relatedMovies =
            allMovies.filter(
                (movie) => {

                    const movieGenre =
                        normalizeValue(
                            movie.genre
                        );


                    return (
                        currentGenre &&
                        movieGenre &&
                        genresMatch(
                            currentGenre,
                            movieGenre
                        )
                    );

                }
            );


        // ================================
        // REMOVE DUPLICATES
        // ================================

        relatedMovies =
            removeDuplicateMovies(
                relatedMovies
            );


        // ================================
        // SAME LANGUAGE FALLBACK
        // ================================

        if (
            relatedMovies.length < 6 &&
            currentLanguage
        ) {

            const languageMovies =
                allMovies.filter(
                    (movie) => {

                        const movieLanguage =
                            normalizeValue(
                                movie.language
                            );


                        return (
                            movieLanguage &&
                            languagesMatch(
                                currentLanguage,
                                movieLanguage
                            )
                        );

                    }
                );


            languageMovies.forEach(
                (movie) => {

                    const alreadyExists =
                        relatedMovies.some(
                            (existingMovie) =>
                                existingMovie.id ===
                                movie.id
                        );


                    if (
                        !alreadyExists &&
                        relatedMovies.length < 6
                    ) {

                        relatedMovies.push(
                            movie
                        );

                    }

                }
            );

        }


        // ================================
        // LIMIT TO 6
        // ================================

        relatedMovies =
            relatedMovies.slice(
                0,
                6
            );


        // ================================
        // NO RELATED MOVIES
        // ================================

        if (
            relatedMovies.length === 0
        ) {

            relatedGrid.innerHTML = "";

            if (relatedSection) {

                relatedSection.style.display =
                    "none";

            }

            console.log(
                "ℹ️ No related movies found."
            );

            return;

        }


        // ================================
        // SHOW RELATED SECTION
        // ================================

        if (relatedSection) {

            relatedSection.style.display =
                "block";

        }


        // ================================
        // CREATE RELATED MOVIE CARDS
        // ================================

        relatedGrid.innerHTML =
            relatedMovies
                .map(
                    (movie) =>
                        createRelatedMovieCard(
                            movie
                        )
                )
                .join("");


        console.log(
            "🎬 Related Movies Loaded:",
            relatedMovies.length
        );


    } catch (error) {

        console.error(
            "❌ Failed to load related movies:",
            error
        );


        relatedGrid.innerHTML = `
            <p style="
                color:#aaa;
                font-size:14px;
            ">
                No related movies available.
            </p>
        `;

    }

}


// ========================================
// CREATE RELATED MOVIE CARD
// ========================================

function createRelatedMovieCard(movie) {

    const title =
        escapeHTML(
            movie.title || "Untitled Movie"
        );


    const poster =
        escapeAttribute(
            movie.poster || ""
        );


    const year =
        escapeHTML(
            movie.year || "N/A"
        );


    const genre =
        escapeHTML(
            movie.genre || "N/A"
        );


    return `

        <div
            class="related-movie-card"
        >

            <div
                class="related-movie-image"
                onclick="openRelatedMovie('${movie.id}')"
            >

                <img
                    src="${poster}"
                    alt="${title}"
                    loading="lazy"
                >

                <div
                    class="related-movie-overlay"
                >
                    ▶
                </div>

            </div>


            <div
                class="related-movie-info"
            >

                <h3>
                    ${title}
                </h3>


                <div
                    class="related-movie-meta"
                >

                    <span>
                        📅 ${year}
                    </span>

                    <span>
                        🎭 ${genre}
                    </span>

                </div>


                <button
                    type="button"
                    onclick="openRelatedMovie('${movie.id}')"
                >
                    View Movie
                </button>

            </div>

        </div>

    `;

}


// ========================================
// OPEN RELATED MOVIE
// ========================================

window.openRelatedMovie =
    function (id) {

        window.location.href =
            "movie.html?id=" +
            encodeURIComponent(id);

    };


// ========================================
// NORMALIZE VALUE
// ========================================

function normalizeValue(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .trim()
        .toLowerCase();

}


// ========================================
// GENRE MATCH
// ========================================

function genresMatch(
    currentGenre,
    movieGenre
) {

    const currentGenres =
        currentGenre
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);


    const movieGenres =
        movieGenre
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);


    return currentGenres.some(
        genre =>
            movieGenres.includes(
                genre
            )
    );

}


// ========================================
// LANGUAGE MATCH
// ========================================

function languagesMatch(
    currentLanguage,
    movieLanguage
) {

    const currentLanguages =
        currentLanguage
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);


    const movieLanguages =
        movieLanguage
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);


    return currentLanguages.some(
        language =>
            movieLanguages.includes(
                language
            )
    );

}


// ========================================
// REMOVE DUPLICATE MOVIES
// ========================================

function removeDuplicateMovies(
    movies
) {

    const seen =
        new Set();


    return movies.filter(
        movie => {

            if (
                seen.has(
                    movie.id
                )
            ) {

                return false;

            }


            seen.add(
                movie.id
            );


            return true;

        }
    );

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ========================================
// ESCAPE ATTRIBUTE
// ========================================

function escapeAttribute(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}


// ================================
// START
// ================================

loadMovie();