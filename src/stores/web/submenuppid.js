import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useSubmenuPpidWeb = defineStore('submenu_ppid_web', {
  state: () => ({
    item: null,
    loading: false
  }),
  getters: {
    getSubmenu: (state) => {
      const index = state.item
      const arr = index === null ? []
        : (index.ppid && index.ppid.submenu && index.ppid.submenu.length > 0) ? index.ppid.submenu : []
      if (arr.length > 0) {
        const filterObj = arr.filter(item => item.id !== index.id)
        return filterObj
      }
      return []
    }
  },
  actions: {
    setTab(val) {
      this.tab = val
    },
    async getData(slug) {
      this.loading = true
      const params = { params: { slug: slug } }
      try {
        await api.get('/v1/submenuppid/web_content', params).then((resp) => {
          this.item = resp.data
          this.loading = false
        })
      } catch (error) {
        this.loading = false
      }
    }
  }
})
