<template>
  <div class="bg-primary">
    <q-carousel
      v-if="!store.loading"
      v-model="slide"
      animated
      arrows
      infinite
      :autoplay="true"
      :style="`height:${height}px;`"
      swipeable
      navigation
      transition-duration="2000"
    >
      <!-- transition-prev="slide-right"
    transition-next="slide-left" -->
      <q-carousel-slide
        v-for="(img, i) in slides"
        :key="i"
        :name="i"
      >
        <!-- :img-src="getImage(img.image)" -->
        <q-img
          v-if="img.image"
          :src="getImage(img.image)"
          :style="`width: 100%; height: ${height-20}px;`"
          fit="cover"
        />
        <app-lottie-web
          v-else
          :url="img.animation"
          :height="height - 20"
        />
        <div
          v-show="img.title!=='null'"
          class="absolute-bottom custom-caption"
        >
          <div class="text-h3 deskt-only">
            {{ img.title==="null" || img.title===""?'':img.title }}
          </div>
          <div class="f-14 text-weight-bold mobile-only">
            {{ img.title==="null" || img.title===""?'':img.title }}
          </div>
          <div class="text-subtitle1 deskt-only">
            {{ img.desc==="null" || img.desc===""?'':img.desc }}
          </div>
          <div class="f-12 mobile-only">
            {{ img.desc==="null" || img.desc===""?'':img.desc }}
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-skeleton
      v-else
      :height="`${height}px`"
    />
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCarouselApp } from 'src/stores/app/carousel'
import { computed, ref } from 'vue'

defineProps({
  height: {
    type: Number,
    default: 500
  }
})

const store = useCarouselApp()
store.getData()

const slides = computed(() => store.slides)

const slide = ref(0)

function getImage(img) {
  if (store.carousels.length > 0) {
    return pathImg + img
  }
  return new URL('../../assets/carousel/' + img, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.custom-caption{
  text-align: right;
  padding: 40px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}

</style>
