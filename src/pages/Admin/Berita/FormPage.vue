<template>
  <q-card class="rounded-2xl border border-slate-200/80 shadow-sm bg-white overflow-hidden">
    <q-card-section class="p-6">
      <div class="row q-col-gutter-lg">
        <!-- Kolom Kiri: Judul & Editor -->
        <div class="col-md-8 col-lg-8 col-xl-8 col-xs-12 col-sm-12">
          <app-input
            v-model="store.form.title"
            label="Judul Berita*"
            class="q-mb-md"
            @change="setSlug"
          />
          <app-editor v-model="store.form.content" />
        </div>

        <!-- Kolom Kanan: Thumbnail, Slug, Tanggal, Kategori, & Simpan -->
        <div class="col-md-4 col-lg-4 col-xl-4 col-xs-12 col-sm-12">
          <q-form @submit="onSave">
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

            <!-- Input Tanggal -->
            <app-input-date
              :model="store.form.tanggal"
              icon="event"
              label="Tanggal Publikasi"
              outlined
              class="q-mb-md"
              @set-model="(val) => store.setForm('tanggal', val)"
            />

            <!-- Box List Kategori Subtle Card -->
            <div class="category-box bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 q-mt-md">
              <div class="flex items-center justify-between q-mb-sm">
                <span class="text-xs font-extrabold uppercase tracking-wider text-slate-700">Pilih Kategori</span>
                <q-btn
                  round
                  icon="add"
                  size="xs"
                  color="primary"
                  class="shadow-xs"
                >
                  <q-tooltip>Tambah Kategori Baru</q-tooltip>
                  <q-popup-proxy
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    @before-show="newCategori = null"
                  >
                    <div class="q-pa-sm bg-white rounded-xl shadow-lg border border-slate-100">
                      <q-input
                        ref="inputCategoriRef"
                        v-model="newCategori"
                        dense
                        outlined
                        label="Tambah Kategori : Enter"
                        style="min-width: 220px;"
                        @keydown.enter="addKategori"
                      />
                    </div>
                  </q-popup-proxy>
                </q-btn>
              </div>

              <q-separator class="q-mb-sm" />

              <div class="category-list flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                <div
                  v-for="(item, i) in categories"
                  :key="i"
                  class="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/60 hover:border-teal-300 transition-colors shadow-2xs"
                >
                  <div class="flex items-center gap-2">
                    <q-checkbox
                      v-model="store.selectedCategories"
                      size="xs"
                      color="primary"
                      :val="item.id"
                      @update:model-value="arrToString"
                    />
                    <span class="text-xs font-bold text-slate-800 cursor-pointer">
                      {{ item.nama }}
                      <q-popup-edit
                        v-slot="scope"
                        v-model="item.nama"
                        :cover="true"
                        :offset="[0, 0]"
                        auto-save
                        :validate="val => val.length > 0"
                      >
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          counter
                          @keyup.enter="editCategory(scope, item.id)"
                        />
                      </q-popup-edit>
                    </span>
                  </div>
                  <q-btn
                    icon="delete"
                    size="xs"
                    color="negative"
                    flat
                    round
                    padding="xs"
                    @click="deleteCategory(i)"
                  />
                </div>
              </div>
            </div>

            <!-- Tombol Simpan Draft (Warna Tema Global Primary) -->
            <div class="q-mt-lg">
              <q-btn
                type="submit"
                color="primary"
                class="full-width rounded-xl font-bold py-3 shadow-md hover:shadow-lg transition-all"
                icon="save"
                label="Simpan Draft Berita"
                :loading="store.loading"
                no-caps
              />
            </div>
          </q-form>
        </div>
      </div>
    </q-card-section>

    <!-- dialog delete -->
    <!-- <q-dialog
      v-model="confirm"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="warning"
            color="warning"
            size="sm"
            text-color="white"
          />
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
            label="Cancel"
            color="primary"
          />
          <q-btn
            v-close-popup
            flat
            label="Turn on Wifi"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
  </q-card>
</template>

