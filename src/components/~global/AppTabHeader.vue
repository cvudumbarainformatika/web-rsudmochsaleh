<template>
  <q-tabs
    v-model="selected"
    align="left"
    class="q-mb-lg text-white border__tab bg-primary full-width container-padding"
    inline-label
    indicator-color="white"
    active-color="white"
    dense
  >
    <q-route-tab
      name="all"
      label="Berita"
      icon="newspaper"
      no-caps
      :to="{ name: 'berita', params: { page: 'all' }}"
      exact
      exact-active-class="bg-secondary"
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
      exact-active-class="bg-secondary"
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
// eslint-disable-next-line no-unused-vars
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
  // console.log('watch old', old)
  // const newObj = obj || 'all'
  // console.log('watch new', newObj)
  // store.setSelected(newObj)
  // storeBerita.getDataPagin(newObj)
})
</script>

<style lang="scss" scoped>

.border__tab {
  // border:1px solid $grey-4;
}
</style>
