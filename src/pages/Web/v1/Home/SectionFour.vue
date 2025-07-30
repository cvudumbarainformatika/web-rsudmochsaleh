<template>
  <div class="container-padding bg-grey-3 q-pt-lg">
    <div
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
          <div v-if="items.length === 0">
            <q-card
              flat
            >
              <q-skeleton
                height="300px"
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
              <q-card-section>
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="(n,i) in n=3"
                    :key="i"
                    class="col"
                  >
                    <q-skeleton
                      class="flex-1 q-pa-sm"
                      height="120px"
                      square
                    />
                    <q-skeleton
                      type="text"
                      class="text-subtitle1"
                    />
                    <q-skeleton
                      type="text"
                      class="text-subtitle1"
                      width="70%"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <app-cardnews
            v-else
            :big-card-news="storeBerita.bigCardNews"
          />
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
          />
        </div>
        <!-- CHILD NEWS -->
        <div class="col-md-5 col-xs-12">
          <app-list-news
            v-if="items.length"
            :items="storeBerita.smallCardNews"
          />
          <div v-else>
            <div
              v-for="(y,z) in y=7"
              :key="z"
            >
              <div class="row q-col-gutter-sm">
                <div class="row flex-1">
                  <q-skeleton
                    size="80px"
                    square
                    animation="fade"
                    class="q-mb-sm q-mr-sm"
                  />
                  <div
                    class="flex-1"
                  >
                    <q-skeleton
                      type="text"
                      square
                      width="30%"
                      animation="fade"
                    />
                    <q-skeleton
                      type="text"
                      square
                      height="12px"
                      animation="fade"
                    />
                    <q-skeleton
                      type="text"
                      square
                      height="12px"
                      width="75%"
                      animation="fade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1 items-center flex-center text-center q-pa-lg q-mt-lg">
        <app-btn
          v-if="items.length"
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
  </div>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  // storeBerita.getData('all')
  // storeBerita.getPopulars()
  Promise.all([storeBerita.getData('all'), storeBerita.getPopulars()]).then(() => {
    
  })
})
</script>
