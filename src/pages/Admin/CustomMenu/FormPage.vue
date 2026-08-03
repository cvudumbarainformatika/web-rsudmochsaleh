<template>
  <q-card class="rounded-2xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
    <q-card-section class="p-6">
      <!-- Header Form -->
      <div class="flex items-center justify-between q-mb-md">
        <div>
          <h2 class="text-xl font-extrabold text-slate-800 margin-0">
            {{ isEdit ? `Edit "${store.form.nama}"` : (parentItem ? `Tambah Item di dalam "${parentItem.nama}"` : 'Tambah Menu Utama Baru') }}
          </h2>
          <p class="text-xs text-slate-500 margin-0">
            {{ parentItem ? `Item ini akan tersimpan di dalam folder hirarki "${parentItem.nama}".` : 'Menu utama ini akan langsung tampil di Header Navbar publik.' }}
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

      <!-- Banner Info Submenu & Judul Artikel Inline (Desktop) -->
      <div class="bg-teal-50 border border-teal-200 rounded-2xl p-4 q-mb-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Kiri: Hirarki Induk Kategori -->
        <div class="flex items-center gap-3">
          <q-icon name="folder_special" size="24px" class="text-teal-7" />
          <div>
            <div class="text-[10px] font-black text-teal-900 uppercase tracking-wider">Hirarki Otomatis Terkunci</div>
            <div class="text-xs text-teal-800 font-bold">
              Induk Kategori: <strong class="text-teal-950 font-black text-sm">{{ parentItem ? parentItem.nama : 'Menu Utama (Tingkat 1)' }}</strong>
              <span v-if="parentItem" class="text-slate-500 font-mono text-[11px]"> ({{ parentItem.slug }})</span>
            </div>
          </div>
        </div>

        <!-- Kanan: Judul Lengkap Halaman Artikel (Inline Selalu Tampil) -->
        <div class="flex items-center gap-2 w-full md:w-auto min-w-[280px] md:min-w-[380px] ml-auto">
          <q-icon name="edit_note" size="22px" class="text-teal-7 flex-shrink-0" />
          <div class="w-full">
            <span class="text-[10px] font-black text-teal-900 uppercase tracking-wider block">Judul Halaman Artikel (Otomatis Terisi Sama)</span>
            <app-input
              v-model="store.form.title_detail"
              placeholder="Otomatis terisi sama dengan Nama Menu..."
              class="bg-white text-xs"
              @update:model-value="onTitleDetailInput"
            />
          </div>
        </div>
      </div>

      <!-- Pilihan Jenis Item (Kategori Menu vs Artikel Konten) -->
      <div class="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 max-w-md mx-auto q-mb-lg border border-slate-200/80">
        <button
          type="button"
          class="cursor-pointer flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 style-pointer"
          :class="itemType === 'folder' ? 'bg-white text-teal-8 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'"
          @click="itemType = 'folder'"
        >
          <q-icon name="folder" size="18px" />
          <span>📁 Folder / Kategori Menu</span>
        </button>
        <button
          type="button"
          class="cursor-pointer flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 style-pointer"
          :class="itemType === 'article' ? 'bg-white text-teal-8 shadow-sm font-black' : 'text-slate-600 hover:text-slate-900'"
          @click="itemType = 'article'"
        >
          <q-icon name="article" size="18px" />
          <span>📄 Halaman Artikel Konten</span>
        </button>
      </div>

      <!-- MODE 1: FOLDER / KATEGORI MENU (HANYA INPUT NAMA MENU - TANPA EDITOR!) -->
      <q-form v-if="itemType === 'folder'" @submit="onSave">
        <div class="max-w-md mx-auto py-4">
          <div class="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Nama Menu / Submenu Kategori*</span>
              <app-input
                v-model="store.form.nama"
                placeholder="Contoh: Rawat Jalan, Konsultasi Online, Jadwal Poli..."
                class="bg-white"
                @change="setSlug"
              />
            </div>

            <!-- Slug Transparan -->
            <div>
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Slug URL (Otomatis)</span>
              <app-input
                v-model="store.form.slug"
                readonly
                valid
                class="bg-white"
              />
            </div>

            <!-- Status Aktif Toggle -->
            <div class="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
              <span class="text-xs font-bold text-slate-800">Tampilkan di Website:</span>
              <q-toggle v-model="store.form.is_active" color="primary" size="sm" />
            </div>

            <!-- Tombol Simpan -->
            <div class="pt-2">
              <q-btn
                type="submit"
                color="primary"
                class="full-width rounded-xl font-bold py-3 shadow-md hover:shadow-lg transition-all"
                icon="save"
                label="Simpan Folder / Kategori Menu"
                :loading="store.loading"
                no-caps
              />
            </div>
          </div>
        </div>
      </q-form>

      <!-- MODE 2: HALAMAN ARTIKEL KONTEN (DENGAN EDITOR & THUMBNAIL BANNER) -->
      <q-form v-else @submit="onSave">
        <div class="row q-col-gutter-lg">
          <!-- Kolom Kiri: Nama & Editor Artikel -->
          <div class="col-md-8 col-lg-8 col-xl-8 col-xs-12 col-sm-12">
            <!-- Nama Input (Singkat di Navbar) -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Nama Menu / Submenu* (Tampil di Navbar)</span>
              <app-input
                v-model="store.form.nama"
                placeholder="Contoh: Percobaan Interaksi"
                @change="setSlug"
              />
            </div>

            <!-- Judul Lengkap Artikel (Otomatis Terisi Sama) -->
            <div class="q-mb-md">
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Judul Lengkap Halaman Artikel (Otomatis Terisi Sama - Bisa Diubah)</span>
              <app-input
                v-model="store.form.title_detail"
                placeholder="Otomatis terisi sama dengan Nama Menu..."
                @update:model-value="onTitleDetailInput"
              />
              <span class="text-[11px] text-slate-400 block mt-1">Otomatis menyamakan Nama Menu di atas. Ubah teks di sini jika ingin judul artikel lebih panjang.</span>
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
              <span class="text-xs font-bold text-slate-700 block q-mb-xs">Gambar Banner Artikel (Opsional)</span>
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

            <!-- Tombol Simpan -->
            <div>
              <q-btn
                type="submit"
                color="primary"
                class="full-width rounded-xl font-bold py-3 shadow-md hover:shadow-lg transition-all"
                icon="save"
                label="Simpan Halaman Artikel"
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
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useAdminCustomMenu()

