<template>
  <section class="dashboard-summary light-grid-bg q-py-xl">
    <div class="container-padding">
      <div class="summary-grid">
        <!-- CARD 1: INFO KETERSEDIAAN TEMPAT TIDUR -->
        <div class="summary-card glass-card-light rounded-3xl p-6 relative-position overflow-hidden border border-slate-200/80 shadow-md">
          <div class="card-glow-bg teal-glow" />
          
          <!-- Card Header -->
          <div class="flex items-center justify-between q-mb-xs">
            <div class="flex items-center gap-2">
              <span class="live-dot animate-pulse-dot" />
              <span class="text-subtitle1 text-weight-bolder text-slate-900 tracking-wide uppercase">INFO TT</span>
            </div>
            <div class="icon-pill-badge bg-teal-50 text-teal-7 border border-teal-200">
              <q-icon name="king_bed" size="16px" />
              <span class="text-xs text-weight-bold ml-1">Kamar Ranap</span>
            </div>
          </div>

          <p class="text-caption text-slate-500 q-mb-md">Ketersediaan Tempat Perawatan Realtime</p>

          <!-- Card Content Highlight -->
          <div class="stat-box-container bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex items-center justify-between gap-3 q-mb-md">
            <div class="grow">
              <div class="text-h4 text-weight-bolder text-teal-8 flex items-baseline gap-1">
                {{ totalKosong }}
                <span class="text-caption text-weight-bold text-slate-500">Bed Kosong</span>
              </div>
              <div class="text-xs text-slate-500 mt-1">
                Dari total <strong class="text-slate-800">{{ totalBed }}</strong> kapasitas tempat tidur
              </div>
            </div>
            <div class="stat-icon-circle shrink-0 bg-teal-100/70 text-teal-7 flex items-center justify-center rounded-2xl border border-teal-200/60 shadow-inner">
              <q-icon name="hotel" size="28px" />
            </div>
          </div>

          <!-- Action Button -->
          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-teal w-full text-weight-bold q-py-sm"
            label="Cek Ketersediaan Kamar"
            icon-right="east"
            @click="router.push('/informasi-ruang-perawatan')"
          />
        </div>

        <!-- CARD 2: IKM (INDEKS KEPUASAN MASYARAKAT) -->
        <div class="summary-card glass-card-light rounded-3xl p-6 relative-position overflow-hidden border border-slate-200/80 shadow-md">
          <div class="card-glow-bg cyan-glow" />

          <!-- Card Header -->
          <div class="flex items-center justify-between q-mb-xs">
            <div class="flex items-center gap-2">
              <span class="live-dot animate-pulse-dot" />
              <span class="text-subtitle1 text-weight-bolder text-slate-900 tracking-wide uppercase">IKM</span>
            </div>
            <div class="icon-pill-badge bg-cyan-50 text-cyan-8 border border-cyan-200">
              <q-icon name="stars" size="16px" />
              <span class="text-xs text-weight-bold ml-1">Survei Mutu</span>
            </div>
          </div>

          <p class="text-caption text-slate-500 q-mb-md">Indeks Kepuasan Masyarakat RSUD</p>

          <!-- Card Content Highlight -->
          <div class="stat-box-container bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex items-center gap-4 q-mb-md">
            <q-circular-progress
              show-value
              font-size="14px"
              :value="88.93"
              size="68px"
              :thickness="0.18"
              color="teal-7"
              track-color="teal-1"
              class="text-weight-bolder text-teal-9 shadow-sm shrink-0"
            >
              88.93
            </q-circular-progress>
            <div>
              <div class="text-subtitle2 text-weight-bolder text-slate-900">Tahun 2025 / 2026</div>
              <div class="text-caption text-weight-bold text-teal-7 flex items-center gap-1 mt-0.5">
                <q-icon name="thumb_up" size="14px" />
                Sangat Baik & Pasien Puas
              </div>
              <div class="stars-row text-amber-5 text-xs mt-1">
                ★★★★★ <span class="text-slate-400 text-xs ml-1">(Mutu Unggulan)</span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-teal w-full text-weight-bold q-py-sm"
            label="Lihat Laporan IKM"
            icon-right="east"
            @click="router.push('/informasi-index-kepuasan-masyarakat')"
          />
        </div>

        <!-- CARD 3: TOP 10 PENYAKIT (DIAGNOSA TERBANYAK) -->
        <div class="summary-card glass-card-light rounded-3xl p-6 relative-position overflow-hidden border border-slate-200/80 shadow-md">
          <div class="card-glow-bg amber-glow" />

          <!-- Card Header -->
          <div class="flex items-center justify-between q-mb-xs">
            <div class="flex items-center gap-2">
              <span class="live-dot-amber animate-pulse-dot" />
              <span class="text-subtitle1 text-weight-bolder text-slate-900 tracking-wide uppercase">TOP ICD-10</span>
            </div>
            <div class="icon-pill-badge bg-amber-50 text-amber-8 border border-amber-200">
              <q-icon name="analytics" size="16px" />
              <span class="text-xs text-weight-bold ml-1">Diagnosa</span>
            </div>
          </div>

          <p class="text-caption text-slate-500 q-mb-md">Data Kasus Diagnosa Tertinggi</p>

          <!-- Card Content Highlight -->
          <div class="stat-box-container bg-slate-50/80 rounded-2xl p-2.5 border border-slate-100 flex flex-col gap-2 q-mb-md">
            <div class="top-disease-item flex items-center justify-between text-caption px-3 py-1.5 bg-white rounded-xl border border-slate-100 transition-all duration-200">
              <span class="text-weight-bold text-slate-800 text-xs truncate">1. Unstable Angina (Jantung)</span>
              <span class="badge-count shrink-0 bg-amber-100 text-amber-9 text-xs px-2.5 py-0.5 rounded-full font-bold ml-2">305 Kasus</span>
            </div>
            <div class="top-disease-item flex items-center justify-between text-caption px-3 py-1.5 bg-white rounded-xl border border-slate-100 transition-all duration-200">
              <span class="text-weight-bold text-slate-800 text-xs truncate">2. Acute Myocardial Infarction</span>
              <span class="badge-count shrink-0 bg-amber-100 text-amber-9 text-xs px-2.5 py-0.5 rounded-full font-bold ml-2">194 Kasus</span>
            </div>
            <div class="top-disease-item flex items-center justify-between text-caption px-3 py-1.5 bg-white rounded-xl border border-slate-100 transition-all duration-200">
              <span class="text-weight-bold text-slate-800 text-xs truncate">3. Anemia / Anaemia</span>
              <span class="badge-count shrink-0 bg-amber-100 text-amber-9 text-xs px-2.5 py-0.5 rounded-full font-bold ml-2">192 Kasus</span>
            </div>
          </div>

          <!-- Action Button -->
          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-amber w-full text-weight-bold q-py-sm"
            label="Lihat Data Diagnosa"
            icon-right="east"
            @click="router.push('/informasi-top-icd10')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTempatTidurStore } from 'src/stores/web/tempatTidur'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTempatTidurStore()

