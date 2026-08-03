<template>
  <q-page class="q-py-md">
    <div v-if="store.loading" class="text-center py-20">
      <q-spinner-dots color="teal-8" size="48px" />
      <div class="text-sm font-bold text-slate-500 q-mt-md">Memuat artikel menu...</div>
    </div>

    <div v-else-if="!store.activeArticle" class="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
      <q-icon name="article" size="64px" class="text-slate-300 q-mb-md" />
      <h2 class="text-xl font-extrabold text-slate-800 margin-0 q-mb-xs">Halaman Tidak Ditemukan</h2>
      <p class="text-sm text-slate-500 max-w-md mx-auto margin-0 q-mb-lg">
        Artikel atau menu yang Anda cari tidak tersedia atau sedang diperbarui oleh administrator.
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

    <div v-else class="row q-col-gutter-lg">
      <!-- Main Content (col-12 col-md-9) -->
      <div class="col-12 col-md-9">
        <div class="bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm">
          <!-- Header Artikel -->
          <div class="q-mb-md">
            <div class="flex items-center gap-2 text-xs font-bold text-teal-7 uppercase tracking-wider q-mb-xs">
              <span>{{ store.activeArticle.parent?.nama || 'Menu RSUD' }}</span>
              <span v-if="store.activeArticle.parent">•</span>
              <span>RSUD DR. MOHAMAD SALEH</span>
            </div>
            <h1 class="text-2xl md:text-3xl font-black text-slate-900 leading-snug margin-0 q-mb-md">
              {{ store.activeArticle.title_detail || store.activeArticle.nama }}
            </h1>
          </div>

          <!-- Thumbnail Image -->
          <div v-if="store.activeArticle.thumbnail" class="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 q-mb-lg border border-slate-200/60 shadow-xs">
            <img
              :src="pathImg + store.activeArticle.thumbnail"
              :alt="store.activeArticle.nama"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Body Content WYSIWYG -->
          <div
            ref="contentRef"
            class="article-body-content text-slate-800 leading-relaxed text-body1 q-mt-md"
            v-html="store.activeArticle.content || '<p>Belum ada isi konten artikel untuk menu ini.</p>'"
          />
        </div>
      </div>

      <!-- Right Sidebar Navigation (col-12 col-md-3) -->
      <div class="col-12 col-md-3">
        <div class="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm sticky top-24">
          <h3 class="text-xs font-extrabold text-slate-400 uppercase tracking-wider q-mb-md margin-0">
            Navigasi Menu
          </h3>

          <div v-if="store.activeArticle.children && store.activeArticle.children.length > 0" class="flex flex-col gap-1.5">
            <router-link
              v-for="child in store.activeArticle.children"
              :key="child.id"
              :to="`/menu/${child.slug}`"
              class="p-2.5 rounded-xl border border-slate-200/60 hover:bg-teal-50 hover:border-teal-300 text-xs font-bold text-slate-800 hover:text-teal-8 transition-all flex items-center justify-between"
            >
              <span>{{ child.nama }}</span>
              <q-icon name="chevron_right" size="16px" class="text-slate-400" />
            </router-link>
          </div>

          <div v-else-if="store.activeArticle.parent?.children" class="flex flex-col gap-1.5">
            <router-link
              v-for="sibling in store.activeArticle.parent.children"
              :key="sibling.id"
              :to="`/menu/${sibling.slug}`"
              class="p-2.5 rounded-xl border border-slate-200/60 hover:bg-teal-50 hover:border-teal-300 text-xs font-bold transition-all flex items-center justify-between"
              :class="sibling.slug === store.activeArticle.slug ? 'bg-teal-50 border-teal-400 text-teal-8 font-black' : 'text-slate-800'"
            >
              <span>{{ sibling.nama }}</span>
              <q-icon name="chevron_right" size="16px" class="text-slate-400" />
            </router-link>
          </div>

          <div v-else class="text-xs text-slate-400">
            Menu resmi RSUD dr. Mohamad Saleh Probolinggo.
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCustomMenuWeb } from 'src/stores/web/customMenu'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useCustomMenuWeb()

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
  line-height: 1.85;
  color: #1e293b;
  overflow-wrap: break-word;

  :deep(p) {
    margin-bottom: 1.25rem;
  }
  :deep(img) {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 1rem;
    margin: 1rem 0;
  }
}
</style>
