<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div>
    <Vue3Lottie
      ref="anim"
      :animationLink="getJson()"
    />
  </div>
</template>
<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import { pathImg } from 'src/boot/axios'
import { watch, ref } from 'vue'

// import preview from 'src/assets/lottie/123408-image-not-preview.json'

const props = defineProps({
  url: {
    type: String,
    default: null
  }
})

const anim = ref(null)

// const getJson = computed(() => {
//   if (props.url === null || props.url === 'undefined' || props.url === undefined || props.url === '') {
//     return new URL('../../assets/lottie/123408-image-not-preview.json', import.meta.url).href
//   } else {
//     return pathImg + 'lottie/' + props.url
//   }
// })

// const onLoaded = () => {
//   console.log('loaded ')
// }
// console.log('lottie', anim.value)
function getJson() {
  const file = props.url
  if (file === null || file === 'undefined' || file === undefined || file === '') {
    return new URL('../../assets/lottie/123408-image-not-preview.json', import.meta.url).href
  } else {
    return pathImg + 'lottie/' + file
  }
}

watch(() => props.url, (obj) => {
  console.log('watch lottie', obj)
  console.log('lottie ref', anim.value)

  // anim.value.destroy()
  getJson()
  // anim.value.play()
  // setTimeout(() => {
  //   getJson()
  // }, 2000)
})

</script>
