<template>
  <div>
    <q-parallax
      :height="250"
      :speed="0.5"
    >
      <template #media>
        <img src="https://cdn.quasar.dev/img/parallax1.jpg">
      </template>

      <div class="absolute-bottom text-center q-ma-lg">
        <div class=" my--style text-h6 text-white text-capitalize">
          {{ route.name }}
        </div>
      </div>
    </q-parallax>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('banner', route)
</script>

<style lang="scss" scoped>
.my--style{
  min-width: 100px;
}
</style>
