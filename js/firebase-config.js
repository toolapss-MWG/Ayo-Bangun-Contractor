// ============================================
// KONFIGURASI FIREBASE - GANTI DENGAN DATA KAMU
// ============================================
// 1. Buka https://console.firebase.google.com
// 2. Buat project baru
// 3. Tambahkan Web App
// 4. Copy config di bawah ini
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyBntT312d0m0VFSPkqiDVUomflUWzcKVB4",
  authDomain: "ayobangun-contractor.firebaseapp.com",
  projectId: "ayobangun-contractor",
  storageBucket: "ayobangun-contractor.firebasestorage.app",
  messagingSenderId: "1099399042051",
  appId: "1:1099399042051:web:764118e26a6cc479956a36",
  measurementId: "G-01F0KBG41D"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Collection references
const COLLECTIONS = {
  projects: db.collection('projects'),
  materials: db.collection('materials'),
  attendance: db.collection('attendance'),
  reports: db.collection('reports'),
  obstacles: db.collection('obstacles'),
  progress: db.collection('progress'),
  users: db.collection('users'),
  settings: db.collection('settings')
};

// Offline persistence
firebase.firestore().enablePersistence({ synchronizeTabs: true })
  .catch(err => console.log('Persistence error:', err));
