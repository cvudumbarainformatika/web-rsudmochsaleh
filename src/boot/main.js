import VueSocialSharing from 'vue-social-sharing'
// import { LottieAnimation } from 'lottie-web-vue'
// import { Vue3Lottie } from 'vue3-lottie'
// import LottieVuePlayer from '@lottiefiles/vue-lottie-player'
// import { LottieAnimation } from 'lottie-vuejs/src/LottieAnimation.vue'

export default async ({ app }) => {
  app.use(VueSocialSharing)
  // app.use(LottieAnimation)
  // app.use(LottieVuePlayer)
  // app.use(Vue3Lottie)
}
