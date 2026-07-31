import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAntrianOnlineWeb = defineStore('antrian_online_web', {
  state: () => ({
    items: [],
    menus: [],
    tab: 'all',
    loading: false
  }),
  actions: {
    setTab(val) {
      this.tab = val
    },
    async getData() {
      this.loading = true
      try {
        const resp = await api.get('/v1/antrian/web_content')
        this.items = resp.data || []
      } catch (error) {
        // Endpoint antrian belum ada di backend, biarkan items kosong
        this.items = []
      } finally {
        this.loading = false
      }
    }
  }
})
