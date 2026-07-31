<template>
  <q-page class="bukutamu-page-container">
    <div class="panel-header flex items-center justify-between q-mb-md">
      <app-text-judul judul="Buku Tamu" />
    </div>

    <!-- Main Content Box -->
    <div class="content-box">
      <!-- Terms & Instructions (Elegant Notice Alert Style) -->
      <div class="terms-card q-mb-xl">
        <div class="terms-header flex items-center gap-2 q-mb-md">
          <q-icon name="info" size="20px" class="icon-teal" />
          <h3 class="terms-title text-weight-bold">Ketentuan Pengisian Saran, Pengaduan, &amp; Rating</h3>
        </div>
        <div class="terms-body text-slate-600">
          <div class="term-item flex items-start gap-2.5 q-mb-sm">
            <span class="term-number font-bold text-teal-600">1.</span>
            <p>Dilarang menggunakan kata-kata yang berbau SARA, pornografi, menakut-nakuti, berkata kotor, menghina, mengancam, menyakiti hati orang lain, dan lain sebagainya.</p>
          </div>
          <div class="term-item flex items-start gap-2.5 q-mb-sm">
            <span class="term-number font-bold text-teal-600">2.</span>
            <p>Admin berhak memfilter serta menghapus pesan Anda yang dianggap melanggar ketentuan yang telah ditetapkan, serta tidak bertanggung jawab atas isi pesan dan segala akibat yang ditimbulkan selanjutnya.</p>
          </div>
          <div class="term-item flex items-start gap-2.5">
            <span class="term-number font-bold text-teal-600">3.</span>
            <p>Kami sangat menghargai saran Anda demi menjadikan mutu pelayanan kesehatan RSUD dr. Mohamad Saleh lebih baik lagi. Terima kasih.</p>
          </div>
        </div>
      </div>

      <!-- Warning Pill -->
      <div class="warning-pill flex items-center gap-2 q-mb-lg">
        <q-icon name="gavel" size="14px" class="text-amber-700" />
        <span class="text-xs font-semibold text-amber-900">
          Kolom bertanda (*) wajib diisi. Kami berhak mengedit, menghapus, atau tidak mempublikasikan pesan Anda.
        </span>
      </div>

      <!-- Buku Tamu Form -->
      <q-form
        ref="refForm"
        class="bukutamu-form"
        @submit="onSubmit"
        @reset="onReset"
      >
        <div class="row q-col-gutter-lg">
          <!-- Name Input -->
          <div class="col-12 col-md-6">
            <app-input
              v-model="form.nama"
              label="Nama Lengkap *"
              placeholder="Masukkan nama lengkap Anda"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Nama wajib diisi' ]"
            />
          </div>

          <!-- Email Input -->
          <div class="col-12 col-md-6">
            <app-input
              v-model="form.email"
              validator="email"
              label="Alamat Email *"
              placeholder="Masukkan alamat email aktif"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Email wajib diisi' ]"
            />
          </div>

          <!-- Message Input -->
          <div class="col-12">
            <app-input
              v-model="form.pesan"
              label="Pesan, Saran, atau Pengaduan *"
              placeholder="Tuliskan saran atau masukan Anda di sini..."
              type="textarea"
              rows="4"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Pesan wajib diisi' ]"
            />
          </div>

          <!-- Rating Input -->
          <div class="col-12">
            <div class="rating-box flex column gap-2 q-py-md">
              <span class="rating-label text-slate-700 text-sm font-semibold">
                Berikan Rating Pelayanan Kami *
              </span>
              <div class="flex items-center gap-4">
                <q-rating
                  v-model="form.ratings"
                  name="quality"
                  max="5"
                  size="3em"
                  color="amber"
                  icon="star_border"
                  icon-selected="star"
                  no-dimming
                  class="rating-stars"
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
                <div class="rating-badge font-bold text-xs" :class="form.ratings > 0 ? 'active' : ''">
                  {{ ratingText }}
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="col-12 flex items-center gap-3 q-mt-md">
            <app-btn
              :loading="loading"
              type="submit"
              label="Kirim Pesan &amp; Rating"
              class="submit-btn"
            />
            <app-btn
              type="reset"
              color="dark"
              label="Reset Form"
              class="reset-btn"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifErrVue, notifSuccess } from 'src/modules/utils'
import { ref, computed } from 'vue'

const form = ref({
  nama: null,
  email: null,
  pesan: null,
  ratings: 0
})

const refForm = ref(null)
const loading = ref(false)

const ratingText = computed(() => {
  switch (form.value.ratings) {
    case 1: return 'Sangat Jelek'
    case 2: return 'Tidak Memuaskan'
    case 3: return 'Cukup Baik'
    case 4: return 'Memuaskan'
    case 5: return 'Sangat Memuaskan'
    default: return 'Pilih Rating'
  }
})

function onReset() {
  form.value.nama = null
  form.value.email = null
  form.value.pesan = null
  form.value.ratings = 0
  if (refForm.value) {
    refForm.value.resetValidation()
  }
}

async function onSubmit() {
  if (form.value.ratings === 0) {
    notifErrVue('Kasih Rating terlebih dahulu')
    return
  }
  loading.value = true
  await api.post('/v1/bukutamu/store', form.value).then((resp) => {
    loading.value = false
    onReset()
    notifSuccess(resp)
  }).catch(() => {
    loading.value = false
  })
}
</script>

<style lang="scss" scoped>
.bukutamu-page-container {
  min-height: 80vh;
  padding-bottom: 3rem;
}

// ── Content Box Wrapper ──────────────────────────────────────────
.content-box {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 4px 30px rgba(15, 23, 42, 0.04);
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2.25rem;
  }
}

// ── Terms Alert Box ──────────────────────────────────────────────
.terms-card {
  background: rgba(13, 148, 136, 0.04);
  border: 1px solid rgba(13, 148, 136, 0.1);
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
}

.terms-header {
  color: #0d9488;
}

.terms-title {
  font-size: 0.95rem;
  margin: 0;
  letter-spacing: 0.02em;
}

.term-item {
  p {
    margin: 0;
    line-height: 1.6;
    font-size: 0.88rem;
  }
}

// ── Warning Pill ─────────────────────────────────────────────────
.warning-pill {
  background: #fef3c7;
  border: 1px solid #fde68a;
  padding: 8px 16px;
  border-radius: 30px;
  display: inline-flex;
}

// ── Rating Selection ─────────────────────────────────────────────
.rating-box {
  border-top: 1px solid rgba(15, 23, 42, 0.06);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.rating-badge {
  background: rgba(15, 23, 42, 0.05);
  color: #64748b;
  padding: 4px 12px;
  border-radius: 30px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;

  &.active {
    background: #f59e0b;
    color: white;
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.25);
  }
}

// ── Form Inputs & Buttons ────────────────────────────────────────
.submit-btn {
  background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%) !important;
  color: white !important;
  border: none;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(13, 148, 136, 0.3);
    transform: translateY(-1px);
  }
}

.reset-btn {
  transition: all 0.3s ease;
  &:hover {
    background: #1e293b !important;
  }
}
</style>
