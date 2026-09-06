// Firebase compatibility configuration for browser build
// Uses Firebase compat SDK loaded from index.html

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let firebaseApp = null;
if (typeof firebase !== "undefined" && !firebaseConfig.apiKey.startsWith("YOUR_")) {
  try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    window.firebaseAuth = firebase.auth();
  } catch (error) {
    console.warn("Firebase belum dikonfigurasi, aplikasi berjalan mode lokal:", error);
    window.db = null;
    window.firebaseAuth = null;
  }
} else {
  console.warn("Firebase config belum diisi. Menggunakan mode lokal.");
  window.db = null;
  window.firebaseAuth = null;
}

window.FirebaseConfig = { firebaseConfig, firebaseApp };
