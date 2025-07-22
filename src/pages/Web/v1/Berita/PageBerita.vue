<template>
  <q-page class="news-page">
    <app-loading v-if="store.loading" />
    <div v-else>
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="q-pa-lg">
          <div class="row q-col-gutter-xl">
            <!-- Main Content -->
            <div class="col-md-8 col-lg-8 col-xs-12">
              <div v-if="route.query.page">
                <PageSlug />
                <!-- <FuturisticPageSlug /> -->
              </div>
              <div
                v-else
                class="featured-news"
              >
                <app-cardnews
                  :big-card-news="store.bigCardForPageBerita"
                  class="main-featured-card"
                />
              </div>
            </div>

            <!-- Trending Section -->
            <div class="col-md-4 col-lg-4 col-xs-12">
              <!-- <app-tab-header /> -->
              <!-- <futuristic-news-categories /> -->
              <div class="trending-section">
                <div class="section-title">
                  <div class="title-line" />
                  <h2 class="text-h5 text-weight-bold q-mb-md">
                    Populer
                  </h2>
                  <div class="title-line" />
                </div>
                <div class="trending-list">
                  <!-- <app-list-news
                    :items="store.populars.slice(0, 5)"
                    compact
                  /> -->
                  <app-trending-news-list
                    :items="store.populars.slice(0, 5)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular News Carousel -->
      <section
        v-if="firstArr.length > 2"
        class="popular-section q-py-lg bg-grey-1"
      >
        <div class="container-padding">
          <div class="section-title text-center q-mb-lg">
            <h2 class="text-h5 text-weight-bold">
              Popular Stories
            </h2>
            <div class="subtitle text-grey-7">
              Most read articles this week
            </div>
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
            class="rounded-borders news-carousel"
            height="320px"
          >
            <q-carousel-slide :name="1">
              <div class="row q-col-gutter-md">
                <div
                  v-for="(article, i) in firstArr"
                  :key="i"
                  class="col-4"
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
            >
              <div class="row q-col-gutter-md">
                <div
                  v-for="(article, n) in secondArr"
                  :key="n"
                  class="col-4"
                >
                  <app-smallcard-news
                    :item="article"
                    class="news-card-hover"
                  />
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </section>

      <!-- Latest News Section -->
      <section class="latest-news-section q-py-xl">
        <div class="container-padding">
          <div class="section-title q-mb-lg">
            <div class="title-line" />
            <h2 class="text-h5 text-weight-bold">
              Berita Lainnya
            </h2>
            <div class="title-line" />
          </div>

          <app-list-news
            :items="store.smallCardForPageBerita"
            :loading="store.loadingMore"
            class="news-grid"
          />

          <div class="pagination-wrapper q-mt-xl flex flex-center">
            <q-pagination
              v-model="current"
              color="primary"
              :max="maxPagin"
              :max-pages="6"
              :boundary-numbers="false"
              class="shadow-2 pagination-custom"
            />
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageSlug from './PageSlug.vue'
// import FuturisticPageSlug from './FuturisticPageSlug.vue'
// import FuturisticNewsCategories from 'src/components/~web/FuturisticNewsCategories.vue'

const route = useRoute()
const store = useBeritaWeb()
const slide = ref(1)

const current = computed({
  get: () => store.params.page,
  set: (nValue) => store.changeParams(nValue, p.value.page)
})

const maxPagin = computed(() => store.meta?.last_page || 0)

const p = ref({
  q: route.query.page || '',
  page: route.params.page || 'all'
})

const firstArr = computed(() => store.populars.slice(0, 3))
const secondArr = computed(() => store.populars.slice(3))

onMounted(() => {
  store.getDataPagin(p.value.page)
  store.getPopulars()
  store.getContent(p.value)
})
</script>

<style lang="scss" scoped>
.news-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
}

.hero-section {
  padding-top: 2rem;

  .main-featured-card {
    transition: transform 0.3s ease;
    &:hover {
      transform: translateY(-5px);
    }
  }
}

.section-title {
  position: relative;
  margin-bottom: 2rem;

  .title-line {
    height: 3px;
    width: 50px;
    background: linear-gradient(90deg, var(--q-primary) 0%, transparent 100%);
    margin: 1rem 0;
  }
}

.trending-section {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .trending-list {
    overflow: hidden;

    :deep(.q-item) {
      padding-right: 8px;

      .q-item__section--main {
        min-width: 0; // Important for text truncation
      }

      .text-body1,
      .text-subtitle2,
      .text-caption {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
      }
    }
  }
}

.news-carousel {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.news-card-hover {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.pagination-custom {
  border-radius: 12px;
  overflow: hidden;

  :deep(.q-btn) {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);

    &.q-btn--active {
      background: var(--q-primary);
      color: white;
    }
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }

  .trending-section {
    margin-top: 2rem;
  }
}
</style>
