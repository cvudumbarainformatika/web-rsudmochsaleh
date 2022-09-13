import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useCategoryStore = defineStore('category_index', {
  state: () => ({
    items: [],
    loading: false,
    pick: 'all'
  }),

  // getters: {
  //   getterColumns (state) {
  //     return state.columns.filter((el) => !state.columnHide.includes(el))
  //   }
  // },

  actions: {
    async getAll () {
      this.loading = true
      await api.get('/v1/categories').then((resp) => {
        console.log('categories', resp)
        this.items = resp.data
        this.loading = false
      })
    },

    async storeData (params) {
      this.loading = true
      await api.post('/v1/store_category', params).then((resp) => {
        console.log('categories', resp)
        notifSuccess(resp)
        this.getAll()
        this.loading = false
        return new Promise((resolve, reject) => {
          resolve(resp)
        })
      })
    },
    async deleteData (params) {
      this.loading = true
      await api.post('/v1/delete_category', params).then((resp) => {
        console.log('categories', resp)
        notifSuccess(resp)
        this.getAll()
        this.loading = false
        return new Promise((resolve, reject) => {
          resolve(resp)
        })
      })
    }
  }
})
