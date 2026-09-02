// Ayo Bangun.ID Contractor V8 Operational module
// Core data handlers for project, material, stock approval and daily reports.

const AB_V8 = {
  roles: ['owner','admin','mandor'],
  stockStatus: ['pending','approved','rejected'],
  canEdit(role){ return ['owner','admin'].includes(role); },
  canApprove(role){ return ['owner','admin'].includes(role); },
  canInputField(role){ return role === 'mandor' || role === 'admin' || role === 'owner'; }
};

window.AB_V8 = AB_V8;
