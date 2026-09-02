// ============================================
// AYO BANGUN.ID CONTRACTOR - APP LOGIC
// ============================================

let currentRole = 'owner';
let currentPage = 'dashboard';
let currentProject = { name: 'Perumahan Graha Asri - Blok A', progress: 68 };
let attendanceData = {};

// Demo data
const DEMO_PROJECTS = [
  { id: 'p1', name: 'Perumahan Graha Asri - Blok A', progress: 68, workers: 24, location: 'Salatiga' },
  { id: 'p2', name: 'Ruko Majapahit Square', progress: 45, workers: 18, location: 'Semarang' },
  { id: 'p3', name: 'Villa Bukit Hijau', progress: 20, workers: 12, location: 'Ungaran' }
];

const DEMO_WORKERS = [
  { id: 'w1', name: 'Sugeng B', role: 'Tukang Batu', group: 'Tukang Batu' },
  { id: 'w2', name: 'Wahyu R', role: 'Tukang Batu', group: 'Tukang Batu' },
  { id: 'w3', name: 'Dedi S', role: 'Tukang Kayu', group: 'Tukang Kayu' },
  { id: 'w4', name: 'Asep P', role: 'Tukang Kayu', group: 'Tukang Kayu' },
  { id: 'w5', name: 'Rudi N', role: 'Pekerja Umum', group: 'Pekerja Umum' },
  { id: 'w6', name: 'Bambang K', role: 'Pekerja Umum', group: 'Pekerja Umum' },
  { id: 'w7', name: 'Joko W', role: 'Tukang Listrik', group: 'Tukang Listrik' },
  { id: 'w8', name: 'Slamet H', role: 'Tukang Batu', group: 'Tukang Batu' },
];

// ==================== AUTH ====================
function selectRole(btn) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentRole = btn.dataset.role;
}

async function doLogin() {
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;

  if (!email || !pass) {
    showToast('❌ Email dan password wajib diisi!');
    return;
  }

  // Simulate login
  await auth.login(email, pass, currentRole);

  document.getElementById('loginScreen').classList.add('hidden');
  document.getElementById('mainApp').classList.remove('hidden');

  const badge = document.getElementById('roleBadge');
  badge.className = 'role-badge role-' + currentRole;
  badge.textContent = auth.getRoleLabel();

  applyRolePermissions();
  showToast(`✅ Selamat datang, ${auth.currentUser.name}!`);

  // Load project data
  loadProjectData();
}

function doLogout() {
  auth.logout();
  document.getElementById('mainApp').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  navigateTo('dashboard');
  showToast('👋 Berhasil keluar');
}

function applyRolePermissions() {
  const fab = document.getElementById('fabBtn');
  const navItems = document.querySelectorAll('.nav-item');

  // Hide/show FAB based on role
  if (currentRole === 'mandor') {
    fab.style.display = 'flex';
  } else {
    fab.style.display = 'flex';
  }

  // Restrict navigation for mandor
  if (currentRole === 'mandor') {
    // Mandor can't access laporan and settings directly from nav
    // But can access through menu
  }
}

// ==================== NAVIGATION ====================
function navigateTo(page) {
  if (!auth.canAccessPage(page)) {
    showToast('❌ Akses ditolak untuk role ' + currentRole);
    return;
  }

  // Hide all pages
  document.querySelectorAll('[id^="page"]').forEach(el => el.classList.add('hidden'));

  // Show target page
  const targetId = 'page' + page.charAt(0).toUpperCase() + page.slice(1);
  const targetEl = document.getElementById(targetId);
  if (targetEl) targetEl.classList.remove('hidden');

  // Update nav
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const navMap = { dashboard: 0, absensi: 1, material: 2, laporan: 3, settings: 4 };
  const navItems = document.querySelectorAll('.nav-item');
  if (navMap[page] !== undefined && navItems[navMap[page]]) {
    navItems[navMap[page]].classList.add('active');
  }

  currentPage = page;
  window.scrollTo(0, 0);

  // Update FAB action
  updateFab();
}

function updateFab() {
  const fab = document.getElementById('fabBtn');
  const actions = {
    dashboard: () => navigateTo('absensi'),
    absensi: () => showToast('Tambah pekerja baru'),
    material: () => showToast('Input penggunaan material'),
    laporan: () => generateReport(),
    kendala: () => document.getElementById('obstacleDesc').focus(),
    progres: () => showToast('Update progres pekerjaan'),
    settings: () => syncData()
  };
  fab.onclick = actions[currentPage] || (() => {});
}

