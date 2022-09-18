<template>
  <q-page>
    <app-loading v-if="store.loading" />
    <div
      v-else
      class="row q-col-gutter-lg q-mb-xl"
    >
      <div class="col-md-8 col-lg-8 col-xs-12">
        <PageSlug
          v-if="route.query.page"
        />
        <app-cardnews
          v-else
          :big-card-news="store.bigCardNews"
        />
      </div>
      <div class="col-md-4 col-lg-4 col-xs-12">
        <div class="f-14 text-weight-bold">
          Berita Terbaru
        </div>
        <q-separator class="q-my-md" />
        <app-list-news :items="store.smallCardNews" />
        <q-separator class="q-my-md" />
        <div class="f-14 text-weight-bold">
          Terpopuler
        </div>
        <q-separator class="q-my-md" />
      </div>

      <!-- {{ store.smallCardNews }} -->

      <!-- {{ route.params }} -->
      <!-- Berita Terpopuler -->
      <!-- <q-separator class="q-mt-md" />
        <div>
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
                <app-smallcard-news class="col-4" />
                <app-smallcard-news class="col-4" />
                <app-smallcard-news class="col-4" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div> -->
    </div>
  </q-page>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import PageSlug from './PageSlug.vue'

const route = useRoute()
// import { computed } from 'vue'
const store = useBeritaWeb()

const p = ref({
  q: route.query.page || '',
  page: route.params.page || 'all'
})

// console.log(p)

onMounted(() => {
  // const params = Object.keys(route.params).length === 0 ? 'all' : route.params.page

  if (route.query.page) {
    store.getContent(p.value)
  }
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
