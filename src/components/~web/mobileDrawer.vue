<template>
  <q-dialog
    v-model="isOpen"
    position="bottom"
    transition-show="slide-up"
    transition-hide="slide-down"
    class="mobile-bottom-sheet-dialog"
  >
    <q-card class="mobile-bottom-sheet glass-card-sheet">
      <!-- Top Grab Bar (iOS / Android Style) -->
      <div class="sheet-grab-bar-container">
        <div class="sheet-grab-bar" />
      </div>

      <!-- Sheet Header: Main View -->
      <div v-if="!activeParent" class="row items-center justify-between q-px-lg q-pb-md">
        <div class="row items-center gap-3">
          <q-avatar size="44px" class="bg-teal-1 p-1">
            <img :src="logo" alt="Logo RSUD" />
          </q-avatar>
          <div>
            <div class="text-subtitle1 text-weight-bolder text-slate-900 leading-tight">
              RSUD dr. Mohamad Saleh
            </div>
            <div class="text-caption text-slate-500">
              Navigasi Layanan Publik
            </div>
          </div>
        </div>
        <q-btn
          flat
          round
          dense
          icon="close"
          color="dark"
          class="bg-slate-100"
          @click="isOpen = false"
        />
      </div>

      <!-- Sheet Header: Submenu View (With Back Button) -->
      <div v-else class="row items-center justify-between q-px-lg q-pb-md">
        <div class="row items-center gap-2">
          <q-btn
            flat
            round
            dense
            icon="arrow_back"
            color="teal-8"
            class="bg-teal-1"
            @click="activeParent = null"
          />
          <div>
            <div class="text-subtitle1 text-weight-bolder text-slate-900 leading-tight">
              {{ activeParent.label || activeParent.title || activeParent.name }}
            </div>
            <div class="text-caption text-teal-8 text-weight-medium">
              Pilih Sub-Kategori Layanan
            </div>
          </div>
        </div>
        <q-btn
          flat
          round
          dense
          icon="close"
          color="dark"
          class="bg-slate-100"
          @click="isOpen = false"
        />
      </div>

      <q-separator class="opacity-20 q-mb-sm" />

      <!-- View 1: Main Menu Grid -->
      <q-card-section v-if="!activeParent" class="q-pa-md sheet-scroll-content">
        <div class="row q-col-gutter-sm">
          <div
            v-for="(item, index) in displayMenus"
            :key="index"
            class="col-6"
          >
            <div
              class="mobile-menu-tile flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-300"
              :class="{
                'active-tile': item.name === route || isRouteActive(item),
                'idle-tile': item.name !== route && !isRouteActive(item)
              }"
              @click="handleMenuClick(item)"
            >
              <div
                class="tile-icon-box flex flex-center rounded-xl p-2"
                :class="item.name === route ? 'bg-white text-teal-8' : 'bg-teal-1 text-teal-8'"
              >
                <q-icon :name="getMenuIcon(item.name || item.label)" size="22px" />
              </div>
              <div class="flex-1 overflow-hidden">
                <div class="text-subtitle2 text-weight-bold text-truncate-1">
                  {{ item.label || item.title || item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <!-- View 2: Submenu List (Ultra Cool & Sleek Mobile Sheet) -->
      <q-card-section v-else class="q-pa-md sheet-scroll-content">
        <div class="column gap-2 w-full overflow-hidden">
          <template v-for="(subItem, subIndex) in activeSubmenuItems" :key="subIndex">
            <!-- Case A: Items WITH nested submenus -> Cool Card Accordion -->
            <div
              v-if="subItem.submenu && subItem.submenu.length"
              class="submenu-accordion-card rounded-2xl overflow-hidden mb-2 w-full"
            >
              <q-expansion-item
                expand-separator
                class="bg-teal-50/60 border-teal-100 text-slate-900"
                header-class="q-pa-md items-center"
              >
                <!-- Custom Header Slot -->
                <template #header>
                  <div class="row no-wrap items-center justify-between w-full pr-1">
                    <div class="row no-wrap items-center gap-3 col min-w-0 pr-2">
                      <div class="tile-icon-box bg-gradient-teal text-white rounded-xl p-2 shrink-0 flex flex-center">
                        <q-icon name="layers" size="18px" />
                      </div>
                      <div class="text-subtitle2 text-weight-bolder text-slate-900 break-words leading-tight col min-w-0">
                        {{ subItem.label }}
                      </div>
                    </div>
                    <q-badge color="teal-8" rounded class="q-px-sm text-caption shrink-0">
                      {{ subItem.submenu.length }} Sub
                    </q-badge>
                  </div>
                </template>

                <!-- Expanded Submenu List Slot -->
                <template #default>
                  <div class="nested-submenu-container q-pa-sm q-ml-md border-l-2 border-teal">
                    <q-item
                      v-for="(subSub, subSubIdx) in subItem.submenu"
                      :key="subSubIdx"
                      v-ripple
                      clickable
                      class="nested-sub-item rounded-xl q-my-xs transition-all duration-200"
                      @click="handleNavigateUrl(subSub.href)"
                    >
                      <q-item-section side class="q-pr-xs">
                        <div class="glow-dot-teal" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="text-weight-bold text-slate-800 text-body2 break-words leading-tight">
                          {{ subSub.label }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-icon name="chevron_right" size="16px" class="text-slate-400" />
                      </q-item-section>
                    </q-item>
                  </div>
                </template>
              </q-expansion-item>
            </div>

            <!-- Case B: Regular Items (Direct Link) -> Cool Modern Tile -->
            <div
              v-else
              v-ripple
              class="submenu-direct-tile row no-wrap items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-200 mb-2 w-full"
              @click="handleNavigateUrl(subItem.href)"
            >
              <div class="row no-wrap items-center gap-3 col min-w-0 pr-2">
                <div class="tile-icon-box bg-slate-100 text-teal-8 rounded-xl p-2 shrink-0 flex flex-center">
                  <q-icon name="article" size="18px" />
                </div>
                <div class="text-subtitle2 text-weight-bold text-slate-800 break-words leading-tight col min-w-0">
                  {{ subItem.label }}
                </div>
              </div>
              <div class="shrink-0 text-slate-400">
                <q-icon name="chevron_right" size="16px" />
              </div>
            </div>
          </template>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  logo: {
    type: String,
    default: '/images/logos/logo-rsud.png'
  },
  title: {
    type: String,
    default: 'UOBK RSUD DOKTER MOHAMAD SALEH'
  },
  menus: {
    type: Array,
    default: () => []
  },
  menuItems: {
    type: Array,
    default: () => []
  },
  route: {
    type: String,
    default: 'beranda'
  }
})

const emit = defineEmits(['update:modelValue'])
const router = useRouter()
const activeParent = ref(null)

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

watch(isOpen, (val) => {
  if (!val) {
    activeParent.value = null
  }
})

const displayMenus = computed(() => {
  if (props.menuItems && props.menuItems.length > 0) {
    return props.menuItems.map(m => ({
      name: (m.label || '').toLowerCase().replace(/\s+/g, '-'),
      label: m.label,
      title: m.label,
      url: m.href || '',
      href: m.href || '',
      dropdown: m.dropdown,
      items: m.items
    }))
  }
  return props.menus
})

const activeSubmenuItems = computed(() => {
  if (activeParent.value && activeParent.value.items) {
    return activeParent.value.items
  }
  return []
})

function hasSubmenu(item) {
  return (item.dropdown && item.items && item.items.length > 0) || (item.items && item.items.length > 0)
}

function handleMenuClick(item) {
  if (hasSubmenu(item)) {
    activeParent.value = item
  } else {
    const url = item.href || (item.url ? (item.url.startsWith('/') ? item.url : `/${item.url}`) : '/')
    handleNavigateUrl(url)
  }
}

function handleNavigateUrl(url) {
  if (url) {
    router.push(url)
  }
  isOpen.value = false
  activeParent.value = null
}

function getMenuIcon(name) {
  const n = (name || '').toLowerCase()
  if (n.includes('beranda')) return 'space_dashboard'
  if (n.includes('berita')) return 'newspaper'
  if (n.includes('pelayanan')) return 'medical_services'
  if (n.includes('profil')) return 'info'
  if (n.includes('ppid')) return 'balance'
  if (n.includes('pokja')) return 'verified'
  if (n.includes('pengaduan')) return 'support_agent'
  if (n.includes('buku')) return 'menu_book'
  return 'apps'
}

function isRouteActive(item) {
  return false
}
</script>

<style lang="scss" scoped>
.mobile-bottom-sheet {
  border-radius: 28px 28px 0 0 !important;
  max-height: 82vh;
  overflow-x: hidden !important;
  overflow-y: hidden;
  width: 100%;
}

.glass-card-sheet {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -10px 40px rgba(15, 23, 42, 0.15) !important;
}

.sheet-grab-bar-container {
  display: flex;
  justify-content: center;
  padding: 10px 0 6px;
}

.sheet-grab-bar {
  width: 44px;
  height: 5px;
  background-color: #cbd5e1;
  border-radius: 99px;
}

.sheet-scroll-content {
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden !important;
  width: 100%;
}

.mobile-menu-tile {
  border: 1px solid #e2e8f0;
}

.idle-tile {
  background: #f8fafc;
  color: #0f172a;

  &:active {
    background: #f1f5f9;
    transform: scale(0.98);
  }
}

.active-tile {
  background: linear-gradient(135deg, var(--q-primary), var(--q-secondary)) !important;
  color: white !important;
  border-color: transparent !important;
  box-shadow: 0 4px 15px rgba(0, 180, 219, 0.3);

  .text-slate-900, .text-subtitle2 {
    color: white !important;
  }
}

.submenu-expansion-item {
  border-radius: 16px;
}

.submenu-accordion-card {
  border: 1px solid #ccfbf1;
  background: #f0fdfa;
  box-shadow: 0 2px 8px rgba(13, 148, 136, 0.06);
}

.submenu-direct-tile {
  border: 1px solid #f1f5f9;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);

  &:active {
    background: #f8fafc;
    border-color: #cbd5e1;
    transform: scale(0.99);
  }
}

.bg-gradient-teal {
  background: linear-gradient(135deg, var(--q-primary), var(--q-secondary)) !important;
  box-shadow: 0 3px 10px rgba(0, 180, 219, 0.25);
}

.glow-dot-teal {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--q-secondary);
  box-shadow: 0 0 8px var(--q-secondary);
}

.nested-sub-item {
  &:hover, &:active {
    background: rgba(2, 132, 199, 0.08);
  }
}

.text-truncate-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
