import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useBeritaForm = defineStore('berita_form', {
  state: () => ({
    form: {
      title: null,
      slug: null,
      content: null,
      kategori: null,
      image: null
    },

    selectedCategories: [],
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
    setKategori(val) {
      this.form.kategori = val
    },
    // resetForm() {
    //   this.form.title = null
    //   this.form.slug = null
    //   this.form.content = null
    //   this.form.image = null
    // },
    resetFORM () {
      this.form = {}
      const columns = ['title', 'slug', 'content', 'kategori', 'image']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      this.selectedCategoies = []
      this.edited = false
      // this.setForm('gender', 'L')
      // this.setForm('agama', 'Islam')
    },
    setForm (name, val) {
      this.form[name] = val
    },

    addForm() {
      this.resetFORM()
      routerInstance.push('/admin/berita/form/add')
    },

    editForm(item) {
      this.resetFORM()
      this.setForm('id', item.id)
      this.setForm('title', item.judul)
      this.setForm('slug', item.slug)
      this.setForm('content', item.content)
      this.setForm('image', item.thumbnail)

      this.selectedCategories = item.categories.map(x => x.id)
      this.edited = true
      routerInstance.push('/admin/berita/form/add')
      console.log(this.selectedCategories)
    },
    async saveData(payload) {
      this.loading = true

      try {
        await api.post('/v1/berita/store', payload, {
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
