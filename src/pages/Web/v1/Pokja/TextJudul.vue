<template>
  <div class="text-right  q-py-lg">
    <div
      class="text-h2 text-primary"
    >
      {{ judul }}
    </div>
    <div class="text-grey">
      UOBK RSUD MOHAMAD SALEH
    </div>
  </div>
</template>

<script setup>
defineProps({
  judul: {
    type: String,
    default: 'Pelayanan'
  }
})
</script>
