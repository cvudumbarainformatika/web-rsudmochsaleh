<template>
  <q-page>
    <div class="q-mt-xl q-mb-lg text-h5 text-weight-bold">
      BUKU TAMU
    </div>
    <div class="f-16 black">
      KETENTUAN PENGISIAN SARAN , PENGADUAN DAN RATING PELAYANAN
    </div>
    <q-separator class="q-mb-lg" />
    <div class="text-grey-8 q-mb-md">
      <p class="q-pb-md">
        1. Dilarang menggunakan kata-kata yang berbau sara, pornografi, menakut-nakuti, berkata kotor, menghina, mengancam,menyakiti hati orang lain dan lain sebagainya.
      </p>
      <p class="q-pb-md">
        2. ADMIN berhak melakukan filter serta menghapus pesan Anda, yang kami anggap melanggar ketentuan yang telah ditetapkan, serta tidak bertanggung jawab atas isi pesan, dan segala akibat yang ditimbulkan selanjutnya.
      </p>
      <p>
        3. Kami membutuhkan Saran anda demi menjadikan pelayanan kami lebih baik lagi, Terimakasih.
      </p>
    </div>
    <div>
      <p class="text-weight-bold">
        Kolom Bertanda * Wajib diisi.
      </p>
      <p class="text-weight-bold">
        Kami berhak untuk mengedit, menghapus, atau tidak mempublikasikan Pesan anda.
      </p>
    </div>
    <q-form
      ref="refForm"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="row q-col-gutter-lg q-mt-md">
        <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
          <app-input
            v-model="form.nama"
            label="Nama*"
          />
        </div>
        <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
          <app-input
            v-model="form.email"
            validator="email"
            label="Email*"
          />
        </div>
        <div class="col-md-12 col-lg-12 col-xl-12 col-xs-12">
          <app-input
            v-model="form.pesan"
            label="Pesan*"
          />
        </div>
        <div class="col-md-12 col-lg-12 col-xl-12 col-xs-12">
          <q-rating
            v-model="form.ratings"
            name="quality"
            max="5"
            size="3.5em"
            color="orange"
            icon="star_border"
            icon-selected="star"
            no-dimming
          >
            <template #tip-1>
              <q-tooltip>Sangat Jelek!</q-tooltip>
            </template>
            <template #tip-2>
              <q-tooltip>Tidak Memuaskan</q-tooltip>
            </template>
            <template #tip-3>
              <q-tooltip>Lumayanlah</q-tooltip>
            </template>
            <template #tip-4>
              <q-tooltip>Memuaskan</q-tooltip>
            </template>
            <template #tip-5>
              <q-tooltip>Sangat Memuaskan !</q-tooltip>
            </template>
          </q-rating>
        </div>
        <div class="q-mt-lg">
          <app-btn
            :loading="loading"
            label="Kirim Pesan & Rating"
          />
          <app-btn
            type="reset"
            color="dark"
            label="Reset"
            class="q-ml-md"
          />
        </div>
      </div>
    </q-form>
    <!-- {{ form.quality }} -->
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { ref } from 'vue'

const form = ref({
  nama: null,
  email: null,
  pesan: null,
  ratings: 0
})

const refForm = ref(null)

const loading = ref(false)

function onReset() {
  // console.log(refForm.value)
  form.value.nama = null
  form.value.email = null
  form.value.pesan = null
  form.value.ratings = 0
  refForm.value.resetValidation()
}

async function onSubmit() {
  console.log(refForm.value)
  if (form.value.ratings === 0) {
    notifErrVue('Kasih Rating terlebih dahulu')
  }
  loading.value = true
  await api.post('/v1/bukutamu/store', form.value).then((resp) => {
    console.log(resp)
    loading.value = false
    onReset()
    notifSuccess(resp)
  })
}
</script>
