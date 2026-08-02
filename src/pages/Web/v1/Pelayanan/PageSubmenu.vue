<template>
  <div class="submenu-detail-page">
    <app-loading v-if="store.loading" />

    <template v-else-if="store.item">
      <!-- Hero Section Banner -->
      <div class="submenu-hero">
        <div class="hero-backdrop" :style="store.item.thumbnail ? `background-image: url(${pathImg + store.item.thumbnail})` : ''" />
        <div class="hero-overlay" />
        
        <div class="hero-content-wrap">
          <div class="category-tag">
            <q-icon name="medical_services" size="14px" class="q-mr-xs" />
            Detail Layanan Subspesialis
          </div>
          <h1 class="hero-title">{{ store.item.nama }}</h1>
          <div class="hero-divider" />
        </div>
      </div>

      <!-- Main Layout Grid -->
      <div class="content-container py-8">
        <div class="row q-col-gutter-xl">
          
          <!-- Column 1: Main Content Body -->
          <div class="col-12 col-md-8 col-lg-8">
            <div class="main-content-card">
              <!-- Featured Image Box (Framed, Full-Width & Clickable for Lightbox Zoom) -->
              <div
                v-if="store.item.thumbnail"
                class="featured-image-box cursor-pointer group relative overflow-hidden"
                @click="openImageModal(pathImg + store.item.thumbnail)"
              >
                <q-img
                  :src="pathImg + store.item.thumbnail"
                  class="featured-image"
                  alt="Foto Pelayanan RSUD dr. Mohamad Saleh"
                >
                  <template #loading>
                    <div class="full-width full-height flex flex-center bg-slate-100">
                      <q-spinner-dots color="teal" size="36px" />
                    </div>
                  </template>
                </q-img>
                <div class="absolute-bottom-right q-pa-sm bg-slate-900/80 text-white rounded-tl-xl text-xs font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <q-icon name="zoom_in" size="16px" />
                  <span>Klik untuk Fullscreen</span>
                </div>
              </div>

              <!-- Content Rich Text Body -->
              <div class="content-body" @click="handleContentImageClick">
                <app-editor
                  v-model="store.item.content"
                  :edited="false"
                />
              </div>
            </div>
          </div>

          <!-- Column 2: Sidebar (Layanan Terkait) -->
          <div class="col-12 col-md-4 col-lg-4">
            <aside class="sidebar-wrapper" v-if="submenu && submenu.length > 0">
              <div class="sidebar-title-bar">
                <span class="bar-dot" />
                Layanan Terkait
              </div>

              <!-- List of Related Submenu Items -->
              <div class="related-list">
                <div
                  v-for="(sub, index) in submenu"
                  :key="index"
                  class="related-item-card"
                  @click="goTo(sub)"
                >
                  <div class="related-card-glow" />
                  <div class="card-inner flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="related-icon-wrap">
                        <q-icon name="arrow_forward" size="16px" class="icon-teal" />
                      </div>
                      <div>
                        <div class="related-title text-weight-bold">{{ sub.nama || sub.name }}</div>
                        <div class="related-slug">@{{ sub.slug }}</div>
                      </div>
                    </div>
                    <q-icon name="arrow_outward" size="16px" class="arrow-out text-slate-300" />
                  </div>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </template>

    <!-- Fullscreen Image Lightbox Modal -->
    <q-dialog v-model="imageModal" maximized transition-show="fade" transition-hide="fade">
      <q-card class="bg-black/95 text-white flex flex-col justify-between items-center relative overflow-hidden">
        <q-btn flat round icon="close" color="white" class="absolute-top-right z-50 q-ma-md bg-black/50" v-close-popup />
        <div class="full-width full-height flex items-center justify-center p-4">
          <img :src="selectedImageUrl" class="max-w-full max-h-[94vh] object-contain rounded-xl shadow-2xl" alt="Preview Fullscreen" />
        </div>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { useSubmenuWeb } from 'src/stores/web/submenu'
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pathImg } from 'src/boot/axios'

