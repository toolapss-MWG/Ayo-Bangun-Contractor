# 🏗️ Ayo Bangun.ID Contractor - POS System

Aplikasi POS (Point of System) untuk manajemen proyek konstruksi berbasis PWA (Progressive Web App) dengan sinkronisasi Firebase Real-Time.

---

## ✨ Fitur Utama

| Fitur | Owner | Admin | Mandor |
|-------|:-----:|:-----:|:------:|
| Dashboard Proyek | ✅ | ✅ | ✅ |
| Absensi Tenaga Kerja | ✅ | ✅ | ✅ |
| Input Penggunaan Material | ✅ | ✅ | ✅ |
| Opname Stok Material | ✅ | ✅ | ❌ |
| Update Progres Pekerjaan | ✅ | ✅ | ✅ |
| Catat Kendala Lapangan | ✅ | ✅ | ✅ |
| Generate Laporan Harian | ✅ | ✅ | ❌ |
| Generate Laporan Mingguan | ✅ | ✅ | ❌ |
| Kirim Laporan ke WhatsApp | ✅ | ✅ | ✅ |
| Manajemen Multi-Proyek | ✅ | ✅ | ❌ |
| Manajemen Pengguna | ✅ | ❌ | ❌ |
| Export Data | ✅ | ✅ | ❌ |
| Pengaturan Sistem | ✅ | ❌ | ❌ |

---

## 🗂️ Database Material (200+ Item)

### Kategori Material:
1. **Semen & Beton** - Semen Portland, Ready Mix K-225 s/d K-400, Beton Ringan
2. **Besi & Baja** - Besi Beton Ø6-Ø25, Wiremesh, Baja Ringan, Hollow
3. **Pasir & Batu** - Pasir Cor, Pasir Plester, Batu Split, Bata Merah, Batako, Hebel
4. **Kayu & Papan** - Balok, Papan, Multipleks, Kaso, Reng
5. **Atap & Genteng** - Genteng Keramik/Beton/Metal, Spandek, Seng, Alderon
6. **Cat & Finishing** - Cat Interior/Eksterior, Cat Kayu/Besi, Dempul, Granit, Keramik
7. **Listrik & Plumbing** - Kabel, Stop Kontak, Saklar, Kloset, Wastafel, Shower
8. **Alat & Bahan Bantu** - Paku, Mur Baut, Triplek Bekisting, Sika, Geotextile
9. **Pintu, Jendela & Kaca** - Kusen, Pintu Panel, Kaca Tempered, Handle
10. **Lantai & Dinding** - Gypsum, GRC, ACP, Wallpaper, Bata Ringan
11. **Sanitasi & Ventilasi** - AC, Exhaust Fan, Ducting, Roof Ventilator

---

## 🚀 Cara Install & Deploy

### 1. Setup Firebase

```bash
# Buka https://console.firebase.google.com
# Buat project baru: "ayo-bangun-pos"
# Aktifkan Firestore Database & Authentication
# Tambahkan Web App, copy config-nya
```

Edit `js/firebase-config.js`:
```javascript
const firebaseConfig = {
  apiKey: "API_KEY_KAMU",
  authDomain: "ayo-bangun-pos.firebaseapp.com",
  projectId: "ayo-bangun-pos",
  storageBucket: "ayo-bangun-pos.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 2. Setup Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['owner', 'admin'];
    }
    match /attendance/{docId} {
      allow read, write: if request.auth != null;
    }
    match /materials/{docId} {
      allow read, write: if request.auth != null;
    }
    match /reports/{docId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['owner', 'admin'];
    }
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'owner';
    }
  }
}
```

### 3. Setup GitHub Pages (Hosting Gratis)

```bash
# Buat repository baru di GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/ayo-bangun-pos.git
git push -u origin main

# Buka Settings > Pages
# Pilih branch: main, folder: / (root)
# Aplikasi akan live di: https://USERNAME.github.io/ayo-bangun-pos/
```

### 4. Install di Android (PWA)

