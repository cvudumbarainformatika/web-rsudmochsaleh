<template>
  <q-page class="q-py-xl bg-slate-50/60 min-h-screen">
    <!-- Loading State -->
    <div v-if="store.loading" class="text-center py-24">
      <q-spinner-dots color="teal-8" size="48px" />
      <div class="text-sm font-bold text-slate-500 q-mt-md">Memuat informasi...</div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!store.activeArticle" class="max-w-2xl mx-auto text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
      <q-icon name="article" size="64px" class="text-slate-300 q-mb-md" />
      <h2 class="text-xl font-extrabold text-slate-800 margin-0 q-mb-xs">Halaman Tidak Ditemukan</h2>
      <p class="text-sm text-slate-500 max-w-md mx-auto margin-0 q-mb-lg">
        Informasi atau artikel yang Anda cari tidak tersedia atau sedang diperbarui oleh administrator.
      </p>
      <q-btn
        color="teal-8"
        label="Kembali ke Beranda"
        no-caps
        rounded
        unelevated
        to="/"
        class="font-bold px-6 py-2"
      />
    </div>

    <!-- Layout 3-Kolom Identik Halaman Berita -->
    <div v-else class="container-padding">
      <div class="row q-col-gutter-lg">
        <!-- 1. LEFT SIDEBAR (col-12 col-md-3): Layanan Terkait -->
        <div class="col-12 col-md-3">
          <div class="left-sidebar bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm sticky top-24">
            <h3 class="text-xs font-extrabold text-slate-900 tracking-tight uppercase text-slate-400 q-mb-md margin-0 flex items-center gap-1.5">
              <q-icon name="widgets" size="16px" class="text-teal-7" />
              <span>Layanan Terkait</span>
            </h3>

            <!-- Daftar Child / Sibling Submenu -->
            <div v-if="relatedLinks && relatedLinks.length > 0" class="space-y-1.5">
              <router-link
                v-for="link in relatedLinks"
                :key="link.id"
                :to="`/menu/${link.slug}`"
                class="px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between group border"
                :class="link.slug === store.activeArticle.slug ? 'bg-teal-50 border-teal-300 text-teal-8 font-black shadow-xs' : 'border-slate-100 text-slate-700 hover:bg-slate-50 hover:text-slate-900'"
              >
                <span class="line-clamp-1">{{ link.nama }}</span>
                <q-icon name="chevron_right" size="16px" class="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </router-link>
            </div>

            <div v-else class="text-xs text-slate-400 py-2 leading-relaxed">
              Informasi & Layanan Resmi RSUD dr. Mohamad Saleh Kota Probolinggo.
            </div>
          </div>
        </div>

        <!-- 2. CENTER MAIN CONTENT (col-12 col-md-9): Konten Artikel Utama Lapang -->
        <div class="col-12 col-md-9">
          <div class="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
            <!-- Article Header -->
            <div class="q-mb-lg">
              <!-- Meta Badge Penamaan Submenu Kategori -->
              <div class="flex items-center gap-2 q-mb-md flex-wrap">
                <span class="bg-teal-50 border border-teal-200 text-teal-8 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                  <q-icon name="folder" size="14px" />
                  <span>{{ parentCategoryName }}</span>
                </span>

                <span class="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                  <q-icon name="local_hospital" size="14px" class="text-slate-500" />
                  <span>RSUD DR. MOHAMAD SALEH</span>
                </span>
              </div>

              <!-- Article Main Title -->
              <h1 class="text-2xl md:text-3xl font-black text-slate-900 leading-snug margin-0 q-mb-xs">
                {{ store.activeArticle.title_detail || store.activeArticle.nama }}
              </h1>

              <!-- Futuristic Underline Line -->
              <div class="w-16 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full q-mt-sm q-mb-md" />

              <!-- Author & Share Section -->
              <div class="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <q-avatar size="28px">
                    <img :src="logo">
                  </q-avatar>
                  <span class="text-xs font-bold text-slate-700">{{ storeApp.header.title || 'RSUD DR. MOHAMAD SALEH' }}</span>
                </div>

                <!-- Share Buttons (ShareNetwork Identik Berita Detail) -->
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bagikan:</span>
                  <div class="flex items-center gap-1.5">
                    <ShareNetwork
                      v-for="sharing in sharings"
                      :key="sharing.network"
                      :network="sharing.network"
                      :url="currentUrl"
                      :title="store.activeArticle.title_detail || store.activeArticle.nama || 'No Title'"
                      :description="`Informasi ${store.activeArticle.nama}`"
                      :quote="`Web - ${storeApp.header.title}`"
                      hashtags="rsud,informasi,layanan"
                      class="share-button"
                      :class="sharing.network"
                    >
                      <q-icon :name="sharing.icon" />
                    </ShareNetwork>
                  </div>
                </div>
              </div>
            </div>

            <!-- Featured Image (Full Width & Clickable for Lightbox Zoom, Persis Halaman Profil) -->
            <div
              v-if="store.activeArticle.thumbnail"
              class="featured-image-wrap q-mb-lg cursor-pointer group relative overflow-hidden"
              @click="openImageModal(pathImg + store.activeArticle.thumbnail)"
            >
              <q-img
                :src="pathImg + store.activeArticle.thumbnail"
                class="featured-image-main rounded-2xl shadow-md"
                :alt="store.activeArticle.nama"
              />
              <div class="absolute-bottom-right q-pa-sm bg-slate-900/80 text-white rounded-tl-xl text-xs font-bold flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <q-icon name="zoom_in" size="16px" />
                <span>Klik untuk Fullscreen</span>
              </div>
            </div>

            <!-- Article Body Content (WYSIWYG HTML) -->
            <div
              class="article-body-content text-slate-800 leading-relaxed q-mb-md"
              @click="handleContentImageClick"
              v-html="store.activeArticle.content || '<p>Belum ada isi konten artikel untuk menu ini.</p>'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Fullscreen Image Lightbox Modal (Persis Halaman Profil) -->
    <q-dialog v-model="imageModal" maximized transition-show="fade" transition-hide="fade">
      <q-card class="bg-black/95 text-white flex flex-col justify-between items-center relative overflow-hidden">
        <q-btn flat round icon="close" color="white" class="absolute-top-right z-50 q-ma-md bg-black/50" v-close-popup />
        <div class="full-width full-height flex items-center justify-center p-4">
          <img :src="selectedImageUrl" class="max-w-full max-h-[94vh] object-contain rounded-xl shadow-2xl" alt="Preview Fullscreen" />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCustomMenuWeb } from 'src/stores/web/customMenu'
