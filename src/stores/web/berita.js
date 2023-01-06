
import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useBeritaWeb = defineStore('berita_web', {
  state: () => ({
    beranda: [],
    populars: [],

    beritas: [],
    meta: null,
    params: {
      q: null,
      category: 'all',
      page: 1,
      perPage: 8,
      orderBy: 'created_at',
      sort: 'desc'
    },

    id: null,
    content: null,
    judul: null,
    slug: null,
    tanggal: null,
    thumbnail: null,
    created_at: null,

    views: 0,
    isContent: false,
    loading: false,
    loadingMore: false
  }),
  getters: {
    bigCardForPageBerita: (state) => state.beritas.length ? state.beritas[0] : null,
    smallCardForPageBerita: (state) => {
      const arr = state.beritas
      if (state.isContent === false || state.content === null) {
        if (arr.length > 0) {
          return arr.slice(1)
        }
        return []
      }
      const filterObj = arr.filter(item => item.id !== state.id)
      return filterObj
    },
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
    changeParams(hal, cat) {
      this.params.page = hal
      this.params.category = cat
      // console.log('chamnge params', this.params)
      this.getDataPagin(cat, 'loadMore')
    },
    async getDataPagin(payload, loadmore) {
      const more = !((!loadmore || loadmore === 'undefined' || loadmore === null || loadmore === undefined))
      console.log('more', more)
      more ? this.loadingMore = true : this.loading = true
      if (!more) {
        this.params.page = 1
      }
      this.params.category = (!payload || payload === 'undefined' || payload === null || payload === undefined) ? 'all' : payload
      try {
        const params = { params: this.params }
        await api.get('/v1/berita/berita_paginate', params).then((resp) => {
          console.log('berita beranda paginate', resp)
          this.beritas = resp.data.data
          this.meta = resp.data
          this.isContent = false
          this.loading = false
          this.loadingMore = false
        })
      } catch (error) {
        console.log(error)
        this.loading = false
        this.loadingMore = false
      }
    },
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
    },
    async getPopulars() {
      try {
        await api.get('/v1/berita/web_popular').then((resp) => {
          console.log('berita populer ', resp)
          this.populars = resp.data
        })
      } catch (error) {
        console.log(error)
      }
    },
    async getContent(payload) {
      this.loading = true
      console.log('get content ...', payload)
      try {
        await api.get(`/v1/berita/web_content?q=${payload.q}`).then((resp) => {
          console.log('berita content ', resp)
          this.content = resp.data.content
          this.judul = resp.data.judul
          this.slug = resp.data.slug
          this.id = resp.data.id
          this.thumbnail = resp.data.thumbnail
          this.tanggal = resp.data.tanggal
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
