// Firebase configuration for Ayo Bangun.ID
// Replace values below with your Firebase Console config if using production.
const firebaseConfig = {
 apiKey: "AIzaSyBntT312d0m0VFSPkqiDVUomflUWzcKVB4",
 authDomain: "ayobangun-contractor.firebaseapp.com",
 projectId: "ayobangun-contractor",
 storageBucket: "ayobangun-contractor.firebasestorage.app",
 messagingSenderId: "1099399042051",
 appId: "1:1099399042051:web:764118e26a6cc479956a36"
};
let firebaseApp=null;
try{
 if(window.firebase){
  firebaseApp=firebase.initializeApp(firebaseConfig);
  window.db=firebase.firestore();
  console.log('Firebase connected');
 }
}catch(e){console.log('Firebase offline mode',e)}
