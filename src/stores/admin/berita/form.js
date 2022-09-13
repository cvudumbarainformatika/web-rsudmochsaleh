import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useBeritaForm = defineStore('berita_form', {
  state: () => ({
    form: {
      title: null,
      slug: null,
      content: null,
      kategori: null,
      image: null
    },
    loading: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setSlug (val) {
      this.form.slug = val
    },
    setKategori(val) {
      this.form.kategori = val
    },
    resetForm() {
      this.form.title = null
      this.form.slug = null
      this.form.content = null
      this.form.image = null
    },
    async saveData(payload) {
      this.loading = true

      try {
        await api.post('/v1/berita/store', payload, {
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
