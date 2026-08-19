<template>
  <section ref="sectionRef" class="rsud-live-widget q-py-lg relative-position overflow-hidden">
    <div class="container-padding">
      <div 
        ref="cardRef"
        class="live-widget-card card-reveal-item bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-500 relative overflow-hidden group"
        :class="{ 'is-visible': isVisible }"
      >
        <!-- Top Border Accent Line & Light Glow Background -->
        <div class="top-accent-line bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-400 group-hover:w-full transition-all duration-500" />
        <div class="absolute -right-16 -top-16 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
        <div class="absolute -left-16 -bottom-16 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header Widget -->
        <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="live-dot-teal animate-pulse-dot" />
              <span class="text-xs font-black text-teal-800 tracking-wider uppercase">RSUD MOHAMAD SALEH</span>
              <span class="bg-teal-50 text-teal-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-teal-200/80">REALTIME STATUS</span>
            </div>
            <h2 class="text-xl md:text-2xl font-black text-slate-900 tracking-tight margin-0 flex items-center gap-2">
              <span>RSUD LIVE DASHBOARD</span>
              <span class="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block animate-pulse"></span>
            </h2>
            <p class="text-xs text-slate-500 font-medium margin-0">Pantau ketersediaan bed, antrean poli, IGD, dan ruang operasi secara transparan</p>
          </div>

          <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div class="text-left md:text-right">
              <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pembaruan Terakhir</div>
              <div class="text-xs text-teal-800 font-mono font-bold">{{ lastUpdated }}</div>
            </div>
            <q-btn
              rounded
              unelevated
              class="btn-cta-card btn-teal font-bold text-xs uppercase tracking-wider px-5 py-2.5"
              label="Selengkapnya"
              icon-right="east"
              @click="router.push('/rsud-one-gate')"
            />
          </div>
        </div>

        <!-- 4 Metrics Grid (Sama Persis dengan Card Cobatt.vue) -->
        <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Metric 1: IGD -->
          <div class="metric-box bg-slate-50/90 rounded-2xl p-4 border border-slate-100/90 hover:bg-teal-50/40 hover:border-teal-200/80 transition-all duration-300 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">IGD (Gawat Darurat)</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">Normal</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black text-slate-900 font-mono">12</span>
              <span class="text-[11px] text-slate-500 font-bold">Pasien Aktif</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div class="bg-teal-600 h-full rounded-full w-[40%]"></div>
            </div>
            <div class="text-[10px] text-slate-500 flex justify-between">
              <span>Status Pelayanan</span>
              <span class="font-bold text-teal-800">Alur Cepat 🟢</span>
            </div>
          </div>

          <!-- Metric 2: POLIKLINIK -->
          <div class="metric-box bg-slate-50/90 rounded-2xl p-4 border border-slate-100/90 hover:bg-amber-50/40 hover:border-amber-200/80 transition-all duration-300 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">POLIKLINIK</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-200">Ramai</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black text-slate-900 font-mono">127</span>
              <span class="text-[11px] text-slate-500 font-bold">Total Antrean</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div class="bg-amber-500 h-full rounded-full w-[65%]"></div>
            </div>
            <div class="text-[10px] text-slate-500 flex justify-between">
              <span>Poli Buka</span>
              <span class="font-bold text-amber-800">18 Spesialis 🟡</span>
            </div>
          </div>

          <!-- Metric 3: RAWAT INAP -->
          <div class="metric-box bg-slate-50/90 rounded-2xl p-4 border border-slate-100/90 hover:bg-teal-50/40 hover:border-teal-200/80 transition-all duration-300 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">RAWAT INAP</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">23 Bed Kosong</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black text-slate-900 font-mono">23</span>
              <span class="text-[11px] text-slate-500 font-bold">Bed Tersedia</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div class="bg-teal-600 h-full rounded-full w-[25%]"></div>
            </div>
            <div class="text-[10px] text-slate-500 flex justify-between">
              <span>Total Tempat Tidur</span>
              <span class="font-bold text-teal-800">240 Bed 🟢</span>
            </div>
          </div>

          <!-- Metric 4: OPERASI (OK) -->
          <div class="metric-box bg-slate-50/90 rounded-2xl p-4 border border-slate-100/90 hover:bg-cyan-50/40 hover:border-cyan-200/80 transition-all duration-300 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">OPERASI (OK)</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-100 text-cyan-800 border border-cyan-200">Lancar</span>
            </div>
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-black text-slate-900 font-mono">8</span>
              <span class="text-[11px] text-slate-500 font-bold">Jadwal Operasi</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div class="bg-cyan-600 h-full rounded-full w-[60%]"></div>
            </div>
            <div class="text-[10px] text-slate-500 flex justify-between">
              <span>Terlaksana</span>
              <span class="font-bold text-cyan-800">5 / 8 OK 🟢</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sectionRef = ref(null)
const cardRef = ref(null)
const isVisible = ref(false)
const lastUpdated = ref(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))

let observer = null

onMounted(() => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    }, { threshold: 0.15 })

    if (cardRef.value) observer.observe(cardRef.value)
  } else {
    isVisible.value = true
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped lang="scss">
.rsud-live-widget {
  position: relative;
}

.top-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  border-radius: 3px 3px 0 0;
}

.card-reveal-item {
  opacity: 0;
  transform: translateY(35px) scale(0.97);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) !important;

  &.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.live-dot-teal {
  width: 9px;
  height: 9px;
  background-color: #0d9488;
  border-radius: 50%;
  box-shadow: 0 0 10px #0d9488;
  display: inline-block;
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
</style>
