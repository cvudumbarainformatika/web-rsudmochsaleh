<template>
  <div class="title-container q-py-md">
    <div class="flex items-center gap-3 no-wrap">
      <!-- Gradient vertical bar indicator -->
      <span class="title-indicator" />
      <div>
        <h1 class="page-main-title">{{ judul }}</h1>
        <div class="page-sub-meta text-grey-6 flex items-center gap-1.5 q-mt-xs">
          <span class="text-capitalize text-teal-600 font-bold">{{ routeNameTranslated }}</span>
          <span class="meta-dot" />
          <span>UOBK RSUD dr. Mohamad Saleh</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps({
  judul: {
    type: String,
    default: 'Pelayanan'
  }
})

const route = useRoute()

const routeNameTranslated = computed(() => {
  const name = route.name || ''
  if (name.includes('pelayanan')) return 'Pelayanan'
  if (name.includes('profil')) return 'Profil'
  if (name.includes('ppid')) return 'PPID'
  if (name.includes('pokja')) return 'Pokja Akreditasi'
  if (name.includes('pengaduan')) return 'Pengaduan'
  if (name.includes('buku-tamu')) return 'Buku Tamu'
  return name
})
</script>

<style lang="scss" scoped>
.title-container {
  border-bottom: 1px solid rgba(15, 23, 42, 0.04);
  margin-bottom: 1rem;
}

.title-indicator {
  width: 5px;
  height: 28px;
  background: linear-gradient(to bottom, #0d9488, #06b6d4);
  border-radius: 4px;
  flex-shrink: 0;
}

.page-main-title {
  font-size: clamp(1.2rem, 3vw, 1.65rem);
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.page-sub-meta {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.meta-dot {
  width: 4px;
  height: 4px;
  background: rgba(15, 23, 42, 0.2);
  border-radius: 50%;
}
</style>