onMounted(() => {
  store.getData()
})

const totalKosong = computed(() => {
  if (!store.data || !Array.isArray(store.data)) return 24
  const sum = store.data.reduce((acc, item) => acc + (parseInt(item.kosong) || 0), 0)
  return sum > 0 ? sum : 24
})

const totalBed = computed(() => {
  if (!store.data || !Array.isArray(store.data)) return 58
  const sum = store.data.reduce((acc, item) => acc + (parseInt(item.kapasitas || item.total) || 0), 0)
  return sum > 0 ? sum : 58
})
</script>

<style scoped lang="scss">
.dashboard-summary {
  position: relative;
  overflow: hidden;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.75rem;
}

.summary-card {
  border-radius: 28px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  min-height: 285px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;

  &:hover {
    transform: translateY(-8px) scale(1.015);
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1) !important;

    .stat-icon-circle {
      transform: scale(1.1) rotate(6deg);
    }
  }
}

.live-dot {
  width: 9px;
  height: 9px;
  background-color: #0d9488;
  border-radius: 50%;
  box-shadow: 0 0 10px #0d9488;
  display: inline-block;
}

.live-dot-amber {
  width: 9px;
  height: 9px;
  background-color: #f59e0b;
  border-radius: 50%;
  box-shadow: 0 0 10px #f59e0b;
  display: inline-block;
}

.icon-pill-badge {
  padding: 4px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.stat-icon-circle {
  width: 52px;
  height: 52px;
  transition: all 0.3s ease;
}

.card-glow-bg {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
  opacity: 0.35;
}

.teal-glow {
  background: #0d9488;
}

.cyan-glow {
  background: #06b8b8;
}

.amber-glow {
  background: #f59e0b;
}

.btn-cta-card {
  transition: all 0.3s ease;
  border-radius: 22px !important;
}

.btn-teal {
  background: linear-gradient(135deg, #00b4db, #0083b0) !important;
  color: white !important;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 180, 219, 0.4) !important;
  }
}

.btn-amber {
  background: linear-gradient(135deg, #f59e0b, #d97706) !important;
  color: white !important;

  &:hover {
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.4) !important;
  }
}
</style>