import { useBeritaWeb } from 'src/stores/web/berita'
import { useAppStore } from 'src/stores/app'
import { dateHuman } from 'src/modules/formatter'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useCustomMenuWeb()
const storeBerita = useBeritaWeb()
const storeApp = useAppStore()

const imageModal = ref(false)
const selectedImageUrl = ref('')

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

const currentUrl = computed(() => window.location.href)

const sharings = ref([
  { network: 'whatsapp', icon: 'mdi-whatsapp' },
  { network: 'facebook', icon: 'mdi-facebook' },
  { network: 'twitter', icon: 'mdi-twitter' }
])

const logo = computed(() => {
  if (storeApp.logo === null) {
    return new URL('../../../../assets/logos/logo.png', import.meta.url).href
  }
  return pathImg + storeApp.logo
})

// Penamaan Label Banner Meta Badge (Selalu Mengikuti Nama Menu / Submenu Yang Sedang Dibuka)
const parentCategoryName = computed(() => {
  if (!store.activeArticle) return 'MENU RSUD'
  return (store.activeArticle.nama || 'MENU RSUD').toUpperCase()
})

// Daftar Layanan Terkait (Sidebar Kiri)
const relatedLinks = computed(() => {
  if (!store.activeArticle) return []
  if (store.activeArticle.children && store.activeArticle.children.length > 0) {
    return store.activeArticle.children
  }
  if (store.activeArticle.parent && store.activeArticle.parent.children) {
    return store.activeArticle.parent.children
  }
  return []
})

// Judul Sidebar Kanan (misal: Interaksi Lainnya)
const rightSidebarTitle = computed(() => {
  if (!store.activeArticle) return 'Layanan Lainnya'
  const parentName = store.activeArticle.parent ? store.activeArticle.parent.nama : store.activeArticle.nama
  return `${parentName} Lainnya`
})

// Item Kategori Lainnya (Sidebar Kanan)
const otherCategoryItems = computed(() => {
  if (!store.activeArticle) return []
  if (store.activeArticle.parent && store.activeArticle.parent.children) {
    return store.activeArticle.parent.children.filter(x => x.id !== store.activeArticle.id)
  }
  if (store.activeArticle.children && store.activeArticle.children.length > 0) {
    return store.activeArticle.children
  }
  return []
})

async function loadData(slug) {
  if (slug) {
    await store.getArticleBySlug(slug)
  }
}

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadData(Array.isArray(newSlug) ? newSlug[newSlug.length - 1] : newSlug)
  }
}, { immediate: true })

onMounted(() => {
  const slug = Array.isArray(route.params.slug) ? route.params.slug[route.params.slug.length - 1] : route.params.slug
  loadData(slug)
})
</script>

<style lang="scss" scoped>
.margin-0 {
  margin: 0;
}

.share-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &.whatsapp {
    background: #25D366;
    color: white;
  }

  &.facebook {
    background: #1877F2;
    color: white;
  }

  &.twitter {
    background: #1DA1F2;
    color: white;
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

.article-body-content {
  font-size: 1.025rem;
  line-height: 1.85;
  color: #1e293b;
  overflow-wrap: break-word;

  :deep(p) {
    margin-bottom: 1.25rem;
  }
  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    font-weight: 800;
    color: #0f172a;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  :deep(img) {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 1rem;
    margin: 1.25rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  :deep(ul), :deep(ol) {
    padding-left: 1.5rem;
    margin-bottom: 1.25rem;
  }
  :deep(li) {
    margin-bottom: 0.5rem;
  }
}
</style>
