
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useSubmenuWeb = defineStore('submenu_web', {
  state: () => ({
    item: null,
    loading: false
  }),
  getters: {
    getSubmenu: (state) => {
      const index = state.item
      const arr = index === null ? []
        : index.pelayanan.submenu.length > 0 ? index.pelayanan.submenu : []
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
        await api.get('/v1/submenu/web_content', params).then((resp) => {
          // console.log('submenu web ', resp)
          this.item = resp.data
          this.loading = false
        })
      } catch (error) {
        // console.log(error)
        this.loading = false
      }
      // const resp = await api.get('/v1/pelayanan/data_beranda')
      // // console.log(resp)
    }
    // async getContent(payload) {
    //   this.loading = true
    //   try {
    //     await api.get(`/v1/pelayanan/web_content?q=${payload.q}`).then((resp) => {
    //       // console.log('pelayanan content ', resp)
    //       this.content = resp.data.content
    //       this.judul = resp.data.judul
    //       this.slug = resp.data.slug
    //       this.id = resp.data.id
    //       this.thumbnail = resp.data.thumbnail
    //       this.created_at = resp.data.created_at
    //       this.views = resp.data.pelayanan_views_count
    //       this.isContent = true
    //       this.loading = false
    //       // this.getData(payload.page)
    //       return new Promise((resolve, reject) => {
    //         resolve()
    //       })
    //     })
    //   } catch (error) {
    //     // console.log(error)
    //     this.loading = false
    //   }
    //   // const resp = await api.get('/v1/pelayanan/data_beranda')
    //   // // console.log(resp)
    // }

  }
})
