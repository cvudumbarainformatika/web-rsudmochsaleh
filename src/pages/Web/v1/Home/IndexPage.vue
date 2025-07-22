<template>
  <q-page>
    <Suspense>
      <HomePage />
      <template #fallback>
        <AppLoading />
      </template>
    </Suspense>
  </q-page>
</template>

<script setup>
// import { defineAsyncComponent } from 'vue'
import AppLoading from 'src/components/~global/AppLoading.vue'
import HomePage from './HomePage.vue'

</script>

<style lang="scss" scoped>

</style>
