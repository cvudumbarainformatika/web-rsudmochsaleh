<template>
  <q-card flat bordered class="q-pa-md bg-white rounded-borders shadow-2">
    <div :class="'text-' + color + ' text-h6 q-mb-md'">{{ title }}</div>
    <q-list separator>
      <q-item v-for="item in items" :key="item.icd">
        <q-item-section>
          <div class="text-weight-medium">{{ item?.keterangan }}</div>
          <div class="text-caption text-grey">{{ item?.icd }}</div>
        </q-item-section>
        <q-item-section side>
          <q-badge :color="color" align="top" transparent>
            {{ item?.jumlah?.toLocaleString() }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
defineProps({
  title: String,
  items: Array,
  color: {
    type: String,
    default: 'primary',
  },
})
</script>

<style scoped>
.shadow-2:hover {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}


</style>