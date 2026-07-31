<template>
  <div class="page-antrian bg-slate-50 min-h-screen q-pb-xl">
    <!-- Subpage Hero Banner Strip -->
    <div class="subpage-banner-strip bg-gradient-to-r from-teal-700 via-teal-800 to-cyan-800 text-white py-10 q-mb-lg shadow-md">
      <div class="container-padding flex items-center justify-between flex-wrap gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs text-teal-200 font-bold uppercase tracking-wider q-mb-xs">
            <span>Beranda</span>
            <q-icon name="chevron_right" size="14px" />
            <span class="text-white">Antrian Online</span>
          </div>
          <h1 class="text-h4 font-extrabold text-white tracking-tight margin-0 flex items-center gap-3">
            <q-icon name="confirmation_number" size="32px" class="text-cyan-3" />
            <span>Pendaftaran &amp; Tiket Antrian Online</span>
          </h1>
          <p class="text-teal-100 text-body2 q-mt-xs margin-0 max-w-2xl">
            Sistem registrasi tiket antrian mandiri RSUD dr. Mohamad Saleh Kota Probolinggo. Cepat, tepat, tanpa antri lama.
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="container-padding">
      <!-- Feature Cards Grid (Pendaftaran Poli, Mobile JKN, Status Antrian) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 q-mb-xl">
        <div
          v-for="(item, idx) in store.items"
          :key="item.id || idx"
          class="antrian-feature-card bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="card-icon-wrap w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-bold q-mb-md">
              <q-icon :name="getAntrianIcon(idx)" size="28px" />
            </div>
            <h3 class="text-lg font-extrabold text-slate-900 q-mb-xs">
              {{ item.nama }}
            </h3>
            <p class="text-slate-500 text-xs leading-relaxed q-mb-md">
              {{ item.content }}
            </p>
          </div>

          <button
            class="btn-buka-antrian w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors duration-200"
            @click="handleSelect(idx)"
          >
            <span>Daftar / Cek Tiket</span>
            <q-icon name="arrow_forward" size="14px" />
          </button>
        </div>
      </div>

      <!-- Booking Form Widget -->
      <div class="booking-antrian-section bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md">
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-6 q-mb-lg">
          <div class="flex items-center gap-3">
            <div class="p-3 rounded-2xl bg-teal-50 text-teal-700">
              <q-icon name="how_to_reg" size="28px" />
            </div>
            <div>
              <h2 class="text-xl font-extrabold text-slate-900 margin-0">
                Formulir Pendaftaran Tiket Antrian Online
              </h2>
              <p class="text-slate-500 text-xs margin-0">
                Pilih Poliklinik tujuan dan isi identitas Anda untuk mendapatkan e-Tiket Antrian berobat.
              </p>
            </div>
          </div>

          <button
            class="btn-jadwal-ref rounded-xl px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2"
            @click="router.push('/jadwal-dokter')"
          >
            <q-icon name="calendar_month" size="16px" class="text-teal-700" />
            <span>Lihat Jadwal Dokter Spesialis</span>
          </button>
        </div>

        <q-form class="q-gutter-y-md" @submit.prevent="handleBooking">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <q-input
              v-model="form.nomorRm"
              outlined
              dense
              label="Nomor Rekam Medis / NIK *"
              placeholder="Contoh: 123456 atau NIK KTP"
              bg-color="white"
            />
            <q-input
              v-model="form.namaPasien"
              outlined
              dense
              label="Nama Lengkap Pasien *"
              placeholder="Masukkan nama lengkap pasien"
              bg-color="white"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <q-select
              v-model="form.poliTujuan"
              outlined
              dense
              :options="['Poli Umum', 'Poli Gigi & Mulut', 'Poli Spesialis Anak', 'Poli Spesialis Penyakit Dalam', 'Poli Spesialis Bedah', 'Poli Spesialis Kebidanan & Kandungan', 'Poli Spesialis Mata', 'Poli Spesialis Jantung']"
              label="Pilih Poliklinik Tujuan *"
              bg-color="white"
            />
            <q-input
              v-model="form.tanggalBerobat"
              outlined
              dense
              type="date"
              label="Tanggal Berobat *"
              bg-color="white"
            />
          </div>

          <div class="flex items-center justify-end q-mt-lg">
            <q-btn
              type="submit"
              unelevated
              rounded
              color="teal-8"
              label="Cetak e-Tiket Antrian Online"
              icon="confirmation_number"
              class="q-px-lg font-bold"
              :loading="bookingLoading"
            />
          </div>
        </q-form>

        <!-- e-Ticket Card Output -->
        <div v-if="eTicket" class="eticket-output-box bg-teal-50/80 border-2 border-dashed border-teal-300 rounded-3xl p-6 q-mt-xl text-center">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-700 text-white font-bold text-xs uppercase tracking-wider q-mb-sm">
            <q-icon name="verified" size="14px" />
            e-Tiket Antrian Berhasil Diterbitkan
          </div>
          <div class="text-h3 font-extrabold text-teal-900 q-my-xs">
            {{ eTicket.noAntrian }}
          </div>
          <div class="text-slate-700 font-bold text-sm">
            {{ eTicket.namaPasien }} (RM: {{ eTicket.nomorRm }})
          </div>
          <div class="text-slate-500 text-xs q-mt-xs">
            Poliklinik: <strong>{{ eTicket.poliTujuan }}</strong> &bull; Tanggal: <strong>{{ eTicket.tanggalBerobat }}</strong>
          </div>
          <div class="text-slate-400 text-xs q-mt-sm">
            Waktu Cetak Tiket: {{ eTicket.waktuCetak }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAntrianOnlineWeb } from 'src/stores/web/antrianOnline'

const router = useRouter()
const store = useAntrianOnlineWeb()
const bookingLoading = ref(false)
const eTicket = ref(null)

const form = reactive({
  nomorRm: '',
  namaPasien: '',
  poliTujuan: 'Poli Spesialis Penyakit Dalam',
  tanggalBerobat: new Date().toISOString().split('T')[0]
})

function getAntrianIcon(idx) {
  const icons = ['assignment_turned_in', 'smartphone', 'sensors']
  return icons[idx % icons.length]
}

function handleSelect() {
  const el = document.querySelector('.booking-antrian-section')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function handleBooking() {
  if (!form.nomorRm || !form.namaPasien || !form.poliTujuan || !form.tanggalBerobat) {
    alert('Mohon lengkapi semua data pendaftaran antrian (*)')
    return
  }
  bookingLoading.value = true
  setTimeout(() => {
    bookingLoading.value = false
    const randNum = String(Math.floor(Math.random() * 89) + 10).padStart(3, '0')
    const code = form.poliTujuan.includes('Anak') ? 'A' : (form.poliTujuan.includes('Gigi') ? 'G' : 'B')
    eTicket.value = {
      noAntrian: `${code}-${randNum}`,
      nomorRm: form.nomorRm,
      namaPasien: form.namaPasien,
      poliTujuan: form.poliTujuan,
      tanggalBerobat: form.tanggalBerobat,
      waktuCetak: new Date().toLocaleTimeString('id-ID') + ' WIB'
    }
  }, 700)
}

onMounted(() => {
  store.getData()
})
</script>

<style lang="scss" scoped>
.page-antrian {
  position: relative;
}

.subpage-banner-strip {
  background: linear-gradient(135deg, #0f766e 0%, #115e59 50%, #164e63 100%);
}

.antrian-feature-card {
  &:hover {
    transform: translateY(-4px);
  }
}
</style>
