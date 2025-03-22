<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header selalu full width untuk background -->
    <header-web :fixed="store.visible" />

    <!-- Social Media Floating Buttons -->
    <div class="social-float">
      <q-btn
        v-for="(social, index) in socials"
        :key="social.icon"
        round
        :style="{
          transform: `translateY(${store.visible ? '0' : '100'}px)`,
          transition: `all 0.3s ease ${index * 0.1}s`
        }"
        class="social-btn q-mb-sm"
        :color="social.color"
        :icon="social.icon"
        :href="store.header[social.link]"
        target="_blank"
      >
        <q-tooltip>
          {{ social.name }}
        </q-tooltip>
      </q-btn>
    </div>

    <!-- Main content dengan max-width yang lebih besar -->
    <q-page-container
      v-scroll="onScroll"
      class="q-px-none"
    >
      <div
        id="top"
        class="
          mx-auto
          w-full
          px-4
          max-w-[1280px]
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
import { defineAsyncComponent, ref } from 'vue'
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

const HeaderWeb = defineAsyncComponent(() => import('src/components/~web/components/FuturisticHeader.vue'))
const AppFooter = defineAsyncComponent(() => import('src/components/~global/AppFooter.vue'))

const store = useAppStore()

const socials = ref([
  {
    name: 'Facebook',
    icon: 'ti-facebook',
    color: 'blue-7',
    link: 'link_fb'
  },
  {
    name: 'Instagram',
    icon: 'ti-instagram',
    color: 'purple-5',
    link: 'link_instagram'
  },
  {
    name: 'Youtube',
    icon: 'ti-youtube',
    color: 'red-7',
    link: 'link_youtube'
  },
  {
    name: 'TikTok',
    icon: 'ti-tumblr-alt',
    color: 'dark',
    link: 'link_tiktok'
  }
])

const onScroll = (info) => {
  const moveToY = info
  if (moveToY > 175) {
    store.changeVisible(true)
  } else {
    store.changeVisible(false)
  }

  if (moveToY > 200) {
    store.setBtnScrollTop(true)
  } else {
    store.setBtnScrollTop(false)
  }
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

.social-float {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-btn {
  position: relative;
  transition: all 0.3s ease;
}

.social-btn:hover {
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
}

.social-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: inherit;
  filter: blur(5px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: -1;
}

.social-btn:hover::before {
  opacity: 0.7;
  transform: scale(1.3);
}
</style>
