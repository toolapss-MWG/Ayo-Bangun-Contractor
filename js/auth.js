// ============================================
// AUTHENTICATION & ROLE MANAGEMENT
// ============================================

const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MANDOR: 'mandor'
};

const PERMISSIONS = {
  [ROLES.OWNER]: {
    canViewDashboard: true,
    canManageProjects: true,
    canManageUsers: true,
    canViewAllReports: true,
    canEditAllData: true,
    canDeleteData: true,
    canExportData: true,
    canSendWhatsApp: true,
    canViewFinance: true,
    canManageSettings: true,
    pages: ['dashboard','absensi','material','laporan','kendala','progres','settings']
  },
  [ROLES.ADMIN]: {
    canViewDashboard: true,
    canManageProjects: true,
    canManageUsers: false,
    canViewAllReports: true,
    canEditAllData: true,
    canDeleteData: false,
    canExportData: true,
    canSendWhatsApp: true,
    canViewFinance: true,
    canManageSettings: false,
    pages: ['dashboard','absensi','material','laporan','kendala','progres','settings']
  },
  [ROLES.MANDOR]: {
    canViewDashboard: true,
    canManageProjects: false,
    canManageUsers: false,
    canViewAllReports: false,
    canEditAllData: false,
    canDeleteData: false,
    canExportData: false,
    canSendWhatsApp: true,
    canViewFinance: false,
    canManageSettings: false,
    pages: ['dashboard','absensi','material','kendala','progres']
  }
};

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.currentRole = null;
    this.currentProject = null;
    this.loadSession();
  }

  async login(email, password, role) {
    const accounts = {
      owner: { email: 'owner@ayobangun.id', password: 'Owner@12345' },
      admin: { email: 'admin@ayobangun.id', password: 'Admin@12345' },
      mandor: { email: 'mandor@ayobangun.id', password: 'Mandor@12345' }
    };
    const account = accounts[role];
    if (account && email !== account.email || account && password !== account.password) {
      throw new Error('Email atau password tidak sesuai');
    }
    this.currentUser = { email, uid: 'demo-' + Date.now(), name: this.getNameByRole(role) };
    this.currentRole = role;
    this.saveSession();
    return this.currentUser;
  }

  getNameByRole(role) {
    const names = { owner: 'Pak Owner', admin: 'Admin Office', mandor: 'Mandor Budi' };
    return names[role] || 'User';
  }

  logout() {
    this.currentUser = null;
    this.currentRole = null;
    localStorage.removeItem('ayo_bangun_session');
  }

  saveSession() {
    localStorage.setItem('ayo_bangun_session', JSON.stringify({
      user: this.currentUser,
      role: this.currentRole,
      project: this.currentProject,
      timestamp: Date.now()
    }));
  }

  loadSession() {
    const session = localStorage.getItem('ayo_bangun_session');
    if (session) {
      const data = JSON.parse(session);
      this.currentUser = data.user;
      this.currentRole = data.role;
      this.currentProject = data.project;
    }
  }

  hasPermission(permission) {
    if (!this.currentRole) return false;
    return PERMISSIONS[this.currentRole]?.[permission] || false;
  }

  canAccessPage(page) {
    if (!this.currentRole) return false;
    return PERMISSIONS[this.currentRole]?.pages?.includes(page) || false;
  }

  getRoleLabel() {
    const labels = { owner: 'OWNER', admin: 'ADMIN', mandor: 'MANDOR' };
    return labels[this.currentRole] || 'USER';
  }
}

const auth = new AuthManager();
