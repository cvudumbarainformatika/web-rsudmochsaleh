<template>
  <q-page class="fit column flex-center bg-dark text-white">
    <div
      v-if="store.loading"
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
        v-if="!store.isError"
        class="text-subtitle"
      >
        Dokumen ini dikeluarkan oleh
      </div>
      <div
        v-if="!store.isError"
        class="text-subtitle2 text-weight-bold"
      >
        {{ app?.header?.title }}
      </div>
      <div
        v-if="!store.isError"
        class="text-subtitle text-weight-bold q-mb-lg"
      >
        KOTA PROBOLINGGO
      </div>
      <div
        v-if="!store.isError"
        class="text-subtitle q-mb-md"
      >
        ditandatangani secara Electronik oleh
      </div>
      <q-img
        v-if="!store.isError"
        :src="getImage()"
        alt="Simrs Picture"
        width="200px"
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
        {{ store.data?.petugas?.pegawai?.nama ?? 'INVALID' }}
      </div>
      <div class="text-subtitle">
        ID {{ store.data?.petugas?.pegawai?.nip ?? store.data?.petugas?.pegawai?.nik ?? '-' }}
      </div>
      <div class="text-subtitle">
        {{ store.data?.petugas?.rs3 ?? '-' }}
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAppStore } from 'src/stores/app'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDokumenSimrsWeb } from 'src/stores/web/dokumensimrs'
import { pathFotoSimrs } from 'src/boot/axios'

const route = useRoute()
const app = useAppStore()
const store = useDokumenSimrsWeb()

onMounted(() => {
  // const noreg = '06562/04/2024/X'
  const noreg = route?.params?.noreg
  // console.log(route?.params?.noreg)
  store.cekNoreg(noreg)
})

function getImage() {
  return pathFotoSimrs + store.data?.petugas?.pegawai?.nip + '/' + store.data?.petugas?.pegawai?.foto
}

</script>
