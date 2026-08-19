<template>
  <q-page class="rsud-one-gate-page bg-slate-50 text-slate-900 min-h-screen pb-20">
    <!-- 1. Ultra Luxury Hero Header Section -->
    <div class="hero-section relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-teal-950 via-slate-900 to-slate-950 text-white shadow-2xl border-b border-teal-500/20">
      <!-- Glow & Ambient Ornaments -->
      <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-teal-500/20 via-cyan-500/20 to-emerald-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div class="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      <div class="container-padding relative z-10 text-center space-y-6 max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-lg">
          <q-icon name="hub" size="18px" class="text-teal-400 animate-pulse" />
          <span>MOHAMAD SALEH SMART HEALTH HUB</span>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-black tracking-tight text-white margin-0 leading-tight">
          RSUD <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 drop-shadow-md">ONE GATE</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-teal-100 font-black tracking-wide margin-0">
          "Satu Pintu, Satu Data, Satu Perjalanan Pasien."
        </p>

        <p class="text-sm md:text-base text-slate-300/90 leading-relaxed font-medium max-w-2xl mx-auto margin-0">
          Ekosistem pelayanan kesehatan pintar terintegrasi SIMRS yang mendampingi perjalanan medis masyarakat secara personal, efisien, dan transparan.
        </p>
      </div>
    </div>

    <!-- 2. FULL REALTIME LIVE STATUS (Mewah Glassmorphism Cards) -->
    <div class="container-padding -mt-10 relative z-20 space-y-8">
      <div class="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-slate-200/90 space-y-8">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-6 gap-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
              <span class="text-xs font-black uppercase tracking-widest text-teal-800">DASHBOARD PUBLIC REAL-TIME</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-black text-slate-900 margin-0 mt-1">🔥 RSUD LIVE STATUS</h2>
          </div>
          <div class="text-xs text-slate-500 font-bold bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200/80">
            Terakhir Diperbarui: <span class="text-teal-800 font-mono font-black">{{ lastUpdated }}</span>
          </div>
        </div>

        <!-- 4 Grid Indicators -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Card IGD -->
          <div class="bg-slate-50/80 hover:bg-teal-50/50 rounded-3xl p-6 border border-slate-200/80 hover:border-teal-300 transition-all duration-500 space-y-4 shadow-sm hover:shadow-xl group hover:-translate-y-1 relative overflow-hidden">
            <div class="top-accent-line bg-teal-500 group-hover:w-full transition-all duration-500"></div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-600">IGD (Gawat Darurat)</span>
              <span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 Normal</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black text-slate-900 font-mono">12</span>
              <span class="text-xs text-slate-500 font-bold">Pasien Aktif</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div class="bg-teal-600 h-full rounded-full w-[40%]"></div>
            </div>
            <div class="text-xs text-slate-500 flex justify-between pt-2 border-t border-slate-200/60">
              <span>Alur Pelayanan</span>
              <span class="font-bold text-teal-800">Cepat &amp; Terurai</span>
            </div>
          </div>

          <!-- Card POLI -->
          <div class="bg-slate-50/80 hover:bg-amber-50/50 rounded-3xl p-6 border border-slate-200/80 hover:border-amber-300 transition-all duration-500 space-y-4 shadow-sm hover:shadow-xl group hover:-translate-y-1 relative overflow-hidden">
            <div class="top-accent-line bg-amber-500 group-hover:w-full transition-all duration-500"></div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-600">POLIKLINIK</span>
              <span class="px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 border border-amber-200">🟡 Ramai</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black text-slate-900 font-mono">127</span>
              <span class="text-xs text-slate-500 font-bold">Total Antrean</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div class="bg-amber-500 h-full rounded-full w-[65%]"></div>
            </div>
            <div class="text-xs text-slate-500 flex justify-between pt-2 border-t border-slate-200/60">
              <span>Poli Buka</span>
              <span class="font-bold text-amber-800">18 Dokter Spesialis</span>
            </div>
          </div>

          <!-- Card RAWAT INAP -->
          <div class="bg-slate-50/80 hover:bg-teal-50/50 rounded-3xl p-6 border border-slate-200/80 hover:border-teal-300 transition-all duration-500 space-y-4 shadow-sm hover:shadow-xl group hover:-translate-y-1 relative overflow-hidden">
            <div class="top-accent-line bg-teal-500 group-hover:w-full transition-all duration-500"></div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-600">RAWAT INAP</span>
              <span class="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-200">🟢 23 Bed Kosong</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black text-slate-900 font-mono">23</span>
              <span class="text-xs text-slate-500 font-bold">Bed Tersedia</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div class="bg-teal-600 h-full rounded-full w-[25%]"></div>
            </div>
            <div class="text-xs text-slate-500 flex justify-between pt-2 border-t border-slate-200/60">
              <span>Kapasitas Kamar</span>
              <span class="font-bold text-teal-800">Total 240 Bed</span>
            </div>
          </div>

          <!-- Card OPERASI -->
          <div class="bg-slate-50/80 hover:bg-cyan-50/50 rounded-3xl p-6 border border-slate-200/80 hover:border-cyan-300 transition-all duration-500 space-y-4 shadow-sm hover:shadow-xl group hover:-translate-y-1 relative overflow-hidden">
            <div class="top-accent-line bg-cyan-500 group-hover:w-full transition-all duration-500"></div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-600">OPERASI (OK)</span>
              <span class="px-3 py-1 rounded-full text-xs font-black bg-cyan-100 text-cyan-800 border border-cyan-200">🟢 Normal</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-black text-slate-900 font-mono">8</span>
              <span class="text-xs text-slate-500 font-bold">Jadwal Operasi</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div class="bg-cyan-600 h-full rounded-full w-[60%]"></div>
            </div>
            <div class="text-xs text-slate-500 flex justify-between pt-2 border-t border-slate-200/60">
              <span>Tindakan Selesai</span>
              <span class="font-bold text-cyan-800">5 / 8 Operasi</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. 3 PILAR PERJALANAN PASIEN (Luxury Cards with Visual Icons) -->
    <div class="container-padding py-16 space-y-12 max-w-7xl mx-auto">
      <div class="text-center space-y-3">
        <span class="text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full border border-teal-200/80">SMART HEALTH JOURNEY</span>
        <h2 class="text-3xl md:text-4xl font-black text-slate-900 margin-0">🏛️ 3 PILAR PERJALANAN PASIEN</h2>
        <p class="text-sm text-slate-500 max-w-xl mx-auto font-medium">Pengalaman pelayanan kesehatan terpadu dan serba mudah bagi masyarakat</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- PILAR 1 -->
        <div class="pilar-card bg-white rounded-[2rem] p-8 border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 space-y-6 relative overflow-hidden group hover:-translate-y-2">
          <div class="top-accent-line bg-gradient-to-r from-teal-500 to-emerald-400 group-hover:w-full transition-all duration-500"></div>
          
          <div class="flex items-center justify-between">
            <div class="w-16 h-16 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-black text-2xl border border-teal-200/80 shadow-xs group-hover:scale-110 transition-transform">
              01
            </div>
            <div class="pilar-badge bg-teal-50 text-teal-800 border border-teal-200/80 px-3 py-1 rounded-full text-xs font-black">
              PRE-VISIT
            </div>
          </div>

          <div>
            <h3 class="text-xl font-black text-slate-900 margin-0">SEBELUM KE RS</h3>
            <p class="text-xs text-slate-400 font-bold mt-1">Persiapan &amp; Konsultasi Awal Mandiri</p>
          </div>

          <div class="space-y-3 pt-2">
            <div v-for="(feat, idx) in pilar1Features" :key="idx" class="feature-item flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 group-hover:bg-teal-50/40 border border-slate-100/90 transition-colors">
              <div class="w-8 h-8 rounded-xl bg-teal-100/80 text-teal-800 shrink-0 flex items-center justify-center font-bold">
                <q-icon :name="feat.icon" size="18px" />
              </div>
              <div>
                <div class="text-xs font-black text-slate-900">{{ feat.title }}</div>
                <div class="text-[11px] text-slate-500 mt-0.5 font-medium">{{ feat.desc }}</div>
              </div>
            </div>
          </div>

          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-teal w-full font-bold text-xs uppercase tracking-wider mt-4 py-3"
            label="Akses Fitur Pre-Visit"
            icon-right="east"
          />
        </div>

        <!-- PILAR 2 -->
        <div class="pilar-card bg-white rounded-[2rem] p-8 border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 space-y-6 relative overflow-hidden group hover:-translate-y-2">
          <div class="top-accent-line bg-gradient-to-r from-amber-500 to-orange-400 group-hover:w-full transition-all duration-500"></div>
          
          <div class="flex items-center justify-between">
            <div class="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-2xl border border-amber-200/80 shadow-xs group-hover:scale-110 transition-transform">
              02
            </div>
            <div class="pilar-badge bg-amber-50 text-amber-800 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-black">
              IN-HOSPITAL
            </div>
          </div>

          <div>
            <h3 class="text-xl font-black text-slate-900 margin-0">SAAT DI RS</h3>
            <p class="text-xs text-slate-400 font-bold mt-1">Navigasi Digital &amp; Antrean Real-time</p>
          </div>

          <div class="space-y-3 pt-2">
            <div v-for="(feat, idx) in pilar2Features" :key="idx" class="feature-item flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 group-hover:bg-amber-50/40 border border-slate-100/90 transition-colors">
              <div class="w-8 h-8 rounded-xl bg-amber-100/80 text-amber-800 shrink-0 flex items-center justify-center font-bold">
                <q-icon :name="feat.icon" size="18px" />
              </div>
              <div>
                <div class="text-xs font-black text-slate-900">{{ feat.title }}</div>
                <div class="text-[11px] text-slate-500 mt-0.5 font-medium">{{ feat.desc }}</div>
              </div>
            </div>
          </div>

          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-amber w-full font-bold text-xs uppercase tracking-wider mt-4 py-3"
            label="Pantau Antrean Live"
            icon-right="east"
          />
        </div>

        <!-- PILAR 3 -->
        <div class="pilar-card bg-white rounded-[2rem] p-8 border border-slate-200/90 shadow-sm hover:shadow-2xl transition-all duration-500 space-y-6 relative overflow-hidden group hover:-translate-y-2">
          <div class="top-accent-line bg-gradient-to-r from-cyan-500 to-sky-400 group-hover:w-full transition-all duration-500"></div>
          
          <div class="flex items-center justify-between">
            <div class="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-800 flex items-center justify-center font-black text-2xl border border-cyan-200/80 shadow-xs group-hover:scale-110 transition-transform">
              03
            </div>
            <div class="pilar-badge bg-cyan-50 text-cyan-800 border border-cyan-200/80 px-3 py-1 rounded-full text-xs font-black">
              POST-VISIT
            </div>
          </div>

          <div>
            <h3 class="text-xl font-black text-slate-900 margin-0">SETELAH DARI RS</h3>
            <p class="text-xs text-slate-400 font-bold mt-1">Follow-up, Kontrol &amp; Pengantar Obat</p>
          </div>

          <div class="space-y-3 pt-2">
            <div v-for="(feat, idx) in pilar3Features" :key="idx" class="feature-item flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 group-hover:bg-cyan-50/40 border border-slate-100/90 transition-colors">
              <div class="w-8 h-8 rounded-xl bg-cyan-100/80 text-cyan-800 shrink-0 flex items-center justify-center font-bold">
                <q-icon :name="feat.icon" size="18px" />
              </div>
              <div>
                <div class="text-xs font-black text-slate-900">{{ feat.title }}</div>
                <div class="text-[11px] text-slate-500 mt-0.5 font-medium">{{ feat.desc }}</div>
              </div>
            </div>
          </div>

          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-teal w-full font-bold text-xs uppercase tracking-wider mt-4 py-3"
            label="Layanan Pasca Rawat"
            icon-right="east"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const lastUpdated = ref(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))

