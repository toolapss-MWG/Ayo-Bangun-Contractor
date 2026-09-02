// ============================================
// WHATSAPP INTEGRATION
// Format: https://wa.me/{number}?text={message}
// ============================================

class WhatsAppService {
  constructor() {
    this.settings = this.loadSettings();
  }

  loadSettings() {
    const s = localStorage.getItem('ayo_bangun_wa_settings');
    return s ? JSON.parse(s) : {
      ownerNumber: '',
      adminNumber: '',
      autoSend: false,
      enabled: true
    };
  }

  saveSettings() {
    localStorage.setItem('ayo_bangun_wa_settings', JSON.stringify(this.settings));
  }

  setNumbers(owner, admin) {
    this.settings.ownerNumber = this.formatNumber(owner);
    this.settings.adminNumber = this.formatNumber(admin);
    this.saveSettings();
  }

  formatNumber(num) {
    return num.replace(/\D/g, '').replace(/^0/, '62');
  }

  generateDailyReport(project, date, data) {
    const lines = [
      `📋 *LAPORAN HARIAN PROYEK*`,
      ``,
      `🏗️ Proyek: ${project.name}`,
      `📅 Tanggal: ${date}`,
      ``,
      `👷 *Tenaga Kerja:*`,
      `  Hadir: ${data.attendance?.hadir || 0} orang`,
      `  Izin: ${data.attendance?.izin || 0} orang`,
      `  Alpha: ${data.attendance?.alpha || 0} orang`,
      ``,
      `🧱 *Material Terpakai:*`,
      ...(data.materials || []).map(m => `  • ${m.name}: ${m.qty} ${m.unit}`),
      ``,
      `📈 *Progres:*`,
      `  ${data.progress || 'Tidak ada update'}`,
      ``,
      `⚠️ *Kendala:*`,
      ...(data.obstacles || []).map(o => `  • ${o.type}: ${o.desc}`),
      data.obstacles?.length === 0 ? `  Tidak ada kendala` : '',
      ``,
      `📊 *Total Progres Proyek: ${project.progress || 0}%*`,
      ``,
      `_Dikirim dari Ayo Bangun.ID Contractor POS_`
    ];
    return lines.filter(l => l !== '').join('\n');
  }

  generateWeeklyReport(project, weekData) {
    const lines = [
      `📊 *LAPORAN MINGGUAN PROYEK*`,
      ``,
      `🏗️ Proyek: ${project.name}`,
      `📅 Periode: ${weekData.startDate} - ${weekData.endDate}`,
      ``,
      `📈 *Ringkasan Progres:*`,
      `  Minggu Lalu: ${weekData.lastWeekProgress}%`,
      `  Minggu Ini: ${weekData.currentProgress}%`,
      `  Selisih: +${weekData.currentProgress - weekData.lastWeekProgress}%`,
      ``,
      `👷 *Rekap Absensi:*`,
      `  Total Hadir: ${weekData.totalHadir} hari/orang`,
      `  Total Izin: ${weekData.totalIzin} hari/orang`,
      `  Total Alpha: ${weekData.totalAlpha} hari/orang`,
      ``,
      `🧱 *Material Minggu Ini:*`,
      ...(weekData.materials || []).map(m => `  • ${m.name}: ${m.totalQty} ${m.unit}`),
      ``,
      `⚠️ *Kendala Minggu Ini:*`,
      ...(weekData.obstacles || []).map(o => `  • ${o.type} (${o.impact})`),
      weekData.obstacles?.length === 0 ? `  Tidak ada kendala` : '',
      ``,
      `💰 *Estimasi Biaya Material Mingguan:*`,
      `  Rp ${(weekData.materialCost || 0).toLocaleString('id-ID')}`,
      ``,
      `_Dikirim dari Ayo Bangun.ID Contractor POS_`
    ];
    return lines.filter(l => l !== '').join('\n');
  }

  generateMaterialReport(project, materials) {
    const lines = [
      `🧱 *LAPORAN MATERIAL PROYEK*`,
      ``,
      `🏗️ Proyek: ${project.name}`,
      `📅 Tanggal: ${new Date().toLocaleDateString('id-ID')}`,
      ``,
      `*STOK MATERIAL:*`,
      ...materials.map(m => {
        const status = m.stock <= m.minStock ? '🔴 KRITIS' : m.stock <= m.minStock * 1.5 ? '🟡 RENDAH' : '🟢 AMAN';
        return `  • ${m.name}\n    Stok: ${m.stock} ${m.unit} | Min: ${m.minStock} ${m.unit} ${status}`;
      }),
      ``,
      `_Dikirim dari Ayo Bangun.ID Contractor POS_`
    ];
    return lines.join('\n');
  }

  sendToWhatsApp(phoneNumber, message) {
    if (!this.settings.enabled) {
      console.log('WhatsApp disabled');
      return false;
    }
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank');
    return true;
  }

  async sendReport(type, data, recipients = []) {
    let message = '';
    switch(type) {
      case 'daily': message = this.generateDailyReport(data.project, data.date, data); break;
      case 'weekly': message = this.generateWeeklyReport(data.project, data); break;
      case 'material': message = this.generateMaterialReport(data.project, data.materials); break;
    }

    const results = [];
    for (const recipient of recipients) {
      if (recipient) {
        const sent = this.sendToWhatsApp(recipient, message);
        results.push({ recipient, sent });
      }
    }
    return results;
  }
}

const waService = new WhatsAppService();
