// import VueSocialSharing from 'vue-social-sharing'
// import { Vue3Lottie } from 'vue3-lottie'
import 'uno.css'

export default async ({ app }) => {
  // app.use(VueSocialSharing)
  // app.component('Vue3Lottie', Vue3Lottie)
  if (process.env.CLIENT) {
    const VueSocialSharing = await import('vue-social-sharing')
    app.use(VueSocialSharing.default)

    const { Vue3Lottie } = await import('vue3-lottie')
    app.component('Vue3Lottie', Vue3Lottie)
  }
}
