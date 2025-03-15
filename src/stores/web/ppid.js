import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePpidWeb = defineStore('ppid_web', {
  state: () => ({
    items: [],
    menus: [],
    tab: 'all',
    loading: false
  }),
  getters: {
    // bigCardNews: (state) => {
    //   if (state.beranda.length > 0) {
    //     return state.beranda[0]
    //   }
    //   return null
    // },
    // smallCardNews: (state) => {
    //   const arr = state.beranda
    //   if (state.isContent === false || state.content === null) {
    //     if (arr.length > 0) {
    //       return arr.slice(1)
    //     }
    //     return []
    //   }
    //   const filterObj = arr.filter(item => item.id !== state.id)
    //   return filterObj
    // }
  },
  actions: {
    setTab(val) {
      this.tab = val
    },
    async getData() {
      this.loading = true
      try {
        await api.get('/v1/ppid/web_content').then((resp) => {
          console.log('ppid web ', resp)
          this.items = resp.data
          this.loading = false
        })
      } catch (error) {
        // console.log(error)
        this.loading = false
      }
      // const resp = await api.get('/v1/ppid/data_beranda')
      // // console.log(resp)
    }
    // async getMenu() {
    //   this.loading = true
    //   const params = { params: { flag: null } }
    //   try {
    //     await api.get('/v1/ppid/web_content', params).then((resp) => {
    //       // console.log('pelayanan web ', resp)
    //       this.menus = resp.data
    //       this.loading = false
    //     })
    //   } catch (error) {
    //     // console.log(error)
    //     this.loading = false
    //   }
    // }
    // async getContent(payload) {
    //   this.loading = true
    //   try {
    //     await api.get(`/v1/ppid/web_content?q=${payload.q}`).then((resp) => {
    //       // console.log('ppid content ', resp)
    //       this.content = resp.data.content
    //       this.judul = resp.data.judul
    //       this.slug = resp.data.slug
    //       this.id = resp.data.id
    //       this.thumbnail = resp.data.thumbnail
    //       this.created_at = resp.data.created_at
    //       this.views = resp.data.ppid_views_count
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
    //   // const resp = await api.get('/v1/ppid/data_beranda')
    //   // // console.log(resp)
    // }

  }
})
