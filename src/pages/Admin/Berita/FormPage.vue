<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-lg">
        <div class="col-md-8 col-xs-12">
          <app-input
            v-model="store.form.title"
            label="Judul*"
            class="q-mb-md"
            @change="setSlug"
          />
          <app-editor v-model="store.form.content" />
        </div>
        <div class="col-md-4 col-xs-12">
          <q-scroll-area class="full-height">
            <q-form
              @submit="onSave"
            >
              <q-img
                :src="previewImage"
                fit="fill"
                class="full-height cursor-pointer"
                @click="imgClick()"
              />
              <q-file
                ref="fileRef"
                v-model="tempImg"
                filled
                dense
                label="Gambar Thumbnail"
                accept="image/*"
                class="q-mb-md"
              />

              <app-input
                v-model="store.form.slug"
                label="Slug Otomatis input"
                readonly
                valid
                class="q-mt-md"
              />
              <q-list
                bordered
                separator
                dense
                class="q-mt-md"
              >
                <q-item-section>
                  <div class="flex items-center justify-between q-pa-md">
                    <div>Pilih Kategori</div>
                    <q-btn
                      round
                      icon="add"
                      size="xs"
                      color="primary"
                    >
                      <q-popup-proxy
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        @before-show="newCategori = null"
                      >
                        <div class="q-pa-sm">
                          <q-input
                            ref="inputCategoriRef"
                            v-model="newCategori"
                            dense
                            label="Tambah Kategori : Enter"
                            style="min-width:200px"
                            @keydown.enter="addKategori"
                          />
                        </div>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </q-item-section>
                <q-separator />

                <q-item
                  v-for="(item, i) in categories"
                  :key="i"
                >
                  <!-- {{ selectedCategories }} -->
                  <q-item-section
                    avatar
                    thumbnail
                  >
                    <q-checkbox
                      v-model="selectedCategories"
                      size="xs"
                      :val="item.id"
                      @update:model-value="arrToString"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
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
                    </q-item-label>
                  </q-item-section>
                  <q-item-section
                    side
                  >
                    <q-btn
                      icon="delete"
                      size="xs"
                      color="negative"
                      flat
                      round
                      padding="sm"
                      @click="deleteCategory(i)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>

              <div class="q-py-md">
                <app-btn
                  class="full-width"
                  label="Simpan Draft"
                  :loading="store.loading"
                />
              </div>
            </q-form>
          </q-scroll-area>
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

const $q = useQuasar()
const store = useBeritaForm()
const storeCategories = useCategoryStore()
const selectedCategories = ref([])
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
    return new URL('../../../assets/images/no-image.png', import.meta.url).href
  }
  return URL.createObjectURL(imgUrl)
})

const categories = computed(() => storeCategories.items)

function imgClick() {
  fileRef.value.pickFiles()
}

function setSlug(val) {
  const slug = sanitizeTitle(val)
  store.setSlug(slug)
}

function arrToString(arr) {
  const result = arr.join(',')
  console.log(result)
}

function onSave() {
  console.log(store.form.content)
  if (store.form.title === null || store.form.title === '') {
    return notifErrVue('maaf, Judul diisi terlebih dahulu!')
  }
  if (tempImg.value === null) {
    return notifErrVue('maaf!, Gambar Thumbnail Belum dipilih')
  }
  if (store.form.content === null || store.form.content === '' || store.form.content === '<p></p>') {
    return notifErrVue('maaf, Berita Belum terisi!')
  }
  if (selectedCategories.value.length === 0) {
    return notifErrVue('maaf, Seleksi Kategori terlebih dahulu!')
  }

  const formData = new FormData()
  formData.append('judul', store.form.title)
  formData.append('slug', store.form.slug)
  formData.append('content', store.form.content)
  formData.append('thumbnail', tempImg.value)
  // formData.append('category_id', selectedCategories.value)
  for (let i = 0; i < selectedCategories.value.length; i++) {
    formData.append('category_id[]', selectedCategories.value[i])
  }

  store.saveData(formData).then(() => {
    tempImg.value = null
    selectedCategories.value = []
    store.resetForm()
  })
}

function addKategori() {
  if (newCategori.value === null || newCategori.value === '') {
    return
  }
  const params = {
    nama: newCategori.value
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
    nama: scope.value
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
  storeCategories.getAll()
})

</script>
