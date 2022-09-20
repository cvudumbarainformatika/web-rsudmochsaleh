<template>
  <q-tabs
    align="left"
    class="q-mb-lg text-black border__tab"
    inline-label
    indicator-color="secondary"
    active-color="secondary"
  >
    <q-tab
      no-caps
      name="all"
      label="Profil"
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
