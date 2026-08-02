<template>
  <q-page class="bukutamu-page-container container-padding q-pb-xl">
    <!-- Header Title Seksi Buku Tamu & Aspirasi Publik (Seragam dengan Halaman Profil & Sejarah) -->
    <div class="panel-header q-mb-lg">
      <app-text-judul
        judul="Buku Tamu & Aspirasi Publik"
        kategori="Layanan Publik & Transparansi"
        deskripsi="Sampaikan saran, masukan, pengaduan, dan penilaian Anda demi meningkatkan kualitas pelayanan kesehatan RSUD dr. Mohamad Saleh Kota Probolinggo."
      />
    </div>

    <!-- Navigation Tabs (Interaktif: Form vs History Feed) -->
    <div class="tabs-navigation-card bg-white rounded-2xl p-2 border border-slate-200 shadow-xs q-mb-lg flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button
          class="tab-btn px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer border"
          :class="store.tab === 'form' ? 'bg-teal-700 text-white border-teal-700 shadow-sm' : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'"
          @click="store.setTab('form')"
        >
          <q-icon name="edit_note" size="18px" />
          <span>Kirim Pesan &amp; Rating</span>
        </button>

        <button
          class="tab-btn px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all duration-200 flex items-center gap-2 cursor-pointer border"
          :class="store.tab === 'history' ? 'bg-teal-700 text-white border-teal-700 shadow-sm' : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'"
          @click="switchToHistory()"
        >
          <q-icon name="forum" size="18px" />
          <span>History Aspirasi &amp; Respon Admin</span>
          <q-badge color="amber-8" class="q-ml-xs font-bold">{{ store.stats.total || 0 }}</q-badge>
        </button>
      </div>

      <!-- Quick Search Bar (Aktif saat di Tab History) -->
      <div v-if="store.tab === 'history'" class="search-input-wrapper w-64 hidden sm:block">
        <q-input
          v-model="store.searchQuery"
          dense
          outlined
          placeholder="Cari pesan / jawaban..."
          class="bg-slate-50 text-xs"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <q-icon name="search" class="cursor-pointer" @click="handleSearch" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- TAB 1: FORM KEPENDUDUKAN & PENGISIAN SARAN -->
    <div v-if="store.tab === 'form'" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Left Panel: Form Input -->
      <div class="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 shadow-sm">
        <div class="flex items-center gap-3 q-mb-md">
          <div class="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <q-icon name="send" size="20px" />
          </div>
          <div>
            <h3 class="text-lg font-extrabold text-slate-900 margin-0">Formulir Kirim Saran &amp; Rating</h3>
            <p class="text-xs text-slate-500 margin-0">Isi data diri dan masukan Anda secara jujur dan santun.</p>
          </div>
        </div>

        <q-form ref="refForm" class="space-y-5" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 q-mb-xs">Nama Lengkap *</label>
              <q-input
                v-model="form.nama"
                outlined
                dense
                placeholder="Masukkan nama lengkap Anda"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Nama wajib diisi' ]"
                class="bg-slate-50"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 q-mb-xs">Alamat Email *</label>
              <q-input
                v-model="form.email"
                outlined
                dense
                type="email"
                placeholder="contoh@email.com"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Email wajib diisi' ]"
                class="bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-700 q-mb-xs">Pesan, Saran, atau Pengaduan *</label>
            <q-input
              v-model="form.pesan"
              outlined
              type="textarea"
              rows="4"
              placeholder="Tuliskan saran, kritik, atau pengalaman pelayanan kesehatan Anda di sini..."
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Pesan wajib diisi' ]"
              class="bg-slate-50"
            />
          </div>

          <!-- Interactive Star Rating Input -->
          <div class="bg-teal-50/60 rounded-2xl p-4 border border-teal-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span class="block text-xs font-extrabold text-slate-900">Rating Kualitas Pelayanan RSUD *</span>
              <span class="text-xs text-teal-800 font-bold mt-0.5 block">{{ getRatingLabel(form.ratings) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <q-rating
                v-model="form.ratings"
                max="5"
                size="2.4em"
                color="amber-8"
                icon="star_border"
                icon-selected="star"
                no-dimming
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end pt-2">
            <q-btn
              type="submit"
              color="teal-8"
              size="md"
              unelevated
              rounded
              class="px-8 font-extrabold shadow-md"
              :loading="store.submitting"
            >
              <q-icon name="send" class="q-mr-xs" size="18px" />
              <span>Kirim Pesan &amp; Rating</span>
            </q-btn>
          </div>
        </q-form>
      </div>

      <!-- Right Panel: Ketentuan & Informasi -->
      <div class="lg:col-span-4 space-y-4">
        <div class="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div class="flex items-center gap-2 text-teal-800 font-extrabold text-sm border-b border-slate-100 pb-3">
            <q-icon name="gavel" size="18px" />
            <span>Ketentuan Layanan</span>
          </div>

          <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div class="flex items-start gap-2.5">
              <span class="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[0.7rem] flex-shrink-0 mt-0.5">1</span>
              <p class="margin-0">Dilarang menggunakan bahasa berbau SARA, pornografi, ujaran kebencian, atau merendahkan pihak mana pun.</p>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[0.7rem] flex-shrink-0 mt-0.5">2</span>
              <p class="margin-0">Tim Administrator RSUD berhak memfilter, menanggapi, atau menyembunyikan pesan yang tidak memenuhi syarat etika.</p>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-[0.7rem] flex-shrink-0 mt-0.5">3</span>
              <p class="margin-0">Pesan dan tanggapan resmi Admin RSUD akan ditampilkan pada halaman <strong>History Aspirasi</strong> untuk keterbukaan informasi publik.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: HISTORY ASPIRASI & BALASAN RESMI ADMIN (PUBLIC FEED) -->
    <div v-else-if="store.tab === 'history'" class="space-y-6">
      <!-- Loading State -->
      <div v-if="store.loading" class="text-center py-16">
        <q-spinner-dots color="teal-7" size="48px" />
        <p class="text-slate-500 text-xs mt-3 font-semibold">Memuat riwayat aspirasi &amp; respon admin...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="store.items.length === 0" class="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
        <q-icon name="forum" size="56px" class="text-slate-300 mb-3" />
        <h3 class="text-lg font-bold text-slate-800 margin-0">Belum Ada Aspirasi Publik</h3>
        <p class="text-slate-500 text-xs mt-1 mb-4">Jadilah yang pertama menyampaikan masukan dan saran untuk pelayanan kesehatan RSUD!</p>
        <q-btn color="teal-8" rounded label="Kirim Pesan Sekarang" @click="store.setTab('form')" />
      </div>

      <!-- Feed List Card Items -->
      <div v-else class="space-y-4">
        <div
          v-for="item in store.items"
          :key="item.id"
          class="guestbook-feed-card bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm transition-all hover:shadow-md space-y-4"
        >
          <!-- User Question Header -->
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="user-avatar w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 font-black text-lg flex items-center justify-center">
                {{ (item.nama || 'A').charAt(0).toUpperCase() }}
              </div>
              <div>
                <h4 class="text-sm font-extrabold text-slate-900 margin-0">{{ item.nama }}</h4>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-[0.72rem] text-slate-400 font-semibold">{{ formatDate(item.created_at) }}</span>
                  <span class="text-slate-300">•</span>
                  <span class="text-[0.72rem] text-slate-500 font-medium">{{ maskEmail(item.email) }}</span>
                </div>
              </div>
            </div>

            <!-- Rating Stars Badge -->
            <div class="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl">
              <div class="flex items-center gap-0.5">
                <q-icon
                  v-for="n in 5"
                  :key="n"
                  name="star"
                  size="14px"
                  :color="n <= (item.ratings || 5) ? 'amber-8' : 'slate-300'"
                />
              </div>
              <span class="text-xs font-bold text-amber-900 ml-1">{{ item.ratings || 5 }}/5</span>
            </div>
          </div>

          <!-- User Message Body -->
          <div class="text-slate-700 text-sm leading-relaxed whitespace-pre-line px-1">
            {{ item.pesan }}
          </div>

          <!-- Official Admin Response Box (Tanggapan Resmi Admin RSUD) -->
          <div
            v-if="item.balasan"
            class="admin-response-box bg-slate-50 border-l-4 border-teal-600 rounded-r-2xl p-4 mt-3 space-y-2"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="bg-teal-700 text-white text-[0.68rem] font-extrabold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <q-icon name="verified" size="12px" />
                  <span>Dibalas oleh {{ item.balasan_by || 'Admin RSUD' }}</span>
                </span>
                <span class="text-[0.7rem] text-slate-400 font-semibold">{{ formatDate(item.dibalas_at) }}</span>
              </div>
            </div>
            <p class="text-slate-800 text-xs font-medium leading-relaxed margin-0 whitespace-pre-line">
              {{ item.balasan }}
            </p>
          </div>

          <!-- Unreplied Badge -->
          <div v-else class="text-right pt-1">
            <span class="text-[0.7rem] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg font-bold inline-flex items-center gap-1">
              <q-icon name="schedule" size="12px" />
              <span>Menunggu Tanggapan Admin</span>
            </span>
          </div>
        </div>

        <!-- Pagination Bar -->
        <div v-if="store.pagination.lastPage > 1" class="flex justify-center pt-4">
          <q-pagination
            v-model="store.pagination.page"
            :max="store.pagination.lastPage"
            direction-links
            boundary-links
            color="teal-8"
            @update:model-value="store.getWebContent"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBukuTamuWeb } from 'src/stores/web/bukutamu'
import { date } from 'quasar'

const store = useBukuTamuWeb()
const refForm = ref(null)

const form = ref({
  nama: '',
  email: '',
  pesan: '',
  ratings: 5
})

function getRatingLabel(val) {
  if (val === 5) return 'Sangat Puas ⭐⭐⭐⭐⭐'
  if (val === 4) return 'Puas ⭐⭐⭐⭐'
  if (val === 3) return 'Cukup ⭐⭐⭐'
  if (val === 2) return 'Kurang Puas ⭐⭐'
  return 'Sangat Kurang ⭐'
}

function formatDate(val) {
  if (!val) return ''
  return date.formatDate(val, 'DD MMMM YYYY, HH:mm')
}

function maskEmail(email) {
  if (!email) return ''
  const parts = email.split('@')
  if (parts.length < 2) return email
  const name = parts[0]
  const maskedName = name.length > 2 ? name.substring(0, 2) + '***' : name
  return `${maskedName}@${parts[1]}`
}

function handleSearch() {
  store.getWebContent(1)
}

function switchToHistory() {
  store.setTab('history')
  store.getWebContent(1)
}

async function onSubmit() {
  const success = await store.submitPesan(form.value)
  if (success) {
    form.value = {
      nama: '',
      email: '',
      pesan: '',
      ratings: 5
    }
    if (refForm.value) refForm.value.resetValidation()
  }
}

onMounted(() => {
  store.getWebContent(1)
})
</script>

<style lang="scss" scoped>
.guestbook-feed-card {
  border-left: 4px solid #0d9488;
}

.admin-response-box {
  background: #f8fafc;
}
</style>