function fabAction() {
  updateFab();
  const fab = document.getElementById('fabBtn');
  fab.click();
}

// ==================== PROJECT ====================
function showProjectModal() {
  document.getElementById('projectModal').classList.remove('hidden');
}

function hideProjectModal() {
  document.getElementById('projectModal').classList.add('hidden');
}

function selectProject(name) {
  currentProject = DEMO_PROJECTS.find(p => p.name === name) || currentProject;
  document.getElementById('activeProjectName').textContent = name;
  hideProjectModal();
  loadProjectData();
  showToast(`✅ Proyek aktif: ${name}`);
}

function loadProjectData() {
  document.getElementById('statWorkers').textContent = currentProject.workers || 24;
  document.getElementById('statProgress').textContent = (currentProject.progress || 0) + '%';
}

// ==================== ATTENDANCE ====================
function setAttendance(btn, status) {
  const row = btn.closest('.attendance-row');
  const actions = row.querySelector('.attendance-actions');

  // Reset all buttons in this row
  actions.querySelectorAll('.att-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Update info text
  const info = row.querySelector('.info p');
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  info.textContent = `${info.textContent.split('•')[0].trim()} • ${status === 'hadir' ? time : status.toUpperCase()}`;

  if (status === 'hadir') {
    info.style.color = 'var(--success)';
  } else if (status === 'izin') {
    info.style.color = 'var(--warning)';
  } else {
    info.style.color = 'var(--danger)';
  }
}

function saveAttendance() {
  const date = document.getElementById('attDate').value;
  // Count attendance
  let hadir = 0, izin = 0, alpha = 0;
  document.querySelectorAll('.attendance-row').forEach(row => {
    const selected = row.querySelector('.att-btn.selected');
    if (selected) {
      if (selected.classList.contains('att-hadir')) hadir++;
      else if (selected.classList.contains('att-izin')) izin++;
      else if (selected.classList.contains('att-alpha')) alpha++;
    }
  });

  showToast(`✅ Absensi ${date} tersimpan! Hadir: ${hadir}, Izin: ${izin}, Alpha: ${alpha}`);

  // Update stats
  document.getElementById('statWorkers').textContent = hadir;

  // Save to localStorage (demo)
  const key = `att_${currentProject.id}_${date}`;
  localStorage.setItem(key, JSON.stringify({ hadir, izin, alpha, date }));
}

// ==================== MATERIAL ====================
function filterMaterial(q) {
  const items = document.querySelectorAll('#materialList .list-item');
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(q.toLowerCase()) ? 'flex' : 'none';
  });
}

function filterCat(btn, cat) {
  document.querySelectorAll('.material-category .cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const items = document.querySelectorAll('#materialList .list-item');
  items.forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'flex' : 'none';
  });
}

// ==================== REPORTS ====================
function generateReport() {
  const type = document.getElementById('reportType').value;
  const date = document.getElementById('reportDate').value;
  const waOn = document.getElementById('waToggle').classList.contains('on');

  let message = '';
  const projectName = currentProject.name;

  switch(type) {
    case 'harian':
      message = waService.generateDailyReport(
        currentProject,
        new Date(date).toLocaleDateString('id-ID'),
        {
          attendance: { hadir: 24, izin: 2, alpha: 0 },
          materials: [
            { name: 'Semen Portland Tipe I', qty: 50, unit: 'sak' },
            { name: 'Besi Beton Ø10mm', qty: 30, unit: 'batang' }
          ],
          progress: 'Pengecoran lantai 2 selesai',
          obstacles: []
        }
      );
      break;
    case 'mingguan':
      message = waService.generateWeeklyReport(currentProject, {
        startDate: '26 Agt 2026',
        endDate: '2 Sep 2026',
        lastWeekProgress: 62,
        currentProgress: 68,
        totalHadir: 168,
        totalIzin: 14,
        totalAlpha: 2,
        materials: [
          { name: 'Semen Portland', totalQty: 350, unit: 'sak' },
          { name: 'Besi Beton', totalQty: 210, unit: 'batang' }
        ],
        obstacles: [{ type: 'Cuaca Buruk', impact: 'Delay 1 hari' }],
        materialCost: 12500000
      });
      break;
    case 'material':
      message = waService.generateMaterialReport(currentProject, [
        { name: 'Semen Portland Tipe I', stock: 150, minStock: 50, unit: 'sak' },
        { name: 'Besi Beton Ø10mm', stock: 120, minStock: 30, unit: 'batang' },
        { name: 'Pasir Cor', stock: 5, minStock: 10, unit: 'm³' }
      ]);
      break;
  }

  if (waOn) {
    const ownerNum = document.getElementById('waOwner')?.value || '081234567890';
    waService.sendToWhatsApp(waService.formatNumber(ownerNum), message);
    showToast('📄 Laporan digenerate & 📱 dibuka di WhatsApp!');
  } else {
    showToast('📄 Laporan digenerate & tersimpan!');
  }

  // Add to history
  addReportToHistory(type, date, waOn);
}

