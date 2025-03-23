<template>
  <div class="futuristic-section q-pt-xl q-pb-xl">
    <div class="text-center q-py-xl">
      <div class="section-title">
        <div class="title-line" />
        <div class="text-h4 text-bold">
          <span class="text-dark">Direksi </span>
          <span class="text-primary"> {{ store.header.title }}</span>
        </div>
        <div class="title-line" />
      </div>
    </div>

    <div class="row justify-center q-col-gutter-lg relative-position">
      <div
        v-for="(item, i) in lists"
        :key="i"
        class="col-12 col-md-3"
      >
        <q-card
          flat
          class="staff-card"
        >
          <div class="staff-image-wrapper">
            <q-img
              :src="sourceImage(item.image)"
              :ratio="1"
              class="staff-image"
              alt="gambar direksi rsud dr mohamad saleh"
            >
              <template #loading>
                <div class="text-center full-width full-height">
                  <q-spinner-dots
                    color="primary"
                    size="40"
                  />
                </div>
              </template>
            </q-img>
            <div class="staff-overlay" />
          </div>
          <q-card-section class="staff-content">
            <div class="text-content">
              <div class="text-h6 text-weight-bold text-primary ellipsis-2-lines">
                {{ item.nama }}
              </div>
              <div class="text-subtitle1 text-primary ellipsis-2-lines">
                {{ item.jabatan }}
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'

const store = useAppStore()

const lists = computed(() => store.stafs)

function sourceImage(val) {
  if (val === null || val === 'null' || val === '') {
    return new URL('../../assets/images/actor.svg', import.meta.url).href
  }
  // return URL.createObjectURL(imgTemp.value)
  return pathImg + val
}

defineProps({
  admin: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.futuristic-section {
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
    pointer-events: none;
  }
}

.section-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  .title-line {
    height: 2px;
    width: 50px;
    background: var(--q-primary);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--q-primary);
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
    }

    &:first-child::before {
      right: -4px;
    }

    &:last-child::before {
      left: -4px;
    }
  }
}

.staff-card {
  position: relative;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 400px; // Fixed height for consistency
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);

    .staff-image {
      transform: scale(1.05);
    }

    .staff-overlay {
      opacity: 0.3;
    }
  }
}

.staff-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 300px; // Fixed height for image

  .staff-image {
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    height: 100%;
    width: 100%;
  }

  .staff-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(var(--q-primary), 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
}

.staff-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .text-content {
    text-align: center;
  }

  .text-h6 {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.4;
  }

  .text-subtitle1 {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.8;
  }
}

// Utility classes for text truncation
.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Responsive adjustments
@media (max-width: $breakpoint-sm-max) {
  .staff-card {
    height: 350px;
  }

  .staff-image-wrapper {
    height: 250px;
  }
}
</style>
