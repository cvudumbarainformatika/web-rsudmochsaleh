<template>
  <q-page>
    <app-loading-new v-if="store.loading" />
    <div
      v-else
      class="row q-col-gutter-lg q-mb-xl"
    >
      <div class="col-md-8 col-lg-8 col-xs-12">
        <div v-if="route.query.page">
          <PageSlug />
        </div>
        <div v-else>
          <app-cardnews
            :big-card-news="store.bigCardForPageBerita"
          />
        </div>
        <div v-if="firstArr.length > 2">
          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            infinite
            autoplay
            arrows
            class="rounded-borders"
            height="250px"
          >
            <q-carousel-slide
              :name="1"
              class="column no-wrap"
            >
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                <div
                  v-for="(bb, i) in firstArr"
                  :key="i"
                  class="col-4"
                >
                  <app-smallcard-news
                    :item="bb"
                  />
                </div>
              </div>
            </q-carousel-slide>
            <q-carousel-slide
              v-if="secondArr.length > 0"
              :name="2"
              class="column no-wrap"
            >
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter-xs no-wrap">
                <div
                  v-for="(cc, n) in secondArr"
                  :key="n"
                  class="col-4"
                >
                  <app-smallcard-news
                    :item="cc"
                  />
                </div>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
        <div
          v-else
          class="column flex-center"
          style="height:100px"
        >
          Belum Ada Berita terpopuler
        </div>

        <div>
          sadfa
        </div>
      </div>
      <div class="col-md-4 col-lg-4 col-xs-12">
        <div class="f-14 text-weight-bold">
          Berita Terbaru
        </div>
        <q-separator class="q-my-md" />
        <app-list-news :items="store.smallCardForPageBerita" />
        <q-separator class="q-my-md" />
        <div class="flex row items-center">
          <q-pagination
            v-model="current"
            color="black"
            :max="maxPagin"
            :max-pages="6"
            :boundary-numbers="false"
          />
        </div>
        <!-- <q-separator class="q-my-md" />
        <div class="f-14 text-weight-bold">
          Terpopuler
        </div>
        <q-separator class="q-my-md" /> -->
      </div>

      <!-- {{ store.smallCardNews }} -->
    </div>
  </q-page>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import PageSlug from './PageSlug.vue'

const route = useRoute()
// import { computed } from 'vue'
const store = useBeritaWeb()

const current = computed({
  get() {
    return store.params.page
  },
  set(nValue) {
    store.changeParams('page', nValue)
  }
})

const maxPagin = computed(() => {
  const m = store.meta
  return m === null ? 0 : m.last_page
})

const p = ref({
  q: route.query.page || '',
  page: route.params.page || 'all'
})

const slide = ref(1)
const firstArr = computed(() => {
  const arr = store.populars.filter((item, index) => {
    return index < 3 // will return the array from the second value
  })
  return arr
})
const secondArr = computed(() => {
  const arr = store.populars.filter((item, index) => {
    return index >= 3 // will return the array from the second value
  })
  return arr
})

onMounted(() => {
  // const params = Object.keys(route.params).length === 0 ? 'all' : route.params.page
  store.getDataPagin(p.value.page)
  store.getPopulars()
  store.getContent(p.value)
  console.log('mounted', p.value)

  // if (route.query.page) {
  //   store.getContent(p.value)
  // }
})
</script>

<style lang="scss" scoped>
.padding-page {
  padding-top:60px;
}

.border__tab {
  border:1px solid $grey-4;
}
</style>
