<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header selalu full width untuk background -->
    <header-web :fixed="store.visible" />

    <!-- Main content dengan max-width yang lebih besar -->
    <q-page-container v-scroll="onScroll">
      <div
        id="top"
        class="
          mx-auto
          w-full
          px-4
          sm:max-w-[640px]
          md:max-w-[768px]
          lg:max-w-[1024px]
          xl:max-w-[1280px]
          2xl:max-w-[1536px]
        "
      >
        <router-view />
      </div>
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
    </q-page-container>

    <!-- Footer juga full width untuk background -->
    <app-footer />
  </q-layout>
</template>

<script setup>
import { useAppStore } from 'src/stores/app'
import { defineAsyncComponent } from 'vue'
import { scroll } from 'quasar'
// import { computed } from 'vue'
const { getScrollTarget, setVerticalScrollPosition } = scroll

const HeaderWeb = defineAsyncComponent(() => import('src/components/~web/components/FuturisticHeader.vue'))
const AppFooter = defineAsyncComponent(() => import('src/components/~global/AppFooter.vue'))

const store = useAppStore()

const onScroll = (info) => {
  // console.log('onScroll layout', info)

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

const scrollToElement = () => {
  const el = document.getElementById('top')
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = 500
  setVerticalScrollPosition(target, offset, duration)
}

</script>

<style>
.q-layout {
  min-height: 100vh;
  width: 100%;
}
</style>
