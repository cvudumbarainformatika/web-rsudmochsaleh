import { defineStore } from 'pinia'
import { api2 } from 'src/boot/axios'

export const useTempatTidurStore = defineStore('tempat-tidur-store', {
  state: () => ({
    data: null,
    kelas: null,
    isError: false,
    loading: false
  }),
  getters: {
  },
  actions: {
    async getData() {
      this.loading = true
      try {
        const resp = await api2.get('/api/v4/cektt/ranap')
          // console.log('cek tt ', resp)
          if (resp.status === 200) {
            this.data = resp.data?.tempat_tidur || []
            const kelas = [...new Set(this.data?.map(item => item.jenis)?.filter(Boolean))]?.sort();
            this.kelas = kelas || []
          }
          // console.log('data', this.data);
          // console.log('kelas', this.kelas);
          
      } catch (error) {
        // console.log(error)
        this.isError = true
        this.data = null
      } finally {
        this.loading = false
      }
    }

  }
})
