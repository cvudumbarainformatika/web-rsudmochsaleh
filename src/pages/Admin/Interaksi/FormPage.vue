<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="rounded-2xl max-w-3xl mx-auto">
      <q-card-section class="bg-slate-50 border-b border-slate-100 flex items-center justify-between">
        <div class="text-subtitle1 font-extrabold text-slate-800">Form Pengelolaan Data Interaksi</div>
        <q-btn flat round dense icon="arrow_back" @click="router.back()" />
      </q-card-section>

      <q-card-section class="q-pa-lg">
        <q-form class="q-gutter-y-md" @submit.prevent="save">
          <q-input v-model="form.nama" outlined dense label="Judul / Kategori Interaksi *" bg-color="white" />
          <q-input v-model="form.slug" outlined dense label="Slug URL *" bg-color="white" />
          <q-input v-model="form.content" outlined type="textarea" rows="5" label="Penjelasan / Konten Deskripsi *" bg-color="white" />

          <div class="flex items-center justify-end gap-3 q-mt-lg">
            <q-btn flat label="Batal" color="grey-7" @click="router.back()" />
            <q-btn unelevated rounded color="teal-8" label="Simpan Data" icon="save" type="submit" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useInteraksiWeb } from 'src/stores/web/interaksi'

const router = useRouter()
const route = useRoute()
const store = useInteraksiWeb()

const form = reactive({
  id: null,
  nama: '',
  slug: '',
  content: ''
})

onMounted(() => {
  const id = route.params.id
  if (id) {
    const item = store.items.find(i => String(i.id) === String(id))
    if (item) {
      form.id = item.id
      form.nama = item.nama
      form.slug = item.slug
      form.content = item.content
    }
  }
})

function save() {
  if (!form.nama) return
  if (form.id) {
    const idx = store.items.findIndex(i => String(i.id) === String(form.id))
    if (idx !== -1) store.items[idx] = { ...form }
  } else {
    store.items.push({ id: Date.now(), ...form })
  }
  router.push('/admin/interaksi')
}
</script>
