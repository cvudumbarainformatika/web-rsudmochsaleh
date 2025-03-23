<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header selalu full width untuk background -->
    <header-web :fixed="store.visible" />

    <!-- DateTime Block -->
    <div class="datetime-block">
      <div class="datetime-container">
        <div class="time">
          {{ currentTime }}
          <span class="seconds">{{ seconds }}</span>
        </div>
        <div class="date">
          {{ currentDate }}
        </div>
      </div>
    </div>

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
import { defineAsyncComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { scroll, date } from 'quasar'
import { useSeo } from 'src/composables/useSeo'
const { getScrollTarget, setVerticalScrollPosition } = scroll

useSeo()

const HeaderWeb = defineAsyncComponent(() => import('src/components/~web/components/FuturisticHeader.vue'))
const AppFooter = defineAsyncComponent(() => import('src/components/~global/AppFooter.vue'))

const store = useAppStore()

// Add datetime related code
const currentTime = ref('')
const seconds = ref('')
const currentDate = ref('')
let timeInterval

function updateDateTime() {
  const now = new Date()
  currentTime.value = date.formatDate(now, 'HH:mm')
  seconds.value = date.formatDate(now, 'ss')
  // Mengubah format tanggal ke Bahasa Indonesia
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  const namaHari = hari[now.getDay()]
  const tanggal = now.getDate()
  const namaBulan = bulan[now.getMonth()]
  const tahun = now.getFullYear()

  currentDate.value = `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`
}

onMounted(() => {
  updateDateTime()
  timeInterval = setInterval(updateDateTime, 1000)
})

onBeforeUnmount(() => {
  if (timeInterval) clearInterval(timeInterval)
})

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

<style lang="scss" scoped>
.datetime-block {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;

  @media (max-width: 768px) {
    bottom: 1rem;
    left: 1rem;
    padding: 0.75rem;

    .time {
      font-size: 2rem !important;

      .seconds {
        font-size: 1.2rem !important;
      }
    }

    .date {
      font-size: 0.875rem !important;
    }
  }
}

.datetime-container {
  color: white;
  text-align: left;
}

.time {
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Arial', sans-serif;
  letter-spacing: 2px;
  line-height: 1;
  margin-bottom: 0.5rem;

  .seconds {
    font-size: 1.5rem;
    opacity: 0.8;
    animation: pulse 1s infinite;
  }
}

.date {
  font-size: 1rem;
  opacity: 0.8;
  font-weight: 500;
  letter-spacing: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  background-clip: text;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

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
