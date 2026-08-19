<template>
  <q-page class="q-pa-md md:q-pa-lg space-y-6">
    <!-- 1. Welcome Banner Header RSUD -->
    <div class="welcome-banner bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-white rounded-3xl p-6 md:p-8 shadow-md border border-teal-700/50 relative overflow-hidden">
      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div class="flex items-center gap-2 text-cyan-3 text-xs font-black uppercase tracking-widest q-mb-xs">
            <q-icon name="verified_user" size="16px" />
            <span>Sistem Informasi Manajemen Web RSUD</span>
          </div>
          <h1 class="text-2xl md:text-3xl font-black text-white margin-0 leading-tight">
            Selamat Datang, {{ auth.user?.name || 'Administrator' }}! 👋
          </h1>
          <p class="text-teal-100 text-xs md:text-sm mt-1 max-w-2xl margin-0">
            Kelola informasi publik, berita kesehatan, jadwal poliklinik, layanan PPID, danaspirasi masyarakat RSUD dr. Mohamad Saleh Kota Probolinggo secara efisien.
          </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <q-btn
            color="amber-8"
            size="sm"
            unelevated
            rounded
            class="font-bold px-4 shadow-sm"
            to="/admin/buku-tamu"
          >
            <q-icon name="rate_review" size="16px" class="q-mr-xs" />
            <span>Buku Tamu</span>
          </q-btn>
          <q-btn
            color="white"
            text-color="teal-9"
            size="sm"
            unelevated
            rounded
            class="font-bold px-4 shadow-sm"
            href="/"
            target="_blank"
          >
            <q-icon name="open_in_new" size="16px" class="q-mr-xs" />
            <span>Buka Web Publik</span>
          </q-btn>
        </div>
      </div>
    </div>

    <!-- 2. Metric Stat Cards Grid (4 Kolom Card Modern) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Card 1: Total Kunjungan -->
      <div class="stat-card bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div class="space-y-1">
          <span class="text-xs font-bold text-slate-500 block">Total Kunjungan</span>
          <div class="text-2xl md:text-3xl font-black text-slate-900 leading-none">
            {{ store.kunjungan.toLocaleString() }}
          </div>
          <span class="text-[0.7rem] text-teal-700 font-bold block pt-1">Akumulasi Seluruh Waktu</span>
        </div>
        <div class="stat-icon-box w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 flex-shrink-0">
          <q-icon name="query_stats" size="30px" />
        </div>
      </div>

      <!-- Card 2: Kunjungan Hari Ini -->
      <div class="stat-card bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div class="space-y-1">
          <span class="text-xs font-bold text-slate-500 block">Pengunjung Hari Ini</span>
          <div class="text-2xl md:text-3xl font-black text-emerald-600 leading-none">
            {{ store.hari_ini.toLocaleString() }}
          </div>
          <span class="text-[0.7rem] text-emerald-700 font-bold block pt-1">Pengunjung Realtime</span>
        </div>
        <div class="stat-icon-box w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-600 flex-shrink-0">
          <q-icon name="today" size="30px" />
        </div>
      </div>

      <!-- Card 3: Total Berita -->
      <div class="stat-card bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div class="space-y-1">
          <span class="text-xs font-bold text-slate-500 block">Artikel Berita</span>
          <div class="text-2xl md:text-3xl font-black text-cyan-700 leading-none">
            {{ store.berita.toLocaleString() }}
          </div>
          <span class="text-[0.7rem] text-cyan-800 font-bold block pt-1">Berita Terpublikasi</span>
        </div>
        <div class="stat-icon-box w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-200/80 flex items-center justify-center text-cyan-700 flex-shrink-0">
          <q-icon name="newspaper" size="30px" />
        </div>
      </div>

      <!-- Card 4: Data User Admin -->
      <div class="stat-card bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between transition-all hover:shadow-md">
        <div class="space-y-1">
          <span class="text-xs font-bold text-slate-500 block">Pengguna Admin</span>
          <div class="text-2xl md:text-3xl font-black text-amber-600 leading-none">
            {{ store.users.toLocaleString() }}
          </div>
          <span class="text-[0.7rem] text-amber-700 font-bold block pt-1">Pengguna Terdaftar</span>
        </div>
        <div class="stat-icon-box w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 flex-shrink-0">
          <q-icon name="manage_accounts" size="30px" />
        </div>
      </div>
    </div>

    <!-- 3. Quick Access Modules Grid (Pintasan Modul Utama Admin) -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <q-icon name="apps" size="20px" class="text-teal-700" />
          <h2 class="text-base font-extrabold text-slate-900 margin-0">Pintasan Pengelolaan Modul Web</h2>
        </div>
        <span class="text-xs text-slate-400 font-semibold">Pilih modul untuk mengedit data</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <!-- Module 0: RSUD ONE GATE & LIVE STATUS (STAGING) -->
        <div class="module-card bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 border border-teal-500/40 shadow-lg hover:shadow-xl transition-all space-y-3 relative overflow-hidden">
          <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center font-bold">
              <q-icon name="hub" size="24px" />
            </div>
            <q-badge color="teal-6" class="font-extrabold text-[0.62rem] px-2 py-0.5">STAGING PREVIEW</q-badge>
          </div>
          <div>
            <h3 class="text-sm font-black text-white margin-0 flex items-center gap-1.5">
              <span>RSUD ONE GATE &amp; LIVE</span>
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p class="text-xs text-slate-300 mt-1 margin-0">Smart Health Hub (3 Pilar Pasien) &amp; Dashboard RSUD LIVE real-time.</p>
          </div>
          <div class="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span class="text-teal-400 font-bold">Status Staging</span>
            <q-btn flat dense no-caps color="teal-3" label="Buka Hub ➔" class="font-black" to="/admin/smart-health-hub" />
          </div>
        </div>

        <!-- Module 1: Berita -->
        <div class="module-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <q-icon name="newspaper" size="24px" />
            </div>
            <q-btn flat round dense icon="arrow_forward" color="teal-8" to="/admin/berita" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 margin-0">Kelola Berita &amp; Informasi</h3>
            <p class="text-xs text-slate-500 mt-1 margin-0">Tambah, edit, dan publikasikan artikel berita kegiatan RSUD.</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-semibold">Total Berita</span>
            <span class="font-black text-teal-800">{{ store.berita }} Artikel</span>
          </div>
        </div>

        <!-- Module 2: Buku Tamu -->
        <div class="module-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <q-icon name="rate_review" size="24px" />
            </div>
            <q-btn flat round dense icon="arrow_forward" color="amber-8" to="/admin/buku-tamu" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 margin-0">Buku Tamu &amp; Tanggapan</h3>
            <p class="text-xs text-slate-500 mt-1 margin-0">Respon masukan, saran, rating, dan pengaduan dari masyarakat.</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-semibold">Status Balasan</span>
            <span class="font-black text-amber-800">Tanggapi Pesan ➔</span>
          </div>
        </div>

        <!-- Module 3: Pelayanan -->
        <div class="module-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-800 flex items-center justify-center font-bold">
              <q-icon name="medical_services" size="24px" />
            </div>
            <q-btn flat round dense icon="arrow_forward" color="cyan-8" to="/admin/pelayanan" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 margin-0">Kelola Layanan Kesehatan</h3>
            <p class="text-xs text-slate-500 mt-1 margin-0">Pengaturan informasi poliklinik, rawat inap, dan fasililitas RSUD.</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-semibold">Modul Layanan</span>
            <span class="font-black text-cyan-800">Kelola ➔</span>
          </div>
        </div>

        <!-- Module 4: PPID & Pokja -->
        <div class="module-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold">
              <q-icon name="folder_shared" size="24px" />
            </div>
            <q-btn flat round dense icon="arrow_forward" color="indigo-8" to="/admin/ppid" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 margin-0">Informasi Publik PPID</h3>
            <p class="text-xs text-slate-500 mt-1 margin-0">Upload dokumen keterbukaan informasi publik dan akreditasi RSUD.</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-semibold">Dokumen Publik</span>
            <span class="font-black text-indigo-800">Kelola ➔</span>
          </div>
        </div>

        <!-- Module 5: Gallery Animasi Lottie -->
        <div class="module-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <q-icon name="animation" size="24px" />
            </div>
            <q-btn flat round dense icon="arrow_forward" color="emerald-8" to="/admin/gallery_animasi" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 margin-0">Gallery Animasi Lottie</h3>
            <p class="text-xs text-slate-500 mt-1 margin-0">Kelola ikon animasi Lottie JSON untuk visualisasi halaman web.</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-semibold">Animasi JSON</span>
            <span class="font-black text-emerald-800">Kelola ➔</span>
          </div>
        </div>

        <!-- Module 6: Settings -->
        <div class="module-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <q-icon name="settings_suggest" size="24px" />
            </div>
            <q-btn flat round dense icon="arrow_forward" color="slate-8" to="/admin/settings" />
          </div>
          <div>
            <h3 class="text-sm font-extrabold text-slate-900 margin-0">Pengaturan Website</h3>
            <p class="text-xs text-slate-500 mt-1 margin-0">Pengaturan banner utama, alamat, kontak RSUD, dan media sosial.</p>
          </div>
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-semibold">Konfigurasi Web</span>
            <span class="font-black text-slate-800">Setting ➔</span>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDashboardStore } from 'src/stores/admin/dashboard'
import { useAuthStore } from 'src/stores/auth'

const store = useDashboardStore()
const auth = useAuthStore()

onMounted(() => {
  store.getData()
  auth.getUser()
})
</script>

<style lang="scss" scoped>
.welcome-banner {
  box-shadow: 0 10px 30px rgba(15, 118, 110, 0.2);
}

.stat-card {
  border-left: 4px solid #0d9488;
}
</style>
