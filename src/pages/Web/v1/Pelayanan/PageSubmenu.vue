<template>
  <div class="futuristic-page">
    <app-loading-new v-if="store.loading" />

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          {{ store.item ? store.item.nama : '' }}
        </h1>
        <div class="title-underline" />
      </div>
    </div>

    <div class="content-wrapper">
      <div class="row q-col-gutter-xl">
        <!-- Main Content -->
        <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
          <div class="main-content-card">
            <div v-if="store.item">
              <!-- Featured Image -->
              <div
                v-if="store.item.thumbnail"
                class="featured-image-container"
              >
                <q-img
                  :src="pathImg + store.item.thumbnail"
                  class="featured-image"
                  alt="gambar thumbnail rsud dr mohamad saleh"
                >
                  <template #loading>
                    <div class="text-center full-width full-height">
                      <q-spinner-dots
                        color="primary"
                        size="40px"
                      />
                    </div>
                  </template>
                </q-img>
                <div class="image-overlay" />
              </div>

              <!-- Content -->
              <div class="content-body">
                <app-editor
                  v-model="store.item.content"
                  :edited="false"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
          <div
            v-if="submenu.length > 0"
            class="sidebar-content"
          >
            <div class="text-h4 sidebar-title">
              Related Services
            </div>

            <div class="submenu-grid">
              <q-card
                v-for="(sub, index) in submenu"
                :key="index"
                flat
                class="submenu-card"
                @click="goTo(sub)"
              >
                <div class="animation-container">
                  <app-lottie-web
                    ref="anim"
                    :url="sub.animation"
                    :height="200"
                  />
                </div>

                <div class="card-content">
                  <h3 class="card-title">
                    {{ sub.name }}
                  </h3>
                  <div class="card-slug">
                    @{{ sub.slug }}
                  </div>

                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="arrow_forward"
                    class="explore-btn"
                  >
                    <q-tooltip>Explore More</q-tooltip>
                  </q-btn>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { useSubmenuWeb } from 'src/stores/web/submenu'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pathImg } from 'src/boot/axios'

const store = useSubmenuWeb()
const route = useRoute()
const router = useRouter()

const submenu = computed(() => {
  return store.getSubmenu
})

// const slug = ref(route.params.page)
console.log('store submenu web', store)
console.log('route submenu web', route)
console.log('item submenu web', store.item)
// store.getData(route.params.page)
onMounted(() => {
  store.getData(route.params.page)
})

function goTo(val) {
  router.push('/pelayanan/submenu/' + val.slug)
}

</script>

<style lang="scss" scoped>
.futuristic-page {
  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
  min-height: 100vh;
}

.hero-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--q-primary), darken(#06b8b8, 20%));
  border-radius: 0 0 50px 50px;
  margin-bottom: 3rem;

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-title {
    color: white;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  }

  .title-underline {
    height: 4px;
    width: 100px;
    background: white;
    margin: 1rem auto;
    border-radius: 2px;
    animation: expandLine 1s ease-out forwards;
  }
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.main-content-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  overflow: hidden;
}

.featured-image-container {
  position: relative;

  .featured-image {
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.1));
  }
}

.content-body {
  padding: 2rem;

  :deep(p) {
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  :deep(h2) {
    color: var(--q-primary);
    margin: 2rem 0 1rem;
    font-weight: 600;
  }
}

.sidebar-content {
  position: sticky;
  top: 2rem;

  .sidebar-title {
    font-size: 1.5rem;
    color: var(--q-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--q-primary);
  }
}

.submenu-grid {
  display: grid;
  gap: 1rem;
}

.submenu-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
    border-color: var(--q-primary);

    .explore-btn {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animation-container {
    background: rgba(var(--q-primary-rgb), 0.05);
    padding: 1rem;
  }

  .card-content {
    padding: 1rem;
    position: relative;
  }

  .card-title {
    font-size: 1.2rem;
    margin: 0;
    color: var(--q-primary);
  }

  .card-slug {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.25rem;
  }

  .explore-btn {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    opacity: 0;
    transform: translateX(10px);
    transition: all 0.3s ease;
  }
}

@keyframes expandLine {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100px;
    opacity: 1;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
    border-radius: 0 0 30px 30px;

    .hero-title {
      font-size: 1.8rem;
    }
  }

  .content-wrapper {
    padding: 0 1rem;
  }

  .content-body {
    padding: 1rem;
  }
}
</style>
