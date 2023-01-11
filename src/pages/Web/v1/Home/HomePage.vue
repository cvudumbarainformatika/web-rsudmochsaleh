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
    <!-- section -->
    <section-four class="q-pb-lg" />
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
        :offset="[18, 18]"
      >
        <q-btn
          fab
          icon="keyboard_arrow_up"
          color="secondary"
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
// import SectionOne from 'src/components/~web/SectionOne.vue'
import SectionTwo from 'src/components/~web/SectionTwo.vue'
import SectionThree from 'src/components/~web//SectionThree.vue'
import SectionFour from './SectionFour.vue'

import { useAppStore } from 'src/stores/app'
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

const store = useAppStore()
const onScroll = (info) => {
  const moveToY = info
  if (moveToY > 100) {
    store.changeVisible(true)
  } else {
    store.changeVisible(false)
  }

  if (moveToY > 300) {
    store.setBtnScrollTop(true)
  } else {
    store.setBtnScrollTop(false)
  }
}

function scrollToElement() {
  const el = document.getElementById('top')
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = 500
  setVerticalScrollPosition(target, offset, duration)
}
</script>
