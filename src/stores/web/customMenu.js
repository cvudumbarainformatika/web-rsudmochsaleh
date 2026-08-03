import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useCustomMenuWeb = defineStore('custom_menu_web', {
  state: () => ({
    menus: [], // Web navbar tree
    activeArticle: null,
    loading: false
  }),

  actions: {
    async getWebMenus() {
      try {
        const resp = await api.get('/v1/custom_menus/web_content')
        this.menus = resp.data || []
      } catch (error) {
        console.error('Gagal memuat menu dinamis publik:', error)
      }
    },

    async getArticleBySlug(slug) {
      this.loading = true
      try {
        const resp = await api.get('/v1/custom_menus/web_content', {
          params: { slug }
        })
        this.activeArticle = resp.data || null
        return this.activeArticle
      } catch (error) {
        console.error('Gagal memuat detail artikel menu dinamis:', error)
        this.activeArticle = null
        return null
      } finally {
        this.loading = false
      }
    }
  }
})
