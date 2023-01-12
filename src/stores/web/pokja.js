
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const usePokjaWeb = defineStore('pokja_web', {
  state: () => ({
    items: [],
    tab: 'all',
    loading: false
  }),
  getters: {
  },
  actions: {
    setTab(val) {
      this.tab = val
    },
    async getData() {
      this.loading = true
      const params = { params: { flag: '1' } }
      try {
        await api.get('/v1/pelayanan/web_content', params).then((resp) => {
          console.log('pokja web ', resp)
          this.items = resp.data
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
      // const resp = await api.get('/v1/pokja/data_beranda')
      // console.log(resp)
    }
    // async getContent(payload) {
    //   this.loading = true
    //   try {
    //     await api.get(`/v1/pokja/web_content?q=${payload.q}`).then((resp) => {
    //       console.log('pokja content ', resp)
    //       this.content = resp.data.content
    //       this.judul = resp.data.judul
    //       this.slug = resp.data.slug
    //       this.id = resp.data.id
    //       this.thumbnail = resp.data.thumbnail
    //       this.created_at = resp.data.created_at
    //       this.views = resp.data.pokja_views_count
    //       this.isContent = true
    //       this.loading = false
    //       // this.getData(payload.page)
    //       return new Promise((resolve, reject) => {
    //         resolve()
    //       })
    //     })
    //   } catch (error) {
    //     console.log(error)
    //     this.loading = false
    //   }
    //   // const resp = await api.get('/v1/pokja/data_beranda')
    //   // console.log(resp)
    // }

  }
})
