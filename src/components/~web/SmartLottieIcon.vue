<template>
  <div class="smart-lottie-wrapper flex items-center justify-center relative w-full h-full">
    <AppClientOnly v-if="!hasError && Vue3Lottie">
      <component
        :is="Vue3Lottie"
        v-if="lottieLink"
        :animation-link="lottieLink"
        :height="height"
        :width="width"
        :loop="true"
        :autoplay="true"
        @on-error="handleError"
      />
      <component
        :is="Vue3Lottie"
        v-else-if="animationData"
        :animation-data="animationData"
        :height="height"
        :width="width"
        :loop="true"
        :autoplay="true"
        @on-error="handleError"
      />
      <q-icon
        v-else
        :name="icon"
        :size="iconSize"
        class="icon-teal"
      />
    </AppClientOnly>
    <!-- Fallback Icon jika Error atau SSR -->
    <q-icon
      v-else
      :name="icon"
      :size="iconSize"
      class="icon-teal"
    />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import AppClientOnly from 'src/components/~global/AppClientOnly.vue'
import { pathImg } from 'src/boot/axios'

const Vue3Lottie = process.env.SERVER
  ? null
  : defineAsyncComponent(() =>
    import('vue3-lottie').then(m => m.Vue3Lottie).catch(() => null)
  )

const props = defineProps({
  url: {
    type: String,
    default: null
  },
  animationData: {
    type: Object,
    default: null
  },
  icon: {
    type: String,
    default: 'medical_services'
  },
  iconSize: {
    type: String,
    default: '28px'
  },
  height: {
    type: Number,
    default: 48
  },
  width: {
    type: Number,
    default: 48
  }
})

const hasError = ref(false)

const lottieLink = computed(() => {
  if (props.url && typeof props.url === 'string' && props.url.trim() !== '' && props.url !== 'null') {
    if (props.url.startsWith('http') || props.url.startsWith('/')) {
      return props.url
    }
    return pathImg + 'lottie/' + props.url
  }
  return null
})

function handleError(err) {
  console.warn('[Lottie] Error loading animation, falling back to icon:', props.icon, err)
  hasError.value = true
}
</script>

<style scoped>
.smart-lottie-wrapper {
  overflow: hidden;
}
.icon-teal {
  color: #0d9488;
}
</style>
