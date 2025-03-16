<template>
  <div class="trending-news-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="trending-item"
      @click="beritaClick(item)"
    >
      <div class="trending-number">
        {{ padNumber(index + 1) }}
      </div>
      <div class="trending-content">
        <div class="trending-image">
          <q-img
            :src="pathImg + item.thumbnail"
            :ratio="16/9"
            class="rounded-image"
          >
            <template #loading>
              <div class="text-center full-width full-height">
                <q-spinner-dots
                  color="white"
                  size="40"
                />
              </div>
            </template>
          </q-img>
          <div class="image-overlay" />
        </div>
        <div class="trending-details">
          <div class="trending-title">
            {{ item.judul }}
          </div>
          <div class="trending-meta">
            <q-icon
              name="schedule"
              size="xs"
            />
            <span>{{ dateHuman(item.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { dateHuman } from 'src/modules/formatter'
import { useBeritaWeb } from 'src/stores/web/berita'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = useBeritaWeb()

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

function padNumber(num) {
  return num.toString().padStart(2, '0')
}

function beritaClick(item) {
  const page = route.params.page || 'all'
  const params = {
    q: item.slug,
    page
  }
  store.getContent(params).then(() => {
    router.replace({ name: 'berita', params: { page: params.page }, query: { page: params.q } })
  })
}
</script>

<style lang="scss" scoped>
.trending-news-container {
  .trending-item {
    display: flex;
    align-items: stretch;
    margin-bottom: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover {
      transform: translateX(8px);
      background: rgba(255, 255, 255, 0.9);
      box-shadow: -8px 8px 20px rgba(0, 0, 0, 0.1);

      .trending-number {
        background: var(--q-primary);
        color: white;
      }

      .image-overlay {
        opacity: 0.3;
      }
    }
  }

  .trending-number {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    font-size: 1rem;
    font-weight: 700;
    color: var(--q-primary);
    background: rgba(var(--q-primary-rgb), 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.1) 100%
      );
      transform: translateX(-100%);
      transition: transform 0.6s;
    }

    &:hover::after {
      transform: translateX(100%);
    }
  }

  .trending-content {
    flex: 1;
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .trending-image {
    position: relative;
    width: 100px;
    min-width: 100px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .rounded-image {
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    &:hover .rounded-image {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, var(--q-primary), transparent);
      opacity: 0.2;
      transition: opacity 0.3s ease;
    }
  }

  .trending-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .trending-category {
    font-size: 0.50rem;
    color: var(--q-primary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: rgba(var(--q-primary-rgb), 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
  }

  .trending-title {
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0.25rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .trending-meta {
    font-size: 0.75rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    opacity: 0.8;

    .q-icon {
      font-size: 1rem;
    }
  }
}
</style>
