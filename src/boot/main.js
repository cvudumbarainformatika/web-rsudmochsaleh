import VueSocialSharing from 'vue-social-sharing'
import LottieAnimation from 'lottie-web-vue'

export default async ({ app }) => {
  app.use(VueSocialSharing)
  app.use(LottieAnimation)
}
