<template>
  <div>
    <div class="text-h5 text-weight-bold">
      {{ store.judul }}
    </div>
    <div class="title-desc q-py-md">
      <div class="row items-center justify-between">
        <div class="row items-center">
          <q-btn round>
            <q-avatar size="40px">
              <img
                :src="logo"
                alt="logo-rsudmohamadsaleh"
              >
            </q-avatar>
          </q-btn>
          <div class="column q-ml-sm">
            <div class="text-dark">
              {{ storeApp.header.title }}
            </div>
            <div>{{ dateWeb(store.tanggal) }}</div>
          </div>
        </div>
        <div>
          <ShareNetwork
            v-for="(sharing, i) in sharings"
            :key="i"
            hashtags="berita,informasi,warta"
            class="q-mr-xs"
            :quote="`Web - ${storeApp.header.title}`"
            :network="sharing.network"
            :url="url"
            :title="store.judul? store.judul:'No Title'"
            :description="`Berita & informasi ${store.judul}`"
          >
            <q-btn
              :color="sharing.color"
              round
              unelevated
              :icon="sharing.icon"
              padding="xs"
              size="md"
            />
          </ShareNetwork>
        </div>
      </div>
    </div>
    <div class="q-mb-lg">
      <div>
        <q-img
          class="rounded-borders"
          alt="gambar thumbnail rsud dr mohamad saleh"
          :src="pathImg + store.thumbnail"
        />
      </div>
    </div>
    <div
      ref="newsBodyRef"
      class="news-body-content q-py-md text-slate-800 leading-relaxed text-body1"
    />
    <q-separator />
    <!-- <div class="text-right text-grey f-14">
      <q-icon
        size="18px"
        name="visibility"
      /> {{ store.views }}
    </div> -->
    <!-- <script
      v-once
      type="application/ld+json"
    >
      {{ JSON.stringify(jsonLd) }}
    </script> -->
  </div>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { dateWeb } from 'src/modules/formatter'
import { useHead } from '@vueuse/head'
import { useAccessibilityStore } from 'src/stores/web/accessibility'

const route = useRoute()
const store = useBeritaWeb()
const storeApp = useAppStore()
const accStore = useAccessibilityStore()
const newsBodyRef = ref(null)

function normalizeSentenceCase(text) {
  if (!text) return ''
  if (text === text.toUpperCase() && text.length > 10) {
    return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
  }
  return text
}

function formatContentForTranslation(html) {
  if (!html) return ''
  let str = String(html)
    .replace(/class="[^"]*notranslate[^"]*"/gi, '')
    .replace(/translate="no"/gi, '')

  if (typeof document === 'undefined') return str

  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = str

  // Hanya normalisasi jika node daun berformat HURUF KAPITAL SEMUA (ALL-CAPS)
  const textNodes = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, strong, b, a, li, td, th')
  textNodes.forEach(el => {
    if (el.children.length === 0 && el.textContent && el.textContent === el.textContent.toUpperCase() && el.textContent.length > 15) {
      el.textContent = el.textContent.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
    }
  })

  return tempDiv.innerHTML
}

watch(() => store.content, async (val) => {
  if (val) {
    await nextTick()
    if (newsBodyRef.value) {
      newsBodyRef.value.innerHTML = formatContentForTranslation(val)
      accStore.notifyContentUpdated()
    }
  }
}, { immediate: true })

const logo = computed(() => {
  if (storeApp.logo === null) {
    return new URL('../../../../assets/logos/logo.png', import.meta.url).href
  }

  return pathImg + storeApp.logo
})

const url = ref(window.location.origin + route.fullPath)

const sharings = ref([
  { network: 'whatsapp', color: 'green', icon: 'mdi-whatsapp' },
  { network: 'facebook', color: 'blue-8', icon: 'mdi-facebook' },
  { network: 'twitter', color: 'blue', icon: 'mdi-twitter' }
])

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: store.judul,
  image: pathImg + store.image,
  datePublished: store.tanggal,
  dateModified: store.created_at,
  author: {
    '@type': 'Organization',
    name: storeApp.header.title
  }
}))

useHead({
  title: store.judul,
  meta: [
    { name: 'description', content: store.content ? store.content.substring(0, 160) : '' },
    { property: 'og:title', content: store.judul },
    { property: 'og:description', content: store.content ? store.content.substring(0, 160) : '' },
    { property: 'og:image', content: pathImg + store.image },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify(jsonLd.value))
    }
  ]
})
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.news-body-content {
  font-size: 1.05rem;
  line-height: 1.85;
  color: #1e293b;

  :deep(p) {
    margin-bottom: 1.15rem;
  }

  :deep(strong), :deep(b) {
    font-weight: 800 !important;
    color: #0f172a;
  }

  :deep(a) {
    color: #0d9488 !important;
    text-decoration: underline !important;
    font-weight: 700;
    word-break: break-all;

    &:hover {
      color: #0891b2 !important;
    }
  }

  :deep(ul) {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.15rem;
  }

  :deep(ol) {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin-bottom: 1.15rem;
  }

  :deep(li) {
    margin-bottom: 0.35rem;
  }

  :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
    font-weight: 800;
    color: #0f172a;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.25rem;

    th, td {
      border: 1px solid #cbd5e1;
      padding: 0.6rem 0.85rem;
    }

    th {
      background-color: #f1f5f9;
      font-weight: 800;
      color: #0f172a;
    }
  }

  :deep(blockquote) {
    border-left: 4px solid #0d9488;
    padding-left: 1rem;
    margin-left: 0;
    color: #475569;
    font-style: italic;
  }
}
</style>
