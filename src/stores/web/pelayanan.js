
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePelayananWeb = defineStore('pelayanan_web', {
  state: () => ({
    items: [],
    menus: [],
    tab: 'all',
    sub: 'sub',
    loading: false
  }),
  getters: {
  },
  actions: {
    setTab(val) {
      this.tab = val
    },
    setSub(val) {
      this.sub = val
    },
    async getData(rute) {
      this.loading = true
      const params = { params: { flag: rute === 'pelayanan' ? null : '1' } }
      try {
        await api.get('/v1/pelayanan/web_content', params).then((resp) => {
          console.log('pelayanan web ', resp)
          this.items = resp.data
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async getMenu() {
      this.loading = true
      const params = { params: { flag: null } }
      try {
        await api.get('/v1/pelayanan/web_content', params).then((resp) => {
          console.log('pelayanan web ', resp)
          this.menus = resp.data
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    }

  }
})
