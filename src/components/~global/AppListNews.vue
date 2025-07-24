<template>
  <q-list
    bordered
    separator
    class="bg-white rounded-borders"
    dense
  >
    <template v-if="items.length > 0">
      <template v-if="!loading">
        <q-item
          v-for="(item, n) in items"
          :key="n"
          v-ripple
          clickable
          @click="beritaClick(item)"
        >
          <q-item-section
            avatar
          >
            <q-avatar
              rounded
              size="90px"
            >
              <q-img
                :src="pathImg + item.thumbnail"
                :ratio="1"
                fit="cover"
                class="rounded-borders"
                alt="gambar thumbnail rsud dr mohamad saleh"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label
              lines="2"
              class="f-12 text-weight-bold q-pt-xs"
            >
              {{ item.judul }}
            </q-item-label>
            <div class="flex items-center text-grey q-my-sm f-10">
              <div class="flex items-center q-mr-sm">
                <q-icon
                  name="edit_calendar"
                  class="q-pr-xs "
                /> <div>{{ dateHuman(item.tanggal) }}</div>
              </div>
              <q-item-label
                lines="2"
                class="f-10 q-mt-sm"
              >
                <div v-html="item.content" />
              </q-item-label>
            </div>
          </q-item-section>
        </q-item>
      </template>
      <template v-else>
        <div
          v-for="(y, x) in y = items.length"
          :key="x"
          class="row flex-1"
        >
          <q-skeleton
            size="90px"
            square
            animation="fade"
            class="q-mb-sm q-mr-sm"
          />
          <div
            class="flex-1"
          >
            <q-skeleton
              type="text"
              square
              width="40%"
              animation="fade"
            />
            <q-skeleton
              type="text"
              square
              height="10px"
              width="10%"
              animation="fade"
              class="q-my-xs"
            />
            <q-skeleton
              type="text"
              square
              height="12px"
              width="95%"
              animation="fade"
            />
            <q-skeleton
              type="text"
              square
              height="12px"
              width="90%"
              animation="fade"
            />
            <q-skeleton
              type="text"
              square
              height="12px"
              width="60%"
              animation="fade"
            />
          </div>
        </div>
      </template>
    </template>

    <template v-else>
      <div class="q-pa-md">
        Belum Ada List Berita
      </div>
    </template>
  </q-list>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { dateHuman } from 'src/modules/formatter'
import { useBeritaWeb } from 'src/stores/web/berita'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const route = useRoute()
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

function beritaClick(item) {
  // console.log(item)
  // const page = route.params.page || 'all'
  // const params = {
  //   q: item.slug,
  //   page
  // }
  // store.getContent(params).then(() => {
  //   router.replace({ name: 'berita', params: { page: params.page }, query: { page: params.q } })
  // })
  const slug = String(item.slug).replace(/^"+|"+$/g, '') || 'all'
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
.q-item {
  padding: 2px 10px 2px 2px !important;
}
</style>
