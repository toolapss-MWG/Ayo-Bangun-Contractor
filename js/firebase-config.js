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

window.firebaseApp = null;
window.firebaseAuth = null;
window.db = null;

(function initFirebase() {
  try {
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK belum dimuat. Aplikasi berjalan tanpa Firebase.');
      return;
    }

    window.firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
    window.firebaseAuth = firebase.auth();
    window.db = firebase.firestore();

    if (firebase.analytics && typeof firebase.analytics === 'function') {
      try { firebase.analytics(); } catch (e) {}
    }
  } catch (error) {
    console.warn('Gagal inisialisasi Firebase:', error);
  }
})();
