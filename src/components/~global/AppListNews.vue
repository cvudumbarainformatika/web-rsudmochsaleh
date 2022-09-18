<template>
  <q-list
    bordered
    separator
    class="bg-white rounded-borders"
  >
    <template v-if="items.length > 0">
      <q-item
        v-for="(item, n) in items"
        :key="n"
        v-ripple
        clickable
        @click="beritaClick(item)"
      >
        <q-item-section avatar>
          <q-avatar
            rounded
            size="110px"
          >
            <q-img
              :src="pathImg + item.thumbnail"
              style="max-width: 110px; height: 90px;"
              fit="cover"
              class="rounded-borders"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            lines="2"
            class="f-12 text-weight-bold"
          >
            {{ item.judul }}
          </q-item-label>
          <div class="flex items-center text-grey q-my-sm f-10">
            <div class="flex items-center q-mr-sm">
              <q-icon
                name="edit_calendar"
                class="q-pr-xs "
              /> <div>{{ dateHuman(item.created_at) }}</div>
            </div>
            <!-- <div class="flex items-center">
              <q-icon
                name="bookmark"
                class="q-pr-xs "
              /> <div>Kategori : Berita</div>
            </div>
          </div> -->
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
const route = useRoute()
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const store = useBeritaWeb()

function beritaClick(item) {
  console.log(item)
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
.q-item {
  padding: 5px 5px !important;
}
</style>
