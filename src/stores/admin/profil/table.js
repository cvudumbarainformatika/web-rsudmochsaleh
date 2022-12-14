import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const useProfilTable = defineStore('profil_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      status: '',
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc'
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
    setSearch (val) {
      this.params.q = val
      this.getDataTable()
    },
    setOder (payload) {
      this.params.order_by = payload
      this.params.sort === 'desc' ? this.params.sort = 'asc' : this.params.sort = 'desc'
      this.getDataTable()
    },
    setPage (payload) {
      console.log('setPage', payload)
      this.params.page = payload
      this.getDataTable()
    },
    setPerPage (payload) {
      this.params.per_page = payload
      this.params.page = 1
      this.getDataTable()
    },
    setStatus (payload) {
      this.params.status = payload
      this.params.page = 1
      this.getDataTable()
    },
    setColumns (payload) {
      const thumb = payload.map(x => Object.keys(x))
      this.columns = thumb[0]
      // console.log('columns', this.columns)
    },

    refreshTable() {
      this.params.page = 1
      this.getDataTable()
    },
    async getDataTable () {
      try {
        this.loading = true
        const params = { params: this.params }
        const resp = await api.get('/v1/profils', params)
        console.log('items', resp)
        if (resp.status === 200) {
          this.items = resp.data.data
          this.meta = resp.data
          this.setColumns(resp.data.data)
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
        await api.post('/v1/profil/destroy', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err profil', error.response)
        notifErr(error.response)
      }
    },
    async updateStatus (id, sta) {
      const params = { id, status: sta }
      try {
        await api.post('/v1/profil/update_status', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err profil', error.response)
        notifErr(error.response)
      }
    }
  }
})
