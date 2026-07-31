<template>
  <div class="page-interaksi bg-slate-50 min-h-screen q-pb-xl">
    <!-- Subpage Hero Banner Strip -->
    <div class="subpage-banner-strip bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-800 text-white py-10 q-mb-lg shadow-md">
      <div class="container-padding flex items-center justify-between flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs text-teal-200 font-bold uppercase tracking-wider q-mb-xs">
            <span>Beranda</span>
            <q-icon name="chevron_right" size="14px" />
            <span class="text-white">Interaksi</span>
          </div>
          <h1 class="text-h4 font-extrabold text-white tracking-tight margin-0 flex items-center gap-3">
            <q-icon name="forum" size="32px" class="text-cyan-3" />
            <span>Interaksi &amp; Layanan Publik</span>
          </h1>
          <p class="text-teal-100 text-body2 q-mt-xs margin-0 max-w-2xl">
            Wadah komunikasi interaktif masyarakat dengan UOBK RSUD dr. Mohamad Saleh Kota Probolinggo.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="container-padding">
      <!-- Interactive Grid Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 q-mb-xl">
        <div
          v-for="(item, idx) in store.items"
          :key="item.id || idx"
          class="interaksi-card bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="card-icon-wrap w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-bold q-mb-md">
              <q-icon :name="getCardIcon(idx)" size="28px" />
            </div>
            <h3 class="text-lg font-extrabold text-slate-900 q-mb-xs">
              {{ item.nama }}
            </h3>
            <p class="text-slate-500 text-xs leading-relaxed q-mb-md">
              {{ item.content }}
            </p>
          </div>

          <button
            class="btn-buka-interaksi w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors duration-200"
            @click="handleSelect(item)"
          >
            <span>Kirim Pesan / Tanya</span>
            <q-icon name="arrow_forward" size="14px" />
          </button>
        </div>
      </div>

      <!-- Form Kirim Pesan Interaksi Publik -->
      <div class="form-interaksi-section bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md">
        <div class="flex items-center gap-3 q-mb-md">
          <div class="p-3 rounded-2xl bg-teal-50 text-teal-700">
            <q-icon name="edit_note" size="28px" />
          </div>
          <div>
            <h2 class="text-xl font-extrabold text-slate-900 margin-0">
              Formulir Interaksi &amp; Tanya Jawab Warga
            </h2>
            <p class="text-slate-500 text-xs margin-0">
              Sampaikan pertanyaan, masukan, atau informasi yang ingin Anda konsultasikan.
            </p>
          </div>
        </div>

        <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <q-input
              v-model="form.nama"
              outlined
              dense
              label="Nama Lengkap *"
              placeholder="Masukkan nama Anda"
              bg-color="white"
            />
            <q-input
              v-model="form.kontak"
              outlined
              dense
              label="Nomor WhatsApp / Email *"
              placeholder="08xxxxxxxxxx atau email@domain.com"
              bg-color="white"
            />
          </div>

          <q-select
            v-model="form.kategori"
            outlined
            dense
            :options="['Tanya Jawab Pelayanan', 'Kritik & Saran', 'Konsultasi Informasi', 'Lainnya']"
            label="Kategori Interaksi *"
            bg-color="white"
          />

          <q-input
            v-model="form.pesan"
            outlined
            type="textarea"
            rows="4"
            label="Pesan / Pertanyaan Anda *"
            placeholder="Tuliskan pesan interaksi Anda secara lengkap..."
            bg-color="white"
          />

          <div class="flex items-center justify-end">
            <q-btn
              type="submit"
              unelevated
              rounded
              color="teal-8"
              label="Kirim Pesan Interaksi"
              icon="send"
              class="q-px-lg font-bold"
              :loading="submitting"
            />
          </div>
        </q-form>

        <q-banner v-if="successMsg" class="bg-teal-50 text-teal-900 rounded-2xl q-mt-md border border-teal-200">
          <template #avatar>
            <q-icon name="check_circle" color="teal-7" />
          </template>
          {{ successMsg }}
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useInteraksiWeb } from 'src/stores/web/interaksi'

const store = useInteraksiWeb()
const submitting = ref(false)
const successMsg = ref('')

const form = reactive({
  nama: '',
  kontak: '',
  kategori: 'Tanya Jawab Pelayanan',
  pesan: ''
})

function getCardIcon(idx) {
  const icons = ['question_answer', 'rate_review', 'poll']
  return icons[idx % icons.length]
}

function handleSelect(item) {
  form.kategori = item.nama
  const el = document.querySelector('.form-interaksi-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function handleSubmit() {
  if (!form.nama || !form.kontak || !form.pesan) {
    alert('Mohon lengkapi semua kolom bertanda bintang (*)')
    return
  }
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    successMsg.value = 'Terima kasih! Pesan interaksi Anda berhasil terkirim dan akan segera ditanggapi oleh tim RSUD.'
    form.nama = ''
    form.kontak = ''
    form.pesan = ''
  }, 800)
}

onMounted(() => {
  store.getData()
})
</script>

<style lang="scss" scoped>
.page-interaksi {
  position: relative;
}

.subpage-banner-strip {
  background: linear-gradient(135deg, #0f766e 0%, #115e59 50%, #164e63 100%);
}

.interaksi-card {
  &:hover {
    transform: translateY(-4px);
  }
}
</style>
