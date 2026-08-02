<template>
  <q-page class="news-page min-h-screen bg-slate-50/60 q-py-xl">
    <app-loading v-if="store.loading" />
    <div v-else class="container-padding">
      <div class="row q-col-gutter-lg">

        <!-- 1. LEFT SIDEBAR (col-12 col-md-3): Search + Kategori + Arsip dari Database -->
        <div class="col-12 col-md-3">
          <div class="left-sidebar bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm sticky top-24">
            <!-- Search Box (Real-time DB Search) -->
            <div class="search-box relative q-mb-lg">
              <q-icon name="search" size="18px" class="absolute left-3 top-3 text-slate-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari konten berita..."
                class="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-teal-600 focus:bg-white transition"
              />
              <q-icon
                v-if="searchQuery"
                name="close"
                size="14px"
                class="absolute right-3 top-3 text-slate-400 cursor-pointer hover:text-slate-700"
                @click="clearSearch"
              />
            </div>

            <!-- Kategori Filter (Dinamis DB) -->
            <div class="q-mb-lg">
              <div
                class="flex items-center justify-between font-bold text-slate-900 text-xs q-mb-sm cursor-pointer select-none"
                @click="showCategories = !showCategories"
              >
                <span>Kategori</span>
                <q-icon :name="showCategories ? 'expand_less' : 'expand_more'" size="18px" />
              </div>
              <q-slide-transition>
                <div v-show="showCategories" class="space-y-1">
                  <div
                    class="px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-between"
                    :class="selectedCategory === 'all' ? 'bg-teal-50 text-teal-700 font-bold border-l-4 border-teal-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                    @click="onSelectCategory('all')"
                  >
                    <span>Semua</span>
                  </div>
                  <div
                    v-for="cat in store.categories"
                    :key="cat.id"
                    class="px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex items-center justify-between"
                    :class="selectedCategory === (cat.url || cat.nama) ? 'bg-teal-50 text-teal-700 font-bold border-l-4 border-teal-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                    @click="onSelectCategory(cat.url || cat.nama)"
                  >
                    <span>{{ cat.nama }}</span>
                  </div>
                </div>
              </q-slide-transition>
            </div>

            <!-- Arsip Filter (Dinamis DB) -->
            <div>
              <div
                class="flex items-center justify-between font-bold text-slate-900 text-xs q-mb-sm cursor-pointer select-none"
                @click="showArchives = !showArchives"
              >
                <span>Arsip</span>
                <q-icon :name="showArchives ? 'expand_less' : 'expand_more'" size="18px" />
              </div>
              <q-slide-transition>
                <div v-show="showArchives" class="space-y-1">
                  <div
                    class="px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                    :class="selectedArchive === 'Semua' ? 'bg-teal-50 text-teal-700 font-bold border-l-4 border-teal-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                    @click="onSelectArchive('Semua')"
                  >
                    Semua
                  </div>
                  <div
                    v-for="arch in store.archives"
                    :key="arch.value || arch.label"
                    class="px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                    :class="selectedArchive === (arch.value || arch.label) ? 'bg-teal-50 text-teal-700 font-bold border-l-4 border-teal-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                    @click="onSelectArchive(arch.value || arch.label)"
                  >
                    {{ arch.label }}
                  </div>
                </div>
              </q-slide-transition>
            </div>
          </div>
        </div>

        <!-- 2. CENTER MAIN CONTENT (col-12 col-md-6) -->
        <div class="col-12 col-md-6">
          <!-- Halaman Detail Berita (/berita/:slug) -->
          <div v-if="isDetailPage">
            <PageSlug :key="route.params.slug" />

            <!-- Berita Terkait / Berita Lainnya di Bawah Detail Berita -->
            <div class="q-mt-xl">
              <div class="flex items-center gap-2 q-mb-md">
                <span class="w-1.5 h-5 bg-teal-600 rounded-full" />
                <h3 class="text-base font-bold text-slate-900 margin-0">Berita Lainnya</h3>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="(item, idx) in store.beritas.slice(0, 4)"
                  :key="idx"
                  class="article-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                  @click="beritaClick(item)"
                >
                  <div class="h-36 overflow-hidden bg-slate-100 relative">
                    <q-img
                      :src="pathImg + item.thumbnail"
                      fit="cover"
                      class="w-full h-full hover:scale-105 transition-transform duration-500"
                      alt="Article Thumbnail"
                    />
                  </div>
                  <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div class="text-[10px] text-slate-400 font-medium q-mb-xs">
                        {{ dateHuman(item.tanggal) }}
                      </div>
                      <h4 class="text-xs font-bold text-slate-900 hover:text-teal-600 transition-colors line-clamp-2 leading-snug margin-0">
                        {{ item.judul }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Halaman Indeks Berita Utama (/berita/all) -->
          <div v-else class="main-content">
            <!-- Page Heading -->
            <div class="q-mb-lg">
              <h1 class="text-h3 font-extrabold text-slate-900 tracking-tight margin-0">
                Berita
              </h1>
              <p class="text-slate-500 text-body2 q-mt-xs margin-0">
                Informasi dan berita resmi RSUD dr. Mohamad Saleh Probolinggo
              </p>
            </div>

            <!-- Featured Big Main Article Card -->
            <div
              v-if="featuredNews"
              class="featured-card bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-lg transition-all duration-300 q-mb-xl cursor-pointer"
              @click="beritaClick(featuredNews)"
            >
              <div class="row q-col-gutter-md items-center">
                <div class="col-12 col-sm-5">
                  <div class="aspect-video rounded-xl overflow-hidden bg-slate-100 relative">
                    <q-img
                      :src="pathImg + featuredNews.thumbnail"
                      fit="cover"
                      class="w-full h-full hover:scale-105 transition-transform duration-500"
                      alt="Featured News Thumbnail"
                    />
                  </div>
                </div>
                <div class="col-12 col-sm-7">
                  <div class="flex items-center gap-2 text-xs text-slate-400 font-medium q-mb-xs">
                    <span class="bg-teal-50 text-teal-700 font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase truncate max-w-[200px] inline-block">
                      {{ getCategoryName(featuredNews) }}
                    </span>
                    <span>•</span>
                    <span>{{ dateHuman(featuredNews.tanggal) }}</span>
                  </div>
                  <h2 class="text-base font-extrabold text-slate-900 hover:text-teal-600 transition-colors line-clamp-2 leading-snug q-mb-xs margin-0">
                    {{ featuredNews.judul }}
                  </h2>
                  <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed q-mb-sm margin-0">
                    {{ getExcerpt(featuredNews.content) }}
                  </p>
                  <div class="flex items-center gap-2">
                    <q-avatar size="24px" class="bg-teal-600 text-white font-bold text-[10px]">
                      RS
                    </q-avatar>
                    <span class="text-xs font-bold text-slate-700">Admin RSUD</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Berita Lainnya Grid -->
            <div class="q-mb-md">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div
                  v-for="(item, idx) in mainNewsGrid"
                  :key="idx"
                  class="article-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                  @click="beritaClick(item)"
                >
                  <div class="h-40 overflow-hidden bg-slate-100 relative">
                    <q-img
                      :src="pathImg + item.thumbnail"
                      fit="cover"
                      class="w-full h-full hover:scale-105 transition-transform duration-500"
                      alt="Article Thumbnail"
                    />
                    <span class="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase truncate max-w-[80%] z-10 pointer-events-none">
                      {{ getCategoryName(item) }}
                    </span>
                  </div>
                  <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div class="text-[11px] text-slate-400 font-medium q-mb-xs">
                        {{ dateHuman(item.tanggal) }}
                      </div>
                      <h3 class="text-sm font-bold text-slate-900 hover:text-teal-600 transition-colors line-clamp-2 leading-snug q-mb-xs margin-0">
                        {{ item.judul }}
                      </h3>
                      <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed margin-0">
                        {{ getExcerpt(item.content) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="store.beritas.length === 0" class="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <q-icon name="article" size="48px" class="text-slate-300 q-mb-sm" />
              <div class="text-sm font-bold text-slate-700">Belum Ada Artikel Berita</div>
              <p class="text-xs text-slate-400 margin-0">Tidak ada berita yang sesuai dengan kriteria pencarian atau kategori ini.</p>
            </div>

            <!-- Pagination -->
            <div class="pagination-wrapper q-mt-xl flex flex-center">
              <q-pagination
                v-model="current"
                color="teal-8"
                active-color="teal-7"
                :max="maxPagin"
                :max-pages="6"
                :boundary-numbers="false"
                class="shadow-sm bg-white rounded-2xl p-1 border border-slate-200"
              />
            </div>
          </div>
        </div>

        <!-- 3. RIGHT SIDEBAR (col-12 col-md-3): Berita Terpopuler List -->
        <div class="col-12 col-md-3">
          <div class="right-sidebar bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm sticky top-24">
            <h3 class="text-xs font-extrabold text-slate-900 tracking-tight uppercase text-slate-400 q-mb-md margin-0">
              Berita Terpopuler
            </h3>

            <div class="space-y-4">
              <div
                v-for="(pop, i) in store.populars.slice(0, 6)"
                :key="i"
                class="popular-item flex gap-3 items-center group cursor-pointer border-b border-slate-100 q-pb-xs last:border-0"
                @click="beritaClick(pop)"
              >
                <div class="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <q-img
                    :src="pathImg + pop.thumbnail"
                    fit="cover"
                    class="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    alt="Popular Thumbnail"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-xs font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug margin-0">
                    {{ pop.judul }}
                  </h4>
                  <div class="text-[10px] text-slate-400 q-mt-xs">
                    {{ dateHuman(pop.tanggal) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { dateHuman } from 'src/modules/formatter'
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageSlug from './PageSlug.vue'

const route = useRoute()
const router = useRouter()
const store = useBeritaWeb()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedArchive = ref('Semua')
const showCategories = ref(true)
const showArchives = ref(true)

const currentSlug = computed(() => {
  if (route.params.slug && route.params.slug !== 'all') {
    return String(route.params.slug).replace(/^"+|"+$/g, '')
  }
  if (route.query.page && isNaN(route.query.page) && route.query.page !== 'all') {
    return String(route.query.page).replace(/^"+|"+$/g, '')
  }
  return null
})

const isDetailPage = computed(() => !!currentSlug.value)

function fetchDetailNews(slug) {
  if (!slug) return
  const params = { q: slug, slug }
  store.getContent(params)
}

watch(currentSlug, (newSlug) => {
  if (newSlug) {
    fetchDetailNews(newSlug)
  }
}, { immediate: true })

const current = computed({
  get: () => store.params.page,
  set: (nValue) => store.changeParams(nValue)
})

const maxPagin = computed(() => store.meta?.last_page || 0)

const featuredNews = computed(() => {
  const arr = store.beritas || []
  return arr.length > 0 ? arr[0] : null
})

const mainNewsGrid = computed(() => {
  const arr = store.beritas || []
  return arr.length > 1 ? arr.slice(1) : arr
})

// Debounced Real-time Search ke Database Backend
let searchTimeout = null
watch(searchQuery, (val) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    store.params.q = val
    store.params.page = 1
    store.getDataPagin()
  }, 400)
})

function clearSearch() {
  searchQuery.value = ''
  store.params.q = ''
  store.params.page = 1
  store.getDataPagin()
}

function onSelectCategory(cat) {
  selectedCategory.value = cat
  store.params.category = cat
  store.params.page = 1
  store.getDataPagin()
}

function onSelectArchive(arch) {
  selectedArchive.value = arch
  store.params.archive = arch
  store.params.page = 1
  store.getDataPagin()
}

function extractKategoriNames(item) {
  if (!item) return []
  const cat = item.kategori || item.kategoris || item.category || item.categories
  if (!cat) return []
  if (Array.isArray(cat)) {
    return cat.map(c => (typeof c === 'object' ? (c.nama || c.name || '') : String(c))).filter(Boolean)
  }
  if (typeof cat === 'object') {
    return [cat.nama || cat.name || ''].filter(Boolean)
  }
  if (typeof cat === 'string') {
    return [cat]
  }
  return []
}

function getCategoryName(item) {
  const names = extractKategoriNames(item)
  return names.length > 0 ? names[0] : 'BERITA'
}

function getExcerpt(html) {
  if (!html) return ''
  const cleanHtml = String(html)
    .replace(/<\/(p|div|h[1-6]|li|td|tr|section|article)>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
  if (typeof document === 'undefined') {
    return cleanHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  }
  const tmp = document.createElement('DIV')
  tmp.innerHTML = cleanHtml
  const text = tmp.textContent || tmp.innerText || ''
  return text.replace(/\s+/g, ' ').trim()
}

function beritaClick(item) {
  const slug = String(item.slug).replace(/^"+|"+$/g, '') || 'all'
  const params = {
    q: slug,
    slug
  }
  store.getContent(params).then(() => {
    router.push({ name: 'berita-detail', params: { slug } })
  })
}

onMounted(() => {
  store.getCategories()
  store.getArchives()
  store.getPopulars()
  store.getDataPagin()
})
</script>

<style lang="scss" scoped>
.news-page {
  background-color: #f8fafc;
}
</style>
