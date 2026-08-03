<template>
  <q-page class="q-py-lg">
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

    <!-- Main Futuristic Article Card (Identik dengan UI Berita Detail) -->
    <div v-else class="max-w-4xl mx-auto">
      <div class="bg-white rounded-3xl p-6 md:p-12 border border-slate-200/80 shadow-md">
        <!-- Article Header (Meta Info & Title) -->
        <div class="q-mb-lg">
          <!-- Meta Badge -->
          <div class="flex items-center gap-3 q-mb-md flex-wrap">
            <span class="bg-teal-50 border border-teal-200 text-teal-8 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
              <q-icon name="local_hospital" size="14px" />
              <span>RSUD DR. MOHAMAD SALEH</span>
            </span>

            <span v-if="store.activeArticle.parent" class="bg-slate-100 text-slate-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
              <q-icon name="folder" size="14px" class="text-slate-500" />
              <span>{{ store.activeArticle.parent.nama }}</span>
            </span>
          </div>

          <!-- Article Main Title -->
          <h1 class="text-2xl md:text-4xl font-black text-slate-900 leading-snug margin-0 q-mb-xs">
            {{ store.activeArticle.title_detail || store.activeArticle.nama }}
          </h1>

          <!-- Futuristic Underline Line -->
          <div class="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full q-mt-sm q-mb-md" />

          <!-- Share & Author Section -->
          <div class="flex items-center justify-between pt-2 border-t border-slate-100 flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <q-avatar size="32px">
                <img :src="logo">
              </q-avatar>
              <span class="text-xs font-bold text-slate-700">{{ storeApp.header.title || 'RSUD DR. MOHAMAD SALEH' }}</span>
            </div>

            <!-- Share Buttons -->
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bagikan:</span>
              <a
                :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(store.activeArticle.nama + ' - ' + currentUrl)}`"
                target="_blank"
                class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Bagikan ke WhatsApp"
              >
                <q-icon name="fa-brands fa-whatsapp" size="16px" />
              </a>
              <a
                :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Bagikan ke Facebook"
              >
                <q-icon name="fa-brands fa-facebook-f" size="14px" />
              </a>
            </div>
          </div>
        </div>

        <!-- Featured Image Banner (Jika Ada) -->
        <div v-if="store.activeArticle.thumbnail" class="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 q-mb-xl border border-slate-200/60 shadow-sm">
          <img
            :src="pathImg + store.activeArticle.thumbnail"
            :alt="store.activeArticle.nama"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Article Body Content (WYSIWYG HTML) -->
        <div
          class="article-body-content text-slate-800 leading-relaxed q-mb-xl"
          v-html="store.activeArticle.content || '<p>Belum ada isi konten artikel untuk menu ini.</p>'"
        />

        <!-- Submenu Terkait (Jika Memiliki Submenu Anak) -->
        <div v-if="store.activeArticle.children && store.activeArticle.children.length > 0" class="pt-8 border-t border-slate-100">
          <h3 class="text-base font-black text-slate-900 margin-0 q-mb-md flex items-center gap-2">
            <q-icon name="grid_view" size="20px" class="text-teal-6" />
            <span>Submenu & Layanan Terkait</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <router-link
              v-for="child in store.activeArticle.children"
              :key="child.id"
              :to="`/menu/${child.slug}`"
              class="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <q-icon name="article" size="24px" class="text-teal-7 group-hover:scale-110 transition-transform q-mb-sm" />
                <h4 class="text-sm font-bold text-slate-800 group-hover:text-teal-8 margin-0 leading-snug">
                  {{ child.nama }}
                </h4>
              </div>
              <div class="flex items-center justify-between text-xs font-bold text-teal-7 mt-3 pt-2 border-t border-slate-100">
                <span>Buka Halaman</span>
                <q-icon name="arrow_forward" size="14px" class="group-hover:translate-x-1 transition-transform" />
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCustomMenuWeb } from 'src/stores/web/customMenu'
import { useAppStore } from 'src/stores/app'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useCustomMenuWeb()
const storeApp = useAppStore()
const currentUrl = computed(() => window.location.href)

const logo = computed(() => {
  if (storeApp.logo === null) {
    return new URL('../../../../assets/logos/logo.png', import.meta.url).href
  }
  return pathImg + storeApp.logo
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

.article-body-content {
  font-size: 1.05rem;
  line-height: 1.9;
  color: #1e293b;
  overflow-wrap: break-word;

  :deep(p) {
    margin-bottom: 1.35rem;
  }
  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    font-weight: 800;
    color: #0f172a;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
  }
  :deep(img) {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 1.25rem;
    margin: 1.5rem 0;
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
