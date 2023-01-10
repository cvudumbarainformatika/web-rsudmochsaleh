<template>
  <div class="row q-col-gutter-sm">
    <div
      v-for="(item, i) in store.items"
      :key="i"
      class="col-4"
    >
      <q-card round>
        <Vue3Lottie
          :animation-link="getFile(item.url)"
          :height="100"
        />
        <div class="f-8 text-center q-pa-md ellipsis">
          {{ item.url }}
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
// import { useLottieForm } from 'src/stores/admin/lottie/form'
import { useLottieTable } from 'src/stores/admin/lottie/table'
import { onMounted } from 'vue'
// import FormUploadVue from './FormUpload.vue'
import { pathImg } from 'src/boot/axios'

// const form = useLottieForm()
const store = useLottieTable()

const getFile = (file) => {
  return pathImg + 'lottie/' + file
}
onMounted(() => {
  store.getDataTable()
})
</script>