const pilar1Features = ref([
  { title: 'Cek Layanan & Fasilitas', desc: 'Informasi spesialis & kelengkapan medis', icon: 'medical_services' },
  { title: 'Cek Jadwal Dokter', desc: 'Jadwal praktek spesialis real-time', icon: 'calendar_month' },
  { title: 'Estimasi Biaya', desc: 'Kalkulator perkiraan biaya & BPJS', icon: 'calculate' },
  { title: 'Konsultasi Online', desc: 'Tanya jawab kesehatan awal', icon: 'chat' }
])

const pilar2Features = ref([
  { title: 'Navigasi Gedung Digital', desc: 'Denah interaktif gedung & poli', icon: 'near_me' },
  { title: 'Antrian Real-time', desc: 'Pantau nomor antrian via HP', icon: 'confirmation_number' },
  { title: 'Status Lab & Radiologi', desc: 'Notifikasi status hasil pemeriksaan', icon: 'science' },
  { title: 'Ketersediaan Bed Inap', desc: 'Informasi kamar tidur kosong', icon: 'king_bed' }
])

const pilar3Features = ref([
  { title: 'Reminder Kontrol Ulang', desc: 'Notifikasi otomatis jadwal kontrol', icon: 'event_available' },
  { title: 'Layanan Pengantar Obat', desc: 'Integrasi pengiriman obat ke rumah', icon: 'local_shipping' },
  { title: 'Edukasi Pasca Rawat', desc: 'Panduan perawatan mandiri di rumah', icon: 'menu_book' },
  { title: 'Monitoring Kesehatan', desc: 'Input berkala kondisi kesehatan pasien', icon: 'monitor_heart' }
])
</script>

<style lang="scss" scoped>
.rsud-one-gate-page {
  font-family: inherit;
}

.top-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  border-radius: 3px 3px 0 0;
}

.btn-cta-card {
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 18px !important;

  :deep(.q-icon) {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);

    :deep(.q-icon) {
      transform: translateX(5px);
    }
  }
}

.btn-teal {
  background: linear-gradient(135deg, #0284c7, #0d9488) !important;
  color: white !important;

  &:hover {
    box-shadow: 0 10px 25px rgba(13, 148, 136, 0.4) !important;
  }
}

.btn-amber {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  color: white !important;

  &:hover {
    box-shadow: 0 10px 25px rgba(245, 158, 11, 0.4) !important;
  }
}
</style>
