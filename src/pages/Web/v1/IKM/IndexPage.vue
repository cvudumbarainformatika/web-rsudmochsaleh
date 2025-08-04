<template>
  <q-page>
    <Suspense>
      <IkmPage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const IkmPage = defineAsyncComponent(() => import('./IkmPage.vue'))
</script>

<style lang="scss" scoped>

</style>
