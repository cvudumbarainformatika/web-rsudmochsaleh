<template>
  <q-card class="rounded-2xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
    <q-card-section class="p-6">
      <div class="flex items-center justify-between q-mb-md">
        <div>
          <h2 class="text-xl font-extrabold text-slate-800 margin-0">
            {{ isEdit ? 'Edit Menu / Submenu Dinamis' : 'Tambah Menu / Submenu Dinamis' }}
          </h2>
          <p class="text-xs text-slate-500 margin-0">
            Form data menu universal untuk navbar & artikel publik RSUD.
          </p>
        </div>
        <q-btn
          flat
          rounded
          icon="arrow_back"
          label="Kembali"
          no-caps
          color="slate-700"
          class="bg-slate-100 font-bold"
          @click="goBack"
        />
      </div>

      <q-form @submit="onSave">
        <div class="row q-col-gutter-lg">
          <!-- Kolom Kiri: Nama, Slug, & Editor Konten -->
          <div class="col-md-8 col-lg-8 col-xl-8 col-xs-12 col-sm-12">
            <app-input
              v-model="store.form.nama"
              label="Nama Menu / Submenu*"
              class="q-mb-md"
              @change="setSlug"
            />

            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Konten Artikel / Deskripsi Menu</span>
              <app-editor v-model="store.form.content" />
            </div>
          </div>

          <!-- Kolom Kanan: Dropzone Thumbnail, Parent, Type, Status, & Button -->
          <div class="col-md-4 col-lg-4 col-xl-4 col-xs-12 col-sm-12">
            <!-- Dropzone Interactive Thumbnail -->
            <div
              class="thumbnail-dropzone border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 bg-slate-50 hover:bg-teal-50/20 relative min-h-[180px] flex items-center justify-center q-mb-md shadow-xs"
              @click="imgClick()"
            >
              <img
                :src="previewImage"
                alt="Thumbnail Preview"
                class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                @error="handleImgError"
              />
              <div class="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                <q-icon name="cloud_upload" size="32px" class="q-mb-xs" />
                <span class="text-xs font-bold uppercase tracking-wider">Klik untuk Pilih / Ganti Thumbnail</span>
              </div>
            </div>

            <q-file
              ref="fileRef"
              v-model="tempImg"
              filled
              dense
              label="Gambar Thumbnail"
              accept="image/*"
              class="hidden"
            />

            <!-- Input Slug Otomatis -->
            <app-input
              v-model="store.form.slug"
              label="Slug Otomatis"
              readonly
              valid
              class="q-mb-md"
            />

            <!-- Pilihan Parent Menu (Untuk Submenu Bertingkat 1, 2, 3+) -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Induk Menu (Parent)</span>
              <q-select
                v-model="store.form.parent_id"
                dense
                outlined
                emit-value
                map-options
                options-dense
                class="bg-slate-50 text-xs"
                :options="parentOptions"
              />
            </div>

            <!-- Tipe Menu -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Tipe Konten</span>
              <q-select
                v-model="store.form.type"
                dense
                outlined
                emit-value
                map-options
                options-dense
                class="bg-slate-50 text-xs"
                :options="[
                  { label: 'Artikel Konten (WYSIWYG)', value: 'content' },
                  { label: 'Menu Kategori (Memiliki Dropdown)', value: 'menu' },
                  { label: 'Tautan Luar / External Link', value: 'link' }
                ]"
              />
            </div>

            <!-- Input External Link (Jika Tipe Link) -->
            <app-input
              v-if="store.form.type === 'link'"
              v-model="store.form.external_link"
              label="URL External Link"
              class="q-mb-md"
            />

            <!-- Urutan -->
            <app-input
              v-model="store.form.urutan"
              label="Urutan Tampil (Angka)"
              type="number"
              class="q-mb-md"
            />

            <!-- Status Aktif -->
            <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 q-mb-md flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">Status Aktif di Website:</span>
              <q-toggle v-model="store.form.is_active" color="primary" size="sm" />
            </div>

            <!-- Button Submit -->
            <div class="q-mt-lg">
              <q-btn
                type="submit"
                color="primary"
                class="full-width rounded-xl font-bold py-3 shadow-md hover:shadow-lg transition-all"
                icon="save"
                label="Simpan Menu Dinamis"
                :loading="store.loading"
                no-caps
              />
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useAdminCustomMenu } from 'src/stores/admin/customMenu'
import { sanitizeTitle } from 'src/modules/shared'
import { notifErrVue } from 'src/modules/utils'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useAdminCustomMenu()

