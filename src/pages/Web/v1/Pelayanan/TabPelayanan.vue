<template>
  <q-tabs
    align="left"
    class="q-mb-lg text-white bg-primary full-width container-padding"
    inline-label
    indicator-color="white"
    active-color="white"
    active-bg-color="secondary"
    dense
  >
    <q-tab
      no-caps
      name="all"
      label="Pelayanan"
    />
    <q-separator vertical />
    <q-tab
      v-for="(item, i) in items"
      :key="i"
      no-caps
      :name="item.nama"
      :label="item.nama"
    />
  </q-tabs>
</template>
<script setup>

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.border__tab {
  border:1px solid $grey-4;
}
</style>
