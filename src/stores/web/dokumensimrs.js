import { defineStore } from 'pinia'
import { api2 } from 'src/boot/axios'

export const useDokumenSimrsWeb = defineStore('dokumen_simrs_web', {
  state: () => ({
    data: null,
    isError: false,
    loading: false
  }),
  getters: {
  },
  actions: {
    async cekNoreg(noreg) {
      this.loading = true
      const payload = { noreg }
      try {
        await api2.post('/api/v4/ceknoreg/rajal', payload).then((resp) => {
          // console.log('pelayanan web ', resp)
          if (resp.status === 200) {
            this.data = resp.data
            this.loading = false
          }
          this.loading = false
        })
      } catch (error) {
        // console.log(error)
        this.loading = false
        this.isError = true
        this.data = null
      }
    }

  }
})
