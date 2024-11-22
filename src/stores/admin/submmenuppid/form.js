import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'
import { useSubmenuPpidTableStore } from './table'

export const useSubmenuPpidForm = defineStore('submenuppid_ppid_form', {
  state: () => ({
    form: {
      ppid_id: null,
      nama: null,
      slug: null,
      content: null,
      thumbnail: null,
      animation: null
    },

    // selectedCategories: [],
    edited: false,
    loading: false,
    formPage: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    setFormPage(x) {
      this.formPage = x
    },
    setSlug (val) {
      this.form.slug = val
    },
    setAnimation(val) {
      this.form.animation = val
    },
    setPelayan(id) {
      this.form.ppid_id = id
    },
    // setKategori(val) {
    //   this.form.kategori = val
    // },
    resetFORM () {
      this.form = {}
      const columns = ['nama', 'slug', 'content', 'thumbnail', 'animation', 'ppid_id']
      for (let i = 0; i < columns.length; i++) {
        this.setForm(columns[i], null)
      }
      // this.selectedCategoies = []
      this.edited = false
    },
    setForm (name, val) {
      this.form[name] = val
    },

    addForm() {
      this.resetFORM()
      routerInstance.push('/admin/ppid/submenuppid/' + this.form.ppid_id)
    },

    editForm(item) {
      this.resetFORM()
      this.setForm('id', item.id)
      this.setForm('nama', item.nama)
      this.setForm('slug', item.slug)
      this.setForm('content', item.content)
      this.setForm('thumbnail', item.thumbnail)
      this.setForm('animation', item.animation)
      this.setForm('ppid_id', item.ppid_id)

      // this.selectedCategories = item.categories.map(x => x.id)
      this.edited = true
      this.formPage = true
      // routerInstance.push('/admin/ppid/submenuppid/' + item.ppid_id)
      // console.log(this.selectedCategories)
    },
    async saveData(payload) {
      this.loading = true

      try {
        await api.post('/v1/submenuppid/store', payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          console.log(resp)
          notifSuccess(resp)
          this.resetFORM()
          this.loading = false
          return new Promise((resolve, reject) => {
            resolve()
          })
        })
      } catch (error) {
        notifErr(error.response)
        this.loading = false
      }
    },

    getTable(payload) {
      const store = useSubmenuPpidTableStore()
      store.getDataTable(payload)
    }
  }
})
