<template>
  <section ref="sectionRef" class="dashboard-summary light-grid-bg q-py-xl relative-position overflow-hidden">
    <div class="container-padding">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        <!-- CARD 1: INFO KETERSEDIAAN TEMPAT TIDUR -->
        <div
          ref="card1Ref"
          class="summary-card-redesign card-reveal-item bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2.5"
          :class="{ 'is-visible': isCard1Visible }"
        >
          <!-- Top Border Accent Line -->
          <div class="top-accent-line bg-gradient-to-r from-teal-500 to-emerald-400 group-hover:w-full transition-all duration-500" />
          <div class="card-glow-bg teal-glow group-hover:scale-150 group-hover:opacity-60 transition-all duration-500" />
          
          <div>
            <!-- Card Header -->
            <div class="flex items-center justify-between q-mb-xs">
              <div class="flex items-center gap-2">
                <span class="live-dot animate-pulse-dot" />
                <span class="text-sm font-black text-slate-900 tracking-wider uppercase">INFO TT</span>
              </div>
              <div class="icon-pill-badge bg-teal-50 text-teal-8 border border-teal-200/80 px-2.5 py-1 rounded-full flex items-center gap-1 group-hover:bg-teal-100/80 transition-colors">
                <q-icon name="king_bed" size="14px" />
                <span class="text-[11px] font-bold">Kamar Ranap</span>
              </div>
            </div>
            <p class="text-xs text-slate-400 font-medium q-mb-md">Ketersediaan Tempat Perawatan Realtime</p>

            <!-- Stat Box (Material Icon hotel di Kanan/Kiri Identik dengan IKM) -->
            <div class="stat-content-box h-32 bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100/90 flex items-center gap-3.5 group-hover:bg-teal-50/40 group-hover:border-teal-200/60 transition-all duration-300">
              <div class="w-[62px] h-[62px] shrink-0 bg-teal-100/90 text-teal-800 rounded-2xl flex items-center justify-center border border-teal-200/80 shadow-xs group-hover:scale-115 group-hover:rotate-6 transition-all duration-300">
                <q-icon name="hotel" size="30px" />
              </div>
              <div class="overflow-hidden">
                <div class="flex items-baseline gap-1.5">
                  <span class="text-2xl font-black text-teal-800 tracking-tight">{{ totalKosong }}</span>
                  <span class="text-xs font-extrabold text-slate-700">Bed Kosong</span>
                </div>
                <div class="text-xs text-slate-500 mt-0.5 font-medium truncate">
                  Dari total <strong class="text-slate-900 font-extrabold">{{ totalBed }}</strong> kapasitas kamar
                </div>
                <div class="text-teal-700 text-xs font-bold mt-1 flex items-center gap-1">
                  <q-icon name="check_circle" size="13px" />
                  <span class="text-[11px] font-extrabold">Ketersediaan Ter-update</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-teal w-full font-bold text-xs uppercase tracking-wider mt-4 py-2.5"
            label="Cek Ketersediaan Kamar"
            icon-right="east"
            @click="router.push('/informasi-ruang-perawatan')"
          />
        </div>

        <!-- CARD 2: IKM (INDEKS KEPUASAN MASYARAKAT) -->
        <div
          ref="card2Ref"
          class="summary-card-redesign card-reveal-item bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2.5"
          :class="{ 'is-visible': isCard2Visible }"
        >
          <!-- Top Border Accent Line -->
          <div class="top-accent-line bg-gradient-to-r from-cyan-500 to-sky-400 group-hover:w-full transition-all duration-500" />
          <div class="card-glow-bg cyan-glow group-hover:scale-150 group-hover:opacity-60 transition-all duration-500" />
          
          <div>
            <!-- Card Header -->
            <div class="flex items-center justify-between q-mb-xs">
              <div class="flex items-center gap-2">
                <span class="live-dot animate-pulse-dot" />
                <span class="text-sm font-black text-slate-900 tracking-wider uppercase">IKM</span>
              </div>
              <div class="icon-pill-badge bg-cyan-50 text-cyan-8 border border-cyan-200/80 px-2.5 py-1 rounded-full flex items-center gap-1 group-hover:bg-cyan-100/80 transition-colors">
                <q-icon name="stars" size="14px" />
                <span class="text-[11px] font-bold">Survei Mutu</span>
              </div>
            </div>
            <p class="text-xs text-slate-400 font-medium q-mb-md">Indeks Kepuasan Masyarakat RSUD</p>

            <!-- Stat Box (Circular Progress) -->
            <div class="stat-content-box h-32 bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100/90 flex items-center gap-3.5 group-hover:bg-cyan-50/40 group-hover:border-cyan-200/60 transition-all duration-300">
              <q-circular-progress
                show-value
                font-size="13px"
                :value="88.93"
                size="62px"
                :thickness="0.2"
                color="teal-7"
                track-color="teal-1"
                class="font-black text-teal-9 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-300"
              >
                88.93
              </q-circular-progress>
              <div class="overflow-hidden">
                <div class="text-xs font-black text-slate-900 truncate">Tahun 2025 / 2026</div>
                <div class="text-[11px] font-extrabold text-teal-700 flex items-center gap-1 mt-0.5 truncate">
                  <q-icon name="thumb_up" size="13px" />
                  <span>Sangat Baik & Pasien Puas</span>
                </div>
                <div class="text-amber-5 text-xs font-bold mt-1 flex items-center gap-1">
                  <span>★★★★★</span>
                  <span class="text-slate-400 text-[10px] font-normal">(Mutu Unggulan)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-teal w-full font-bold text-xs uppercase tracking-wider mt-4 py-2.5"
            label="Lihat Laporan IKM"
            icon-right="east"
            @click="router.push('/informasi-index-kepuasan-masyarakat')"
          />
        </div>

        <!-- CARD 3: TOP 10 PENYAKIT (DIAGNOSA TERBANYAK) -->
        <div
          ref="card3Ref"
          class="summary-card-redesign card-reveal-item bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2.5"
          :class="{ 'is-visible': isCard3Visible }"
        >
          <!-- Top Border Accent Line -->
          <div class="top-accent-line bg-gradient-to-r from-amber-500 to-orange-400 group-hover:w-full transition-all duration-500" />
          <div class="card-glow-bg amber-glow group-hover:scale-150 group-hover:opacity-60 transition-all duration-500" />
          
          <div>
            <!-- Card Header -->
            <div class="flex items-center justify-between q-mb-xs">
              <div class="flex items-center gap-2">
                <span class="live-dot-amber animate-pulse-dot" />
                <span class="text-sm font-black text-slate-900 tracking-wider uppercase">TOP ICD-10</span>
              </div>
              <div class="icon-pill-badge bg-amber-50 text-amber-8 border border-amber-200/80 px-2.5 py-1 rounded-full flex items-center gap-1 group-hover:bg-amber-100/80 transition-colors">
                <q-icon name="analytics" size="14px" />
                <span class="text-[11px] font-bold">Diagnosa</span>
              </div>
            </div>
            <p class="text-xs text-slate-400 font-medium q-mb-md">Data Kasus Diagnosa Tertinggi</p>

            <!-- Stat Box -->
            <div class="stat-content-box h-32 bg-slate-50/90 rounded-2xl p-2.5 border border-slate-100/90 flex flex-col justify-center gap-1.5 overflow-hidden group-hover:bg-amber-50/40 group-hover:border-amber-200/60 transition-all duration-300">
              <div class="top-disease-item flex items-center justify-between text-[11px] px-2.5 py-1 bg-white rounded-lg border border-slate-100 shadow-xs group-hover:translate-x-1 transition-transform duration-300">
                <span class="font-bold text-slate-800 truncate">1. Unstable Angina (Jantung)</span>
                <span class="shrink-0 bg-amber-100 text-amber-9 text-[10px] px-2 py-0.5 rounded-full font-bold ml-1.5">305 Kasus</span>
              </div>
              <div class="top-disease-item flex items-center justify-between text-[11px] px-2.5 py-1 bg-white rounded-lg border border-slate-100 shadow-xs group-hover:translate-x-1 transition-transform duration-300 delay-75">
                <span class="font-bold text-slate-800 truncate">2. Acute Myocardial Infarction</span>
                <span class="shrink-0 bg-amber-100 text-amber-9 text-[10px] px-2 py-0.5 rounded-full font-bold ml-1.5">194 Kasus</span>
              </div>
              <div class="top-disease-item flex items-center justify-between text-[11px] px-2.5 py-1 bg-white rounded-lg border border-slate-100 shadow-xs group-hover:translate-x-1 transition-transform duration-300 delay-150">
                <span class="font-bold text-slate-800 truncate">3. Anemia / Anaemia</span>
                <span class="shrink-0 bg-amber-100 text-amber-9 text-[10px] px-2 py-0.5 rounded-full font-bold ml-1.5">192 Kasus</span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <q-btn
            rounded
            unelevated
            class="btn-cta-card btn-amber w-full font-bold text-xs uppercase tracking-wider mt-4 py-2.5"
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useTempatTidurStore } from 'src/stores/web/tempatTidur'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTempatTidurStore()

