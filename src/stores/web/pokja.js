
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePokjaWeb = defineStore('pokja_web', {
  state: () => ({
    items: [],
    menus: [],
    tab: 'all',
    loading: false
  }),
  getters: {
  },
  actions: {
    setTab(val) {
      this.tab = val
    },
    async getData() {
      this.loading = true
      const params = { params: { flag: '1' } }
      try {
        await api.get('/v1/pelayanan/web_content', params).then((resp) => {
          // console.log('pokja web ', resp)
          this.items = resp.data
          this.loading = false
        })
      } catch (error) {
        // console.log(error)
        this.loading = false
      }
    },
    async getMenu() {
      this.loading = true
      const params = { params: { flag: '1' } }
      try {
        await api.get('/v1/pelayanan/web_content', params).then((resp) => {
          // console.log('pokja web ', resp)
          this.menus = resp.data
          this.loading = false
        })
      } catch (error) {
        // console.log(error)
        this.loading = false
      }
    }

  }
})
