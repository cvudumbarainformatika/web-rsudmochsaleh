<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h6 text-weight-bold text-teal-9">
          Kelola Interaksi Publik
        </div>
        <div class="text-caption text-grey-7">
          Pengelolaan data tanya jawab, umpan balik, dan konsultasi informasi publik warga RSUD.
        </div>
      </div>
      <q-btn
        color="teal-8"
        icon="add"
        label="Tambah Interaksi Baru"
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
  router.push('/admin/interaksi/form')
}
</script>