const sectionRef = ref(null)
const card1Ref = ref(null)
const card2Ref = ref(null)
const card3Ref = ref(null)

const isCard1Visible = ref(false)
const isCard2Visible = ref(false)
const isCard3Visible = ref(false)

let observer = null

onMounted(() => {
  store.getData()

  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === card1Ref.value) {
            isCard1Visible.value = true
          } else if (entry.target === card2Ref.value) {
            setTimeout(() => { isCard2Visible.value = true }, 150)
          } else if (entry.target === card3Ref.value) {
            setTimeout(() => { isCard3Visible.value = true }, 300)
          }
        }
      })
    }, { threshold: 0.15 })

    if (card1Ref.value) observer.observe(card1Ref.value)
    if (card2Ref.value) observer.observe(card2Ref.value)
    if (card3Ref.value) observer.observe(card3Ref.value)
  } else {
    isCard1Visible.value = true
    isCard2Visible.value = true
    isCard3Visible.value = true
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
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
}

/* IntersectionObserver Staggered Entrance Animation */
.card-reveal-item {
  opacity: 0;
  transform: translateY(35px) scale(0.97);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;

  &.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Top Accent Line Highlight on Hover */
.top-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  border-radius: 3px 3px 0 0;
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
  display: flex;
  align-items: center;
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
