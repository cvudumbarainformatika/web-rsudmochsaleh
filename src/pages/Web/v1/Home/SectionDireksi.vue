<template>
  <section class="direksi-section q-py-xl relative-position" ref="sectionRef">
    <!-- Ambient Backdrop Glow -->
    <div class="glow-bg glow-primary" />

    <div class="container-padding relative-position">
      <!-- Section Header with IntersectionObserver Reveal -->
      <div
        class="news-header-row flex items-end justify-between q-mb-lg flex-wrap gap-4 reveal-card"
        :class="{ 'is-visible': headerVisible }"
      >
        <div class="header-left-group">
          <div class="section-pill inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 font-bold text-xs uppercase tracking-wider q-mb-xs">
            <span class="pill-dot" />
            Jajaran Pimpinan RSUD
          </div>
          <h2 class="news-heading text-h4 font-extrabold text-slate-900 tracking-tight leading-tight margin-0">
            Direksi <span class="heading-accent text-teal-600">UOBK RSUD dr. Mohamad Saleh</span>
          </h2>
          <p class="news-subheading text-slate-500 text-body2 q-mt-xs margin-0">
            Profil jajaran direksi dan pimpinan UOBK RSUD dr. Mohamad Saleh Kota Probolinggo.
          </p>
        </div>
      </div>

      <!-- Centered Flex Row with Staggered IntersectionObserver Reveal -->
      <div v-if="direksiList.length > 0" class="direksi-cards-row flex justify-center items-stretch gap-6 flex-wrap">
        <div
          v-for="(item, idx) in direksiList"
          :key="item.id || idx"
          class="direksi-card-item reveal-card"
          :class="{ 'is-visible': visibleCards[idx] }"
          :style="{ '--delay': (idx * 100) + 'ms' }"
        >
          <!-- Card Outer Box (Tinggi 450px & Lebar 288px) -->
          <div class="doctor-card-ss relative-position overflow-hidden shadow-lg full-height">
            
            <!-- 1. Full Portrait Direksi Photo (Cara panggil foto bawaan direksi via pathImg) -->
            <div class="photo-banner-full relative-position">
              <img
                :src="sourceImage(item.image)"
                :alt="item.nama"
                class="doctor-img-full"
                @error="handleImageError"
              />
              <div class="photo-overlay-top" />

              <!-- Badge Jabatan Ringkas (Top Right) -->
              <div class="status-badge-ss text-xs font-bold status-active">
                DIREKSI
              </div>
            </div>

            <!-- 2. Floating White Card Overlay at Bottom (Melayang dengan Margin Inset Kiri-Kanan) -->
            <div class="floating-white-card-overlay text-center relative-position shadow-2xl">
              
              <!-- Circular Icon Badge (Lencana Lingkaran Medis Tepat di Garis Kartu Putih) -->
              <div class="circle-icon-badge flex items-center justify-center shadow-md">
                <q-icon name="badge" size="18px" class="text-white" />
              </div>

              <!-- Jabatan Subtitle -->
              <div class="poli-subtitle font-bold text-xs text-teal-700 uppercase tracking-wider line-clamp-1 q-mt-xs">
                {{ item.jabatan || 'Pimpinan RSUD' }}
              </div>

              <!-- Nama Direksi -->
              <h3 class="doctor-name-ss font-extrabold text-slate-900 line-clamp-2 leading-snug">
                {{ item.nama || 'Dr. Direksi RSUD' }}
              </h3>

              <!-- Footer Bar -->
              <div class="card-footer-strip rounded-xl p-2 bg-slate-50 border border-slate-100 flex items-center justify-between text-xs q-mt-sm">
                <div class="flex items-center gap-1 font-bold text-slate-800">
                  <q-icon name="account_balance" size="13px" class="text-teal-600" />
                  <span>UOBK RSUD dr. Moh. Saleh</span>
                </div>
                <div class="font-semibold text-teal-700">
                  Aktif
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'

const store = useAppStore()
const sectionRef = ref(null)

const headerVisible = ref(false)
const visibleCards = ref([])
let observers = []

const direksiList = computed(() => store.stafs || [])

