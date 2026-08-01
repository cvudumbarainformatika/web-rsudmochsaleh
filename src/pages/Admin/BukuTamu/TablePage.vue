<template>
  <div class="q-pa-sm">
    <!-- Header Bar Admin Buku Tamu -->
    <div class="flex items-center justify-between q-mb-md">
      <div>
        <h2 class="text-xl font-extrabold text-slate-800 margin-0">Manajemen Buku Tamu &amp; Aspirasi</h2>
        <p class="text-xs text-slate-500 margin-0">Kelola pesan, masukan, dan berikan tanggapan resmi RSUD kepada masyarakat.</p>
      </div>
    </div>

    <!-- Stat Summary Cards for Admin -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 q-mb-md">
      <div class="bg-gradient-to-r from-teal-800 to-cyan-900 text-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-amber-300 text-lg">
          {{ store.adminStats.avg_rating || 5.0 }}
        </div>
        <div>
          <div class="flex items-center gap-0.5">
            <q-icon v-for="n in 5" :key="n" name="star" size="12px" color="amber-3" />
          </div>
          <span class="text-[0.68rem] text-teal-100 font-semibold block mt-0.5">Rating Rata-rata</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
          <q-icon name="mail" size="20px" />
        </div>
        <div>
          <span class="text-lg font-black text-slate-900 leading-none block">{{ store.adminStats.total || 0 }}</span>
          <span class="text-[0.7rem] text-slate-500 font-semibold">Total Pesan Masuk</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
          <q-icon name="task_alt" size="20px" />
        </div>
        <div>
          <span class="text-lg font-black text-emerald-700 leading-none block">{{ store.adminStats.total_replied || 0 }}</span>
          <span class="text-[0.7rem] text-slate-500 font-semibold">Sudah Dibalas</span>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
          <q-icon name="mark_email_unread" size="20px" />
        </div>
        <div>
          <span class="text-lg font-black text-amber-700 leading-none block">{{ store.adminStats.total_unreplied || 0 }}</span>
          <span class="text-[0.7rem] text-slate-500 font-semibold">Belum Dibalas</span>
        </div>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs q-mb-md flex flex-col lg:flex-row items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-4">
        <!-- Filter Status Balasan -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-700">Status:</span>
          <q-btn-toggle
            v-model="store.adminFilterStatus"
            dense
            rounded
            unelevated
            toggle-color="teal-8"
            color="slate-100"
            text-color="slate-700"
            size="sm"
            :options="[
              { label: 'Semua', value: 'all' },
              { label: 'Belum Dibalas', value: 'unreplied' },
              { label: 'Sudah Dibalas', value: 'replied' }
            ]"
            @update:model-value="store.getAdminData(1)"
          />
        </div>

        <!-- Filter Rating Bintang -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-700">Rating:</span>
          <q-select
            v-model="store.adminFilterRating"
            dense
            outlined
            emit-value
            map-options
            options-dense
            class="bg-slate-50 text-xs w-36"
            :options="[
              { label: 'Semua Rating', value: 'all' },
              { label: '⭐ 5 Bintang', value: '5' },
              { label: '⭐ 4 Bintang', value: '4' },
              { label: '⭐ 3 Bintang', value: '3' },
              { label: '⭐ 2 Bintang', value: '2' },
              { label: '⭐ 1 Bintang', value: '1' }
            ]"
            @update:model-value="store.getAdminData(1)"
          />
        </div>
      </div>

      <div class="w-full lg:w-72">
        <q-input
          v-model="store.searchQuery"
          dense
          outlined
          placeholder="Cari nama, email, pesan..."
          class="bg-slate-50 text-xs"
          @keyup.enter="store.getAdminData(1)"
        >
          <template #append>
            <q-icon name="search" class="cursor-pointer" @click="store.getAdminData(1)" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Table List -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <q-table
        :rows="store.adminItems"
        :columns="columns"
        row-key="id"
        :loading="store.adminLoading"
        :pagination="{ rowsPerPage: 10 }"
        flat
        hide-pagination
      >
        <template #body-cell-nama="props">
          <q-td :props="props">
            <div class="font-extrabold text-slate-900 text-xs">{{ props.row.nama }}</div>
            <div class="text-[0.7rem] text-slate-400 font-semibold">{{ props.row.email }}</div>
          </q-td>
        </template>

        <template #body-cell-ratings="props">
          <q-td :props="props">
            <div class="flex items-center gap-1">
              <q-icon v-for="n in 5" :key="n" name="star" size="12px" :color="n <= (props.row.ratings || 5) ? 'amber-8' : 'slate-300'" />
              <span class="text-xs font-bold text-slate-700 ml-1">{{ props.row.ratings || 5 }}</span>
            </div>
          </q-td>
        </template>

        <template #body-cell-pesan="props">
          <q-td :props="props" style="max-width: 320px;" class="ellipsis">
            <div class="text-xs text-slate-800 line-clamp-2">{{ props.row.pesan }}</div>
          </q-td>
        </template>

        <template #body-cell-balasan="props">
          <q-td :props="props" style="max-width: 280px;">
            <div v-if="props.row.balasan" class="text-xs text-teal-800 bg-teal-50 border border-teal-200 rounded-lg p-2">
              <div class="font-bold flex items-center gap-1 mb-1">
                <q-icon name="verified" size="12px" />
                <span>{{ props.row.balasan_by || 'Admin RSUD' }}</span>
              </div>
              <div class="line-clamp-2 text-[0.72rem]">{{ props.row.balasan }}</div>
            </div>
            <div v-else class="text-[0.7rem] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2 py-1 font-bold inline-block">
              Belum Dibalas
            </div>
          </q-td>
        </template>

        <template #body-cell-status_publikasi="props">
          <q-td :props="props">
            <q-badge
              :color="props.row.status_publikasi == 1 ? 'teal-8' : 'grey-7'"
              class="cursor-pointer font-bold px-2 py-1"
              @click="store.togglePublish(props.row.id)"
            >
              {{ props.row.status_publikasi == 1 ? 'Dipublikasikan' : 'Disembunyikan' }}
            </q-badge>
          </q-td>
        </template>

        <template #body-cell-aksi="props">
          <q-td :props="props" class="text-right">
            <div class="flex items-center justify-end gap-1">
              <q-btn
                dense
                flat
                round
                color="teal-8"
                icon="reply"
                size="sm"
                @click="openReplyDialog(props.row)"
              >
                <q-tooltip>Balas / Jawab Pesan</q-tooltip>
              </q-btn>
              <q-btn
                dense
                flat
                round
                color="red-7"
                icon="delete"
                size="sm"
                @click="confirmDelete(props.row)"
              >
                <q-tooltip>Hapus Pesan</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>

      <!-- Pagination -->
      <div v-if="store.adminPagination.rowsNumber > 0" class="flex items-center justify-between p-4 border-t border-slate-200">
        <span class="text-xs text-slate-500 font-semibold">
          Total {{ store.adminPagination.rowsNumber }} Pesan Buku Tamu
        </span>
        <q-pagination
          v-model="store.adminPagination.page"
          :max="Math.ceil(store.adminPagination.rowsNumber / 10) || 1"
          direction-links
          color="teal-8"
          size="sm"
          @update:model-value="store.getAdminData"
        />
      </div>
    </div>

    <!-- Dialog Balas Pesan Admin -->
    <q-dialog v-model="dialogReply" persistent>
      <q-card style="width: 550px; max-width: 90vw;" class="rounded-2xl">
        <q-card-section class="bg-teal-8 text-white flex items-center justify-between p-4">
          <div class="flex items-center gap-2 font-bold text-sm">
            <q-icon name="reply" size="18px" />
            <span>Tanggapi / Balas Pesan Masyarakat</span>
          </div>
          <q-btn flat round dense icon="close" color="white" v-close-popup />
        </q-card-section>

        <q-card-section v-if="selectedRow" class="p-5 space-y-4">
          <!-- Pesan User -->
          <div class="bg-slate-100 rounded-xl p-3 border border-slate-200 space-y-1">
            <div class="text-xs font-bold text-slate-900">{{ selectedRow.nama }} ({{ selectedRow.email }})</div>
            <div class="text-xs text-slate-700 whitespace-pre-line">{{ selectedRow.pesan }}</div>
          </div>

          <!-- Input Balasan Admin -->
          <div>
            <label class="block text-xs font-bold text-slate-800 q-mb-xs">Tanggapan Resmi Admin RSUD *</label>
            <q-input
              v-model="replyText"
              outlined
              type="textarea"
              rows="4"
              placeholder="Tuliskan jawaban atau tanggapan resmi RSUD di sini..."
              class="bg-slate-50 text-xs"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="p-4 bg-slate-50 border-t border-slate-200">
          <q-btn flat label="Batal" color="grey-8" v-close-popup />
          <q-btn
            color="teal-8"
            unelevated
            label="Simpan Balasan"
            class="font-bold"
            :loading="submittingReply"
            @click="submitReply"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBukuTamuWeb } from 'src/stores/web/bukutamu'
