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
    <app-editor
      v-model="store.content"
      :edited="false"
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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { dateWeb } from 'src/modules/formatter'
import { useHead } from '@vueuse/head'

const route = useRoute()
const store = useBeritaWeb()
const storeApp = useAppStore()

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

// const params = ref({
//   q: route.query.page || '',
//   page: route.params.page || 'all'
// })

// onMounted(() => {
//   store.getContent(params.value)
// })
// console.log(route)
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
