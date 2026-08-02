<template>
  <div class="hero-wrapper light-grid-bg q-py-lg">
    <div class="container-padding">
      <div class="hero-box glass-card-light rounded-3xl p-6 md:p-10 relative-position overflow-hidden">
        <div class="hero-grid-container">
          <!-- Left Column: Dynamic Animated Title, Description & SS Address Info -->
          <div class="z-top flex flex-col justify-center">
            <div class="hero-badge-pill inline-flex items-center gap-2 q-px-md q-py-xs rounded-full q-mb-sm">
              <span class="pulse-dot animate-pulse-dot" />
              <span class="text-caption text-weight-bold text-teal-8 uppercase tracking-wider">
                UOBK RSUD DR. MOHAMAD SALEH
              </span>
            </div>

            <!-- Paten Judul & Deskripsi Utama (Statis & Bebas Loncat) -->
            <div class="hero-text-content q-mb-md">
              <h1 class="hero-main-title hero-main-title-gradient leading-tight q-mb-sm">
                RSUD DR. MOHAMAD SALEH KOTA PROBOLINGGO
              </h1>

              <p class="hero-description text-slate-600 text-body1 line-height-relaxed">
                Kesembuhan Pasien Pengabdianku, Kepuasan Pasien Kebahagiaanku...
              </p>
            </div>

            <!-- Address Info (SS Footer Style) -->
            <div class="hero-address-box flex items-center gap-2 text-slate-600 text-caption text-weight-medium q-mb-md">
              <q-icon name="place" color="teal-7" size="18px" />
              <span>Jl. Mayjen Panjaitan No.65 Kota Probolinggo</span>
            </div>

            <!-- CTA Buttons & Social Media Circular Icons (From SS) -->
            <div class="flex items-center flex-wrap gap-3 q-mt-xs">
              <q-btn
                rounded
                unelevated
                class="btn-cta-primary text-weight-bold q-px-lg q-py-sm"
                label="Lihat Layanan Kami"
                icon-right="east"
                @click="router.push('/pelayanan')"
              />

              <a href="tel:0335433119" class="btn-cta-emergency rounded-full inline-flex items-center gap-2 q-px-md q-py-xs">
                <q-icon name="phone_in_talk" color="teal" size="18px" />
                <span class="text-caption text-weight-bold text-teal-9">(0335) 433119</span>
              </a>

              <!-- Social Media Circle Buttons (AppFooter Style) -->
              <div class="flex items-center q-gutter-xs">
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-facebook"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="storeApp.header?.link_fb || '#'"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-instagram"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="storeApp.header?.link_instagram || '#'"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-youtube"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="storeApp.header?.link_youtube || '#'"
                  target="_blank"
                />
                <q-btn
                  dense
                  flat
                  round
                  icon="ti-tumblr-alt"
                  size="md"
                  class="social-btn text-teal-8"
                  :href="storeApp.header?.link_tiktok || '#'"
                  target="_blank"
                />
              </div>
            </div>
          </div>

          <!-- Right Column: Custom Vue 3 Ultra-Megah Image Canvas -->
          <div class="hero-col-right">
            <div
              class="custom-hero-frame rounded-3xl overflow-hidden shadow-2xl"
              @mouseenter="stopAutoplay"
              @mouseleave="startAutoplay"
            >
              <!-- Image Slides Stack with Zoom-Scale Animation -->
              <div
                v-for="(img, i) in slides"
                :key="i"
                class="custom-slide-item transition-all duration-700 ease-in-out"
                :class="{
                  'opacity-100 scale-100 z-10 pointer-events-auto': slide === i,
                  'opacity-0 scale-105 z-0 pointer-events-none': slide !== i
                }"
              >
                <img
                  :src="getImage(img.image)"
                  alt="Gambar Pelayanan RSUD"
                  class="custom-slide-img"
                  referrerpolicy="no-referrer"
                />
                <!-- Subtle Gradient Overlay -->
                <div class="custom-gradient-overlay" />
              </div>

              <!-- Floating Glass Controls & Counter -->
              <div class="custom-carousel-controls absolute bottom-4 right-4 z-20 flex items-center gap-3 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-lg">
                <span class="text-caption text-weight-bolder text-slate-800 tracking-wider">
                  0{{ slide + 1 }} / 0{{ slides.length }}
                </span>
                <div class="flex items-center gap-1">
                  <q-btn
                    flat
                    round
                    dense
                    size="sm"
                    icon="chevron_left"
                    color="dark"
                    class="nav-glass-btn"
                    @click="prevSlide"
                  />
                  <q-btn
                    flat
                    round
                    dense
                    size="sm"
                    icon="chevron_right"
                    color="dark"
                    class="nav-glass-btn"
                    @click="nextSlide"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCarouselApp } from 'src/stores/app/carousel'
