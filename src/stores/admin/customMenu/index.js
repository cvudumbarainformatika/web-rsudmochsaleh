import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { Notify } from 'quasar'

export const useAdminCustomMenu = defineStore('admin_custom_menu', {
  state: () => ({
    items: [], // Tree list menu
    loading: false,
    currentParent: null, // Menu Parent aktif jika sedang melihat submenu
    searchQuery: '',
    form: {
      id: null,
      parent_id: null,
      nama: '',
      slug: '',
      type: 'content',
      content: '',
      thumbnail: null,
      animation: '',
      icon: '',
      external_link: '',
      urutan: 0,
      is_active: true
    },
    tempImg: null
  }),

  actions: {
    async getData(parentId = null) {
      this.loading = true
      try {
        const resp = await api.get('/v1/custom_menus', {
          params: {
            parent_id: parentId === null ? 'null' : parentId,
            q: this.searchQuery
          }
        })
        this.items = resp.data?.data || []
      } catch (error) {
        console.error('Gagal memuat data menu dinamis admin:', error)
      } finally {
        this.loading = false
      }
    },

    setForm(key, val) {
      this.form[key] = val
    },

    resetForm(parentId = null) {
      this.form = {
        id: null,
        parent_id: parentId,
        nama: '',
        slug: '',
        type: 'content',
        content: '',
        thumbnail: null,
        animation: '',
        icon: '',
        external_link: '',
        urutan: 0,
        is_active: true
      }
      this.tempImg = null
    },

    async saveMenu(formData) {
      this.loading = true
      try {
        const resp = await api.post('/v1/custom_menu/store', formData)
        Notify.create({
          type: 'positive',
          message: resp.data?.message || 'Berhasil menyimpan menu dinamis!',
          position: 'top'
        })
        await this.getData(this.form.parent_id)
        return true
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || 'Gagal menyimpan menu dinamis.',
          position: 'top'
        })
        return false
      } finally {
        this.loading = false
      }
    },

    async deleteMenu(id, parentId = null) {
      try {
        const resp = await api.post('/v1/custom_menu/destroy', { id })
        Notify.create({
          type: 'positive',
          message: resp.data?.message || 'Berhasil menghapus menu dinamis!',
          position: 'top'
        })
        await this.getData(parentId)
        return true
      } catch (error) {
        Notify.create({
          type: 'negative',
          message: error.response?.data?.message || 'Gagal menghapus menu.',
          position: 'top'
        })
        return false
      }
    }
  }
})
