<template>
  <div class="news-list-wrapper">
    <!-- Skeleton Loading -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <q-skeleton height="180px" class="rounded-xl q-mb-md" />
        <q-skeleton type="text" width="40%" class="q-mb-xs" />
        <q-skeleton type="text" width="90%" class="q-mb-xs" />
        <q-skeleton type="text" width="70%" />
      </div>
    </div>

    <!-- News Grid -->
    <div v-else-if="items && items.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="news-card group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
        @click="beritaClick(item)"
      >
        <!-- Card Image Header -->
        <div class="relative h-48 overflow-hidden bg-slate-100">
          <q-img
            :src="pathImg + item.thumbnail"
            fit="cover"
            class="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            alt="Thumbnail berita"
          >
            <template #error>
              <div class="absolute-full flex flex-center bg-slate-200 text-slate-400">
                <q-icon name="image" size="48px" />
              </div>
            </template>
          </q-img>

          <!-- Category Badge -->
          <div class="absolute top-3 left-3 bg-teal-700/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
            {{ getCategoryName(item) }}
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <!-- Date -->
            <div class="flex items-center gap-1.5 text-slate-400 text-xs font-medium q-mb-xs">
              <q-icon name="event" size="14px" class="text-teal-600" />
              <span>{{ dateHuman(item.tanggal) }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug q-mb-sm margin-0">
              {{ item.judul }}
            </h3>

            <!-- Excerpt (Stripped HTML) -->
            <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed margin-0">
              {{ getExcerpt(item.content) }}
            </p>
          </div>

          <!-- Card Footer -->
          <div class="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
            <span>Baca Selengkapnya</span>
            <q-icon name="arrow_forward" size="16px" class="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <q-icon name="article" size="56px" class="text-slate-300 q-mb-sm" />
      <div class="text-base font-bold text-slate-700">Belum Ada Berita</div>
      <p class="text-xs text-slate-400 margin-0">Tidak ada artikel berita yang ditemukan.</p>
    </div>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { dateHuman } from 'src/modules/formatter'
import { useBeritaWeb } from 'src/stores/web/berita'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const store = useBeritaWeb()

function getCategoryName(item) {
  return item.kategori?.nama || item.kategori || 'BERITA'
}

function getExcerpt(html) {
  if (!html) return ''
  const cleanHtml = String(html)
    .replace(/<\/(p|div|h[1-6]|li|td|tr|section|article)>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
  if (typeof document === 'undefined') {
    return cleanHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  }
  const tmp = document.createElement('DIV')
  tmp.innerHTML = cleanHtml
  const text = tmp.textContent || tmp.innerText || ''
  return text.replace(/\s+/g, ' ').trim()
}

function beritaClick(item) {
  const slug = String(item.slug).replace(/^"+|"+$/g, '') || 'all'
  const params = {
    q: slug,
    slug
  }
  store.getContent(params).then(() => {
    router.replace({ name: 'berita-detail', params: { slug } })
  })
}
</script>

<style lang="scss" scoped>
.news-card {
  height: 100%;
}
</style>
