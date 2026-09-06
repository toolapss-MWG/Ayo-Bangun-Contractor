# Ayo Bangun.ID Contractor

## 1. Gambaran Umum Sistem
Ayo Bangun.ID Contractor adalah platform Construction Management System berbasis Flutter Android dan Firebase untuk mengelola siklus proyek konstruksi dari awal sampai selesai.

Tujuan:
- Meningkatkan kontrol proyek
- Mengurangi kesalahan administrasi
- Mempercepat komunikasi lapangan dan kantor
- Menyediakan data real-time

## 2. User Role dan Hak Akses
- Owner / Direktur: proyek, keuangan, KPI, keputusan strategis.
- Administrator: user, role, permission, master data.
- Project Manager: proyek, timeline, progress, tim.
- Engineer / Site Supervisor: progress, laporan lapangan, checklist, foto.
- Worker: tugas dan checklist aktivitas.
- Client: progress, dokumen, approval.

## 3-15. Business Flow
Sistem mencakup:
- Firebase Authentication dan role based access.
- Dashboard proyek real-time.
- Project Management.
- Daily Construction Operation.
- Inventory Management.
- Workforce Management.
- Finance Management.
- Document Management.
- Client Portal.
- Firebase Architecture:
Flutter App → Authentication → Firestore → Storage → Cloud Messaging.

Collection:
companies, users, roles, projects, tasks, materials, inventory, employees, attendance, expenses, invoices, documents, notifications, audit_logs.

Security:
Authentication verification → role checking → permission validation → company data isolation.

Kesimpulan:
Ayo Bangun.ID Contractor adalah Construction ERP ringan yang menghubungkan Project Management, Field Operation, Inventory, Workforce, Finance, Document Control, dan Client Collaboration.
