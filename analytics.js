
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc,
    increment
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


const analyticsApp =
    initializeApp(
        firebaseConfig,
        "analyticsApp"
    );

const db =
    getFirestore(analyticsApp);


// ================================
// VISITOR TRACKING
// ================================

async function trackVisitor() {

    const visitorKey = "crazymovie_visitor_tracked";

    // Same browser-এ একই দিনে আবার count করবে না
    const today = new Date()
        .toISOString()
        .split("T")[0];

    const sessionKey =
        visitorKey + "_" + today;

    if (sessionStorage.getItem(sessionKey)) {
        return;
    }

    try {

        const totalRef = doc(
            db,
            "siteAnalytics",
            "totals"
        );

        const dailyRef = doc(
            db,
            "siteAnalyticsDaily",
            today
        );


        // Total visitors
        await setDoc(
            totalRef,
            {
                visitors: increment(1)
            },
            {
                merge: true
            }
        );


        // Today's visitors
        await setDoc(
            dailyRef,
            {
                visitors: increment(1)
            },
            {
                merge: true
            }
        );


        sessionStorage.setItem(
            sessionKey,
            "true"
        );


        console.log(
            "👤 Visitor tracked:",
            today
        );


    } catch (error) {

        console.error(
            "❌ Failed to track visitor:",
            error
        );

    }

}


trackVisitor();