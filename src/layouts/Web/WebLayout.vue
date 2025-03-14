<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header selalu full width untuk background -->
    <header-web />

    <!-- Main content dengan max-width yang lebih besar -->
    <q-page-container>
      <div
        class="
          mx-auto
          w-full
          px-4
          sm:max-w-[640px]
          md:max-w-[768px]
          lg:max-w-[1024px]
          xl:max-w-[1280px]
          2xl:max-w-[1536px]
        "
      >
        <router-view />
      </div>
    </q-page-container>

    <!-- Footer juga full width untuk background -->
    <app-footer />
  </q-layout>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const HeaderWeb = defineAsyncComponent(() => import('src/components/~web/HeaderWeb.vue'))
const AppFooter = defineAsyncComponent(() => import('src/components/~global/AppFooter.vue'))
</script>

<style>
.q-layout {
  min-height: 100vh;
  width: 100%;
}
</style>
