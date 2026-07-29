<template>
  <div class="futuristic-section light-grid-bg q-pt-xl q-pb-xl">
    <div class="text-center q-py-xl">
      <div class="section-title">
        <div class="title-line" />
        <div class="text-h4 text-bold">
          <span class="text-slate-900">Direksi </span>
          <span class="text-teal-8"> {{ store.header.title }}</span>
        </div>
        <div class="title-line" />
      </div>
    </div>

    <div class="row justify-center q-col-gutter-lg relative-position container-padding">
      <div
        v-for="(item, i) in lists"
        :key="i"
        class="col-12 col-md-3"
      >
        <q-card
          flat
          class="staff-card glass-card-light hover-lift"
        >
          <div class="staff-image-wrapper">
            <q-img
              :src="sourceImage(item.image)"
              :ratio="1"
              class="staff-image"
              alt="gambar direksi rsud dr mohamad saleh"
              referrerpolicy="no-referrer"
            >
              <template #loading>
                <div class="text-center full-width full-height">
                  <q-spinner-dots
                    color="teal-8"
                    size="40"
                  />
                </div>
              </template>
            </q-img>
            <div class="staff-overlay" />
          </div>
          <q-card-section class="staff-content">
            <div class="text-content">
              <div class="text-h6 text-weight-bold text-slate-900 ellipsis-2-lines">
                {{ item.nama }}
              </div>
              <div class="text-subtitle1 text-teal-8 text-weight-medium ellipsis-2-lines">
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
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 450px;
    background: radial-gradient(circle, rgba(var(--q-primary-rgb, 66, 58, 142), 0.2) 0%, rgba(var(--q-secondary-rgb, 6, 184, 184), 0.1) 50%, transparent 70%);
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
    height: 3px;
    width: 60px;
    background: linear-gradient(90deg, var(--q-primary), var(--q-secondary));
    position: relative;
    border-radius: 2px;
    box-shadow: 0 0 10px var(--q-secondary);

    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--q-secondary);
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: 0 0 8px var(--q-secondary);
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
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 24px !important;
  overflow: hidden;
  height: 410px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 25px var(--q-secondary) !important;
    border-color: var(--q-secondary) !important;

    .staff-image {
      transform: scale(1.08);
    }

    .staff-overlay {
      opacity: 0.4;
    }
  }
}

.staff-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 310px;

  .staff-image {
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    height: 100%;
    width: 100%;
  }

  .staff-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13, 16, 26, 0.95), transparent 60%);
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
}

.staff-content {
  padding: 1.25rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .text-content {
    text-align: center;
  }

  .text-h6 {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.35;
  }

  .text-subtitle1 {
    margin-top: 0.35rem;
    font-size: 0.88rem;
  }
}

.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
