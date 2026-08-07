import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");

if (!movieId) {

    alert("Movie not found.");

    window.location.href = "index.html";

}

async function loadMovie() {

    try {

        const movieRef = doc(db, "movies", movieId);

        const movieSnap = await getDoc(movieRef);

        if (!movieSnap.exists()) {

            alert("Movie not found.");

            window.location.href = "index.html";

            return;

        }

        const movie = movieSnap.data();

        document.getElementById("moviePoster").src =
            movie.poster || "";

        document.getElementById("movieTitle").innerText =
            movie.title || "";

        document.getElementById("movieDescription").innerText =
            movie.description || "";

        document.getElementById("movieRating").innerText =
movie.rating || "N/A";

        document.getElementById("movieYear").innerText =
movie.year || "N/A";

        document.getElementById("movieGenre").innerText =
movie.genre || "N/A";

document.getElementById("movieLanguage").innerText =
movie.language || "N/A";


document.getElementById("movieQuality").innerText =
movie.quality || "N/A";


document.getElementById("movieDuration").innerText =
movie.duration || "N/A";


document
    .getElementById("downloadButton")
    .addEventListener("click", function () {

        window.location.href =
            "download.html?id=" + movieId;

    });


    } catch (error) {

        console.error(error);

        alert("Failed to load movie.");

    }

}


loadMovie();