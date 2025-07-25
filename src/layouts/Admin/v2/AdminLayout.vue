<template>
  <q-layout
    view="lhr LpR lfr"
    :class="dark?'':'page-light'"
  >
    <leftDraw v-model="store.leftDrawerOpen" />

    <AppClientOnly>
      <q-page-container>
        <router-view />
      </q-page-container>
    </AppClientOnly>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAppStore } from 'src/stores/app'
import { computed } from 'vue'
import LeftDraw from './LeftDraw.vue'

const store = useAppStore()

const $q = useQuasar()
// const mobile = $q.screen.lt.md
// console.log(mobile)
const dark = computed(() => {
  return $q.dark.isActive
})
</script>
