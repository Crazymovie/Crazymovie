import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc
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

        document.getElementById(
            "moviePoster"
        ).src = movie.poster || "";


        // ================================
        // MOVIE TITLE
        // ================================

        document.getElementById(
            "movieTitle"
        ).innerText =
            movie.title || "";


        // ================================
        // DESCRIPTION
        // ================================

        document.getElementById(
            "movieDescription"
        ).innerText =
            movie.description || "";


        // ================================
        // RATING
        // ================================

        document.getElementById(
            "movieRating"
        ).innerText =
            movie.rating || "N/A";


        // ================================
        // YEAR
        // ================================

        document.getElementById(
            "movieYear"
        ).innerText =
            movie.year || "N/A";


        // ================================
        // GENRE
        // ================================

        document.getElementById(
            "movieGenre"
        ).innerText =
            movie.genre || "N/A";


        // ================================
        // LANGUAGE
        // ================================

        document.getElementById(
            "movieLanguage"
        ).innerText =
            movie.language || "N/A";


        // ================================
        // QUALITY
        // ================================

        document.getElementById(
            "movieQuality"
        ).innerText =
            movie.quality || "N/A";


        // ================================
        // DURATION
        // ================================

        document.getElementById(
            "movieDuration"
        ).innerText =
            movie.duration || "N/A";


    // ========================================
// MOVIE SCREENSHOTS
// ========================================

document.getElementById(
    "screenshot1"
).src =
    movie.screenshot1 || "";

document.getElementById(
    "screenshot2"
).src =
    movie.screenshot2 || "";

document.getElementById(
    "screenshot3"
).src =
    movie.screenshot3 || "";

document.getElementById(
    "screenshot4"
).src =
    movie.screenshot4 || "";

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


// ================================
// START
// ================================

loadMovie();