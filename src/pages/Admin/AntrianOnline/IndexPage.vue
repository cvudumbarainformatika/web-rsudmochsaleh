<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h6 text-weight-bold text-teal-9">
          Kelola Antrian Online &amp; Registrasi Poliklinik
        </div>
        <div class="text-caption text-grey-7">
          Pengelolaan data pendaftaran tiket antrian online berobat dan integrasi Mobile JKN.
        </div>
      </div>
      <q-btn
        color="teal-8"
        icon="add"
        label="Tambah Layanan Antrian"
        no-caps
        rounded
        @click="openForm"
      />
    </div>

    <TablePage />
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import TablePage from './TablePage.vue'

const router = useRouter()

function openForm() {
  router.push('/admin/antrian-online/form')
}
</script>
