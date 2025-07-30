<template>
  <div class="pelayanan-section q-py-xl">
    <!-- Modern Header Section -->
    <div class="text-center q-pb-xl">
      <div class="section-title">
        <div class="title-line" />
        <div class="text-h4 text-bold">
          <span class="text-dark">Pelayanan</span>
          <span class="text-primary"> UOBK RSUD</span>
        </div>
        <div class="text-subtitle1 text-grey-7 q-mt-sm">
          DOKTER MOHAMAD SALEH
        </div>
        <div class="title-line" />
      </div>
    </div>

    <!-- Main Services Carousel -->
    <div class="services-carousel q-mb-xl">
      <app-splide
        :items="items"
        :height="450"
        :options="mainOptions"
      >
        <template #image="{ row }">
          <div class="animation-wrapper">
            <app-lottie-web
              :url="row.animation"
              :height="280"
              class="service-animation"
            />
            <!-- {{ row }} -->
            <div class="animation-overlay" />
          </div>
        </template>
        <template #text="{ row }">
          <div class="service-content q-pa-md">
            <div class="text-h6 text-weight-bold text-center text-truncate-2-lines q-mb-md">
              {{ row.nama }}
            </div>
            <div class="text-center">
              <q-btn
                rounded
                color="primary"
                class="modern-btn"
                :label="$q.screen.lt.sm ? 'Detail' : 'Selengkapnya'"
                @click="clickList(row.nama)"
              >
                <template #append>
                  <q-icon
                    name="arrow_forward"
                    class="q-ml-sm"
                  />
                </template>
              </q-btn>
            </div>
          </div>
        </template>
      </app-splide>
    </div>

    <!-- Sub Services Slider -->
    <!-- <div class="sub-services-slider q-mt-xl">
      <app-splide
        :items="subitems"
        :height="240"
        :width="180"
        :options="subOptions"
        @on-click-card="(val) => goTo(val)"
      >
        <template #image="{ row }">
          <div class="sub-animation-wrapper">
            <app-lottie-web
              :url="row.animation"
              :height="160"
              class="sub-animation"
            />
            <div class="sub-animation-overlay" />
          </div>
        </template>
        <template #text="{ row }">
          <div class="sub-service-content q-pa-md">
            <div class="text-subtitle1 text-weight-medium text-center text-truncate-2-lines">
              {{ row.nama }}
            </div>
          </div>
        </template>
      </app-splide>
    </div> -->
  </div>
</template>

<script setup>
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

import AppSplide from 'src/components/~global/AppSplide.vue'
import AppLottieWeb from 'src/components/~global/AppLottieWeb.vue'

const $q = useQuasar()
const router = useRouter()
const store = usePelayananWeb()

const mainOptions = ref({
  type: 'loop',
  autoplay: true,
  interval: 3000,
  perPage: 3,
  gap: '2rem',
  pagination: false, // hide dots
  arrows: false, // hide arrows
  focus: 'center',
  breakpoints: {
    1024: {
      perPage: 3,
      gap: '1.5rem'
    },
    768: {
      perPage: 2,
      gap: '1rem'
    },
    480: {
      perPage: 1,
      gap: '0.5rem'
    }
  },
  classes: {
    // Add custom classes for transitions
    page: 'splide__pagination__page custom-page',
    arrows: 'splide__arrows custom-arrows'
  }
})

// const subOptions = ref({
//   type: 'loop',
//   autoplay: true,
//   interval: 2000,
//   perPage: 5,
//   gap: '1rem',
//   pagination: false, // hide dots
//   arrows: false, // hide arrows
//   breakpoints: {
//     1024: {
//       perPage: 4,
//       gap: '1rem'
//     },
//     768: {
//       perPage: 3,
//       gap: '0.8rem'
//     },
//     480: {
//       perPage: 2,
//       gap: '0.5rem'
//     }
//   }
// })

