<template>
  <q-page class="pelayanan-page py-6">
    <app-loading v-if="store.loading" />
    
    <q-tab-panels
      v-else
      v-model="store.tab"
      animated
      vertical
      swipeable
      class="custom-tab-panels bg-transparent"
    >
      <!-- Panel 1: List Semua Layanan -->
      <q-tab-panel name="all" class="panel-padding-none">
        <div class="panel-header q-mb-lg">
          <app-text-judul :judul="route.name === 'pelayanan' ? 'Pelayanan Utama' : 'Pokja Akreditasi'" />
        </div>
        <div class="content-box">
          <ListBigPelayanan
            :items="store.items"
            @click="clickList"
          />
        </div>
      </q-tab-panel>

      <!-- Panel 2: Detail Layanan Utama (Rawat Jalan / Rawat Inap dll.) -->
      <q-tab-panel
        v-for="(item, n) in store.items"
        :key="n"
        :name="item.nama"
        class="panel-padding-none"
      >
        <div class="panel-header flex items-center justify-between q-mb-md">
          <app-text-judul :judul="item.nama" />
        </div>

        <div class="content-box">
          <!-- Featured Image (Bila Ada) -->
          <div v-if="item.thumbnail" class="featured-image-wrap q-mb-lg">
            <q-img
              :src="pathImg + item.thumbnail"
              class="featured-image-main rounded-2xl shadow-md"
              alt="thumbnail Rsud dr mohamad saleh"
            />
          </div>

          <!-- Deskripsi Utama Content -->
          <div
            v-if="item.content && !isEmptyContent(item.content)"
            class="content-description-card q-mb-xl"
          >
            <app-editor
              v-model="item.content"
              :edited="false"
            />
          </div>

          <!-- Empty State Placeholder -->
          <div
            v-if="isEmptyContent(item.content) && (!item.submenu || item.submenu.length === 0) && !item.thumbnail"
            class="empty-state-wrap flex column items-center justify-center q-py-xl text-center"
          >
            <div class="empty-icon-circle flex items-center justify-center q-mb-md">
              <q-icon name="folder_open" size="48px" class="text-slate-300" />
            </div>
            <h3 class="text-weight-bold text-slate-700 q-mb-xs" style="font-size: 1.1rem; margin: 0;">Belum Ada Informasi</h3>
            <p class="text-slate-400 text-xs max-w-sm q-mt-xs q-mx-auto">Detail dokumen atau informasi untuk pelayanan ini belum dipublikasikan.</p>
          </div>

          <!-- SEKSI JIKA MEMILIKI SUB-LAYANAN (Contoh: Ruang VIP, Poli Gigi dll.) -->
          <div v-if="item.submenu && item.submenu.length > 0" class="subservices-section q-mt-xl">
            <div class="subservices-title flex items-center gap-2 q-mb-lg">
              <span class="title-pill" />
              <span class="text-subtitle1 text-weight-bolder text-slate-800 uppercase tracking-wider">Sub-Layanan {{ item.nama }}</span>
            </div>

            <!-- Bento/Grid Sub-Layanan -->
            <div class="row q-col-gutter-lg justify-start items-stretch">
              <div
                v-for="(sub, i) in item.submenu"
                :key="i"
                class="col-12 col-sm-6 col-md-4 col-lg-3 flex"
              >
                <div
                  class="subservice-card flex column justify-between cursor-pointer"
                  @click="goTo(sub, item)"
                >
                  <div class="subservice-card-glow" />
                  
                  <!-- Card Header: Ikon Medis yang sesuai -->
                  <div class="subservice-header flex items-center justify-between q-mb-lg">
                    <div class="icon-circle bg-teal-50 text-teal-7">
                      <q-icon :name="getMedicalIcon(i)" size="26px" />
                    </div>
                    <q-icon name="arrow_outward" size="18px" class="arrow-out text-slate-400" />
                  </div>

                  <!-- Card Body: Judul & Info -->
                  <div class="subservice-body">
                    <h3 class="card-title text-weight-bold text-slate-800 q-mb-xs">
                      {{ sub.nama }}
                    </h3>
                    <div class="card-badge">
                      <q-icon name="subdirectory_arrow_right" size="10px" class="q-mr-xs" />
                      {{ item.nama }}
                    </div>
                  </div>

                  <!-- Card Footer: Link detail -->
                  <div class="subservice-footer flex items-center justify-between q-mt-md border-t border-slate-100 pt-3">
                    <span class="text-caption text-slate-500">Buka Detail</span>
                    <span class="btn-arrow-teal">
                      <q-icon name="arrow_forward" size="14px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    
    <div class="q-mb-xl" />
  </q-page>
</template>

<script setup>
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { onMounted } from 'vue'
import { pathImg } from 'src/boot/axios'
import ListBigPelayanan from './ListBigPelayanan.vue'
import { useRoute, useRouter } from 'vue-router'

const store = usePelayananWeb()
const router = useRouter()
const route = useRoute()

const isEmptyContent = (html) => {
  if (!html) return true
  const clean = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim()
  return clean.length === 0
}

onMounted(() => {
  store.getData(route.name)
})

function clickList(val) {
  if (route.name === 'pelayanan') {
    router.push('/pelayanan')
  } else {
    router.push('/pokja')
  }
  store.setTab(val)
}

function goTo(val, item) {
  router.push('/pelayanan/submenu/' + val.slug)
}

// Daftar ikon medis dinamis agar terlihat variatif
const medicalIcons = [
  'hotel', 'medical_services', 'monitor_heart', 'healing', 
  'psychology', 'vaccines', 'biotech', 'spa'
]
function getMedicalIcon(index) {
  return medicalIcons[index % medicalIcons.length]
}
</script>

<style lang="scss" scoped>
.pelayanan-page {
  min-height: 100vh;
}

.custom-tab-panels {
  background: transparent !important;
}

.panel-padding-none {
  padding: 0 !important;
}

.panel-header {
  border-bottom: 2px solid rgba(13, 148, 136, 0.1);
  padding-bottom: 12px;
}

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

.featured-image-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.featured-image-main {
  width: 100%;
  display: block;
}

.content-description-card {
  color: #334155;
  line-height: 1.75;
}

// ── Subservices Section ──────────────────────────────────────────
.subservices-title {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(13, 148, 136, 0.1);
  padding-bottom: 8px;
}

.title-pill {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0d9488;
  box-shadow: 0 0 6px #0d9488;
}

.subservice-card {
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 20px;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.09);
    border-color: rgba(13, 148, 136, 0.3);

    .subservice-card-glow { opacity: 0.04; }
    .icon-circle { background: #0d9488; color: white; }
    .arrow-out { color: #0d9488; transform: translate(2px, -2px); }
    .btn-arrow-teal { background: #0d9488; color: white; }
  }
}

.subservice-card-glow {
  position: absolute;
  inset: 0;
  background: #0d9488;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.card-title {
  font-size: 1.05rem;
  line-height: 1.35;
  color: #0f172a;
}

.card-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(13, 148, 136, 0.08);
  color: #0d9488;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
}

.btn-arrow-teal {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(13, 148, 136, 0.08);
  color: #0d9488;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.arrow-out {
  transition: all 0.3s ease;
}

// ── Empty State Styling ──
.empty-state-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.02);
  border: 1px dashed rgba(15, 23, 42, 0.08);
}
</style>
