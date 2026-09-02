// Ayo Bangun.ID Contractor V6 Production Module
const AYO_V6 = {
 roles:{owner:['all'],admin:['project','material','approval','report'],mandor:['input','attendance','usage']},
 materials:[
 {name:'Semen Portland',variants:['40 Kg','50 Kg'],unit:'sak'},
 {name:'Besi Beton',variants:['Ø8','Ø10','Ø12','Ø16'],unit:'batang'},
 {name:'Pasir',variants:['Pasir Pasang','Pasir Beton'],unit:'m3'},
 {name:'Batu Split',variants:['1/2','2/3'],unit:'m3'},
 {name:'Bata Ringan',variants:['10 cm','7,5 cm'],unit:'pcs'},
 {name:'Cat',variants:['Interior','Exterior'],unit:'kg'},
 {name:'Pipa PVC',variants:['1/2 inch','3/4 inch','1 inch'],unit:'batang'}
 ],
 approval(status){return status==='pending'?'Menunggu Verifikasi':'Disetujui'},
 canEdit(role){return role==='owner'||role==='admin'}
};
window.AYO_V6=AYO_V6;
