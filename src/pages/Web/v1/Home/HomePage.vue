<template>
  <q-page v-scroll="onScroll">
    <div
      id="top"
      class="fixed-top"
    />
    <!-- <q-scroll-area
      class="absolute-top fit"

    > -->
    <!-- header -->
    <!-- <header-web /> -->
    <!-- carousel -->
    <carousel-web />
    <!-- <div style="width: 100%">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d835.2113550381034!2d113.21003672914748!3d-7.745245670780843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7ad951d2eefe7%3A0x84d2e3e5a3dce896!2sRSUD%20dr.%20Mohamad%20Saleh!5e1!3m2!1sid!2sid!4v1673713586077!5m2!1sid!2sid"
        width="100%"
        height="300"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div> -->
    <!-- <slide-beranda
      :prim="prim"
      :second="second"
    /> -->
    <!-- section -->
    <!-- <section-four class="q-pb-lg" /> -->
    <section-berita class="q-pb-lg" />
    <section-pelayanan class="q-pb-lg" />
    <!-- <section-one /> -->
    <section-two class="q-pb-lg" />
    <section-three class="q-pb-lg" />
    <!-- <app-footer /> -->
    <!-- </q-scroll-area> -->

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-page-sticky
        v-if="store.btnScrollTop"
        position="bottom-right"
        :offset="[30, 30]"
        style="z-index: 100;"
      >
        <q-btn
          fab
          icon="keyboard_arrow_up"
          color="primary"
          glossy
          @click="scrollToElement()"
        />
      </q-page-sticky>
    </transition>
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

import { useAppStore } from 'src/stores/app'
import { scroll } from 'quasar'
// import { computed } from 'vue'
const { getScrollTarget, setVerticalScrollPosition } = scroll

const store = useAppStore()
const onScroll = (info) => {
  const moveToY = info
  if (moveToY > 75) {
    store.changeVisible(true)
  } else {
    store.changeVisible(false)
  }

  if (moveToY > 200) {
    store.setBtnScrollTop(true)
  } else {
    store.setBtnScrollTop(false)
  }

  // console.log(info)
}

function scrollToElement() {
  const el = document.getElementById('top')
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = 500
  setVerticalScrollPosition(target, offset, duration)
}

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
