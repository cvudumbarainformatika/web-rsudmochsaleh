<template>
  <q-page class="pengaduan-page-container">
    <app-loading v-if="store.loading" />

    <q-tab-panels
      v-else
      :key="store.tab"
      v-model="store.tab"
      animated
      vertical
      swipeable
      class="pengaduan-tab-panels"
    >
      <!-- Panel 1: Index / All -->
      <q-tab-panel name="all" class="panel-padding-none">
        <div class="panel-header flex items-center justify-between q-mb-md">
          <app-text-judul judul="Layanan Pengaduan" />
        </div>

        <div class="content-box">
          <ListBigPelayanan
            :items="store.items"
            @click="clickList"
          />
        </div>
      </q-tab-panel>

      <!-- Panel 2: Detail Pengaduan & Submenus -->
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

          <!-- Main Article HTML Content -->
          <div
            v-if="item.content && !isEmptyContent(item.content)"
            class="article-content q-mb-xl"
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
            <p class="text-slate-400 text-xs max-w-sm q-mt-xs q-mx-auto">Detail dokumen atau informasi untuk program pengaduan ini belum dipublikasikan.</p>
          </div>

          <!-- Sub-menu Grid (Bento Style) -->
          <div v-if="item.submenu && item.submenu.length > 0" class="submenu-section q-mt-xl">
            <div class="submenu-header-title flex items-center gap-2 q-mb-lg">
              <span class="header-indicator" />
              Kategori & Formulir Pengaduan
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
                  <!-- Card Glow Background Decorator -->
                  <div class="card-glow" />
                  
                  <div class="card-content-wrap">
                    <!-- Icon Circle & Dynamic Meds Icon -->
                    <div class="icon-circle flex items-center justify-center">
                      <q-icon
                        :name="getSubIcon(i)"
                        size="28px"
                        class="icon-color"
                      />
                    </div>

                    <!-- Title & Details -->
                    <div class="service-details q-mt-md">
                      <h4 class="service-title text-weight-bold text-slate-800 line-clamp-2">
                        {{ sub.nama }}
                      </h4>
                      <p class="service-slug text-slate-400 text-xs q-mt-xs">
                        @{{ sub.slug || 'pengaduan-sub' }}
                      </p>
                    </div>
                  </div>

                  <!-- Arrow Button Row -->
                  <div class="card-footer-row flex items-center justify-between q-mt-lg pt-3 border-t">
                    <span class="text-xs text-teal-600 font-semibold learn-more-txt">Selengkapnya</span>
                    <div class="arrow-btn-circle flex items-center justify-center">
                      <q-icon name="arrow_forward" size="14px" class="arrow-icon" />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { pathImg } from 'src/boot/axios'
import ListBigPelayanan from './ListBigPelayanan.vue'
import { useRoute, useRouter } from 'vue-router'
import { usePengaduanWeb } from 'src/stores/web/pengaduan'

const store = usePengaduanWeb()
const anim = ref(null)
const router = useRouter()
const route = useRoute()

const isEmptyContent = (html) => {
  if (!html) return true
  const clean = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim()
  return clean.length === 0
}

onMounted(() => {
  store.getData()
})

function clickList(val) {
  router.push('/pengaduan')
  store.setTab(val)
}

function goTo(val, item) {
  router.push('/pengaduan/submenu/' + val.slug)
}

// Dynamic icons for Pengaduan (complaints, support)
const defaultIcons = [
  'feedback',
  'support_agent',
  'rate_review',
  'report_problem',
  'chat',
  'contact_support',
  'email',
  'help'
]

function getSubIcon(index) {
  return defaultIcons[index % defaultIcons.length]
}
</script>

<style lang="scss" scoped>
.pengaduan-page-container {
  min-height: 80vh;
  padding-bottom: 2rem;
}

.pengaduan-tab-panels {
  background: transparent !important;
  margin-top: 1.5rem;
}

.panel-padding-none {
  padding: 0 !important;
  background: transparent !important;
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

.featured-image-main {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.article-content {
  color: #334155;

  :deep(p) {
    line-height: 1.75;
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
}

// ── Bento Grid Submenu Section ──────────────────────────────────
.submenu-header-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-indicator {
  width: 6px;
  height: 20px;
  background: linear-gradient(to bottom, #0d9488, #06b6d4);
  border-radius: 4px;
  display: inline-block;
}

// ── Subservice Bento Card ───────────────────────────────────────
.subservice-card {
  width: 100%;
  background: white;
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 20px;
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
    border-color: rgba(13, 148, 136, 0.3);

    .card-glow {
      opacity: 0.04;
    }

    .icon-circle {
      background: #0d9488;
      .icon-color {
        color: white;
      }
    }

    .arrow-btn-circle {
      background: #0d9488;
      .arrow-icon {
        color: white;
        transform: translateX(1px);
      }
    }

    .learn-more-txt {
      color: #0d9488;
    }
  }
}

.card-glow {
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
  background: rgba(13, 148, 136, 0.08);
  transition: all 0.3s ease;
}

.icon-color {
  color: #0d9488;
  transition: color 0.3s ease;
}

.service-title {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #1e293b;
  margin: 0;
}

.service-slug {
  margin: 0;
}

.border-t {
  border-top: 1px solid rgba(15, 23, 42, 0.06);
}

.pt-3 {
  padding-top: 0.75rem;
}

.arrow-btn-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.03);
  transition: all 0.3s ease;
}

.arrow-icon {
  color: #64748b;
  transition: all 0.3s ease;
}

.learn-more-txt {
  transition: color 0.3s ease;
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
