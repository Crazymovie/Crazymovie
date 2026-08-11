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

// Collection
const moviesRef = collection(db, "movies");

console.log("🔥 Firebase Connected Successfully!");

// ===============================
// Expose Firebase to Window
// ===============================

window.db = db;
window.moviesRef = moviesRef;

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

    editingMovieId = null;

    selectedPosterImage = "";

    clearMovieForm();

};

document.getElementById(
    "cancelEditButton"
).addEventListener(
    "click",
    window.cancelEdit
);