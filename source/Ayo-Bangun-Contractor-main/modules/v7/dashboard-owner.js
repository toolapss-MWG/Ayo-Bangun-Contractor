// Owner dashboard module
const ownerDashboard = {
  widgets:[
    'progress_project','rab_vs_realisasi','stok_material','approval_pending','laporan_harian'
  ],
  permissions:['projects:*','users:*','materials:*','approval:*']
};
window.ownerDashboard=ownerDashboard;
