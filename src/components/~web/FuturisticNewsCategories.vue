<template>
  <div class="futuristic-categories">
    <div class="categories-container">
      <div
        class="category-item"
        :class="{ 'active': selected === 'all' }"
        @click="handleSelect('all')"
      >
        <div class="category-content">
          <div class="category-icon">
            <q-icon name="newpaper" />
          </div>
          <span class="category-name">Berita</span>
        </div>
        <div class="hover-effect" />
        <div class="active-indicator" />
      </div>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="category-item"
        :class="{ 'active': selected === item.slug }"
        @click="handleSelect(item.slug, item.url)"
      >
        <div class="category-content">
          <div class="category-icon">
            <q-icon :name="getCategoryIcon(item.nama)" />
          </div>
          <span class="category-name">{{ item.nama }}</span>
        </div>
        <div class="hover-effect" />
        <div class="active-indicator" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCategoryStore } from 'src/stores/admin/category'
// import { useBeritaWeb } from 'src/stores/web/berita'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const store = useCategoryStore()
// const storeBerita = useBeritaWeb()

// eslint-disable-next-line no-unused-vars
const router = useRouter()
const route = useRoute()

const items = computed(() => store.items)
const selected = computed({
  get() {
    return store.pick
  },
  set(newVal) {
    const value = newVal || route.params.page
    store.setSelected(value)
  }
})

function handleSelect(slug, url) {
  selected.value = slug
  // router.push({ name: 'berita', params: { page: url } })
}

function getCategoryIcon(categoryName) {
  // Map category names to icons - customize as needed
  const iconMap = {
    Umum: 'public',
    Kesehatan: 'local_hospital',
    Pengumuman: 'campaign',
    Event: 'event'
    // Add more mappings as needed
  }
  return iconMap[categoryName] || 'label' // Default icon
}
</script>

<style lang="scss" scoped>
.futuristic-categories {
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 0.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
}

.categories-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.category-item {
  position: relative;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  background: rgba(var(--q-primary-rgb), 0.05);

  &:hover {
    transform: translateY(-2px);

    .hover-effect {
      opacity: 1;
    }
  }

  &.active {
    background: var(--q-primary);
    color: white;

    .active-indicator {
      width: 100%;
    }

    .category-icon {
      color: white;
    }
  }
}

.category-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-icon {
  color: var(--q-primary);
  transition: color 0.3s ease;
}

.category-name {
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.hover-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    rgba(var(--q-primary-rgb), 0.1),
    rgba(var(--q-primary-rgb), 0.2)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: rgba(255, 255, 255, 0.8);
  transition: width 0.3s ease;
}

// Responsive adjustments
@media (max-width: 600px) {
  .categories-container {
    gap: 0.25rem;
  }

  .category-item {
    padding: 0.5rem 1rem;
  }

  .category-name {
    font-size: 0.8rem;
  }
}
</style>
