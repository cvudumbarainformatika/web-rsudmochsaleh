<template>
  <div class="container-padding bg-grey-3 q-pt-lg">
    <div class="text-center q-py-lg">
      <div class="text-h4 text-primary text-weight-bold">
        <span class="text-dark">Portal Berita  </span>
        <span class="text-primary">& Informasi Terbaru</span>
      </div>
    </div>
    <q-separator class="q-mb-lg" />
    <template v-if="store.loading">
      <div class="row q-col-gutter-lg">
        <div
          v-for="n in 3"
          :key="n"
          class="col"
        >
          <q-card
            :style="`min-height:${height}px;`"
          >
            <q-skeleton
              height="250px"
              square
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
    <Splide
      :key="store.beranda"
      :options="options"
      aria-label="My Favorite Images"
      :has-track="false"
    >
      <!-- <div class="splide__arrows">
        <button class="splide__arrow splide__arrow--prev">
          Prev
        </button>
        <button class="splide__arrow splide__arrow--next">
          Next
        </button>
      </div> -->
      <SplideTrack>
        <SplideSlide
          v-for="(item, index) in store.beranda"
          :key="index"
        >
          <q-card
            :style="`height:${height-30}px`"
            class="cursor-pointer shadow-1"
            @click="beritaClick(item)"
          >
            <q-img
              :src="pathImg + item.thumbnail"
              :alt="`slide--${index}`"
              :ratio="1"
            />
            <q-card-section>
              <div class="f-14 text-weight-bold">
                {{ item.judul }}
              </div>
              <div class="flex items-center text-grey q-my-sm f-8">
                <div class="flex items-center q-mr-sm flex-end">
                  <q-icon
                    name="edit_calendar"
                    class="q-pr-xs"
                  /> <div>{{ dateHuman(item.tanggal) }}</div>
                </div>
              </div>
              <div>
                <q-item-label
                  lines="2"
                >
                  <div v-html="item.content" />
                </q-item-label>
              </div>
            </q-card-section>
          </q-card>
        </SplideSlide>
      </SplideTrack>
    </Splide>
    <div class="flex-1 items-center flex-center text-center q-pa-lg q-mt-lg">
      <app-btn
        v-if="store.beranda.length"
        rounded
        label="Selengkapnya"
        @click="router.push('/berita/all')"
      />
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
    store.getData('all')
    console.log('onMounted ...', store.beranda)
    // })

    function beritaClick(val) {
      console.log(val)
      const page = route.params.page || 'all'
      const params = {
        q: val.slug,
        page
      }
      store.getContent(params).then(() => {
        router.replace({ name: 'berita', params: { page: params.page }, query: { page: params.q } })
      })
    }

    return { options, store, pathImg, height, width, dateHuman, router, route, beritaClick }
  }
})
</script>
