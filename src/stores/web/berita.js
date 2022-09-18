
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useBeritaWeb = defineStore('berita_web', {
  state: () => ({
    beranda: [],

    id: null,
    content: null,
    judul: null,
    slug: null,
    thumbnail: null,
    created_at: null,

    views: 0,
    isContent: false,
    loading: false
  }),
  getters: {
    bigCardNews: (state) => {
      if (state.beranda.length > 0) {
        return state.beranda[0]
      }
      return null
    },
    smallCardNews: (state) => {
      const arr = state.beranda
      if (state.isContent === false || state.content === null) {
        if (arr.length > 0) {
          return arr.slice(1)
        }
        return []
      }
      const filterObj = arr.filter(item => item.id !== state.id)
      return filterObj
    }
  },
  actions: {
    async getData(params) {
      this.loading = true
      try {
        await api.get(`/v1/berita/data_beranda?category=${params}`).then((resp) => {
          console.log('berita beranda ', resp)
          this.beranda = resp.data
          this.isContent = false
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
      // const resp = await api.get('/v1/berita/data_beranda')
      // console.log(resp)
    },
    async getContent(payload) {
      this.loading = true
      try {
        await api.get(`/v1/berita/web_content?q=${payload.q}`).then((resp) => {
          console.log('berita content ', resp)
          this.content = resp.data.content
          this.judul = resp.data.judul
          this.slug = resp.data.slug
          this.id = resp.data.id
          this.thumbnail = resp.data.thumbnail
          this.created_at = resp.data.created_at
          this.views = resp.data.berita_views_count
          this.isContent = true
          this.loading = false
          // this.getData(payload.page)
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        console.log(error)
        this.loading = false
      }
      // const resp = await api.get('/v1/berita/data_beranda')
      // console.log(resp)
    }

  }
})
