<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <Vue3Lottie
      :animationLink="getJson(url)"
    />
  </div>
</template>
<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'
import { pathImg } from 'src/boot/axios'

// import preview from 'src/assets/lottie/123408-image-not-preview.json'

defineProps({
  url: {
    type: String,
    default: null
  }
})

// console.log('lottie', props.url)
function getJson(file) {
  if (file === null || file === 'undefined' || file === undefined || file === '') {
    return new URL('../../assets/lottie/123408-image-not-preview.json', import.meta.url).href
  } else {
    return pathImg + 'lottie/' + file
  }
}

</script>
