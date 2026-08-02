<template>
  <div class="admin-table-container">
    <!-- Loading State -->
    <div
      v-if="store.loading"
      class="column flex-center text-teal-700 bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-slate-200/80"
      style="min-height: 280px"
    >
      <q-spinner-cube color="teal" size="3.5em" />
      <div class="text-xs font-bold text-slate-600 mt-4 tracking-wider uppercase">Memuat Data Profil...</div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="store.items.length === 0"
      class="column flex-center text-slate-400 bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-slate-200/80"
      style="min-height: 280px"
    >
      <q-icon name="folder_open" size="48px" class="opacity-40 q-mb-sm" />
      <div class="text-sm font-bold text-slate-600">Belum ada data profil</div>
    </div>

    <!-- List Items (Strict Horizontal Layout: Thumbnail -> Info -> Right Actions) -->
    <div v-else class="space-y-3 q-mb-lg">
      <div
        v-for="(item, n) in store.items"
        :key="n"
        class="admin-item-card"
      >
        <!-- 1. KIRI: Thumbnail -->
        <div class="item-thumb-box">
          <img
            :src="getImage(item.thumbnail)"
            alt="Thumbnail"
            class="item-thumb-img"
            @error="handleImgError"
          />
        </div>

        <!-- 2. TENGAH: Details & Text Preview -->
        <div class="item-info-box">
          <h3 class="item-title">
            {{ item.nama }}
          </h3>

          <div class="item-desc-clamp">
            {{ stripHtml(item.content) }}
          </div>
        </div>

        <!-- 3. KANAN UJUNG: Action Buttons (Locked Right) -->
        <div class="item-actions-right">
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="edit_note"
            class="hover:bg-blue-50"
            @click="form.editForm(item)"
          >
            <q-tooltip class="bg-primary text-white">Edit Profil</q-tooltip>
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
            <q-tooltip class="bg-negative text-white">Hapus Profil</q-tooltip>
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
import { useProfilForm } from 'src/stores/admin/profil/form'
import { useProfilTable } from 'src/stores/admin/profil/table'
import fallbackImg from '../../../assets/images/no-image.png'

const $q = useQuasar()
const store = useProfilTable()
const form = useProfilForm()

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
    message: `Apakah data <b> ${item.nama} </b> Akan di hapus?`,
    cancel: true,
    persistent: true,
    html: true
  }).onOk(() => {
    store.deletesData(item.id)
  })
}
</script>

<style scoped lang="scss">
.admin-table-container {
  position: relative;
}

.admin-item-card {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  width: 100% !important;

  &:hover {
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  }
}

.item-thumb-box {
  width: 120px !important;
  height: 80px !important;
  flex-shrink: 0 !important;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.8);
  background-color: #f8fafc;
  position: relative;
}

.item-thumb-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  border-radius: 12px;
}

.item-info-box {
  flex: 1 1 auto !important;
  min-width: 0 !important;
  overflow: hidden !important;
  padding-left: 16px;
  padding-right: 16px;
}

.item-title {
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.item-desc-clamp {
  font-size: 12px;
  color: #64748b;
  margin-top: 4px;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  line-height: 1.45;
  max-height: 2.9em;
}

.item-actions-right {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 4px !important;
  flex-shrink: 0 !important;
  margin-left: auto !important;
  padding-left: 12px;
  border-left: 1px solid #f1f5f9;
}
</style>