const fileRef = ref(null)
const tempImg = ref(null)

const isEdit = computed(() => !!route.params.id)
const parentIdQuery = computed(() => route.query.parent_id || null)

const previewImage = computed(() => {
  if (tempImg.value !== null) {
    return URL.createObjectURL(tempImg.value)
  }
  if (store.form.thumbnail) {
    return pathImg + store.form.thumbnail
  }
  return new URL('../../../assets/images/no-image.png', import.meta.url).href
})

const parentOptions = ref([
  { label: '-- Tidak Ada (Menu Utama Tingkat 1) --', value: null }
])

function handleImgError(e) {
  e.target.src = new URL('../../../assets/images/no-image.png', import.meta.url).href
}

function imgClick() {
  fileRef.value.pickFiles()
}

function setSlug(val) {
  const slug = sanitizeTitle(val)
  store.setForm('slug', slug)
}

function goBack() {
  if (parentIdQuery.value) {
    router.push({ path: '/admin/custom-menu', query: { parent_id: parentIdQuery.value } })
  } else {
    router.push('/admin/custom-menu')
  }
}

async function loadParents() {
  try {
    await store.getData(null)
    const list = [{ label: '-- Tidak Ada (Menu Utama Tingkat 1) --', value: null }]
    store.items.forEach(m => {
      if (m.id !== parseInt(route.params.id)) {
        list.push({ label: `📌 ${m.nama} (Tingkat 1)`, value: m.id })
        if (m.children && m.children.length > 0) {
          m.children.forEach(c => {
            if (c.id !== parseInt(route.params.id)) {
              list.push({ label: `└─ 📁 ${c.nama} (Tingkat 2)`, value: c.id })
            }
          })
        }
      }
    })
    parentOptions.value = list
  } catch (err) {
    console.error(err)
  }
}

async function onSave() {
  if (!store.form.nama) {
    return notifErrVue('Maaf, Nama Menu harus diisi!')
  }
  if (!store.form.slug) {
    return notifErrVue('Maaf, Slug Menu harus diisi!')
  }

  const formData = new FormData()
  if (store.form.id) {
    formData.append('id', store.form.id)
  }
  if (store.form.parent_id !== null && store.form.parent_id !== undefined) {
    formData.append('parent_id', store.form.parent_id)
  }
  if (tempImg.value !== null) {
    formData.append('thumbnail', tempImg.value)
  }

  formData.append('nama', store.form.nama)
  formData.append('slug', store.form.slug)
  formData.append('type', store.form.type || 'content')
  formData.append('content', store.form.content || '')
  formData.append('urutan', store.form.urutan || 0)
  formData.append('is_active', store.form.is_active ? '1' : '0')
  if (store.form.external_link) {
    formData.append('external_link', store.form.external_link)
  }

  const success = await store.saveMenu(formData)
  if (success) {
    tempImg.value = null
    goBack()
  }
}

onMounted(async () => {
  await loadParents()
  if (isEdit.value) {
    const editItem = store.items.find(x => x.id === parseInt(route.params.id))
    if (editItem) {
      store.form = { ...editItem }
    }
  } else {
    store.resetForm(parentIdQuery.value ? parseInt(parentIdQuery.value) : null)
  }
})
</script>

<style lang="scss" scoped>
.margin-0 {
  margin: 0;
}
</style>
