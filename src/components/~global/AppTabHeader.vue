<template>
  <q-tabs
    v-model="selected"
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
      :to="{ name: 'berita', params: { page: 'all' }}"
      exact
      exact-active-class="bg-grey-3"
      replace
    />
    <q-separator vertical />
    <q-route-tab
      v-for="(item, n) in items"
      :key="n"
      :name="item.url"
      :label="item.nama"
      no-caps
      :to="{ name: 'berita', params: { page: item.url } }"
      exact-active-class="bg-grey-3"
      exact
      replace
    />
  </q-tabs>
</template>
<script setup>
import { useCategoryStore } from 'src/stores/admin/category'
import { useBeritaWeb } from 'src/stores/web/berita'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const store = useCategoryStore()
const storeBerita = useBeritaWeb()

const items = computed(() => store.items)
const selected = computed({
  get() {
    return store.pick
  },
  set(newVal) {
    const wew = newVal || route.params.page
    store.setSelected(wew)
  }
})
const route = useRoute()

// function modelChange(val) {
//   console.log('store-params', route)
//   const params = val || 'all'
//   console.log('app-tab-header', params)
//   store.setSelected(params)
//   storeBerita.getData(params)
// }

// console.log('asdasd', items)

watch(() => selected.value, (obj, old) => {
  console.log('watch old', old)
  const newObj = obj || 'all'
  console.log('watch new', newObj)
  store.setSelected(newObj)
  storeBerita.getDataPagin(newObj)
})
</script>

<style lang="scss" scoped>

.border__tab {
  border:1px solid $grey-4;
}
</style>
