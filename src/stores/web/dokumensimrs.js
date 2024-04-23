
import { defineStore } from 'pinia'
import { api2 } from 'src/boot/axios'

export const useDokumenSimrsWeb = defineStore('dokumen_simrs_web', {
  state: () => ({
    data: null,
    isError: false
  }),
  getters: {
  },
  actions: {
    async cekNoreg(noreg) {
      this.loading = true
      this.data = null
      this.isError = false
      const payload = { noreg }
      try {
        await api2.post('/api/v4/ceknoreg/rajal', payload).then((resp) => {
          console.log('pelayanan web ', resp)
          if (resp.status === 200) {
            this.data = resp.data
            this.isError = false
            this.loading = false
          }
          this.loading = false
          this.isError = true
          this.data = null
        })
      } catch (error) {
        console.log(error)
        this.loading = false
        this.isError = true
        this.data = null
      }
    }

  }
})