function setupObservers() {
  if (typeof IntersectionObserver === 'undefined') {
    headerVisible.value = true
    visibleCards.value = direksiList.value.map(() => true)
    return
  }

  observers.forEach(o => o.disconnect())
  observers = []

  const headerEl = sectionRef.value?.querySelector('.news-header-row')
  if (headerEl) {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        headerVisible.value = true
        obs.unobserve(headerEl)
      }
    }, { threshold: 0.15 })
    obs.observe(headerEl)
    observers.push(obs)
  }

  const cardEls = sectionRef.value?.querySelectorAll('.direksi-card-item') || []
  cardEls.forEach((el, i) => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          visibleCards.value[i] = true
        }, i * 100)
        obs.unobserve(el)
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' })
    obs.observe(el)
    observers.push(obs)
  })
}

watch(direksiList, async () => {
  visibleCards.value = []
  await nextTick()
  setupObservers()
})

function sourceImage(val) {
  if (val === null || val === 'null' || val === '' || !val) {
    return getFallbackAvatar()
  }
  return pathImg + val
}

function handleImageError(event) {
  event.target.src = getFallbackAvatar()
}

function getFallbackAvatar() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="340" viewBox="0 0 300 340">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0d9488" />
        <stop offset="100%" stop-color="#06b6d4" />
      </linearGradient>
      <linearGradient id="avatarBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.08" />
      </linearGradient>
    </defs>
    <rect width="300" height="340" fill="url(#bgGrad)"/>
    <circle cx="150" cy="115" r="60" fill="url(#avatarBg)" />
    <text x="50%" y="34%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" letter-spacing="1">RS</text>
    <path d="M 65 330 C 65 200, 235 200, 235 330 Z" fill="url(#avatarBg)" />
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

onMounted(async () => {
  await nextTick()
  setupObservers()
})

onBeforeUnmount(() => {
  observers.forEach(o => o.disconnect())
})
</script>

<style lang="scss" scoped>
.direksi-section {
  position: relative;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  overflow: hidden;
  z-index: 1;
}

// ── IntersectionObserver Scroll Reveal Animations ────────────────
.reveal-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

.glow-bg {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(90px);
}

.glow-primary {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 450px;
  background: rgba(13, 148, 136, 0.08);
}

// ── Header Layout 100% Konsisten ──────────────────────────────────
.news-header-row {
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
  padding-bottom: 1rem;
}

.section-pill {
  border: 1px solid rgba(13, 148, 136, 0.15);
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 8px #0d9488;
}

.heading-accent {
  color: #0d9488;
}

// ── Centered Cards Row & Fixed Width Item ───────────────────────
.direksi-cards-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.direksi-card-item {
  flex: 0 0 270px;
  max-width: 270px;
  width: 270px;
  height: 450px;

  @media (min-width: 768px) {
    flex: 0 0 288px;
    max-width: 288px;
    width: 288px;
  }
}

// ── Doctor Card SS ──────────────────────────────────────────────
.doctor-card-ss {
  height: 100%;
  width: 100%;
  background: #e2e8f0;
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 42px rgba(13, 148, 136, 0.2);

    .doctor-img-full { transform: scale(1.04); }
    .doctor-name-ss { color: #0d9488; }
    .circle-icon-badge { transform: translateX(-50%) scale(1.1); }
  }
}

.photo-banner-full {
  height: 330px;
  width: 100%;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
}

.doctor-img-full {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.4s ease;
}

.photo-overlay-top {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 100%);
}

.status-badge-ss {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 4px 11px;
  border-radius: 14px;
  backdrop-filter: blur(4px);
  z-index: 2;
}

.status-active {
  background: rgba(13, 148, 136, 0.9);
  color: white;
}

.floating-white-card-overlay {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  background: white;
  border-radius: 24px;
  padding: 22px 12px 12px 12px;
  z-index: 3;
  border: 1px solid rgba(15, 23, 42, 0.05);
}

.circle-icon-badge {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
  border: 3.5px solid white;
  z-index: 4;
  transition: transform 0.3s ease;
}

.poli-subtitle {
  font-size: 0.72rem;
  margin-top: 4px;
}

.doctor-name-ss {
  font-size: 0.88rem;
  margin: 4px 0 0;
  transition: color 0.3s ease;
}

.card-footer-strip {
  background: #f8fafc;
}
</style>
