import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { dateDbFormat } from 'src/modules/formatter'

export const useLottieForm = defineStore('lottie_form', {
  state: () => ({
    form: {
      nama: null,
      url: null,
      animation: null
    },
    loading: false,
    modal: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setModal() {
      this.modal = !this.modal
    },

    async saveData(payload) {
      this.loading = true

      try {
        await api.post('/v1/lottie/store', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        notifErr(error.response)
        this.loading = false
      }
    }
  }
})