1. Buka URL aplikasi di Chrome Android
2. Tap menu (⋮) → "Tambahkan ke Layar Utama"
3. Aplikasi akan ter-install seperti app native
4. Bisa diakses offline setelah pertama kali load

---

## 📱 Struktur Folder

```
ayo-bangun-pos/
├── index.html              # Entry point SPA
├── manifest.json           # PWA Manifest
├── sw.js                   # Service Worker (Offline)
├── css/
│   └── style.css           # Styling tema dark gold
├── js/
│   ├── app.js              # Logic aplikasi utama
│   ├── auth.js             # Autentikasi & Role Management
│   ├── firebase-config.js  # Konfigurasi Firebase
│   └── whatsapp.js         # Integrasi WhatsApp
├── data/
│   └── materials.js        # Database 200+ material
└── README.md               # Dokumentasi ini
```

---

## 🔐 Skema Data Firebase

### Collection: `projects`
```json
{
  "id": "p1",
  "name": "Perumahan Graha Asri - Blok A",
  "location": "Salatiga",
  "startDate": "2026-06-01",
  "targetDate": "2026-12-31",
  "progress": 68,
  "status": "active",
  "budget": 2500000000,
  "workers": 24
}
```

### Collection: `attendance`
```json
{
  "projectId": "p1",
  "date": "2026-09-02",
  "workerId": "w1",
  "workerName": "Sugeng B",
  "status": "hadir",
  "checkIn": "07:30",
  "checkOut": "17:00",
  "role": "mandor",
  "timestamp": 1693622400000
}
```

### Collection: `materials`
```json
{
  "projectId": "p1",
  "materialId": "semen-tipe-i",
  "name": "Semen Portland Tipe I (50kg)",
  "unit": "sak",
  "stock": 150,
  "minStock": 50,
  "used": 50,
  "category": "semen",
  "lastUpdated": "2026-09-02T10:00:00Z"
}
```

### Collection: `reports`
```json
{
  "projectId": "p1",
  "type": "daily",
  "date": "2026-09-02",
  "content": "...",
  "sentToWA": true,
  "createdBy": "mandor-budi",
  "timestamp": 1693622400000
}
```

### Collection: `users`
```json
{
  "uid": "uid123",
  "email": "owner@ayobangun.id",
  "name": "Pak Owner",
  "role": "owner",
  "projects": ["p1", "p2"],
  "phone": "081234567890"
}
```

---

## 📲 Integrasi WhatsApp

Laporan dikirim menggunakan format URL WhatsApp:
```
https://wa.me/6281234567890?text=EncodedMessage
```

Nomor penerima bisa diatur di menu **Pengaturan → WhatsApp Notifikasi**.

Format laporan otomatis:
- 📋 Laporan Harian (Absensi + Material + Progres + Kendala)
- 📊 Laporan Mingguan (Rekap mingguan + Biaya)
- 🧱 Laporan Material (Stok + Status kritis)

---

## 🛠️ Teknologi

- **Frontend**: Vanilla JS, CSS3, HTML5
- **Backend**: Firebase (Firestore + Auth)
- **PWA**: Service Worker, Manifest, Offline Support
- **Hosting**: GitHub Pages (gratis)
- **Sync**: Firebase Real-Time + LocalStorage fallback

---

## 📝 Changelog

### v2.0.1
- ✅ Multi-proyek support
- ✅ Role-based access (Owner/Admin/Mandor)
- ✅ Database 200+ material konstruksi
- ✅ Integrasi WhatsApp otomatis
- ✅ Offline mode dengan Service Worker
- ✅ Sinkronisasi Firebase real-time

---

## 👤 Developer

**Ayo Bangun.ID Contractor**
- Developer & Construction
- Salatiga, Indonesia

---

*Built with ❤️ for Indonesian Construction Industry*


## V7 Application Layer
- Owner dashboard foundation
- Mandor mobile workflow
- Firebase RBAC schema planning
- Material/project workflow structure
