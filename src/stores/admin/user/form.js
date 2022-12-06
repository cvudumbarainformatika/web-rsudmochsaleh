import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { routerInstance } from 'src/boot/router'
import { notifErr, notifSuccess } from 'src/modules/utils'

export const useUserForm = defineStore('user_form', {
  state: () => ({
    form: {
      name: null,
      email: null,
      password: null
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
    // setKategori(val) {
    //   this.form.kategori = val
    // },
    resetFORM () {
      this.form = {}
      const columns = ['name', 'email']
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

    addForm() {
      this.resetFORM()
      routerInstance.push('/admin/user/form/add')
    },

    editForm(item) {
      this.resetFORM()
      this.setForm('id', item.id)
      this.setForm('name', item.nama)
      this.setForm('email', item.slug)

      // this.selectedCategories = item.categories.map(x => x.id)
      this.edited = true
      routerInstance.push('/admin/user/form/add')
      // console.log(this.selectedCategories)
    },
    async saveData(payload) {
      this.loading = true

      try {
        await api.post('/v1/user/store', payload, {
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
