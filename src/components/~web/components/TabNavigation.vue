<template>
  <div
    v-if="showTabs"
    class="tab-navigation q-px-md"
  >
    <q-tabs
      v-model="activeTab"
      class="text-white"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab
        v-for="tab in tabs"
        :key="tab.name"
        :name="tab.name"
        :label="tab.label"
        @click="handleTabClick(tab)"
      />
    </q-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  route: {
    type: Object,
    required: true
  },
  store: {
    type: Object,
    required: true
  },
  stores: {
    type: Object,
    required: true
  }
})

const activeTab = ref(null)

const showTabs = computed(() => {
  return ['pelayanan', 'profil', 'ppid', 'pokja'].includes(props.route.name)
})

const tabs = computed(() => {
  const storeName = props.route.name
  return props.stores[storeName]?.tabs || []
})

const handleTabClick = (tab) => {
  const storeName = props.route.name
  props.stores[storeName]?.setTab(tab.name)
}
</script>

<style scoped>
.tab-navigation {
  background-color: white;
}
</style>