function addReportToHistory(type, date, waSent) {
  const history = document.getElementById('reportHistory');
  const typeLabels = { harian: 'Laporan Harian', mingguan: 'Laporan Mingguan', material: 'Laporan Material', absensi: 'Rekap Absensi', kendala: 'Rekap Kendala' };
  const card = document.createElement('div');
  card.className = 'report-card';
  card.innerHTML = `
    <h4>${typeLabels[type] || type} - ${new Date(date).toLocaleDateString('id-ID')}</h4>
    <p>Laporan berhasil digenerate untuk proyek ${currentProject.name}</p>
    <div class="meta">
      <span>✓ Tersimpan</span>
      ${waSent ? '<span style="color:var(--success);">✓ WA Terkirim</span>' : '<span>WA Tidak dikirim</span>'}
    </div>
  `;
  history.insertBefore(card, history.firstChild);
}

// ==================== OBSTACLES ====================
function saveKendala() {
  const type = document.getElementById('obstacleType').value;
  const desc = document.getElementById('obstacleDesc').value;
  const impact = document.getElementById('obstacleImpact').value;

  if (!desc.trim()) {
    showToast('❌ Deskripsi kendala wajib diisi!');
    return;
  }

  const impactLabels = { none: 'Tidak ada dampak', '1day': 'Delay 1 hari', '2-3days': 'Delay 2-3 hari', more: 'Delay > 3 hari' };
  const badgeClass = impact === 'none' ? 'badge-success' : impact === '1day' ? 'badge-warning' : 'badge-danger';

  const list = document.getElementById('obstacleList');
  const item = document.createElement('div');
  item.className = 'list-item';
  item.innerHTML = `
    <div class="icon">⚠️</div>
    <div class="info"><h4>${type}</h4><p>${desc}</p></div>
    <div class="badge ${badgeClass}">${impactLabels[impact]}</div>
  `;
  list.insertBefore(item, list.firstChild);

  // Clear form
  document.getElementById('obstacleDesc').value = '';

  showToast('✅ Kendala tersimpan! Notifikasi dikirim ke Owner.');
}

// ==================== SETTINGS ====================
function saveWASettings() {
  const owner = document.getElementById('waOwner').value;
  const admin = document.getElementById('waAdmin').value;
  waService.setNumbers(owner, admin);
  showToast('✅ Nomor WhatsApp tersimpan!');
}

function syncData() {
  showToast('🔄 Menyinkronkan data ke Firebase...');
  setTimeout(() => {
    showToast('✅ Sinkronisasi selesai!');
  }, 1500);
}

// ==================== UTILITIES ====================
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    if (!input.value) input.value = today;
  });

  // Check for saved session
  if (auth.currentUser) {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    currentRole = auth.currentRole;
    const badge = document.getElementById('roleBadge');
    badge.className = 'role-badge role-' + currentRole;
    badge.textContent = auth.getRoleLabel();
    applyRolePermissions();
  }

  // Load WA settings
  const waSettings = waService.settings;
  if (waSettings.ownerNumber) {
    document.getElementById('waOwner').value = '0' + waSettings.ownerNumber.replace('62', '');
  }
  if (waSettings.adminNumber) {
    document.getElementById('waAdmin').value = '0' + waSettings.adminNumber.replace('62', '');
  }
});

// Network status
window.addEventListener('online', () => {
  document.querySelectorAll('.sync-status').forEach(el => {
    el.innerHTML = '● Firebase Online • Data tersinkron';
    el.classList.remove('offline');
  });
});

window.addEventListener('offline', () => {
  document.querySelectorAll('.sync-status').forEach(el => {
    el.innerHTML = '○ Offline Mode • Data tersimpan lokal';
    el.classList.add('offline');
  });
});
