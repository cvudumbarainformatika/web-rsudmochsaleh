<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-form
          @submit="onSave"
        >
          <div class="row q-col-gutter-lg">
            <div class="col-md-8 col-lg-8 col-xl-8 col-xs-12">
              <app-editor v-model="store.form.content" />
            </div>
            <div class="col-md-4 col-lg-4 col-xl-4 col-xs-12">
              <q-card
                flat
                bordered
                class="full-width q-mb-md"
              >
                <q-img
                  :src="previewImage"
                  fit="fill"
                  class="cursor-pointer"
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
                <div class="bg-grey-2">
                  <app-lottie />
                </div>
                <q-card-actions align="between">
                  <div class="text-left q-ml-sm">
                    Belum Ada Animasi
                  </div>
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="photo_library"
                    @click="openGallery = !openGallery"
                  />
                </q-card-actions>
              </q-card>
              <app-input
                v-model="store.form.nama"
                label="Nama Pelayanan"
                class="q-mb-sm"
                @change="setSlug"
              />
              <app-input
                v-model="store.form.slug"
                label="slug"
                class="q-mb-sm"
                disable
              />
              <div class="q-py-md">
                <app-btn
                  class="full-width"
                  label="Simpan Pelayanan"
                  :loading="store.loading"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <app-gallery-animasi
      v-model="openGallery"
      @on-close="openGallery = !openGallery"
    />
  </q-page>
</template>
<script setup>
import { computed, ref } from 'vue'
import { pathImg } from 'src/boot/axios'
import { sanitizeTitle } from 'src/modules/shared'
import { notifErrVue } from 'src/modules/utils'
import { useRouter } from 'vue-router'
import { useSubmenuForm } from 'src/stores/admin/submenu/form'

const router = useRouter()
const store = useSubmenuForm()
const tempImg = ref(null)
const fileRef = ref(null)
const openGallery = ref(false)

const previewImage = computed(() => {
  const imgUrl = tempImg.value
  if (imgUrl === null) {
    if (store.form.thumbnail !== null) {
      return pathImg + store.form.thumbnail
    }
    return new URL('../../../../assets/images/no-image.png', import.meta.url).href
  }
  return URL.createObjectURL(imgUrl)
})

function setSlug(val) {
  const slug = sanitizeTitle(val)
  store.setSlug(slug)
}

function imgClick() {
  fileRef.value.pickFiles()
}

function onSave() {
  const formData = new FormData()
  if (store.form.content === null || store.form.content === '' || store.form.content === '<p></p>') {
    return notifErrVue('maaf, Content Belum terisi!')
  }

  if (tempImg.value !== null) {
    formData.append('thumbnail', tempImg.value)
  }
  if (store.form.id) {
    formData.append('id', store.form.id)
  }

  formData.append('nama', store.form.nama)
  formData.append('slug', store.form.slug)
  formData.append('content', store.form.content)

  store.saveData(formData).then(() => {
    tempImg.value = null
    store.resetFORM()
    router.push('/admin/pelayanan')
  })
}
</script>
