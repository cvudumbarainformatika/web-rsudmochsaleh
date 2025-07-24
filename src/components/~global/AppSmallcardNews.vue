<template>
  <q-card
    flat
    bordered
    class="cursor-pointer card-news"
    @click="beritaClick(item)"
  >
    <q-img
      :src="pathImg + item.thumbnail"
      :ratio="16/9"
      fit="cover"
      alt="gambar thumbnail rsud dr mohamad saleh"
    />
    <q-card-section>
      <q-item-label
        lines="2"
        class="f-12 text-weight-bold"
      >
        {{ item.judul }}
      </q-item-label>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useBeritaWeb } from 'src/stores/web/berita'
import { useRoute, useRouter } from 'vue-router'
defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

// eslint-disable-next-line no-unused-vars
const route = useRoute()
const router = useRouter()
const store = useBeritaWeb()

function beritaClick(val) {
  // console.log(val)
  // const page = route.params.page || 'all'
  // const params = {
  //   q: val.slug,
  //   page
  // }
  // store.getContent(params).then(() => {
  //   router.replace({ name: 'berita', params: { page: params.page }, query: { page: params.q } })
  // })
  const slug = String(val.slug).replace(/^"+|"+$/g, '') || 'all'
  const params = {
    q: slug,
    slug
  }
  // console.log('params', params)
  store.getContent(params).then(() => {
    router.replace({ name: 'berita-detail', params: { slug } })
  })
}
</script>

<style lang="scss" scoped>
.card-news{
  color:$grey-10;
}
</style>
