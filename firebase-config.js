// Firebase compatibility configuration for browser build
// Uses Firebase compat SDK loaded from index.html

const firebaseConfig = {
  apiKey: "AIzaSyBntT312d0m0VFSPkqiDVUomflUWzcKVB4",
  authDomain: "ayobangun-contractor.firebaseapp.com",
  projectId: "ayobangun-contractor",
  storageBucket: "ayobangun-contractor.firebasestorage.app",
  messagingSenderId: "1099399042051",
  appId: "1:1099399042051:web:764118e26a6cc479956a36",
  measurementId: "G-01F0KBG41D"
};

window.db = null;
window.firebaseAuth = null;
window.firebaseApp = null;

if (typeof firebase !== "undefined" && !firebaseConfig.apiKey.startsWith("YOUR_")) {
  try {
    window.firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    window.firebaseAuth = firebase.auth();

    window.firebaseAuth.onAuthStateChanged((user) => {
      console.log("Firebase auth state:", user ? user.email : "signed out");
    });
  } catch (error) {
    console.warn("Firebase belum dikonfigurasi, aplikasi berjalan mode lokal:", error);
  }
} else {
  console.warn("Firebase config belum diisi. Menggunakan mode lokal.");
}
