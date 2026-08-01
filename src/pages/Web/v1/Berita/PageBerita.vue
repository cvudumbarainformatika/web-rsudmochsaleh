<template>
  <q-page class="news-page min-h-screen bg-slate-50 q-pb-xl">
    <app-loading v-if="store.loading" />
    <div v-else class="container-padding q-pt-lg">

      <!-- Detail Berita View (jika slug ada dan bukan 'all') -->
      <div v-if="isDetailPage">
        <PageSlug :key="route.params.slug" />
      </div>

      <!-- Main News List & Search View (jika slug === 'all') -->
      <div v-else>
        <!-- Modern Hero Search Banner -->
        <section class="news-hero-banner bg-gradient-to-r from-teal-800 via-cyan-800 to-slate-900 text-white rounded-3xl p-6 md:p-10 q-mb-xl shadow-lg relative overflow-hidden">
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

          <div class="row items-center q-col-gutter-lg relative z-10">
            <div class="col-12 col-md-7">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 text-xs font-bold uppercase tracking-wider q-mb-sm">
                <q-icon name="newspaper" size="16px" />
                Pusat Informasi &amp; Berita RSUD
              </div>
              <h1 class="text-h3 font-extrabold text-white tracking-tight leading-tight q-mb-xs margin-0">
                Kabar &amp; Edukasi Kesehatan
              </h1>
              <p class="text-slate-300 text-body1 margin-0">
                Dapatkan artikel berita terkini, tips medis, serta pengumuman resmi RSUD dr. Mohamad Saleh Kota Probolinggo.
              </p>
            </div>

            <!-- Interactive Search Box -->
            <div class="col-12 col-md-5">
              <div class="search-box-wrapper bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 flex items-center gap-2 shadow-inner">
                <q-icon name="search" size="24px" class="text-teal-300 q-ml-sm" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari berita atau artikel kesehatan..."
                  class="bg-transparent text-white placeholder-slate-300 border-none outline-none w-full text-sm py-2"
                />
                <button
                  v-if="searchQuery"
                  class="bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 flex items-center justify-center transition border-none cursor-pointer"
                  @click="searchQuery = ''"
                >
                  <q-icon name="close" size="16px" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Hero Section: Featured & Trending -->
        <section class="hero-section q-mb-xl">
          <div class="row q-col-gutter-xl">
            <!-- Main Featured News -->
            <div class="col-md-8 col-lg-8 col-xs-12">
              <div class="featured-news">
                <app-cardnews
                  :big-card-news="store.bigCardForPageBerita"
                  class="main-featured-card"
                />
              </div>
            </div>

            <!-- Trending / Terbaru List -->
            <div class="col-md-4 col-lg-4 col-xs-12">
              <div class="trending-section bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
                <div class="flex items-center gap-2 q-mb-md">
                  <span class="w-1.5 h-6 bg-teal-600 rounded-full" />
                  <h2 class="text-h6 font-extrabold text-slate-900 margin-0">
                    Terbaru
                  </h2>
                </div>
                <div class="trending-list">
                  <app-trending-news-list
                    :items="store.beritas"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Berita Populer Carousel Section (Bahasa Indonesia) -->
        <section
          v-if="firstArr.length > 0"
          class="popular-section q-py-xl q-px-lg bg-white rounded-3xl border border-slate-200/80 shadow-sm q-mb-xl"
        >
          <div class="text-center q-mb-lg">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider q-mb-xs">
              <q-icon name="trending_up" size="16px" />
              Rekomendasi Pembaca
            </div>
            <h2 class="text-h4 font-extrabold text-slate-900 tracking-tight margin-0">
              Berita Populer
            </h2>
            <p class="text-slate-500 text-body2 q-mt-xs margin-0">
              Artikel berita dan pengumuman yang paling banyak dibaca minggu ini.
            </p>
          </div>

          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            infinite
            autoplay
            arrows
            class="rounded-2xl news-carousel bg-transparent"
            height="340px"
          >
            <q-carousel-slide :name="1" class="q-pa-none">
              <div class="row q-col-gutter-md">
                <div
                  v-for="(article, i) in firstArr"
                  :key="i"
                  class="col-12 col-md-4"
                >
                  <app-smallcard-news
                    :item="article"
                    class="news-card-hover"
                  />
                </div>
              </div>
            </q-carousel-slide>

            <q-carousel-slide
              v-if="secondArr.length > 0"
              :name="2"
              class="q-pa-none"
            >
              <div class="row q-col-gutter-md">
                <div
                  v-for="(article, n) in secondArr"
                  :key="n"
                  class="col-12 col-md-4"
                >
                  <app-smallcard-news
                    :item="article"
                    class="news-card-hover"
                  />
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </section>

        <!-- Latest News / Berita Lainnya Section (3-Column Grid) -->
        <section class="latest-news-section q-py-lg">
          <div class="flex items-center justify-between q-mb-lg flex-wrap gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-6 bg-teal-600 rounded-full" />
                <h2 class="text-h4 font-extrabold text-slate-900 tracking-tight margin-0">
                  Berita Lainnya
                </h2>
              </div>
              <p class="text-slate-500 text-xs q-mt-xs margin-0">
                Menampilkan daftar seluruh arsip berita dan edukasi kesehatan.
              </p>
            </div>

            <!-- Active Filter Badge -->
            <div v-if="searchQuery" class="bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
              <span>Hasil pencarian: "{{ searchQuery }}"</span>
              <q-icon name="close" size="14px" class="cursor-pointer" @click="searchQuery = ''" />
            </div>
          </div>

          <!-- Modern 3-Column Grid AppListNews Component -->
          <app-list-news
            :items="filteredSmallCards"
            :loading="store.loadingMore"
          />

          <!-- Pagination -->
          <div class="pagination-wrapper q-mt-xl flex flex-center">
            <q-pagination
              v-model="current"
              color="teal-8"
              active-color="teal-7"
              :max="maxPagin"
              :max-pages="6"
              :boundary-numbers="false"
              class="shadow-sm pagination-custom bg-white rounded-2xl p-1 border border-slate-200"
            />
          </div>
        </section>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageSlug from './PageSlug.vue'

const route = useRoute()
const store = useBeritaWeb()
const slide = ref(1)
const searchQuery = ref('')

const isDetailPage = computed(() => {
  const slug = route.params.slug
  return !!slug && slug !== 'all'
})

const current = computed({
  get: () => store.params.page,
  set: (nValue) => store.changeParams(nValue, p.value.page)
})

const maxPagin = computed(() => store.meta?.last_page || 0)

const p = ref({
  q: route.params.slug || '',
  page: route.params.slug || 'all'
})

const firstArr = computed(() => store.populars.slice(0, 3))
const secondArr = computed(() => store.populars.slice(3))

// Filter pencarian berita
const filteredSmallCards = computed(() => {
  const items = store.smallCardForPageBerita || []
  if (!searchQuery.value || searchQuery.value.trim() === '') {
    return items
  }
  const q = searchQuery.value.toLowerCase()
  return items.filter(item => {
    const title = (item.judul || '').toLowerCase()
    const content = (item.content || '').toLowerCase()
    return title.includes(q) || content.includes(q)
  })
})

onMounted(() => {
  store.getDataPagin(p.value.page)
  store.getPopulars()
  store.getContent(p.value)
})
</script>

<style lang="scss" scoped>
.news-page {
  background-color: #f8fafc;
}

.main-featured-card {
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
}

.news-card-hover {
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.15);
  }
}

.pagination-custom {
  :deep(.q-btn) {
    border-radius: 10px;
    margin: 0 2px;
  }
}
</style>
