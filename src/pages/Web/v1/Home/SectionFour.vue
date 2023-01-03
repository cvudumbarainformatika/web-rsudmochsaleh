<template>
  <div class="container-padding bg-grey-3 q-pt-lg">
    <div
      v-if="items.length ===0"
      class="column flex-center q-py-lg"
    >
      Belum Ada Berita
    </div>
    <div
      v-else
      class="q-py-lg"
    >
      <div class="text-center q-pb-lg">
        <div class="text-h4 text-primary text-weight-bold">
          <span class="text-dark">Portal Berita  </span>
          <span class="text-primary">& Informasi Terbaru</span>
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-lg">
        <!-- BIG NEWS -->
        <div class="col-md-7 col-xs-12">
          <app-cardnews :big-card-news="storeBerita.bigCardNews" />
          <!-- Berita Terpopuler
          <q-separator class="q-mt-md" /> -->
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
        </div>
        <!-- CHILD NEWS -->
        <div class="col-md-5 col-xs-12">
          <app-list-news :items="storeBerita.smallCardNews" />
        </div>
      </div>
    </div>
    <div class="">ddddddd</div>
  </div>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, onMounted, ref } from 'vue'

const storeBerita = useBeritaWeb()
const items = computed(() => {
  return storeBerita.beranda
})
const slide = ref(1)

const firstArr = computed(() => {
  const arr = storeBerita.populars.filter((item, index) => {
    return index < 3 // will return the array from the second value
  })
  return arr
})
const secondArr = computed(() => {
  const arr = storeBerita.populars.filter((item, index) => {
    return index >= 3 // will return the array from the second value
  })
  return arr
})

console.log(secondArr)

onMounted(() => {
  storeBerita.getData('all')
  storeBerita.getPopulars()
})
</script>
