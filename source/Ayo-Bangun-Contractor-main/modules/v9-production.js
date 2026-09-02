/* Ayo Bangun.ID Contractor V9 Production Module */

const permissions = {
 owner: ['*'],
 admin: ['project.edit','material.edit','stock.verify','user.manage','report.view'],
 mandor: ['attendance.create','material.use','stock.request','progress.update']
};

function can(role, action){
 return permissions[role]?.includes('*') || permissions[role]?.includes(action);
}

function calculateMaterialBalance(stockIn, usage){
 return Number(stockIn || 0)-Number(usage || 0);
}

window.AyoBangunV9={can,calculateMaterialBalance};
