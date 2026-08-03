<template>
  <q-card class="rounded-2xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
    <q-card-section class="p-6">
      <!-- Header Form -->
      <div class="flex items-center justify-between q-mb-md">
        <div>
          <h2 class="text-xl font-extrabold text-slate-800 margin-0">
            {{ isEdit ? 'Edit Menu / Submenu' : (parentItem ? `Tambah Submenu untuk "${parentItem.nama}"` : 'Tambah Menu Utama Baru') }}
          </h2>
          <p class="text-xs text-slate-500 margin-0">
            {{ parentItem ? `Submenu ini akan otomatis tersimpan di bawah hirarki "${parentItem.nama}".` : 'Menu utama ini akan langsung tampil di Header Navbar publik.' }}
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

      <!-- Banner Info Hirarki Otomatis -->
      <div v-if="parentItem" class="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 q-mb-lg flex items-center gap-3">
        <q-icon name="folder_special" size="24px" class="text-teal-7" />
        <div>
          <div class="text-xs font-black text-teal-900 uppercase tracking-wider">Submenu Otomatis Terkunci</div>
          <div class="text-xs text-teal-800 font-bold">
            Induk Menu: <strong class="text-teal-950 font-black text-sm">{{ parentItem.nama }}</strong> ({{ parentItem.slug }})
          </div>
        </div>
      </div>

      <q-form @submit="onSave">
        <div class="row q-col-gutter-lg">
          <!-- Kolom Kiri: Nama & Editor Artikel -->
          <div class="col-md-8 col-lg-8 col-xl-8 col-xs-12 col-sm-12">
            <!-- Nama Input -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Nama Menu / Submenu*</span>
              <app-input
                v-model="store.form.nama"
                placeholder="Masukkan judul / nama menu..."
                @change="setSlug"
              />
            </div>

            <!-- WYSIWYG Editor Konten -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Isi Konten Artikel / Informasi</span>
              <app-editor v-model="store.form.content" />
            </div>
          </div>

          <!-- Kolom Kanan: Interactive Thumbnail Dropzone & Tombol Simpan -->
          <div class="col-md-4 col-lg-4 col-xl-4 col-xs-12 col-sm-12">
            <!-- Dropzone Interactive Thumbnail -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Gambar Thumbnail (Opsional)</span>
              <div
                class="thumbnail-dropzone border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 bg-slate-50 hover:bg-teal-50/20 relative min-h-[180px] flex items-center justify-center shadow-xs"
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
                  <span class="text-xs font-bold uppercase tracking-wider">Klik untuk Pilih / Ganti Gambar</span>
                </div>
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

            <!-- Slug Transparan -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Slug URL (Otomatis)</span>
              <app-input
                v-model="store.form.slug"
                readonly
                valid
              />
            </div>

            <!-- Status Aktif Toggle -->
            <div class="bg-slate-50 border border-slate-200/80 rounded-xl p-3 q-mb-lg flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">Tampilkan di Website:</span>
              <q-toggle v-model="store.form.is_active" color="primary" size="sm" />
            </div>

            <!-- Tombol Simpan (Primary Color Theme) -->
            <div>
              <q-btn
                type="submit"
                color="primary"
                class="full-width rounded-xl font-bold py-3 shadow-md hover:shadow-lg transition-all"
                icon="save"
                label="Simpan Menu"
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
const parentItem = ref(null)

const isEdit = computed(() => !!route.params.id)
const parentIdQuery = computed(() => {
  const p = route.query.parent_id
  return (p && p !== 'null' && p !== '0') ? p : null
})

const previewImage = computed(() => {
  if (tempImg.value !== null) {
    return URL.createObjectURL(tempImg.value)
  }
  if (store.form.thumbnail) {
    return pathImg + store.form.thumbnail
  }
  return new URL('../../../assets/images/no-image.png', import.meta.url).href
})

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

async function fetchParentDetails() {
  if (parentIdQuery.value) {
    await store.getData(null)
    const found = store.items.find(x => x.id === parseInt(parentIdQuery.value))
    if (found) {
      parentItem.value = found
    }
  }
}

async function onSave() {
  if (!store.form.nama) {
    return notifErrVue('Maaf, Nama Menu harus diisi!')
  }

  const formData = new FormData()
  if (store.form.id) {
    formData.append('id', store.form.id)
  }
  
  // Otomatis kuncikan parent_id tanpa pilihan manual yang membingungkan
  if (parentIdQuery.value) {
    formData.append('parent_id', parentIdQuery.value)
  } else if (store.form.parent_id) {
    formData.append('parent_id', store.form.parent_id)
  }

  if (tempImg.value !== null) {
    formData.append('thumbnail', tempImg.value)
  }

  const autoSlug = store.form.slug || sanitizeTitle(store.form.nama)
  formData.append('nama', store.form.nama)
  formData.append('slug', autoSlug)
  formData.append('content', store.form.content || '')
  formData.append('urutan', store.form.urutan || 0)
  formData.append('is_active', store.form.is_active ? '1' : '0')

  const success = await store.saveMenu(formData)
  if (success) {
    tempImg.value = null
    goBack()
  }
}

onMounted(async () => {
  await fetchParentDetails()
  if (isEdit.value) {
    await store.getData(parentIdQuery.value)
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
