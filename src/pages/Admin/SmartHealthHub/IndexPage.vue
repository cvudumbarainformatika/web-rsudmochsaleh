<template>
  <q-page class="q-pa-md md:q-pa-lg space-y-6">
    <!-- 1. Header & Title Banner -->
    <div class="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-teal-500/30 relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-widest mb-2">
            <q-icon name="hub" size="18px" />
            <span>Staging &amp; Preview Center</span>
            <q-badge color="amber-9" class="font-bold text-[0.65rem] px-2 py-0.5">ADMIN ONLY</q-badge>
          </div>
          <h1 class="text-2xl md:text-3xl font-black text-white margin-0 leading-tight">
            RSUD ONE GATE <span class="text-teal-400">Smart Health Hub</span>
          </h1>
          <p class="text-slate-300 text-xs md:text-sm mt-1 max-w-3xl margin-0">
            "Satu Pintu, Satu Data, Satu Perjalanan Pasien." Dashboard staging internal untuk menguji indikator real-time RSUD LIVE &amp; integrasi SIMRS sebelum dirilis ke halaman publik.
          </p>
        </div>

        <div class="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60">
          <div class="text-right">
            <div class="text-[0.68rem] text-slate-400 font-bold uppercase">Status Integrasi SIMRS</div>
            <div class="text-xs font-black" :class="isSimrsConnected ? 'text-emerald-400' : 'text-amber-400'">
              {{ isSimrsConnected ? '🟢 Terhubung (Live Sync)' : '🟡 Simulation Mode (Demo Data)' }}
            </div>
          </div>
          <q-btn
            unelevated
            round
            dense
            :color="isSimrsConnected ? 'emerald-8' : 'amber-8'"
            icon="sync"
            :loading="loadingSync"
            @click="toggleSimrsSync"
          >
            <q-tooltip>Toggle SIMRS Sync / Simulasi</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>

    <!-- 2. Preview Panel RSUD LIVE STATUS -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
          <h2 class="text-lg font-black text-slate-900 dark:text-white margin-0">
            🔥 Live Preview Widget: <span class="text-teal-700 dark:text-teal-400">RSUD LIVE</span>
          </h2>
        </div>
        <q-badge color="teal-10" class="text-xs font-bold px-3 py-1">Tampilan Publik Staging</q-badge>
      </div>

      <!-- PUBLIC WIDGET MOCKUP -->
      <div class="bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-teal-500/20 relative">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-5 mb-6 gap-4">
          <div>
            <div class="text-xs font-bold text-teal-400 tracking-wider uppercase">RSUD MOHAMAD SALEH</div>
            <div class="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>LIVE STATUS DASHBOARD</span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            </div>
          </div>
          <div class="text-xs text-slate-400 font-semibold bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/50">
            Terakhir Diperbarui: <span class="text-teal-300 font-mono font-bold">{{ lastUpdated }}</span>
          </div>
        </div>

        <!-- 4 MAIN LIVE METRICS -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Metric 1: IGD -->
          <div class="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 relative overflow-hidden space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-400">IGD (Gawat Darurat)</span>
              <q-badge :color="getBadgeColor(liveStatus.igd.status)" class="font-extrabold text-[0.7rem] px-2 py-0.5">
                {{ liveStatus.igd.status }}
              </q-badge>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-white font-mono">{{ liveStatus.igd.pasien }}</span>
              <span class="text-xs text-slate-400 font-bold">Pasien Aktif</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="bg-teal-400 h-full rounded-full" :style="{ width: Math.min((liveStatus.igd.pasien / 30) * 100, 100) + '%' }"></div>
            </div>
            <div class="text-[0.7rem] text-slate-400 flex justify-between">
              <span>Kapasitas Terurai</span>
              <span class="font-bold text-teal-300">{{ liveStatus.igd.keterangan }}</span>
            </div>
          </div>

          <!-- Metric 2: POLI -->
          <div class="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 relative overflow-hidden space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-400">POLIKLINIK</span>
              <q-badge :color="getBadgeColor(liveStatus.poli.status)" class="font-extrabold text-[0.7rem] px-2 py-0.5">
                {{ liveStatus.poli.status }}
              </q-badge>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-amber-400 font-mono">{{ liveStatus.poli.pasien }}</span>
              <span class="text-xs text-slate-400 font-bold">Total Antrean</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="bg-amber-400 h-full rounded-full" :style="{ width: Math.min((liveStatus.poli.pasien / 200) * 100, 100) + '%' }"></div>
            </div>
            <div class="text-[0.7rem] text-slate-400 flex justify-between">
              <span>Poli Buka</span>
              <span class="font-bold text-amber-300">{{ liveStatus.poli.poliAktif }} Poliklinik</span>
            </div>
          </div>

          <!-- Metric 3: RAWAT INAP -->
          <div class="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 relative overflow-hidden space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-400">RAWAT INAP</span>
              <q-badge color="emerald-7" class="font-extrabold text-[0.7rem] px-2 py-0.5">
                {{ liveStatus.rawatInap.tersedia }} Tempat Tidur Kosong
              </q-badge>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-emerald-400 font-mono">{{ liveStatus.rawatInap.tersedia }}</span>
              <span class="text-xs text-slate-400 font-bold">Bed Tersedia</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="bg-emerald-400 h-full rounded-full" :style="{ width: ((liveStatus.rawatInap.tersedia / liveStatus.rawatInap.totalBed) * 100) + '%' }"></div>
            </div>
            <div class="text-[0.7rem] text-slate-400 flex justify-between">
              <span>Total Tempat Tidur</span>
              <span class="font-bold text-emerald-300">{{ liveStatus.rawatInap.totalBed }} Bed</span>
            </div>
          </div>

          <!-- Metric 4: OPERASI (OK) -->
          <div class="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 relative overflow-hidden space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-400">BEDAH &amp; OPERASI (OK)</span>
              <q-badge :color="getBadgeColor(liveStatus.operasi.status)" class="font-extrabold text-[0.7rem] px-2 py-0.5">
                {{ liveStatus.operasi.status }}
              </q-badge>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-black text-cyan-400 font-mono">{{ liveStatus.operasi.jadwalHariIni }}</span>
              <span class="text-xs text-slate-400 font-bold">Jadwal Operasi</span>
            </div>
            <div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div class="bg-cyan-400 h-full rounded-full" :style="{ width: ((liveStatus.operasi.selesai / liveStatus.operasi.jadwalHariIni) * 100) + '%' }"></div>
            </div>
            <div class="text-[0.7rem] text-slate-400 flex justify-between">
              <span>Selesai Terlaksana</span>
              <span class="font-bold text-cyan-300">{{ liveStatus.operasi.selesai }} / {{ liveStatus.operasi.jadwalHariIni }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. SMART HEALTH HUB - 3 PILAR JOURNEY PASIEN -->
    <div class="space-y-4 pt-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-black text-slate-900 dark:text-white margin-0">
          🏛️ Smart Health Hub: <span class="text-teal-700 dark:text-teal-400">Modul Perjalanan Pasien</span>
        </h2>
        <span class="text-xs text-slate-500">Konfigurasi 3 Pilar Utama</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Pilar 1: SEBELUM RS -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 class="text-sm font-black text-slate-900 dark:text-white margin-0 uppercase">SEBELUM RS</h3>
              <span class="text-[0.7rem] text-slate-400 font-semibold">Pre-Visit Consultation &amp; Prep</span>
            </div>
          </div>

          <q-list separator class="text-xs">
            <q-item v-for="(item, idx) in pilarBefore" :key="idx" class="px-0 py-2">
              <q-item-section avatar class="min-w-0 pr-2">
                <q-icon :name="item.icon" size="18px" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="font-bold text-slate-800 dark:text-slate-200">{{ item.title }}</q-item-label>
                <q-item-label caption class="text-[0.68rem]">{{ item.desc }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="item.active" color="teal" dense />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Pilar 2: DI RS -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 class="text-sm font-black text-slate-900 dark:text-white margin-0 uppercase">DI RS</h3>
              <span class="text-[0.7rem] text-slate-400 font-semibold">In-Hospital Navigation &amp; Realtime Queue</span>
            </div>
          </div>

          <q-list separator class="text-xs">
            <q-item v-for="(item, idx) in pilarDuring" :key="idx" class="px-0 py-2">
              <q-item-section avatar class="min-w-0 pr-2">
                <q-icon :name="item.icon" size="18px" color="amber-9" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="font-bold text-slate-800 dark:text-slate-200">{{ item.title }}</q-item-label>
                <q-item-label caption class="text-[0.68rem]">{{ item.desc }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="item.active" color="amber-9" dense />
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Pilar 3: SETELAH RS -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 class="text-sm font-black text-slate-900 dark:text-white margin-0 uppercase">SETELAH RS</h3>
              <span class="text-[0.7rem] text-slate-400 font-semibold">Post-Visit Follow-up &amp; Medicine</span>
            </div>
          </div>

          <q-list separator class="text-xs">
            <q-item v-for="(item, idx) in pilarAfter" :key="idx" class="px-0 py-2">
              <q-item-section avatar class="min-w-0 pr-2">
                <q-icon :name="item.icon" size="18px" color="cyan-8" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="font-bold text-slate-800 dark:text-slate-200">{{ item.title }}</q-item-label>
                <q-item-label caption class="text-[0.68rem]">{{ item.desc }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="item.active" color="cyan-8" dense />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <!-- 4. CONTROLLER / OVERRIDE MANUAL PANEL -->
    <div class="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <q-icon name="tune" size="20px" class="text-teal-700 dark:text-teal-400" />
          <h3 class="text-base font-black text-slate-900 dark:text-white margin-0">Simulasi / Manual Override Status RSUD LIVE</h3>
        </div>
        <span class="text-xs text-slate-400">Gunakan form ini untuk menguji perubahan angka status live secara instan</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Edit IGD -->
        <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-300">Pengaturan IGD</div>
          <q-select
            v-model="liveStatus.igd.status"
            :options="['Normal', 'Ramai', 'Padat']"
            dense
            outlined
            label="Status IGD"
            class="text-xs"
          />
          <q-input
            v-model.number="liveStatus.igd.pasien"
            type="number"
            dense
            outlined
            label="Jumlah Pasien IGD"
            class="text-xs"
          />
        </div>

        <!-- Edit Poli -->
        <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-300">Pengaturan Poliklinik</div>
          <q-select
            v-model="liveStatus.poli.status"
            :options="['Normal', 'Ramai', 'Padat']"
            dense
            outlined
            label="Status Poli"
            class="text-xs"
          />
          <q-input
            v-model.number="liveStatus.poli.pasien"
            type="number"
            dense
            outlined
            label="Total Antrean Pasien"
            class="text-xs"
          />
        </div>

        <!-- Edit Rawat Inap -->
        <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-300">Pengaturan Rawat Inap</div>
          <q-input
            v-model.number="liveStatus.rawatInap.tersedia"
            type="number"
            dense
            outlined
            label="Bed Tersedia"
            class="text-xs"
          />
          <q-input
            v-model.number="liveStatus.rawatInap.totalBed"
            type="number"
            dense
            outlined
            label="Total Bed Keseluruhan"
            class="text-xs"
          />
        </div>

        <!-- Edit OK -->
        <div class="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-3">
          <div class="text-xs font-bold text-slate-700 dark:text-slate-300">Pengaturan Ruang Operasi</div>
          <q-input
            v-model="liveStatus.operasi.status"
            dense
            outlined
            label="Keterangan Operasi"
            class="text-xs"
          />
          <q-input
            v-model.number="liveStatus.operasi.jadwalHariIni"
            type="number"
            dense
            outlined
            label="Jadwal Hari Ini"
            class="text-xs"
          />
        </div>
      </div>

      <div class="flex items-center justify-end gap-3 pt-2">
        <q-btn
          unelevated
          color="teal-8"
          icon="save"
          label="Simpan Pengaturan Staging"
          class="font-bold text-xs rounded-xl px-5"
          @click="saveStaging"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const isSimrsConnected = ref(false)
const loadingSync = ref(false)
const lastUpdated = ref(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))

const liveStatus = ref({
  igd: {
    status: 'Normal',
    pasien: 12,
    keterangan: 'Alur Cepat'
  },
  poli: {
    status: 'Ramai',
    pasien: 127,
    poliAktif: 18
  },
  rawatInap: {
    tersedia: 23,
    totalBed: 240
  },
  operasi: {
    status: 'Jadwal berjalan normal',
    jadwalHariIni: 8,
    selesai: 5
  }
})

const pilarBefore = ref([
  { title: 'Cek Layanan & Fasilitas', desc: 'Info spesialis & kelengkapan medis', icon: 'medical_services', active: true },
  { title: 'Cek Jadwal Dokter', desc: 'Jadwal praktek spesialis real-time', icon: 'calendar_month', active: true },
  { title: 'Estimasi Biaya', desc: 'Kalkulator perkiraan biaya & BPJS', icon: 'calculate', active: true },
  { title: 'Persiapan Berkas', desc: 'Checklist rujukan & persyaratan', icon: 'checklist', active: true },
  { title: 'Konsultasi Online', desc: 'Tanya jawab kesehatan awal', icon: 'chat', active: true }
])

const pilarDuring = ref([
  { title: 'Navigasi Pasien Digital', desc: 'Denah interaktif gedung & poliklinik', icon: 'near_me', active: true },
  { title: 'Antrian Real-time', desc: 'Pantau nomor antrian dari HP', icon: 'confirmation_number', active: true },
  { title: 'Status Poliklinik', desc: 'Antrean poli & dokter yang melayani', icon: 'local_hospital', active: true },
  { title: 'Laboratorium & Radiologi', desc: 'Notifikasi status hasil pemeriksaan', icon: 'science', active: true }
])

const pilarAfter = ref([
  { title: 'Follow-up Kontrol', desc: 'Reminder otomatis jadwal kontrol', icon: 'event_available', active: true },
  { title: 'Layanan Pengantar Obat', desc: 'Integrasi pengiriman obat ke rumah', icon: 'local_shipping', active: true },
  { title: 'Edukasi Pasca Rawat', desc: 'Panduan perawatan mandiri di rumah', icon: 'menu_book', active: true },
  { title: 'Monitoring Kesehatan', desc: 'Input berkala kondisi kesehatan pasien', icon: 'monitor_heart', active: true }
])

function getBadgeColor(status) {
  if (!status) return 'teal'
  const st = status.toLowerCase()
  if (st.includes('normal') || st.includes('tersedia')) return 'emerald-8'
  if (st.includes('ramai')) return 'amber-9'
  if (st.includes('padat')) return 'red-8'
  return 'teal-8'
}

function toggleSimrsSync() {
  loadingSync.value = true
  setTimeout(() => {
    isSimrsConnected.value = !isSimrsConnected.value
    loadingSync.value = false
    lastUpdated.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    $q.notify({
      type: 'positive',
      message: isSimrsConnected.value ? 'Terhubung dengan SIMRS (Data Live)' : 'Switch ke Mode Simulasi (Data Staging)',
      position: 'top-right'
    })
  }, 750)
}

function saveStaging() {
  lastUpdated.value = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  $q.notify({
    type: 'positive',
    message: 'Pengaturan Staging RSUD LIVE Berhasil Diperbarui!',
    position: 'top-right'
  })
}
</script>
