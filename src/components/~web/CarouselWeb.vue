<template>
  <div
    class="carousel-container"
  >
    <q-carousel
      v-if="!store.loading"
      v-model="slide"
      animated
      :arrows="showArrows"
      infinite
      :autoplay="autoplay"
      :autoplay-timeout="5000"
      :style="carouselStyle"
      swipeable
      :navigation="showDots"
      transition-duration="800"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        v-for="(img, i) in slides"
        :key="i"
        :name="i"
        class="carousel-slide"
      >
        <template v-if="img.image">
          <q-img
            :src="getImage(img.image)"
            :style="`width: 100%; height: ${height-20}px;`"
            fit="cover"
            loading="eager"
            class="carousel-image"
          >
            <template #loading>
              <q-skeleton type="QToolbar" />
            </template>
          </q-img>
        </template>
        <app-lottie-web
          v-else
          :url="img.animation"
          :height="height - 20"
          class="carousel-animation"
        />

        <div
          v-show="img.title !== 'null'"
          class="futuristic-caption"
          :class="{ 'caption-visible': captionVisible }"
        >
          <div class="caption-content-left">
            <div class="title-wrapper deskt-only">
              <div class="title-line" />
              <div class="title-container">
                <h3 class="futuristic-title">
                  {{ formatText(img.title) }}
                </h3>
                <div class="glowing-underline" />
              </div>
            </div>

            <div class="mobile-only">
              <h4 class="futuristic-title-mobile">
                {{ formatText(img.title) }}
              </h4>
            </div>

            <div class="futuristic-desc deskt-only">
              <div class="desc-background" />
              <p>{{ formatText(img.desc) }}</p>
            </div>

            <div class="futuristic-desc-mobile mobile-only">
              <p>{{ formatText(img.desc) }}</p>
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <!-- Custom Navigation Arrows -->
      <template #control>
        <div class="custom-arrows">
          <q-btn
            flat
            round
            dense
            color="white"
            text-color="primary"
            icon="chevron_left"
            class="arrow-btn q-mr-md"
            @click="prevSlide"
          />
          <q-btn
            flat
            round
            dense
            color="white"
            text-color="primary"
            icon="chevron_right"
            class="arrow-btn"
            @click="nextSlide"
          />
        </div>
      </template>
    </q-carousel>

    <q-skeleton
      v-else
      :height="`${height}px`"
      class="carousel-skeleton"
      animation="wave"
    />
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
.carousel-container {
  position: relative;
  background: var(--q-primary);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &.fullscreen {
    height: 100vh;
    width: 100vw;
  }

  &.compact {
    max-width: 800px;
    margin: 0 auto;
  }
}

.carousel-slide {
  position: relative;
  overflow: hidden;
}

.carousel-image {
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.futuristic-caption {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%) translateX(-100%);
  padding: 2rem;
  width: 40%;
  min-width: 400px;
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  z-index: 2;

  &.caption-visible {
    transform: translateY(-50%) translateX(0);
    opacity: 1;
  }
}

.caption-content-left {
  position: relative;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 0 20px 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, var(--q-primary), transparent);
    animation: glow 2s infinite alternate;
  }
}

.title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.title-line {
  width: 3px;
  height: 40px;
  background: var(--q-primary);
  margin-right: 1rem;
  animation: heightPulse 2s infinite alternate;
}

.title-container {
  position: relative;
}

.futuristic-title {
  color: white;
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.2 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glowing-underline {
  width: 0;
  height: 2px;
  background: var(--q-primary);
  margin-top: 0.5rem;
  animation: expandWidth 0.8s forwards 0.3s;
  box-shadow: 0 0 10px var(--q-primary);
}

.futuristic-desc {
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-top: 1rem;
  padding-left: 1rem;

  p {
    position: relative;
    z-index: 1;
  }
}

.desc-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
}

@keyframes glow {
  0% {
    box-shadow: 0 0 5px var(--q-primary);
  }
  100% {
    box-shadow: 0 0 20px var(--q-primary);
  }
}

@keyframes heightPulse {
  0% {
    height: 30px;
  }
  100% {
    height: 50px;
  }
}

@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

// Mobile styles
@media (max-width: 768px) {
  .futuristic-caption {
    width: 100%;
    min-width: unset;
    bottom: 0;
    top: auto;
    transform: translateY(100%);
    padding: 1rem;

    &.caption-visible {
      transform: translateY(0);
    }
  }

  .caption-content-left {
    padding: 1rem;
    border-radius: 20px 20px 0 0;
  }

  .futuristic-title-mobile {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    line-height: 1.2 !important;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .futuristic-desc-mobile {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.875rem;
    line-height: 1.4;
    margin-top: 0.5rem;
  }
}
</style>
