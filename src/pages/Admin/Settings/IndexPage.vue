<template>
  <q-page>
    <Suspense>
      <SettingPage />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
    <!-- <app-loading /> -->
  </q-page>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const SettingPage = defineAsyncComponent(() => import('./SettingPage.vue'/* webpackChunkName: "SettingPage" */))
</script>

<style lang="scss" scoped>

</style>
