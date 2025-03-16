<template>
  <transition
    appear
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div class="fixed inset-0 z-50">
      <!-- Glassmorphism backdrop -->
      <div class="absolute inset-0 backdrop-blur-md bg-black/20" />

      <!-- Loading container -->
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <!-- Lottie animation -->
        <div class="relative">
          <div class="absolute -inset-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-xl animate-pulse" />
          <Vue3Lottie
            ref="anim"
            :animation-data="pulse"
            :loop="true"
            :auto-play="true"
            :speed="1.5"
            class="w-32 h-32 relative"
          />
        </div>

        <!-- Loading text -->
        <div class="mt-8 text-center">
          <div class="text-xl font-bold text-white/90 tracking-wider animate-bounce-slow">
            Loading
          </div>
          <div class="mt-2 flex gap-1 items-center justify-center">
            <div
              v-for="i in 3"
              :key="i"
              class="w-2 h-2 rounded-full bg-primary/80"
              :class="[`animate-bounce-${i}`]"
            />
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/30 rounded-full animate-ping-slow" />
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-secondary/20 rounded-full animate-spin-slow" />
        </div>
      </div>
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

<style>
.animate-bounce-1 {
  animation: bounce 1s infinite;
  animation-delay: 0s;
}

.animate-bounce-2 {
  animation: bounce 1s infinite;
  animation-delay: 0.2s;
}

.animate-bounce-3 {
  animation: bounce 1s infinite;
  animation-delay: 0.4s;
}

.animate-ping-slow {
  animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-bounce-slow {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes ping {
  75%, 100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