const items = computed(() => store.menus)
// const subitems = computed(() => {
//   const thumb = []
//   const arr = items.value
//   if (arr?.length > 0) {
//     arr.forEach(item => {
//       if (item.submenu?.length > 0) {
//         thumb.push(...item.submenu)
//       }
//     })
//   }
//   return thumb
// })
// store.getMenu()
Promise.all([store.getMenu()])

function clickList(val) {
  store.setTab(val)
  router.push('/pelayanan')
}

// function goTo(val) {
//   router.push('/pelayanan/submenu/' + val.slug)
// }
</script>

<style lang="scss" scoped>
.pelayanan-section {
  background: linear-gradient(135deg, $grey-2 0%, $grey-1 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba($primary, 0.05) 0%, transparent 70%);
    z-index: 0;
  }
}

.section-title {
  position: relative;
  z-index: 1;

  .title-line {
    height: 3px;
    width: 60px;
    background: $primary;
    margin: 1rem auto;
    border-radius: 2px;
  }
}

.text-truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
}

.animation-wrapper, .sub-animation-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);

    .animation-overlay, .sub-animation-overlay {
      opacity: 0.1;
    }
  }
}

.animation-overlay, .sub-animation-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba($primary, 0.2) 100%);
  opacity: 0.2;
  transition: opacity 0.3s ease;
}

.modern-btn {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
}

.service-content, .sub-service-content {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

// Responsive adjustments
@media (max-width: 768px) {
  .section-title {
    .title-line {
      width: 40px;
    }
  }
}

// Override Splide default styles
:deep(.splide) {
  // Modern pagination dots
  .splide__pagination {
    bottom: -2rem;

    &__page {
      width: 30px;
      height: 4px;
      border-radius: 2px;
      margin: 0 4px;
      transition: all 0.3s ease;
      opacity: 0.3;
      background: var(--q-primary); // Menggunakan CSS variable Quasar

      &.is-active {
        transform: none;
        width: 45px;
        opacity: 1;
      }
    }
  }

  // Modern arrows
  .splide__arrow {
    background: rgba(var(--q-primary-rgb), 0.9); // Menggunakan CSS variable Quasar dengan RGB
    backdrop-filter: blur(4px);
    width: 40px;
    height: 40px;
    opacity: 0;
    transition: all 0.3s ease;

    svg {
      fill: white;
      width: 1.2em;
      height: 1.2em;
    }

    &:hover {
      background: var(--q-primary); // Menggunakan CSS variable Quasar
    }

    &--prev {
      left: -1rem;
    }

    &--next {
      right: -1rem;
    }
  }

  // Show arrows on hover
  &:hover {
    .splide__arrow {
      opacity: 1;

      &--prev {
        left: 1rem;
      }

      &--next {
        right: 1rem;
      }
    }
  }

  // Equal height cards
  .splide__track {
    padding: 1rem 0;
  }

  .splide__slide {
    height: auto;

    .q-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        background: rgba(255, 255, 255, 0.95);
      }
    }
  }
}

// Modern service cards
.service-content, .sub-service-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: transparent;
  padding: 1.5rem;

  .text-truncate-2-lines {
    margin-bottom: 1rem;
    font-size: 1.1rem;
    line-height: 1.4;
  }
}

// Enhanced animation wrapper
.animation-wrapper, .sub-animation-wrapper {
  position: relative;
  border-radius: 12px 12px 0 0;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba($primary, 0.05) 50%,
      rgba($primary, 0.1) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
}

// Modern button
.modern-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 25px;
  padding: 8px 24px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba($primary, 0.3);

    &::before {
      width: 300px;
      height: 300px;
    }
  }

  .q-icon {
    transition: transform 0.3s ease;
  }

  &:hover .q-icon {
    transform: translateX(3px);
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  :deep(.splide) {
    .splide__pagination {
      &__page {
        width: 20px;

        &.is-active {
          width: 35px;
        }
      }
    }

    .splide__arrow {
      display: none;
    }
  }
}
</style>
