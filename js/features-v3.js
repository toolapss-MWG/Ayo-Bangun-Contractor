// ============================================
// AYO BANGUN.ID V3 BUSINESS FEATURES
// Project, Material, User, Stock, Target, Sync Layer
// ============================================

const DEFAULT_ACCOUNTS = {
  owner: {username:'owner@ayobangun.id', password:'Owner@12345', name:'Owner Ayo Bangun'},
  admin: {username:'admin@ayobangun.id', password:'Admin@12345', name:'Administrator'},
  mandor: {username:'mandor@ayobangun.id', password:'Mandor@12345', name:'Mandor Lapangan'}
};

const V3_DB_KEY='ayo_bangun_v3_data';
function getV3Data(){
  return JSON.parse(localStorage.getItem(V3_DB_KEY)||JSON.stringify({
    company:{name:'Ayo Bangun.ID',description:'Developer & Construction'},
    projects:[], users:[], materials:[], stocks:[], usage:[], attendance:[], targets:[]
  }));
}
function saveV3Data(data){localStorage.setItem(V3_DB_KEY,JSON.stringify(data));}

window.AyoBangunV3={
  accounts:DEFAULT_ACCOUNTS,
  addUser(role,name,email,password){
    const d=getV3Data(); d.users.push({id:Date.now(),role,name,email,password}); saveV3Data(d); return true;
  },
  addProject(project){
    const d=getV3Data(); d.projects.push({...project,id:Date.now(),createdAt:new Date().toISOString()}); saveV3Data(d);
  },
  updateProject(id,data){
    const d=getV3Data(); d.projects=d.projects.map(x=>x.id==id?{...x,...data}:x); saveV3Data(d);
  },
  addMaterial(item){
    const d=getV3Data(); d.materials.push({...item,id:Date.now()}); saveV3Data(d);
  },
  updateMaterial(id,data){
    const d=getV3Data(); d.materials=d.materials.map(x=>x.id==id?{...x,...data}:x); saveV3Data(d);
  },
  stockIn(item,approve=false){
    const d=getV3Data(); d.stocks.push({...item,status:approve?'approved':'pending',createdAt:Date.now()}); saveV3Data(d);
  },
  useMaterial(item){
    const d=getV3Data(); d.usage.push({...item,createdAt:Date.now()}); saveV3Data(d);
  },
  saveTarget(target){
    const d=getV3Data(); d.targets.push({...target,id:Date.now()}); saveV3Data(d);
  },
  syncStatus(){return 'Local + Firebase Ready';}
};

// Password check layer. Production: gunakan Firebase Authentication.
window.checkAyoLogin=function(username,password){
  for(const r in DEFAULT_ACCOUNTS){
    if(DEFAULT_ACCOUNTS[r].username===username && DEFAULT_ACCOUNTS[r].password===password)
      return {role:r,...DEFAULT_ACCOUNTS[r]};
  }
  const users=getV3Data().users;
  return users.find(u=>u.email===username&&u.password===password)||null;
};

console.log('Ayo Bangun V3 features loaded');
