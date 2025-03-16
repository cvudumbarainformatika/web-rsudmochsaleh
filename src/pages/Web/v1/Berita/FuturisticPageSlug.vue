<template>
  <div class="futuristic-article">
    <!-- Header Section -->
    <div class="article-header">
      <div class="meta-info">
        <div class="date-badge">
          <q-icon
            name="event"
            size="sm"
          />
          <span>{{ dateWeb(store.tanggal) }}</span>
        </div>
        <div class="author-badge">
          <q-avatar size="32px">
            <img :src="logo">
          </q-avatar>
          <span>{{ storeApp.header.title }}</span>
        </div>
      </div>

      <h1 class="article-title">
        {{ store.judul }}
        <div class="title-underline" />
      </h1>

      <!-- Share buttons with futuristic design -->
      <div class="share-section">
        <div class="share-label">
          <div class="label-line" />
          <span>Share Article</span>
          <div class="label-line" />
        </div>
        <div class="share-buttons">
          <ShareNetwork
            v-for="sharing in sharings"
            :key="sharing.network"
            :network="sharing.network"
            :url="url"
            :title="store.judul || 'No Title'"
            :description="`Berita & informasi ${store.judul}`"
            :quote="`Web - ${storeApp.header.title}`"
            hashtags="berita,informasi,warta"
            class="share-button"
            :class="sharing.network"
          >
            <q-icon :name="sharing.icon" />
          </ShareNetwork>
        </div>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="article-content">
      <div
        v-if="store.image"
        class="featured-image-container"
      >
        <q-img
          :src="pathImg + store.image"
          :ratio="16/9"
          class="featured-image"
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

      <div
        class="content-body"
        v-html="store.content"
      />
    </div>
  </div>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { dateWeb } from 'src/modules/formatter'

const route = useRoute()
const store = useBeritaWeb()
const storeApp = useAppStore()
const url = ref(window.location.origin + route.fullPath)

const logo = computed(() => {
  if (storeApp.logo === null) {
    return new URL('../../../../assets/logos/logo.png', import.meta.url).href
  }
  return pathImg + storeApp.logo
})

const sharings = ref([
  { network: 'whatsapp', icon: 'mdi-whatsapp' },
  { network: 'facebook', icon: 'mdi-facebook' },
  { network: 'twitter', icon: 'mdi-twitter' }
])
</script>

<style lang="scss" scoped>
.futuristic-article {
  background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.95));
  border-radius: 24px;
  backdrop-filter: blur(10px);
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.article-header {
  margin-bottom: 2rem;

  .meta-info {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .date-badge, .author-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: rgba(var(--q-primary-rgb), 0.1);
      border-radius: 20px;
      font-size: 0.9rem;

      &:hover {
        background: rgba(var(--q-primary-rgb), 0.15);
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }
    }
  }

  .article-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 1rem 0;
    position: relative;

    .title-underline {
      height: 4px;
      width: 100px;
      background: linear-gradient(90deg, var(--q-primary), transparent);
      margin-top: 0.5rem;
      animation: expandLine 1s ease-out forwards;
    }
  }
}

.share-section {
  margin: 2rem 0;

  .share-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;

    .label-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--q-primary), transparent);
    }

    span {
      color: var(--q-primary);
      font-weight: 500;
    }
  }

  .share-buttons {
    display: flex;
    gap: 1rem;

    .share-button {
      padding: 0.75rem;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0.1);
        transform: scale(0);
        transition: transform 0.3s ease;
        border-radius: 50%;
      }

      &:hover::before {
        transform: scale(1);
      }

      &.whatsapp {
        background: #25D366;
        color: white;
      }

      &.facebook {
        background: #1877F2;
        color: white;
      }

      &.twitter {
        background: #1DA1F2;
        color: white;
      }
    }
  }
}

.featured-image-container {
  position: relative;
  margin: 2rem 0;
  border-radius: 16px;
  overflow: hidden;

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 70%, rgba(0,0,0,0.1));
  }

  &:hover .featured-image {
    transform: scale(1.02);
  }

  .featured-image {
    transition: transform 0.5s ease;
  }
}

.content-body {
  line-height: 1.8;
  font-size: 1.1rem;

  :deep(p) {
    margin-bottom: 1.5rem;
  }

  :deep(h2) {
    color: var(--q-primary);
    margin: 2rem 0 1rem;
    font-weight: 600;
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
  .futuristic-article {
    padding: 1rem;
  }

  .article-header {
    .meta-info {
      flex-direction: column;
    }

    .article-title {
      font-size: 1.8rem;
    }
  }
}
</style>
