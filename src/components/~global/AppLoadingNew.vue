<template>
  <transition
    appear
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="fullscreen z-top">
      <div class="flex column flex-center items-center absolute-center z-top">
        <Vue3Lottie
          ref="anim"
          :animation-data="pulse"
          :loop="true"
          :auto-play="true"
          :speed="2"
        />
      </div>
      <div class="bg-white full-width full-height" />
    </div>
  </transition>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import { onMounted, ref } from 'vue'
import pulse from 'src/assets/lottie/38359-pulse.json'

const anim = ref(null)

onMounted(() => {
  console.log('anim', anim)
})
</script>

<style lang="scss" scoped>
.loadingOp {
  opacity: .9;
}
</style>
