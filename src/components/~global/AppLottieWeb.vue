<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div
    class="lottie-container"
    :style="containerStyle"
  >
    <AppClientOnly>
      <Vue3Lottie
        ref="anim"
        :animationLink="getJson()"
        :height="height"
        :width="width"
        :style="lottieStyle"
      />
    </AppClientOnly>
  </div>
</template>
<script setup>
// import { Vue3Lottie } from 'vue3-lottie'
import { pathImg } from 'src/boot/axios'
import { watch, ref, computed, defineAsyncComponent, onMounted } from 'vue'

const Vue3Lottie = process.env.SERVER
  ? null
  : defineAsyncComponent(() =>
    import('vue3-lottie').then(m => m.Vue3Lottie)
  )

const props = defineProps({
  url: {
    type: String,
    default: null
  },
  height: {
    type: Number,
    default: 200
  },
  width: {
    type: Number,
    default: null
  },
  fit: {
    type: String,
    default: 'cover' // 'cover' | 'contain' | 'fill'
  }
})

const anim = ref(null)

onMounted(() => {
  // console.log('SSR:', process.env.SERVER)
  // console.log('Vue3Lottie:', Vue3Lottie)
})

const containerStyle = computed(() => ({
  height: `${props.height}px`,
  width: props.width ? `${props.width}px` : '100%',
  overflow: 'hidden',
  position: 'relative'
}))

const lottieStyle = computed(() => ({
  objectFit: props.fit,
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}))

function getJson() {
  try {
    const file = props.url
    if (!file) {
      return new URL('../../assets/lottie/123408-image-not-preview.json', import.meta.url).href
    }
    return pathImg + 'lottie/' + file
  } catch (error) {
    console.log('error lottie url', error)
  }
}

watch(() => props.url, (newUrl) => {
  if (newUrl && anim.value) {
    getJson()
  }
})
</script>

<style scoped>
.lottie-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
