
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useBeritaWeb = defineStore('berita_web', {
  state: () => ({
    beranda: []
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getData() {
      try {
        await api.get('/v1/berita/data_beranda').then((resp) => {
          console.log(resp)
        })
      } catch (error) {
        console.log(error)
      }
      // const resp = await api.get('/v1/berita/data_beranda')
      // console.log(resp)
    }

  }
})
