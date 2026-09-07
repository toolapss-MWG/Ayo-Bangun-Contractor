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
