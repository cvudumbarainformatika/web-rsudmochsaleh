<template>
  <router-view />
</template>

<script setup>
// import { onMounted } from 'vue'
import { useQuasar } from 'quasar'

import customIcons from 'src/custom-icons/custom-icons'
// import { useAppStore } from './stores/app'

// export default defineComponent({
//   name: 'App',
//   setup() {
const $q = useQuasar()
// const store = useAppStore()
// console.log($q.dark.isActive)
$q.dark.set(false)
$q.iconSet.set(customIcons)
document.body.setAttribute(['data-theme'], 'custom')

// onMounted(() => {
//   for (let i = 0; i < store.themes.length; i++) {
//     setCssVar(store.themes[i].name, store.themes[i].value)
//     // document.body.style.setProperty(`--q-${store.themes[i].name}`, store.themes[i].value)
//   }
// })
//   }
// })
</script>
