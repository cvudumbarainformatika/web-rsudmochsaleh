import { defineStore } from 'pinia'

export const useBeritaStore = defineStore('berita_table', {
  state: () => ({
    items: []
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  actions: {
    async getWebBerita () {
      this.counter++
    }
  }
})
