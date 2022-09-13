<template>
  <q-page>
    <Suspense>
      <HomePage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const HomePage = defineAsyncComponent(() => import('./HomePage.vue'/* webpackChunkName: "HomePage" */))
</script>

<style lang="scss" scoped>

</style>
