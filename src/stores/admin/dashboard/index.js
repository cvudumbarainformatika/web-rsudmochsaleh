import { defineStore } from 'pinia'

import { api } from 'src/boot/axios'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    kunjungan: 0,
    hari_ini: 0,
    berita: 0,
    users: 0
  }),
  getters: {
    doubleCount: (state) => state.dashboard * 2
  },
  actions: {
    async getData () {
      await api.get('v1/dashboard').then((resp) => {
        console.log(resp)
        this.kunjungan = resp.data.kunjungan
        this.hari_ini = resp.data.view_hr_ini
        this.berita = resp.data.berita
        this.users = resp.data.user
      })
    }
  }
})
