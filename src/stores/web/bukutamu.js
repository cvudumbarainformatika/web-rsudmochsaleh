import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useBukuTamuWeb = defineStore('bukutamu_web', {
  state: () => ({
    items: [],
    stats: {
      total: 0,
      avg_rating: 5.0,
      total_replied: 0
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
      lastPage: 1
    },
    searchQuery: '',
    loading: false,
    submitting: false,
    tab: 'form', // 'form' | 'history'

    // Admin State
    adminItems: [],
    adminLoading: false,
    adminFilterStatus: 'all',
    adminFilterRating: 'all',
    adminFilterPublish: 'all',
    adminStats: {
      total: 0,
      avg_rating: 5.0,
      total_replied: 0,
      total_unreplied: 0
    },
    adminPagination: {
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0
    }
  }),

  actions: {
    setTab(val) {
      this.tab = val
    },

    async getWebContent(page = 1) {
      this.loading = true
      try {
        const resp = await api.get('/v1/bukutamu/web_content', {
          params: {
            page: page,
            q: this.searchQuery
          }
        })
        this.items = resp.data?.data || []
        this.pagination.page = resp.data?.current_page || 1
        this.pagination.lastPage = resp.data?.last_page || 1
        this.pagination.rowsNumber = resp.data?.total || 0
        if (resp.data?.stats) {
          this.stats = resp.data.stats
        }
      } catch (error) {
        console.error('Gagal memuat data buku tamu publik:', error)
        this.items = []
      } finally {
        this.loading = false
      }
    },

    async submitPesan(formData) {
      this.submitting = true
      try {
        const resp = await api.post('/v1/bukutamu/store', formData)
        Notify.create({
          type: 'positive',
          message: resp.data?.message || 'Terima kasih, masukan Anda berhasil dikirim!',
          position: 'top',
          timeout: 4000
        })
        // Refresh feed & pindahkan ke tab history
        await this.getWebContent(1)
        this.tab = 'history'
        return true
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || 'Gagal mengirim pesan buku tamu. Silakan coba lagi.',
          position: 'top',
          timeout: 4000
        })
        return false
      } finally {
        this.submitting = false
      }
    },

    // Admin Actions
    async getAdminData(page = 1) {
      this.adminLoading = true
      try {
        const resp = await api.get('/v1/bukutamus', {
          params: {
            page: page,
            q: this.searchQuery,
            status: this.adminFilterStatus,
            rating: this.adminFilterRating,
            publish: this.adminFilterPublish
          }
        })
        this.adminItems = resp.data?.data || []
        this.adminPagination.page = resp.data?.current_page || 1
        this.adminPagination.rowsNumber = resp.data?.total || 0
        if (resp.data?.stats) {
          this.adminStats = resp.data.stats
        }
      } catch (error) {
        console.error('Gagal memuat data admin buku tamu:', error)
      } finally {
        this.adminLoading = false
      }
    },

    async replyPesan(id, balasan) {
      try {
        const resp = await api.post('/v1/bukutamu/reply', { id, balasan })
        Notify.create({
          type: 'positive',
          message: resp.data?.message || 'Tanggapan berhasil disimpan!',
          position: 'top'
        })
        await this.getAdminData(this.adminPagination.page)
        return true
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || 'Gagal menyimpan tanggapan admin.',
          position: 'top'
        })
        return false
      }
    },

    async togglePublish(id) {
      try {
        const resp = await api.post('/v1/bukutamu/toggle_publish', { id })
        Notify.create({
          type: 'positive',
          message: resp.data?.message || 'Status publikasi diperbarui!',
          position: 'top'
        })
        await this.getAdminData(this.adminPagination.page)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Gagal mengubah status publikasi.',
          position: 'top'
        })
      }
    },

    async deletePesan(id) {
      try {
        const resp = await api.post('/v1/bukutamu/destroy', { id })
        Notify.create({
          type: 'positive',
          message: resp.data?.message || 'Pesan berhasil dihapus.',
          position: 'top'
        })
        await this.getAdminData(this.adminPagination.page)
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: 'Gagal menghapus pesan.',
          position: 'top'
        })
      }
    }
  }
})
