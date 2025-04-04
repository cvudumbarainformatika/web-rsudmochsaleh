import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
// import { Dialog } from 'quasar'

export const usePelayananTable = defineStore('pelayanan_table', {
  state: () => ({
    items: [],
    meta: {},
    item: {},
    loading: false,
    params: {
      q: '',
      flag: '',
      page: 1,
      per_page: 100,
      order_by: 'created_at',
      sort: 'desc'
    },
    columns: [],
    columnHide: [
      'id'],
    routeName: null
  }),

  getters: {
    getterColumns (state) {
      return state.columns.filter((el) => !state.columnHide.includes(el))
    }
  },

  actions: {
    setRouteName(val) {
      this.routeName = val
      if (val === 'admin.pokja') {
        this.params.flag = '1' // ini untuk flag pokja
      } else if (val === 'admin.pengaduan') {
        this.params.flag = '2' // ini untuk flag pengaduan
      } else {
        this.params.flag = null
      }
    },
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
    async getDataTable() {
      try {
        this.loading = true
        const params = { params: this.params }
        const resp = await api.get('/v1/pelayanans', params)
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
        await api.post('/v1/pelayanan/destroy', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err pelayanan', error.response)
        notifErr(error.response)
      }
    },
    async updateStatus (id, sta) {
      const params = { id, status: sta }
      try {
        await api.post('/v1/pelayanan/update_status', params).then(resp => {
          notifSuccess(resp)
          this.getDataTable()
        })
      } catch (error) {
        console.log('err pelayanan', error.response)
        notifErr(error.response)
      }
    }
  }
})