import { useAppStore } from 'src/stores/app'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useCarouselApp()
const storeApp = useAppStore()
const slide = ref(0)
let timer = null

defineProps({
  height: {
    type: Number,
    default: 400
  }
})

onMounted(() => {
  store.getData()
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(() => {
    nextSlide()
  }, 5000)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const slides = computed(() => {
  if (store.slides && store.slides.length > 0) {
    return store.slides
  }
  return [
    {
      title: 'RSUD DR. MOHAMAD SALEH KOTA PROBOLINGGO',
      desc: 'Kesembuhan Pasien Pengabdianku, Kepuasan Pasien Kebahagiaanku...',
      image: null
    }
  ]
})

const currentSlideTitle = computed(() => {
  if (slides.value && slides.value.length > 0 && slides.value[slide.value]) {
    const item = slides.value[slide.value]
    const t = item.title || item.judul
    if (t && t !== 'null' && t.trim() !== '') return t
  }
  return 'RSUD DR. MOHAMAD SALEH KOTA PROBOLINGGO'
})

const currentSlideDesc = computed(() => {
  if (slides.value && slides.value.length > 0 && slides.value[slide.value]) {
    const desc = slides.value[slide.value].desc || slides.value[slide.value].sub_judul
    const formatted = formatText(desc)
    if (formatted && formatted.trim() !== '') return formatted
  }
  return 'Kesembuhan Pasien Pengabdianku, Kepuasan Pasien Kebahagiaanku...'
})

function formatText(val) {
  if (val === null || val === 'null' || val === undefined) {
    return ''
  }
  return val
}

function getImage(img) {
  if (store.carousels.length > 0) {
    return pathImg + img
  }
  return new URL('../../assets/carousel/' + img, import.meta.url).href
}

function prevSlide() {
  if (slide.value > 0) {
    slide.value--
  } else {
    slide.value = slides.value.length - 1
  }
}

function nextSlide() {
  if (slide.value < slides.value.length - 1) {
    slide.value++
  } else {
    slide.value = 0
  }
}
</script>

<style lang="scss" scoped>
.hero-wrapper {
  position: relative;
  overflow: hidden;
}

.hero-box {
  border-radius: 32px !important;
  min-height: 480px;
  display: flex;
  align-items: center;
}

.hero-badge-pill {
  background: #ccfbf1;
  border: 1px solid #99f6e4;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #0d9488;
  border-radius: 50%;
  box-shadow: 0 0 10px #0d9488;
}

.hero-main-title {
  font-size: 2.6rem;
  line-height: 1.25;

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
}

.hero-main-title-gradient {
  background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.hero-text-fade-enter-active,
.hero-text-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.hero-text-fade-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.hero-text-fade-leave-to {
  opacity: 0;
  transform: translateY(-14px);
}

.hero-description {
  max-width: 540px;
}

.btn-cta-primary {
  background: linear-gradient(135deg, #00b4db, #0083b0) !important;
  color: white !important;
  box-shadow: 0 8px 20px rgba(0, 180, 219, 0.3);
  transition: all 0.35s ease;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 12px 30px rgba(0, 180, 219, 0.5) !important;
  }
}

.btn-cta-emergency {
  background: #f0fdf4;
  border: 1.5px solid #a7f3d0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #dcfce7;
    transform: translateY(-2px);
  }
}

.social-circle-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid #15803d;
  color: #15803d;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #15803d;
    color: white;
    transform: translateY(-2px);
  }
}

.hero-grid-container {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 2.5rem !important;
  align-items: center !important;
  width: 100% !important;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
}

.hero-col-right {
  width: 100% !important;
  min-width: 100% !important;
}

.custom-hero-frame {
  height: 420px !important;
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  display: block !important;
  border-radius: 28px !important;
  position: relative !important;
  overflow: hidden !important;
  background: #f8fafc;
  border: 1px solid #e2e8f0;

  @media (max-width: 1023px) {
    height: 300px !important;
  }
}

.custom-slide-item {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: block !important;
}

.custom-slide-img {
  width: 100% !important;
  height: 100% !important;
  min-width: 100% !important;
  min-height: 100% !important;
  object-fit: cover !important;
  object-position: center center !important;
  display: block !important;
}

.custom-gradient-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.4), transparent) !important;
  pointer-events: none !important;
}

.nav-glass-btn {
  background: rgba(255, 255, 255, 0.9) !important;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    background: #0284c7 !important;
    color: white !important;
  }
}
</style>