const fileRef = ref(null)
const tempImg = ref(null)
const parentItem = ref(null)

// 'folder' (Hanya Nama Menu) vs 'article' (Dengan Editor & Thumbnail)
const itemType = ref('folder')

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

const isTitleDetailTouched = ref(false)

watch(() => store.form.nama, (newNama) => {
  if (newNama) {
    const slug = sanitizeTitle(newNama)
    store.setForm('slug', slug)
    if (!isTitleDetailTouched.value) {
      store.setForm('title_detail', newNama)
    }
  }
})

function setSlug(val) {
  const slug = sanitizeTitle(val)
  store.setForm('slug', slug)
  if (!isTitleDetailTouched.value) {
    store.setForm('title_detail', val)
  }
}

function onTitleDetailInput() {
  isTitleDetailTouched.value = true
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
    return notifErrVue('Maaf, Nama Menu / Artikel harus diisi!')
  }

  const formData = new FormData()
  if (store.form.id) {
    formData.append('id', store.form.id)
  }
  
  if (parentIdQuery.value) {
    formData.append('parent_id', parentIdQuery.value)
  } else if (store.form.parent_id) {
    formData.append('parent_id', store.form.parent_id)
  }

  if (itemType.value === 'article' && tempImg.value !== null) {
    formData.append('thumbnail', tempImg.value)
  }

  const autoSlug = store.form.slug || sanitizeTitle(store.form.nama)
  formData.append('nama', store.form.nama)
  formData.append('title_detail', store.form.title_detail || '')
  formData.append('slug', autoSlug)
  formData.append('type', itemType.value === 'folder' ? 'menu' : 'content')
  formData.append('content', itemType.value === 'article' ? (store.form.content || '') : '')
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
      store.form.is_active = editItem.is_active == 1 || editItem.is_active === true
      if (editItem.content || editItem.thumbnail) {
        itemType.value = 'article'
      } else {
        itemType.value = 'folder'
      }
    }
  } else {
    store.resetForm(parentIdQuery.value ? parseInt(parentIdQuery.value) : null)
    store.form.is_active = true
    itemType.value = 'folder'
  }
})
</script>

<style lang="scss" scoped>
.margin-0 {
  margin: 0;
}
.style-pointer {
  cursor: pointer !important;
}
</style>
