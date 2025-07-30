<template>
  <q-page>
    <Suspense>
      <RuangPerawatanPage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const RuangPerawatanPage = defineAsyncComponent(() => import('./RuangPerawatanPage.vue'))
</script>

<style lang="scss" scoped>

</style>
