import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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

export {
    db,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
};