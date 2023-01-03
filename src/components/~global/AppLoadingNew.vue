<template>
  <div
    class="flex column flex-center"
  >
    <div>
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
    </div>
    <div class="text-lg">
      Harap Tunggu ...
    </div>
  </div>
</template>

<script>
import { LottieAnimation } from 'lottie-web-vue'
import { onMounted, ref } from 'vue'
import ambulanceGrs from 'src/assets/lottie/127025-ambulance.json'
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
      ambulanceGrs,
      hati,
      pulse
    }
  }
}
</script>
