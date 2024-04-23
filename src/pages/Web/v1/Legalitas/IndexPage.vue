<template>
  <q-page class="fit column flex-center bg-dark text-white">
    <div class="text-subtitle">
      Dokumen ini dikeluarkan oleh
    </div>
    <div class="text-subtitle2 text-weight-bold">
      {{ app?.header?.title }}
    </div>
    <div class="text-subtitle text-weight-bold">
      KOTA PROBOLINGGO
    </div>
    <div class="text-subtitle">
      ditandatangani secara Electronik oleh
    </div>
    <div class="text-subtitle text-weight-bold">
      {{ store.data?.datasimpeg?.nama ?? 'INVALID' }}
    </div>
    <div class="text-subtitle">
      ID {{ store.data?.datasimpeg?.nip ?? store.data?.datasimpeg?.nik ?? '-' }}
    </div>
    <div class="text-subtitle">
      {{ store.data?.rs3 ?? '-' }}
    </div>
  </q-page>
</template>

<script setup>
import { useAppStore } from 'src/stores/app'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDokumenSimrsWeb } from 'src/stores/web/dokumensimrs'

const route = useRoute()
const app = useAppStore()
const store = useDokumenSimrsWeb()

onMounted(() => {
  // const noreg = '06562/04/2024/X'
  const noreg = route?.params?.noreg
  // console.log(route?.params?.noreg)
  store.cekNoreg(noreg)
})

</script>
