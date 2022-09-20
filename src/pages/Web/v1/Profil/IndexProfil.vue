<template>
  <q-page>
    <Suspense>
      <PageProfil />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const PageProfil = defineAsyncComponent(() => import('./PageProfil.vue'/* webpackChunkName: "PageProfil" */))
</script>

<style lang="scss" scoped>

</style>
