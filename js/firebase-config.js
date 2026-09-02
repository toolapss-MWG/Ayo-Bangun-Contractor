// ============================================
// KONFIGURASI FIREBASE - GANTI DENGAN DATA KAMU
// ============================================
// 1. Buka https://console.firebase.google.com
// 2. Buat project baru
// 3. Tambahkan Web App
// 4. Copy config di bawah ini
// ============================================

const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_KAMU",
  authDomain: "ayo-bangun-pos.firebaseapp.com",
  projectId: "ayo-bangun-pos",
  storageBucket: "ayo-bangun-pos.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
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
