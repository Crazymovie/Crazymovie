// ===============================
// Firebase Import
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// ===============================
// Firebase Config
// ===============================

const firebaseConfig = {

    apiKey: "AIzaSyC3Xo0G-Vs2ldLqUO54n7FBSdWlPPdoxsc",

    authDomain: "crazymovie-4a2ae.firebaseapp.com",

    projectId: "crazymovie-4a2ae",

    storageBucket: "crazymovie-4a2ae.firebasestorage.app",

    messagingSenderId: "1025439382279",

    appId: "1:1025439382279:web:2380f84d57e302bed023a2"


};


// ===============================
// Initialize Firebase
// ===============================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

// Collection
const moviesRef = collection(db, "movies");

console.log("🔥 Firebase Connected Successfully!");

// ===============================
// Expose Firebase to Window
// ===============================

window.db = db;
window.moviesRef = moviesRef;

window.storage = storage;
window.ref = ref;
window.uploadBytes = uploadBytes;
window.getDownloadURL = getDownloadURL;

window.collection = collection;
window.doc = doc;

window.addDoc = addDoc;
window.getDocs = getDocs;
window.getDoc = getDoc;

window.setDoc = setDoc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;

window.query = query;
window.where = where;


let selectedPosterImage = "";

window.cancelEdit = function () {

    /* ===============================
       EXIT EDIT MODE
    =============================== */

    editingMovieId = null;

    selectedPosterImage = "";


    /* ===============================
       RESET FORM
    =============================== */

    clearMovieForm();


    /* ===============================
       RESET FORM TITLE
    =============================== */

    document.getElementById(
        "formTitle"
    ).innerText =
        "🎬 Add New Movie";


    /* ===============================
       RESET PUBLISH BUTTON
    =============================== */

    const publishButton =
        document.getElementById(
            "publishButton"
        );

    publishButton.innerText =
        "➕ Publish Movie";

    publishButton.onclick =
        publishMovie;


    /* ===============================
       HIDE CANCEL BUTTON
    =============================== */

    document.getElementById(
        "cancelEditButton"
    ).style.display =
        "none";


    /* ===============================
       REMOVE CURRENT SCREENSHOT PREVIEWS
    =============================== */

    const preview1 =
        document.getElementById(
            "currentScreenshot1Preview"
        );

    const preview2 =
        document.getElementById(
            "currentScreenshot2Preview"
        );

    const preview3 =
        document.getElementById(
            "currentScreenshot3Preview"
        );

    const preview4 =
        document.getElementById(
            "currentScreenshot4Preview"
        );


    if (preview1) preview1.innerHTML = "";
    if (preview2) preview2.innerHTML = "";
    if (preview3) preview3.innerHTML = "";
    if (preview4) preview4.innerHTML = "";


    /* ===============================
       STAY ON ADMIN PAGE
    =============================== */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};

document.getElementById(
    "cancelEditButton"
).addEventListener(
    "click",
    window.cancelEdit
);

