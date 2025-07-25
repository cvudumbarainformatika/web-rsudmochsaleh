<template>
  <q-layout
    view="lHh Lpr lFf"
    :class="dark?'':'page-light'"
  >
    <AppClientOnly>
      <q-page-container>
        <router-view />
      </q-page-container>
    </AppClientOnly>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import AppClientOnly from 'src/components/~global/AppClientOnly.vue'

const $q = useQuasar()

const dark = computed(() => {
  return $q.dark.isActive
})

// })
</script>
