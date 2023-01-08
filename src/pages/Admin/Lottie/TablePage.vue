
<template>
  <div>
    <q-card>
      <q-card-section>
        <div>
          Gallery Animasi
        </div>
      </q-card-section>
      <q-card-section class="bg-grey-4">
        <div class="row q-col-gutter-md">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="col-md-3 col-lg-3 col-sm-6 col-xs-6"
          >
            <q-card round>
              <Vue3Lottie
                :animation-link="getFile(item.url)"
                :height="200"
              />
              <div class="f-12 text-center q-pa-md ellipsis">
                {{ item.nama }}
              </div>
            </q-card>
            <!-- <lottie-vue-player
              :src="`https://assets10.lottiefiles.com/packages/lf20_tzjfwgud.json`"

              :player-controls="true"
              style="width: 100%; height:400px"
            /> -->
            <!-- <lottie-animation
              ref="anim"
              :animation-data="getFile(item.url)"
              :auto-play="true"
              :loop="true"
              :speed="1"
            /> -->
          </div>
        </div>
      </q-card-section>
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

const form = useLottieForm()
const store = useLottieTable()

const anim = ref(null)
const folder = import.meta.globEager('assets/lottie/*.json')
const items = ref([])

const getFile = (file) => {
  // return new URL(file, import.meta.url).href
  return new URL('http://localhost/api.webrsudmochsaleh/public/storage/lottie/29361-ambulance-doppler-effect.json').href
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
  console.log(anim.value)
})
</script>
