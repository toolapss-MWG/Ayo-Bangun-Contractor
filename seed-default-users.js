// Seed default users for Firebase Auth + Firestore profiles
// Run once in browser console after signing in with an owner/admin account.

async function seedDefaultUsers() {
  if (!window.firebaseAuth || !window.db) throw new Error('Firebase belum siap');

  const auth = window.firebaseAuth;
  const db = window.db;

  const users = [
    { email: 'owner@ayobangun.id', password: 'Owner@12345', name: 'Pak Owner', role: 'owner' },
    { email: 'admin@ayobangun.id', password: 'Admin@12345', name: 'Admin Office', role: 'admin' },
    { email: 'mandor@ayobangun.id', password: 'Mandor@12345', name: 'Mandor Budi', role: 'mandor' },
  ];

  const current = auth.currentUser;
  if (!current) throw new Error('Login dulu memakai akun admin/owner');

  for (const u of users) {
    let cred;
    try {
      cred = await auth.createUserWithEmailAndPassword(u.email, u.password);
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        console.log('Sudah ada:', u.email);
        continue;
      }
      throw e;
    }
    const uid = cred.user.uid;
    await db.collection('users').doc(uid).set({
      email: u.email,
      name: u.name,
      role: u.role,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log('Created:', u.email);
  }

  console.log('Seed selesai');
}

window.seedDefaultUsers = seedDefaultUsers;
