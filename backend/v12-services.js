// V12 service layer placeholder
// Services:
// auth, project CRUD, material CRUD, stock approval,
// attendance, progress, reports

const ContractorServices = {
 calculateStock(incoming, usage){ return Number(incoming||0)-Number(usage||0); },
 calculateProgress(target, actual){ return target ? Math.round(actual/target*100) : 0; }
};
