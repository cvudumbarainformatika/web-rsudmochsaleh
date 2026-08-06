<template>
  <div class="submenu-detail-page">
    <app-loading v-if="store.loading" />

    <template v-else-if="store.item">
      <div class="panel-header q-mb-md">
        <app-text-judul :judul="store.item.nama" />
      </div>

      <div class="content-box">
        <!-- Featured Image (Full Width & Clickable for Lightbox Zoom, Persis Halaman Profil) -->
        <div
          v-if="store.item.thumbnail"
          class="featured-image-wrap q-mb-lg cursor-pointer group relative overflow-hidden"
          @click="openImageModal(pathImg + store.item.thumbnail)"
        >
          <q-img
            :src="pathImg + store.item.thumbnail"
            class="featured-image-main rounded-2xl shadow-md"
            alt="Foto Pengaduan RSUD dr. Mohamad Saleh"
          />
          <div class="absolute-bottom-right q-pa-sm bg-slate-900/80 text-white rounded-tl-xl text-xs font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
            <q-icon name="zoom_in" size="16px" />
            <span>Klik untuk Fullscreen</span>
          </div>
        </div>

        <!-- Deskripsi Content Utama (Persis Halaman Profil menggunakan app-editor) -->
        <div class="content-description-card q-mb-xl" @click="handleContentImageClick">
          <app-editor
            v-model="store.item.content"
            :edited="false"
          />
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
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pathImg } from 'src/boot/axios'
import { useSubmenuWeb } from 'src/stores/web/submenu'

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
  router.push('/pengaduan/submenu/' + val.slug)
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
}

.panel-header {
  border-bottom: 2px solid rgba(13, 148, 136, 0.1);
  padding-bottom: 12px;
}

.content-box {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 4px 30px rgba(15, 23, 42, 0.04);
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2.25rem;
  }
}

.featured-image-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
  background: #f8fafc;
  width: 100%;
}

.featured-image-main {
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
  display: block;
}

.content-description-card {
  color: #334155;
  line-height: 1.75;

  :deep(img) {
    max-width: 100% !important;
    height: auto;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
    }
  }
}
</style>
