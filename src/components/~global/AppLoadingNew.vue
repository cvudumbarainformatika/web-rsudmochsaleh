<template>
  <transition
    appear
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div
      class="fullscreen z-top"
    >
      <div class="flex column flex-center items-center absolute-center z-top">
        <LottieAnimation
          ref="anim"
          :animation-data="pulse"
          :loop="true"
          :auto-play="true"
          :speed="2"
          @loop-complete="loopComplete"
          @complete="complete"
          @enter-frame="enterFrame"
        />
      <!-- <div
        class="text-weight-bolder absolute-center text-white"
      >
        Harap Tunggu ...
      </div> -->
      </div>
      <div class="bg-white full-width full-height" />
    <!-- <div class="light-dimmed" /> -->
    <!-- <div class="bg-primary" /> -->
    </div>
  </transition>
</template>

<script>
import { LottieAnimation } from 'lottie-web-vue'
import { onMounted, ref } from 'vue'
// import ambulanceGrs from 'src/assets/lottie/127025-ambulance.json'
import hati from 'src/assets/lottie/4565-heartbeat-medical.json'
import pulse from 'src/assets/lottie/38359-pulse.json'

export default {
  components: {
    LottieAnimation
  },
  setup() {
    const anim = ref(null)

    const loopComplete = () => {
      console.log('loopComplete')
    }

    const complete = () => {
      console.log('complete')
    }

    const enterFrame = () => {
      console.log('enterFrame')
    }

    onMounted(() => {
      // the DOM element will be assigned to the ref after initial render
      // anim.value.play()
      console.log('anim', anim)
    })

    return {
      anim,
      loopComplete,
      complete,
      enterFrame,
      // ambulanceGrs,
      hati,
      pulse
    }
  }
}
</script>

<style lang="scss" scoped>
.loadingOp {
  opacity: .9;
}
</style>