<script setup>
import { useBeritaForm } from 'src/stores/admin/berita/form'
import { useCategoryStore } from 'src/stores/admin/category'
import { useQuasar } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { sanitizeTitle } from 'src/modules/shared'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { pathImg } from 'src/boot/axios'

const $q = useQuasar()
const router = useRouter()
const store = useBeritaForm()
const storeCategories = useCategoryStore()
// const selectedCategories = computed({
//   get() {
//     return store.selectedCategories
//   },
//   set(newVal){

//   }
// })
// const selectedCategories = ref([])
// const proxyEdit = ref(false)
const newCategori = ref(null)
// const content = ref('ketik berita disini')
const fileRef = ref(null)
const inputCategoriRef = ref(null)
const tempImg = ref(null)
// const tempId = ref(null)
const previewImage = computed(() => {
  const imgUrl = tempImg.value
  if (imgUrl === null) {
    if (store.form.image !== null) {
      return pathImg + store.form.image
    }
    return new URL('../../../assets/images/no-image.png', import.meta.url).href
  }
  return URL.createObjectURL(imgUrl)
})

const categories = computed(() => storeCategories.items)

function imgClick() {
  fileRef.value.pickFiles()
}

function handleImgError(e) {
  e.target.src = new URL('../../../assets/images/no-image.png', import.meta.url).href
}

function setSlug(val) {
  const slug = sanitizeTitle(val)
  store.setSlug(slug)
}

function arrToString(arr) {
  // const result = arr.join(',')
  console.log(arr)
}

function onSave() {
  // console.log(store.form.content)
  const formData = new FormData()
  if (store.form.title === null || store.form.title === '') {
    return notifErrVue('maaf, Judul diisi terlebih dahulu!')
  }
  if (store.edited === false) {
    if (tempImg.value === null) {
      return notifErrVue('maaf!, Gambar Thumbnail Belum dipilih')
    }
  }

  if (store.form.content === null || store.form.content === '' || store.form.content === '<p></p>') {
    return notifErrVue('maaf, Berita Belum terisi!')
  }
  if (store.selectedCategories.length === 0) {
    return notifErrVue('maaf, Seleksi Kategori terlebih dahulu!')
  }

  if (tempImg.value !== null) {
    formData.append('thumbnail', tempImg.value)
  }
  if (store.form.id) {
    formData.append('id', store.form.id)
  }

  formData.append('judul', store.form.title)
  formData.append('slug', store.form.slug)
  formData.append('tanggal', store.form.tanggal)
  formData.append('content', store.form.content)

  // formData.append('category_id', selectedCategories.value)
  for (let i = 0; i < store.selectedCategories.length; i++) {
    formData.append('category_id[]', store.selectedCategories[i])
  }

  // console.log('tempImg', tempImg.value)
  // console.log('edited', store.edited)
  // console.log(router)

  store.saveData(formData).then((success) => {
    if (success) {
      tempImg.value = null
      store.resetFORM()
      router.push('/admin/berita')
    }
  })
}

function addKategori() {
  if (newCategori.value === null || newCategori.value === '') {
    return
  }
  const params = {
    nama: newCategori.value,
    url: sanitizeTitle(newCategori.value)
  }
  storeCategories.storeData(params).then(() => {
    newCategori.value = null
  })
}

function editCategory(scope, id) {
  if (scope === null || scope === '') {
    return
  }
  const params = {
    id,
    nama: scope.value,
    url: sanitizeTitle(scope.value)
  }
  storeCategories.storeData(params).then(() => {
    scope.set()
  })
  // console.log(params)
}
function deleteCategory(i) {
  $q.dialog({
    title: 'Pemberitahuan!',
    message: `Apakah data <b> ${categories.value[i].nama} </b> Akan di hapus?`,
    cancel: true,
    persistent: true,
    html: true
  }).onOk(() => {
    const params = {
      id: categories.value[i].id
    }
    storeCategories.deleteData(params)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

onMounted(() => {
  tempImg.value = null
  storeCategories.getAll()
  // store.setToday()
})

</script>