const store = useSubmenuWeb()
const route = useRoute()
const router = useRouter()

const imageModal = ref(false)
const selectedImageUrl = ref('')

const submenu = computed(() => {
  return store.getSubmenu
})

onMounted(() => {
  store.getData(route.params.page)
})

function goTo(val) {
  router.push('/pelayanan/submenu/' + val.slug)
}

function openImageModal(url) {
  if (url) {
    selectedImageUrl.value = url
    imageModal.value = true
  }
}

function handleContentImageClick(e) {
  if (e.target && e.target.tagName === 'IMG') {
    openImageModal(e.target.src)
  }
}
</script>

<style lang="scss" scoped>
.submenu-detail-page {
  min-height: 100vh;
  padding-bottom: 3rem;
}

// ── Hero Section ─────────────────────────────────────────────────
.submenu-hero {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  margin-top: 1.5rem;
  margin-bottom: 2.5rem;
  padding: 5rem 2rem;
  box-shadow: 0 10px 30px -10px rgba(13, 148, 136, 0.15);
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(14px) brightness(0.6);
  transform: scale(1.1);
  transition: transform 0.5s ease;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(13, 148, 136, 0.75) 100%);
}

.hero-content-wrap {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5eead4;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-title {
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hero-divider {
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, #2dd4bf, #06b6d4);
  border-radius: 4px;
  margin: 0 auto;
}

// ── Content Card ─────────────────────────────────────────────────
.main-content-card {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 4px 30px rgba(15, 23, 42, 0.04);
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2.25rem;
  }
}

.featured-image-box {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  margin-bottom: 2rem;
  background: #f8fafc;
  width: 100%;
}

.featured-image {
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
  display: block;
}

.content-body {
  color: #334155;

  :deep(img) {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    border-radius: 16px;
    display: block;
    margin: 1.75rem 0;
    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
    object-fit: contain !important;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.01);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
    }
  }

  :deep(p) {
    line-height: 1.75;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  :deep(h2) {
    color: #0f172a;
    font-size: 1.4rem;
    font-weight: 800;
    margin: 2.25rem 0 1rem;
    position: relative;
    padding-left: 12px;
    line-height: 1.3;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      width: 4px;
      background: linear-gradient(to bottom, #0d9488, #06b6d4);
      border-radius: 4px;
    }
  }

  :deep(h3) {
    color: #1e293b;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 1.75rem 0 0.75rem;
  }

  :deep(iframe) {
    width: 100% !important;
    height: 450px !important;
    border-radius: 16px;
    border: 1px solid rgba(15, 23, 42, 0.1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    margin: 1.5rem 0;
  }
}

// ── Sidebar ──────────────────────────────────────────────────────
.sidebar-wrapper {
  position: sticky;
  top: 6rem;
}

.sidebar-title-bar {
  font-size: 0.88rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.25rem;
  border-bottom: 2px solid rgba(13, 148, 136, 0.1);
  padding-bottom: 8px;
}

.bar-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 6px #0d9488;
  display: inline-block;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.related-item-card {
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
    border-color: rgba(13, 148, 136, 0.3);

    .related-card-glow { opacity: 0.04; }
    .related-icon-wrap { background: #0d9488; .icon-teal { color: white; } }
    .arrow-out { color: #0d9488; transform: translate(2px, -2px); }
  }
}

.related-card-glow {
  position: absolute;
  inset: 0;
  background: #0d9488;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.card-inner {
  padding: 0.9rem 1.1rem;
  position: relative;
  z-index: 1;
}

.related-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(13, 148, 136, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon-teal {
  color: #0d9488;
  transition: color 0.3s ease;
}

.related-title {
  font-size: 0.88rem;
  color: #1e293b;
  line-height: 1.3;
}

.related-slug {
  font-size: 0.72rem;
  color: #94a3b8;
  margin-top: 0.15rem;
}

.arrow-out {
  transition: all 0.3s ease;
}
</style>
