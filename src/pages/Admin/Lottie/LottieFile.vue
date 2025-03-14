<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <Vue3Lottie
      :animationLink="getJson(urlx)"
    />
    <!-- :animationLink="`${pathImg}/lottie/${url}`" -->
  </div>
</template>
<script setup>
import { Vue3Lottie } from 'vue3-lottie'
// hapus import CSS karena tidak diperlukan
// import { toRef } from 'vue'
// import { pathImg } from 'src/boot/axios'
defineProps({
  urlx: {
    type: String,
    default: null
  }
})

// console.log('lottie', props.url)
async function getJson(file) {
  // return 'https://assets8.lottiefiles.com/packages/lf20_1wkkdG.json'
  // return 'http://localhost/api.webrsudmochsaleh/public/storage/lottie/29361-ambulance-doppler-effect.json'
  const data = await file
  return data
}

// export default {
//   components: {
//     Vue3Lottie
//   },

//   setup(props) {
//     const url = toRef(props, 'url') // ✅
//     return {
//       url, pathImg
//     }
//   }
// }

</script>
