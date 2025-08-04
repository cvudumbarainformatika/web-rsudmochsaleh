<template>
  <q-page>
    <Suspense>
      <DashboardICD />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const DashboardICD = defineAsyncComponent(() => import('./DashboardICD.vue'))
</script>

<style lang="scss" scoped>

</style>
