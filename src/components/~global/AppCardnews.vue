<template>
  <!-- <div> -->
  <q-card
    v-if="bigCardNews"
    flat
    bordered
    class="cursor-pointer text-grey-10"
    @click="beritaClick(bigCardNews)"
  >
    <q-img
      :src="pathImg + bigCardNews.thumbnail"
      :ratio="16/9"
      alt="gambar thumbnail rsud dr mohamad saleh"
    />
    <q-card-section>
      <div class="f-20 text-weight-bold">
        {{ bigCardNews.judul }}
      </div>
      <div class="flex items-center text-grey q-my-sm f-10">
        <div class="flex items-center q-mr-sm ">
          <q-icon
            name="edit_calendar"
            class="q-pr-xs"
          /> <div>{{ dateHuman(bigCardNews.tanggal) }}</div>
        </div>
        <div class="flex items-center">
          <q-icon
            name="bookmark"
            class="q-pr-xs"
          /> <div>Kategori : {{ getKategori(bigCardNews.categories) }}</div>
        </div>
      </div>
      <div>
        <q-item-label
          lines="2"
        >
          <div v-html="bigCardNews.content" />
        </q-item-label>
      </div>
    </q-card-section>
  </q-card>

  <!-- <q-card
      v-else
      flat
      bordered
    >
      <q-card-section>
        Belum Ada Berita
      </q-card-section>
    </q-card>
  </div> -->
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { dateHuman } from 'src/modules/formatter'
import { useBeritaWeb } from 'src/stores/web/berita'
import { useRoute, useRouter } from 'vue-router'
// import { defineProps } from "vue";

defineProps({
  bigCardNews: {
    type: Object,
    default: null
  }
})

// eslint-disable-next-line no-unused-vars
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const route = useRoute()

// eslint-disable-next-line no-unused-vars
const store = useBeritaWeb()

function getKategori(val) {
  const arr = val.map(x => x.nama)
  return arr.join(', ')
}

function beritaClick(item) {
  console.log('route', route)
  const slug = String(item.slug).replace(/^"+|"+$/g, '') || 'all'
  // const page = route.params?.slug
  const params = {
    q: slug,
    slug
  }
  console.log('params', params)

  // // store.getContent(params).then(() => {
  // //   router.replace({ name: 'berita', params: { page: params.page }, query: { page: params.q } })
  // // })

  store.getContent(params).then(() => {
    router.replace({ name: 'berita-detail', params: { slug } })
  })
}
</script>

<style lang="scss" scoped>
</style>
