import VueSocialSharing from 'vue-social-sharing'
import { Vue3Lottie } from 'vue3-lottie'

export default async ({ app }) => {
  app.use(VueSocialSharing)
  app.component('Vue3Lottie', Vue3Lottie)
}
