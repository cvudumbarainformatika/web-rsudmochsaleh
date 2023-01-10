<template>
  <q-dialog
    position="right"
  >
    <q-card
      style="width: 350px"
      class="full-height"
    >
      <q-linear-progress
        :value="1"
        color="primary"
      />

      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">
            Gallery Animasi
          </div>
          <div class="text-grey">
            Pilih Animasi
          </div>
        </div>
        <q-space />
        <q-btn
          round
          icon="close"
          flat
          @click="emits('onClose')"
        />
      </q-card-section>
      <q-separator />
      <q-card-section class="bg-grey-2">
        <TablePage />
      </q-card-section>
    </q-card>
    <!-- <Suspense>
    <TablePage />
    <template #fallback>
      <app-loading />
    </template>
  </Suspense> -->
  </q-dialog>
</template>

<script setup>
// import { defineAsyncComponent } from 'vue'
// const TablePage = defineAsyncComponent(() => import('src/components/~animasi/TablePage.vue'))
import TablePage from 'src/components/~animasi/TablePage.vue'
defineProps({
  open: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onClose'])
</script>