import { Dialog, date } from 'quasar'

const store = useBukuTamuWeb()
const dialogReply = ref(false)
const selectedRow = ref(null)
const replyText = ref('')
const submittingReply = ref(false)

const columns = [
  { name: 'nama', label: 'Pengirim', field: 'nama', align: 'left', sortable: true },
  { name: 'ratings', label: 'Rating', field: 'ratings', align: 'center', sortable: true },
  { name: 'pesan', label: 'Pesan / Masukan', field: 'pesan', align: 'left' },
  { name: 'balasan', label: 'Balasan Admin', field: 'balasan', align: 'left' },
  { name: 'created_at', label: 'Tanggal', field: 'created_at', align: 'center', format: val => date.formatDate(val, 'DD/MM/YYYY HH:mm') },
  { name: 'status_publikasi', label: 'Status Publikasi', field: 'status_publikasi', align: 'center' },
  { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'right' }
]

function openReplyDialog(row) {
  selectedRow.value = row
  replyText.value = row.balasan || ''
  dialogReply.value = true
}

async function submitReply() {
  if (!replyText.value.trim()) return
  submittingReply.value = true
  const success = await store.replyPesan(selectedRow.value.id, replyText.value)
  submittingReply.value = false
  if (success) {
    dialogReply.value = false
  }
}

function confirmDelete(row) {
  Dialog.create({
    title: 'Hapus Pesan Buku Tamu',
    message: `Apakah Anda yakin ingin menghapus pesan dari "${row.nama}"?`,
    cancel: true,
    persistent: true
  }).onOk(() => {
    store.deletePesan(row.id)
  })
}

onMounted(() => {
  store.getAdminData(1)
})
</script>
