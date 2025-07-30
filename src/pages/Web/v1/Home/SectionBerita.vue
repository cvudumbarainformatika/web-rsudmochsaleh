<template>
  <div class="news-section q-pt-xl q-pb-xl">
    <div class="text-center q-py-xl">
      <div class="section-title">
        <div class="title-line" />
        <div class="text-h4 text-bold">
          <span class="text-dark">Portal Berita</span>
          <span class="text-primary"> &amp; Informasi Terbaru</span>
        </div>
        <div class="title-line" />
      </div>
    </div>

    <!-- Loading State -->
    <template v-if="store.loading">
      <div class="row q-col-gutter-lg">
        <div
          v-for="n in 3"
          :key="n"
          class="col"
        >
          <q-card
            class="news-card-skeleton"
            :style="`min-height:${height}px;`"
          >
            <q-skeleton
              height="250px"
              square
              class="news-image-skeleton"
            />
            <q-card-section>
              <q-skeleton
                type="text"
                class="text-subtitle1"
              />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle1"
              />
              <q-skeleton
                type="text"
                class="text-caption"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>

    <!-- News Slider -->
    <Splide
      :key="store.beranda"
      :options="options"
      aria-label="Latest News"
      :has-track="false"
    >
      <SplideTrack>
        <SplideSlide
          v-for="(item, index) in store.beranda"
          :key="index"
        >
          <q-card
            :style="`height:${height-30}px`"
            class="news-card"
            @click="beritaClick(item)"
          >
            <div class="news-image-wrapper">
              <q-img
                :src="pathImg + item.thumbnail"
                :alt="`news-${index}`"
                :ratio="1"
                class="news-image"
              >
                <template #loading>
                  <div class="text-center full-width full-height">
                    <q-spinner-dots
                      color="primary"
                      size="40"
                    />
                  </div>
                </template>
              </q-img>
              <div class="news-overlay">
                <div class="news-date">
                  <q-icon
                    name="event"
                    size="sm"
                    class="q-mr-xs"
                  />
                  {{ dateHuman(item.tanggal) }}
                </div>
              </div>
            </div>

            <q-card-section class="news-content">
              <div class="news-title text-weight-bold text-truncate-2-lines">
                {{ item.judul }}
              </div>
              <q-separator
                class="q-my-sm"
                color="primary"
              />
              <div class="news-excerpt">
                <q-item-label
                  class="text-truncate-2-lines"
                >
                  {{ stripAndTruncateHTML(item.content, 150) }}
                </q-item-label>
              </div>
            </q-card-section>

            <q-card-actions
              align="right"
              class="news-actions"
            >
              <q-btn
                flat
                round
                color="primary"
                icon="arrow_forward"
                class="read-more-btn"
              />
            </q-card-actions>
          </q-card>
        </SplideSlide>
      </SplideTrack>

      <!-- Custom Navigation Arrows -->
      <div class="splide__arrows custom-arrows">
        <button class="splide__arrow splide__arrow--prev">
          <q-icon
            name="chevron_left"
            size="md"
          />
        </button>
        <button class="splide__arrow splide__arrow--next">
          <q-icon
            name="chevron_right"
            size="md"
          />
        </button>
      </div>
    </Splide>

    <!-- View More Button -->
    <div class="view-more-wrapper q-pa-lg q-mt-xl">
      <app-btn
        v-if="store?.beranda?.length"
        rounded
        label="Lihat Semua Berita"
        class="view-more-btn"
        @click="router.push('/berita/all')"
      >
        <template #append>
          <q-icon
            name="arrow_forward"
            class="q-ml-sm"
          />
        </template>
      </app-btn>
      <q-skeleton
        v-else
        type="QChip"
        animation="fade"
      />
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/core'
import '@splidejs/vue-splide/css'
import { useBeritaWeb } from 'src/stores/web/berita'
import { defineComponent, ref } from 'vue'
import { pathImg } from 'src/boot/axios'
import { dateHuman } from 'src/modules/formatter'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Splide,
    SplideSlide,
    SplideTrack
  },

  setup() {
    const height = ref(520)
    const width = ref(360)
    const options = ref({
      type: 'loop',
      autoplay: true,
      rewind: true,
      interval: 2000,
      perPage: 3,
      start: 3,
      perMove: 1,
      focus: 'center',
      gap: '1rem',
      height: height.value + 'px',
      fixedWidth: width.value + 'px'
    })

    const store = useBeritaWeb()
    const router = useRouter()
    const route = useRoute()

    // onMounted(() => {
    Promise.all([
      store.getData('all')
    ])
    // console.log('onMounted ...', store.beranda)
    // })

    function beritaClick(val) {
      // console.log(val)
      // const page = route.params.page || 'all'
      // const params = {
      //   q: val.slug,
      //   page
      // }
      // store.getContent(params).then(() => {
      //   router.replace({ name: 'berita', params: { page: params.page }, query: { page: params.q } })
      // })

      const slug = String(val.slug).replace(/^"+|"+$/g, '') || 'all'
      const params = {
        q: slug,
        slug
      }
      // console.log('params', params)
      store.getContent(params).then(() => {
        router.replace({ name: 'berita-detail', params: { slug } })
      })
    }

    const stripAndTruncateHTML = (html, maxLength) => {
      // Remove HTML tags
      const div = document.createElement('div')
      div.innerHTML = html
      let text = div.textContent || div.innerText || ''

      // Truncate text
      if (text.length > maxLength) {
        text = text.substring(0, maxLength) + '...'
      }

      return text
    }

    return { options, store, pathImg, height, width, dateHuman, router, route, beritaClick, stripAndTruncateHTML }
  }
})
</script>

<style lang="scss">
@use "sass:color";

.news-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
    pointer-events: none;
  }
}

.section-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  .title-line {
    height: 2px;
    width: 50px;
    background: var(--q-primary);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--q-primary);
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
    }

    &:first-child::before {
      right: -4px;
    }

    &:last-child::before {
      left: -4px;
    }
  }

  .title-h2 {
    margin: 0;
    padding: 0 1rem;
    background: linear-gradient(120deg, var(--q-primary) 0%, color.scale(#06b8b8, $lightness: -10%) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.news-card {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);

    .news-image {
      transform: scale(1.05);
    }

    .read-more-btn {
      transform: translateX(0);
      opacity: 1;
    }
  }
}

.news-image-wrapper {
  position: relative;
  overflow: hidden;

  .news-image {
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .news-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);

    .news-date {
      color: white;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
    }
  }
}

.news-content {
  padding: 1.5rem;

  .news-title {
    font-size: 1rem;
    line-height: 1;
    margin-bottom: 0.5rem;
    color: var(--q-primary);
  }

  .news-excerpt {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.6;
  }
}

.news-actions {
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  .read-more-btn {
    transform: translateX(20px);
    opacity: 0;
    transition: all 0.3s ease;
  }
}

.custom-arrows {
  .splide__arrow {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(var(--q-primary), 0.2);
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;

    &:hover {
      background: var(--q-primary);
      color: white;
    }
  }
}

.view-more-wrapper {
  text-align: center;

  .view-more-btn {
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent 0%, transparent 50%, rgba(255,255,255,0.1) 50%);
      transform: translateX(-100%);
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    &:hover::before {
      transform: translateX(0);
    }
  }
}

.text-truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
