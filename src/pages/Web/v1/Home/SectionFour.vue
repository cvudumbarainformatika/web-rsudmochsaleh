<template>
  <div class="container-padding bg-grey-3 q-pt-lg">
    <div
      v-if="items.length ===0"
      class="column flex-center q-py-lg"
    >
      Belum Ada Berita
    </div>
    <div
      v-else
      class="q-py-lg"
    >
      <div class="text-center q-pb-lg">
        <div class="text-h4 text-primary text-weight-bold">
          <span class="text-dark">Portal Berita  </span>
          <span class="text-primary">& Informasi Terbaru</span>
        </div>
      </div>
      <div class="row q-col-gutter-lg q-mt-lg">
        <!-- BIG NEWS -->
        <div class="col-md-7 col-xs-12">
          <app-cardnews />
        </div>
        <!-- CHILD NEWS -->
        <div class="col-md-5 col-xs-12">
          <app-list-news />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, onMounted } from 'vue'

const storeBerita = useBeritaWeb()
const items = computed(() => {
  return storeBerita.beranda
})

console.log(items)

onMounted(() => {
  storeBerita.getData()
})
</script>
