<template>
  <q-layout view="lHh Lpr lFf">
    <header-web />
    <q-page-container>
      <router-view />
    </q-page-container>

    <app-footer />
  </q-layout>
</template>

<script setup>
import HeaderWeb from 'src/components/~web/HeaderWeb.vue'
// import { useAppStore } from 'src/stores/app'
// import { computed } from 'vue'

// const store = useAppStore()
// const prim = computed(() => {
//   let pri = '#423a8e'
//   if (store.themes.length > 0) {
//     pri = store.themes[0].value
//   }
//   return pri
// })
// const second = computed(() => {
//   let sec = '#06b8b8'
//   if (store.themes.length > 0) {
//     sec = store.themes[1].value
//   }
//   return sec
// })
</script>

<!-- <style lang="scss" scoped>
.bgr-atas {
  position: relative;
  top: 0;
  width: 100%;
  height: 500px;
  background-color: v-bind(prim);
}
</style> -->
