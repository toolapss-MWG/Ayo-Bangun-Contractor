// Seed default users for Firebase Auth + Firestore
// Run manually in browser console after Firebase is initialized, or adapt into an admin-only setup page.

(async () => {
  if (!window.firebaseAuth || !window.db) {
    console.error('Firebase Auth/Firestore belum siap.');
    return;
  }

  const defaultUsers = [
    { email: 'owner@ayobangun.id', password: 'Owner@12345', name: 'Pak Owner', role: 'owner' },
    { email: 'admin@ayobangun.id', password: 'Admin@12345', name: 'Admin Office', role: 'admin' },
    { email: 'mandor@ayobangun.id', password: 'Mandor@12345', name: 'Mandor Budi', role: 'mandor' }
  ];

  for (const u of defaultUsers) {
    try {
      const cred = await window.firebaseAuth.createUserWithEmailAndPassword(u.email, u.password);
      await window.db.collection('users').doc(cred.user.uid).set({
        name: u.name,
        email: u.email,
        role: u.role,
        projectAccess: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      console.log('Created:', u.email);
    } catch (e) {
      console.warn('Skip/create failed for', u.email, e.message);
    }
  }

  console.log('Seed selesai.');
})();
