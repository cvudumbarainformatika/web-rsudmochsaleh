import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const usePelayananForm = defineStore('pelayanan_form', {
  state: () => ({
    form: {
      nama: null,
      slug: null,
      content: null,
      thumbnail: null,
      animation: null,
      flag: null
    },

    // selectedCategories: [],
    edited: false,
    loading: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setSlug (val) {
      this.form.slug = val
    },
    setAnimation(val) {
      this.form.animation = val
    },
    resetFORM () {
      this.form = {}
      const columns = ['nama', 'slug', 'content', 'thumbnail', 'animation', 'flag']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      // this.selectedCategoies = []
      this.edited = false
      // this.setForm('gender', 'L')
      // this.setForm('agama', 'Islam')
    },
    setForm (name, val) {
      this.form[name] = val
    },

    addForm(rute) {
      console.log(rute)
      this.resetFORM()
      if (rute === 'admin.pokja') {
        routerInstance.push('/admin/pokja/form/add')
      } else {
        routerInstance.push('/admin/pelayanan/form/add')
      }
    },

    editForm(item) {
      this.resetFORM()
      this.setForm('id', item.id)
      this.setForm('nama', item.nama)
      this.setForm('slug', item.slug)
      this.setForm('content', item.content)
      this.setForm('thumbnail', item.thumbnail)
      this.setForm('animation', item.animation)
      this.setForm('flag', item.flag)

      // this.selectedCategories = item.categories.map(x => x.id)
      this.edited = true
      routerInstance.push('/admin/pelayanan/form/add')
      // console.log(this.selectedCategories)
    },
    async saveData(payload) {
      this.loading = true

      try {
        await api.post('/v1/pelayanan/store', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        notifErr(error.response)
        this.loading = false
      }
    }
  }
})
