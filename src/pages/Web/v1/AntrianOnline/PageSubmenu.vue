<template>
  <div class="page-submenu-antrian bg-slate-50 min-h-screen q-pb-xl">
    <div class="subpage-banner-strip bg-gradient-to-r from-teal-700 to-cyan-800 text-white py-10 q-mb-lg shadow-md">
      <div class="container-padding">
        <div class="flex items-center gap-2 text-xs text-teal-200 font-bold uppercase tracking-wider q-mb-xs">
          <span>Beranda</span>
          <q-icon name="chevron_right" size="14px" />
          <span>Antrian Online</span>
          <q-icon name="chevron_right" size="14px" />
          <span class="text-white">{{ currentTitle }}</span>
        </div>
        <h1 class="text-h4 font-extrabold text-white tracking-tight margin-0">
          {{ currentTitle }}
        </h1>
      </div>
    </div>

    <div class="container-padding">
      <div class="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm">
        <h2 class="text-xl font-bold text-slate-800 q-mb-sm">{{ currentTitle }}</h2>
        <p class="text-slate-600 text-body2 leading-relaxed">
          Halaman detail pendaftaran dan layanan antrian online UOBK RSUD dr. Mohamad Saleh Kota Probolinggo.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentTitle = computed(() => {
  const slug = route.params.slug || 'Submenu'
  return slug.replace(/-/g, ' ').toUpperCase()
})
</script>
