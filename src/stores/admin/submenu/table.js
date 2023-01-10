import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useSubmenuTable = defineStore('submenu_table', {
  state: () => ({
    items: [],
    item: {},
    loading: false,
    params: {
      q: '',
      pelayanan_id: null
    },
    columns: [],
    columnHide: [
      'id']
  }),

  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },

  actions: {

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    setColumns (payload) {
      const thumb = payload.map(x => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },
    async getDataTable(payload) {
      this.params.pelayanan_id = payload
      const params = { params: this.params }
      try {
        this.loading = true
        const resp = await api.get('/v1/submenus', params)
        console.log('items', resp)
        if (resp.status === 200) {
          this.items = resp.data
          this.setColumns(resp.data)
          this.loading = false
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    async deletesData (payload) {
      const params = { id: payload }
      try {
        await api.post('/v1/submenu/destroy', params).then(resp => {
          notifSuccess(resp)
          // this.getDataTable()
          const index = this.items.indexOf(payload)
          if (index > -1) { // only splice array when item is found
            this.items.splice(index, 1) // 2nd parameter means remove one item only
          }
        })
      } catch (error) {
        console.log('err submenu', error.response)
        notifErr(error.response)
      }
    },
    async updateStatus (id, sta) {
      const params = { id, status: sta }
      try {
        await api.post('/v1/submenu/update_status', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err submenu', error.response)
        notifErr(error.response)
      }
    }
  }
})
