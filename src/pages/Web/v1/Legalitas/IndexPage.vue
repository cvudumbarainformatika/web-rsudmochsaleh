<template>
  <AppClientOnly>
    <q-page class="fit column flex-center bg-dark text-white">
      <div
        v-if="loading"
        class="column flex-center"
      >
        <q-spinner-dots
          color="white"
          size="2em"
        />
        <div>Harap Tunggu</div>
      </div>
      <div
        v-else
        class="column flex-center"
      >
        <div
          v-if="!store?.isError"
          class="text-subtitle"
        >
          Dokumen ini dikeluarkan oleh
        </div>
        <div
          v-if="!store?.isError"
          class="text-subtitle2 text-weight-bold"
        >
          {{ title }}
        </div>
        <div
          v-if="!store?.isError"
          class="text-subtitle text-weight-bold"
        >
          KOTA PROBOLINGGO
        </div>
        <div
          v-if="!store?.isError"
          class="text-subtitle q-mb-lg"
        >
          NOREG {{ reg ?? '-' }}
        </div>
        <div
          v-if="!store?.isError"
          class="text-subtitle q-mb-md"
        >
          sebagai pengganti tanda tangan yang Sah oleh
        </div>
        <q-img
          v-if="!store?.isError"
          :src="foto"
          alt="Simrs Picture"
          width="200px"
          referrerpolicy="unsafe-url"
        >
          <template #error>
            <div
              class="absolute-full flex flex-center bg-dark"
              style="color: red"
            >
              Cannot load image
            </div>
          </template>
        </q-img>

        <div class="text-subtitle text-weight-bold q-mt-md">
          {{ nama ?? 'INVALID' }}
        </div>
        <div class="text-subtitle">
          ID {{ ID }}
        </div>
        <!-- <div class="text-subtitle">
          {{ store.data?.petugas?.rs3 ?? '-' }}
        </div> -->
      </div>
    </q-page>
  </AppClientOnly>
</template>

<script setup>
import { useAppStore } from 'src/stores/app'
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDokumenSimrsWeb } from 'src/stores/web/dokumensimrs'
import AppClientOnly from 'src/components/~global/AppClientOnly.vue'
// eslint-disable-next-line no-unused-vars
// import { pathFotoSimrs } from 'src/boot/axios'

const route = useRoute()
  


let store
let app
let title
let reg
let foto
let nama
let ID
let loading
// let 
if (process.env.CLIENT) {

  const store = useDokumenSimrsWeb()
  const app = useAppStore()
  title = computed(() => app.header?.title || '')
  reg = computed(() => store?.data?.noreg)
  foto = computed(() => store?.data?.petugas?.pegawai?.foto_pegawai || null)
  nama = computed(() => store?.data?.petugas?.pegawai?.nama || null)
  ID = computed(() => store?.data?.petugas?.pegawai?.nip || store?.data?.petugas?.pegawai?.nik || '-')
  loading = computed(() => store?.loading)

  onMounted( async () => {
    
  // const noreg = '06562/04/2024/X'
    const noreg = route?.params?.noreg
    // console.log(route?.params?.noreg)
    await store.cekNoreg(noreg)
    // console.log('store app', title.value);
    // console.log('store', store?.data);
    
  })


  

}

// function getImage() {
//   return store?.data?.petugas?.pegawai?.foto_pegawai
// }







</script>
