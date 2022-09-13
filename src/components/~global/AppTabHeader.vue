<template>
  <q-tabs
    v-model="store.pick"
    align="left"
    class="q-mb-lg text-black border__tab"
    inline-label
    indicator-color="secondary"
    active-color="secondary"
  >
    <q-route-tab
      name="all"
      label="Berita"
      icon="newspaper"
      no-caps
      :to="{path:'/berita'}"
      exact-active-class="bg-grey-3"
      exact
      replace
    />
    <q-separator vertical />
    <q-route-tab
      v-for="(item, n) in items"
      :key="n"
      :name="n"
      :label="item.nama"
      no-caps
      :to="{ path:`/berita/${n}` }"
      exact-active-class="bg-grey-3"
      exact
      replace
    />
  </q-tabs>
</template>
<script setup>
import { useCategoryStore } from 'src/stores/admin/category'
import { computed } from 'vue'
const store = useCategoryStore()

const items = computed(() => store.items)

// defineProps({
//   items: {
//     type: Array,
//     default: () => []
//   }
// })
</script>

<style lang="scss" scoped>

.border__tab {
  border:1px solid $grey-4;
}
</style>
