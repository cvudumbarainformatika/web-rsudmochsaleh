<template>
  <div class="text-right  q-py-lg">
    <div
      class="text-h2 text-primary"
    >
      {{ judul }}
    </div>
    <div class="text-grey">
      <span class="text-secondary"> {{ route.name }} </span>    UOBK RSUD MOHAMAD SALEH
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps({
  judul: {
    type: String,
    default: 'Pelayanan'
  }
})

const route = useRoute()
</script>
