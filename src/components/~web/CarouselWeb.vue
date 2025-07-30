<template>
  <div class="carousel-container">
    <q-carousel
      v-if="!store.loading"
      v-model="slide"
      animated
      :arrows="showArrows"
      infinite
      :autoplay="autoplay"
      :autoplay-timeout="5000"
      swipeable
      :navigation="showDots"
      transition-duration="800"
      class="modern-carousel"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        v-for="(img, i) in slides"
        :key="i"
        :name="i"
        class="carousel-slide"
      >
        <div class="slide-content">
          <!-- Image/Animation Container -->
          <div class="media-container">
            <template v-if="img.image">
              <q-img
                :src="getImage(img.image)"
                :style="`height: ${height}px`"
                fit="cover"
                loading="eager"
                class="carousel-image"
                alt="gambar carousel rsud dr mohamad saleh"
              >
                <template #loading>
                  <q-skeleton type="QToolbar" />
                </template>
              </q-img>
            </template>
            <!-- <app-lottie-web
              v-else
              :url="img.animation"
              :height="height"
              class="carousel-animation"
            /> -->
          </div>

          <!-- Caption Overlay -->
          <div
            v-show="img.title !== 'null'"
            class="caption-overlay"
          >
            <div class="container-padding">
              <div class="caption-content">
                <h2 class="slide-title">
                  {{ formatText(img.title) }}
                </h2>
                <p class="slide-description">
                  {{ formatText(img.desc) }}
                </p>
                <!-- <q-btn
                  unelevated
                  color="primary"
                  class="q-mt-md"
                  label="Learn More"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <!-- Custom Navigation -->
      <template #control>
        <div class="custom-navigation">
          <q-btn
            flat
            round
            dense
            color="white"
            icon="chevron_left"
            class="nav-btn prev-btn"
            @click="prevSlide"
          />
          <q-btn
            flat
            round
            dense
            color="white"
            icon="chevron_right"
            class="nav-btn next-btn"
            @click="nextSlide"
          />
        </div>
      </template>
    </q-carousel>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useCarouselApp } from 'src/stores/app/carousel'
import { computed, ref, onMounted } from 'vue'

// Definisikan validator untuk prop type
const props = defineProps({
  height: {
    type: Number,
    default: 500
  },
  // Tambahkan prop type dengan validator yang sesuai
  type: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'fullscreen', 'compact'].includes(value)
    }
  },
  // Tambahkan prop lainnya jika diperlukan
  showArrows: {
    type: Boolean,
    default: true
  },
  showDots: {
    type: Boolean,
    default: true
  }
})

const store = useCarouselApp()
const slide = ref(0)
const autoplay = ref(true)
const captionVisible = ref(false)

// Computed property untuk style carousel berdasarkan type
// eslint-disable-next-line no-unused-vars
const carouselStyle = computed(() => {
  const baseStyle = {
    height: `${props.height}px`
  }

  switch (props.type) {
    case 'fullscreen':
      return {
        ...baseStyle,
        height: '100vh',
        width: '100vw'
      }
    case 'compact':
      return {
        ...baseStyle,
        maxWidth: '800px',
        margin: '0 auto'
      }
    default:
      return baseStyle
  }
})

onMounted(() => {
  store.getData()
  setTimeout(() => {
    captionVisible.value = true
  }, 500)
})

const slides = computed(() => store.slides)

function getImage(img) {
  if (store.carousels.length > 0) {
    return pathImg + img
  }
  return new URL('../../assets/carousel/' + img, import.meta.url).href
}

function formatText(text) {
  return text === 'null' || text === '' ? '' : text
}

function prevSlide() {
  if (slide.value > 0) {
    slide.value--
  } else {
    slide.value = slides.value.length - 1
  }
}

function nextSlide() {
  if (slide.value < slides.value.length - 1) {
    slide.value++
  } else {
    slide.value = 0
  }
}

</script>

<style lang="scss" scoped>
.modern-carousel {
  height: v-bind('`${height}px`');
  background: var(--q-primary);
}

.carousel-slide {
  padding: 0;
}

.slide-content {
  position: relative;
  height: 100%;
}

.media-container {
  height: 100%;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      rgba(0,0,0,0.6) 0%,
      rgba(0,0,0,0.3) 50%,
      rgba(0,0,0,0.1) 100%
    );
  }
}

.carousel-image {
  height: 100%;
  width: 100%;
}

.caption-overlay {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  z-index: 2;
}

.caption-content {
  max-width: 600px;
  color: white;
  animation: fadeInLeft 0.8s ease;
}

.slide-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.slide-description {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.custom-navigation {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
}

.nav-btn {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);

  &:hover {
    background: rgba(255,255,255,0.3);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .slide-title {
    font-size: 1.8rem;
  }

  .slide-description {
    font-size: 1rem;
  }
}
</style>
