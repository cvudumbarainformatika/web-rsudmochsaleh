<template>
  <q-page>
    <Suspense>
      <PageSubmenu />
      <template #fallback>
        <app-loading />
      </template>
    </Suspense>
  </q-page>
</template>
<script setup>
import { defineAsyncComponent } from 'vue'
const PageSubmenu = defineAsyncComponent(() => import('./PageSubmenu.vue'))
</script>
