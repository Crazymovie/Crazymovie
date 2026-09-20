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
    where,
    orderBy
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

// ========================================
// ADMIN - SITE REQUESTS / PROBLEMS
// ========================================

async function loadAdminSiteRequests() {

    const container =
        document.getElementById("adminSiteRequests");

    if (!container) return;

    container.innerHTML = `
        <p class="admin-requests-loading">
            Loading requests...
        </p>
    `;

    try {

        const requestsQuery = query(
            collection(db, "siteRequests"),
            orderBy("createdAt", "desc")
        );

        const snapshot =
            await getDocs(requestsQuery);

        if (snapshot.empty) {

            container.innerHTML = `
                <p class="admin-requests-empty">
                    No requests or problems found.
                </p>
            `;

            return;
        }

        container.innerHTML = "";

        snapshot.forEach((docSnapshot) => {

            const data =
                docSnapshot.data();

            const item =
                document.createElement("div");

            item.className =
                "admin-request-card";

            const typeLabel =
                data.type === "movie"
                    ? "🎬 Movie Request"
                    : "⚠️ Download Problem";

            let createdText = "Recently";

            if (data.createdAt) {

                const createdDate =
                    data.createdAt.toDate
                        ? data.createdAt.toDate()
                        : new Date(data.createdAt);

                createdText =
                    createdDate.toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                        }
                    ).replace(",", " •");
            }

            item.innerHTML = `

                <div class="admin-request-type">
                    ${typeLabel}
                </div>

                <h3>
                    ${escapeAdminHtml(data.movieTitle)}
                </h3>

                <p>
                    ${escapeAdminHtml(data.message)}
                </p>

                <small>
                    ${createdText}
                </small>

                <div class="admin-reply-box">

                    <textarea
                        id="adminReply-${docSnapshot.id}"
                        class="admin-reply-input"
                        placeholder="Write a reply to this visitor..."
                        rows="3"
                    >${escapeAdminHtml(data.adminReply || "")}</textarea>

                    <button
                        type="button"
                        class="admin-reply-button"
                        onclick="replyToSiteRequest('${docSnapshot.id}')"
                    >
                        🛠️ ${data.adminReply ? "Update Reply" : "Reply"}
                    </button>

                </div>

                ${
                    data.adminReply
                        ? `
                            <div class="admin-existing-reply">
                                <strong>🛠️ Crazymovie Admin</strong>

                                <p>
                                    ${escapeAdminHtml(data.adminReply)}
                                </p>

                                ${
                                    data.adminReplyAt
                                        ? `
                                            <small>
                                                ${
                                                    (
                                                        data.adminReplyAt.toDate
                                                            ? data.adminReplyAt.toDate()
                                                            : new Date(data.adminReplyAt)
                                                    )
                                                        .toLocaleString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                                hour: "numeric",
                                                                minute: "2-digit",
                                                                hour12: true
                                                            }
                                                        )
                                                        .replace(",", " •")
                                                }
                                            </small>
                                        `
                                        : ""
                                }
                            </div>
                        `
                        : ""
                }

                <div class="admin-request-actions">

                    <button
                        type="button"
                        class="admin-delete-request"
                        onclick="deleteAdminSiteRequest('${docSnapshot.id}')"
                    >
                        🗑️ Delete
                    </button>

                </div>

            `;

            container.appendChild(item);

        });

    } catch (error) {

        console.error(
            "❌ Failed to load admin site requests:",
            error
        );

        container.innerHTML = `
            <p class="admin-requests-error">
                Failed to load requests.
            </p>
        `;
    
    }
}

// ========================================
// ADMIN - REPLY TO SITE REQUEST
// ========================================

window.replyToSiteRequest = async function (requestId) {

    const replyInput =
        document.getElementById(`adminReply-${requestId}`);

    if (!replyInput) return;

    const reply =
        replyInput.value.trim();

    if (!reply) {

        alert("Please write a reply first.");

        return;
    }

    try {

        await updateDoc(
            doc(db, "siteRequests", requestId),
            {
                adminReply: reply,
                adminReplyAt: new Date()
            }
        );

        alert("✅ Reply saved successfully!");

        await loadAdminSiteRequests();

    } catch (error) {

        console.error(
            "❌ Failed to save admin reply:",
            error
        );

        alert(
            "❌ Failed to save reply. Please try again."
        );
    }
};


// ========================================
// DELETE REQUEST / PROBLEM
// ========================================

async function deleteAdminSiteRequest(requestId) {

    if (!confirm(
        "Are you sure you want to delete this request?"
    )) {
        return;
    }

    try {

        await deleteDoc(
            doc(db, "siteRequests", requestId)
        );

        await loadAdminSiteRequests();

        alert(
            "Request deleted successfully!"
        );

    } catch (error) {

        console.error(
            "❌ Failed to delete request:",
            error
        );

        alert(
            "Failed to delete request."
        );
    }
}


// ========================================
// SAFE HTML
// ========================================

function escapeAdminHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text || "";

    return div.innerHTML;
}


// ========================================
// GLOBAL ADMIN FUNCTIONS
// ========================================

window.loadAdminSiteRequests =
    loadAdminSiteRequests;

window.deleteAdminSiteRequest =
    deleteAdminSiteRequest;


// Load when page is ready
document.addEventListener(
    "DOMContentLoaded",
    function () {
        loadAdminSiteRequests();
    }
);