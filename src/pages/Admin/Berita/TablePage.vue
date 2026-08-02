<template>
  <div class="admin-table-container">
    <!-- Header Controls Bar -->
    <div class="header-control-card bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-4.5 q-mb-md shadow-md flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
          <q-icon name="newspaper" size="20px" />
        </div>
        <div>
          <h2 class="text-base font-extrabold text-white margin-0 leading-tight">Daftar Data Berita</h2>
          <p class="text-xs text-slate-300 margin-0">Kelola publikasi berita & artikel rumah sakit</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <q-select
          v-model="sel"
          dense
          outlined
          dark
          color="teal-4"
          :options="filters"
          label="Filter Status"
          map-options
          emit-value
          option-label="label"
          option-value="status"
          style="min-width: 140px"
          class="bg-slate-800/80 rounded-xl"
          @update:model-value="changeFilter"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="store.loading"
      class="column flex-center text-teal-700 bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-slate-200/80"
      style="min-height: 280px"
    >
      <q-spinner-cube color="teal" size="3.5em" />
      <div class="text-xs font-bold text-slate-600 mt-4 tracking-wider uppercase">Memuat Data Berita...</div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="store.items.length === 0"
      class="column flex-center text-slate-400 bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-slate-200/80"
      style="min-height: 280px"
    >
      <q-icon name="feed" size="48px" class="opacity-40 q-mb-sm" />
      <div class="text-sm font-bold text-slate-600">Belum ada data berita</div>
    </div>

    <!-- List Items (Horizontal Card - Always Locked Right Buttons) -->
    <div v-else class="space-y-3 q-mb-lg">
      <div
        v-for="(item, n) in store.items"
        :key="n"
        class="admin-item-card bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 min-w-0"
      >
        <!-- 1. KIRI: Thumbnail (Shrink-0) -->
        <div class="w-[120px] h-[80px] shrink-0 rounded-xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-100 relative">
          <img
            :src="getImage(item.thumbnail)"
            alt="Thumbnail"
            class="w-full h-full object-cover rounded-xl"
            @error="handleImgError"
          />
        </div>

        <!-- 2. TENGAH: Info & Preview Text (Grow, Min-W-0 untuk Mencegah Push Overflow) -->
        <div class="grow min-w-0 overflow-hidden px-1">
          <div class="flex items-center gap-2 q-mb-xs">
            <!-- Category Badge -->
            <span class="bg-teal-50 text-teal-800 border border-teal-200/80 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              {{ getCategories(item.categories) }}
            </span>
            <!-- Status Badge -->
            <span
              class="cursor-pointer text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shrink-0 transition-transform active:scale-95"
              :class="item.status === 1 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'"
              @click="updateStatus(item)"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="item.status === 1 ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'" />
              {{ item.status === 1 ? 'Draft' : 'Published' }}
            </span>
          </div>

          <!-- Title -->
          <h3 class="text-sm font-extrabold text-slate-900 margin-0 truncate leading-snug">
            {{ item.judul }}
          </h3>

          <!-- Text Content Preview (Bersih dari Tag HTML & Gambar, Line Clamp 2) -->
          <p class="text-xs text-slate-500 margin-0 mt-1 line-clamp-2 leading-relaxed font-medium overflow-hidden text-ellipsis">
            {{ stripHtml(item.content) }}
          </p>
        </div>

        <!-- 3. KANAN UJUNG: Tombol Aksi (Shrink-0, Locked Right-Aligned) -->
        <div class="shrink-0 flex items-center gap-1 pl-3 border-l border-slate-100 justify-end">
          <q-btn
            v-if="item.status === 2"
            flat
            round
            dense
            color="teal"
            icon="visibility"
            class="hover:bg-teal-50"
            :to="{name:'berita', params:{page:item.categories[0]?.url}, query:{page:item.slug}}"
            target="_blank"
          >
            <q-tooltip class="bg-teal text-white">Lihat di Website</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit_note"
            class="hover:bg-blue-50"
            @click="form.editForm(item)"
          >
            <q-tooltip class="bg-primary text-white">Edit Berita</q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete_outline"
            class="hover:bg-rose-50"
            @click="deleteData(item)"
          >
            <q-tooltip class="bg-negative text-white">Hapus Berita</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>

    <!-- Pagination Footer -->
    <div v-if="store.items.length > 0" class="bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80">
      <app-pagination-table
        :meta="store.meta"
        @next="(val)=>store.setPage(val)"
        @prev="(val)=>store.setPage(val)"
        @last="(val)=>store.setPage(val)"
        @first="(val)=>store.setPage(val)"
      />
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { pathImg } from 'src/boot/axios'
import { useBeritaTable } from 'src/stores/admin/berita/table'
import { ref } from 'vue'
import fallbackImg from '../../../assets/images/no-image.png'
import { useBeritaForm } from '../../../stores/admin/berita/form'

const $q = useQuasar()
const store = useBeritaTable()
const form = useBeritaForm()

const sel = ref('')
const filters = ref([
  { status: '', label: 'Semua Status' },
  { status: 1, label: 'Draft' },
  { status: 2, label: 'Publish' }
])

store.getDataTable()

function handleImgError(e) {
  e.target.src = fallbackImg
}

function stripHtml(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim()
}

function getImage(image) {
  if (!image || image === null || image === '' || image === 'null') {
    return fallbackImg
  }
  if (image.startsWith('http') || image.startsWith('/')) {
    return image
  }
  return pathImg + image
}

function deleteData(item) {
  $q.dialog({
    title: 'Pemberitahuan!',
    message: `Apakah data <b> ${item.judul} </b> Akan di hapus?`,
    cancel: true,
    persistent: true,
    html: true
  }).onOk(() => {
    store.deletesData(item.id)
  })
}

function changeFilter(val) {
  store.setStatus(val)
}

function updateStatus(val) {
  const status = val.status === 1 ? 2 : 1
  store.updateStatus(val.id, status)
}

function getCategories(item) {
  if (!item || !Array.isArray(item)) return 'Umum'
  return item.map(x => x.nama).join(', ')
}
</script>

<style scoped lang="scss">
.admin-table-container {
  position: relative;
}

:deep(img.object-cover) {
  display: block !important;
  max-width: 100% !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}
</style>
