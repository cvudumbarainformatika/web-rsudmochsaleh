<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <q-img
        :src="previewImage"
        fit="fill"
        width="250px"
        class="cursor-pointer"
      />
      <div
        class="text-weight-thin"
        style="font-size: 20vh; margin-top:-20px;"
      >
        404
      </div>

      <div
        class="text-h5"
        style="opacity:.4; margin-top: -50px;"
      >
        Oops. Salah Alamat ...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const previewImage = computed(() => new URL('../assets/images/mad_saleh_minum.png', import.meta.url).href)
</script>
