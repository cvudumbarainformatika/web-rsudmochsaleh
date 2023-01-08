<template>
  <div>
    <q-card>
      <q-card-section>
        <div>
          Gallery Animasi
        </div>
      </q-card-section>
      <q-separator
        inset
      />
      <q-card-section>
        <div class="text-h6">
          {{ form.modal }}
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
import { useLottieForm } from 'src/stores/admin/lottie/form'
import FormUploadVue from './FormUpload.vue'
const form = useLottieForm()
</script>
