<!-- eslint-disable vue/attribute-hyphenation -->

<template>
  <div>
    <q-card>
      <q-card-section>
        <div>
          Gallery Animasi
        </div>
      </q-card-section>
      <q-card-section class="bg-grey-4">
        <div
          v-if="!store.loading"
          class="row q-col-gutter-md"
        >
          <div
            v-for="(item, i) in store.items"
            :key="i"
            class="col-md-3 col-lg-3 col-sm-6 col-xs-6"
          >
            <q-card round>
              <Vue3Lottie
                :animationLink="getFile(item.url)"
                :height="200"
              />
              <div class="f-12 text-center q-pa-md ellipsis">
                {{ item.url }}
              </div>
            </q-card>
          </div>
        </div>
        <div
          v-else
          class="column flex-center text-grey-8"
          style="min-height:300px"
        >
          <q-spinner-cube
            color="primary"
            size="3em"
          />
          <div>Harap Tunggu ...</div>
        </div>
      </q-card-section>
      <q-card-section />
    </q-card>

    <!-- modal -->
    <q-dialog
      v-model="form.modal"
      full-width
      full-height
      persistent
    >
      <FormUploadVue @on-close="form.setModal" />
    </q-dialog>
  </div>
</template>

<script setup>

// import LottieAnimation from 'lottie-web-vue'
// import { LottieAnimation } from 'lottie-vuejs/src/LottieAnimation.vue' // import lottie-vuejs
// import LottieVuePlayer from '@lottiefiles/vue-lottie-player'
// import LottieFileVue from './LottieFile.vue'
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import { useLottieForm } from 'src/stores/admin/lottie/form'
import { useLottieTable } from 'src/stores/admin/lottie/table'
import { onMounted, ref } from 'vue'
import FormUploadVue from './FormUpload.vue'
import { pathImg } from 'src/boot/axios'

const form = useLottieForm()
const store = useLottieTable()

// const anim = ref(null)
const folder = import.meta.globEager('assets/lottie/*.json')
const items = ref([])

const getFile = (file) => {
  // return new URL(file, import.meta.url).href
  // return new URL(pathImg + 'lottie/' + file, import.meta.url).href
  return pathImg + 'lottie/' + file
}

Object.entries(folder).forEach(([path, m]) => {
  const o = path.split('/').pop().replace(/\.\w+$/, '')
  console.log(`${o}`)
})

function pushed() {
  Object.entries(folder).forEach(([path, m]) => {
    const x = {
      nama: path.split('/').pop().replace(/\.\w+$/, ''),
      url: path
    }
    items.value.push(x)
  })
}
// console.log('folder', namaAnim)

onMounted(() => {
  store.getDataTable()
  pushed()
})
</script>
