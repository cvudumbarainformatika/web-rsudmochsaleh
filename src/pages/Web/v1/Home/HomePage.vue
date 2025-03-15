<template>
  <q-page>
    <div
      id="top"
      class="fixed-top"
    />
    <carousel-web />
    <section-berita class="q-pb-lg" />
    <section-pelayanan class="q-pb-lg" />
    <!-- <section-one /> -->
    <section-two class="q-pb-lg" />
    <section-three class="q-pb-lg" />
    <!-- <app-footer /> -->
    <!-- </q-scroll-area> -->
  </q-page>
</template>

<script setup>
// import { scroll } from 'quasar'
// const { getScrollTarget, setVerticalScrollPosition } = scroll
// import HeaderWeb from './HeaderWeb.vue'
import CarouselWeb from 'src/components/~web/CarouselWeb.vue'
// import SlideBeranda from 'src/components/~web/SlideBeranda.vue'
// import SectionOne from 'src/components/~web/SectionOne.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web/SectionThree.vue'
// import SectionFour from './SectionFour.vue'
import SectionBerita from './SectionBerita.vue'
import SectionPelayanan from './SectionPelayanan.vue'

// import { useAppStore } from 'src/stores/app'
// import { scroll } from 'quasar'
// import { computed } from 'vue'
// const { getScrollTarget, setVerticalScrollPosition } = scroll

// const store = useAppStore()
// const onScroll = (info) => {
//   const moveToY = info
//   if (moveToY > 75) {
//     store.changeVisible(true)
//   } else {
//     store.changeVisible(false)
//   }

//   if (moveToY > 200) {
//     store.setBtnScrollTop(true)
//   } else {
//     store.setBtnScrollTop(false)
//   }

//   // console.log(info)
// }

// function scrollToElement() {
//   const el = document.getElementById('top')
//   const target = getScrollTarget(el)
//   const offset = el.offsetTop
//   const duration = 500
//   setVerticalScrollPosition(target, offset, duration)
// }

// const prim = computed(() => {
//   let pri = '#F2E3C6'
//   if (store.themes.length > 0) {
//     pri = store.themes[0].value
//   }
//   return pri
// })
// const second = computed(() => {
//   let sec = '#A7A1A5'
//   if (store.themes.length > 0) {
//     sec = store.themes[1].value
//   }
//   return sec
// })
</script>
