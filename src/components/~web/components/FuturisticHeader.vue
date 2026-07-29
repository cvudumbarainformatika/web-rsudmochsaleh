<template>
  <header
    class="w-full z-50 transition-all duration-500"
    :class="{'glass-nav-fixed fixed-top': fixed, 'glass-nav relative': !fixed}"
  >
    <!-- Futuristic Top Utility Bar -->
    <div
      v-if="!store.visible"
      class="header-top-bar"
    >
      <div class="container-padding flex items-center justify-between py-2 text-white">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 bg-white-10 q-px-sm q-py-xs rounded-full">
            <q-icon name="call" size="16px" class="text-cyan-3" />
            <span class="text-caption text-weight-bold tracking-wide">
              {{ store.header.phone || '(0335) 433119, 511117' }}
            </span>
          </div>
          <div class="gt-xs flex items-center gap-2 text-caption opacity-80">
            <span class="pulse-dot-sm animate-pulse-dot" />
            <span>RSUD DR. MOHAMAD SALEH KOTA PROBOLINGGO</span>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="flex items-center gap-1">
          <q-btn
            dense
            flat
            round
            icon="ti-facebook"
            size="xs"
            class="top-social-btn"
            :href="store.header.link_fb"
            target="_blank"
          />
          <q-btn
            dense
            flat
            round
            icon="ti-instagram"
            size="xs"
            class="top-social-btn"
            :href="store.header.link_instagram"
            target="_blank"
          />
          <q-btn
            dense
            flat
            round
            icon="ti-youtube"
            size="xs"
            class="top-social-btn"
            :href="store.header.link_youtube"
            target="_blank"
          />
          <q-btn
            dense
            flat
            round
            icon="ti-tumblr-alt"
            size="xs"
            class="top-social-btn"
            :href="store.header.link_tiktok"
            target="_blank"
          />
        </div>
      </div>
    </div>

    <!-- Main Futuristic Navbar -->
    <nav class="mx-auto px-4 container-padding w-full">
      <div class="flex items-center justify-between h-16 md:h-20 w-full">
        <!-- Logo (Desktop & Mobile) -->
        <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
          <img
            :src="logo"
            alt="Logo RSUD"
            class="h-12 md:h-14 p-1 transition-transform duration-300 hover:scale-105"
          >
        </div>

        <!-- Desktop Navigation (Futuristic & Sleek) -->
        <div class="desktop-nav flex-grow justify-end items-center gap-1">
          <template
            v-for="(item, index) in menuItems"
            :key="index"
          >
            <!-- Dropdown wrapper -->
            <div
              class="relative"
              @mouseenter="handleDropdownMouseEnter(index)"
              @mouseleave="handleDropdownMouseLeave(index)"
            >
              <q-btn
                flat
                no-caps
                class="futuristic-nav-item"
                :class="{
                  'active-nav-link': route.path === item.href,
                  'text-slate-800': !fixed,
                  'text-slate-900': fixed
                }"
                @click="item.dropdown ? toggleDropdown(index) : navigateTo(item.href, item)"
              >
                <div class="text-weight-bold text-subtitle2 flex items-center gap-1">
                  {{ item.label }}
                  <q-icon
                    v-if="item.dropdown"
                    name="keyboard_arrow_down"
                    size="18px"
                    class="transition-transform duration-300"
                    :class="{'rotate-180': activeDropdown === index}"
                  />
                </div>
              </q-btn>

              <!-- Dropdown Content (Futuristic Glass Card & Split-View Mega Menu) -->
              <transition name="dropdown-fade">
                <div
                  v-if="item.dropdown && activeDropdown === index"
                  class="absolute top-full transform-gpu z-50 overflow-visible pt-2"
                  :class="[
                    hasAnyNestedSubmenu(item)
                      ? 'w-[720px] right-0'
                      : (item.items && item.items.length > 8 ? 'w-[680px] right-0' : 'w-80 left-0')
                  ]"
                >
                  <q-card
                    class="glass-dropdown-card shadow-24 rounded-2xl border-light overflow-hidden"
                  >
                  <!-- CASE 1: Split-View 2-Panel for Nested Submenus (e.g. PPID / Profil) -->
                  <div
                    v-if="hasAnyNestedSubmenu(item)"
                    class="row no-wrap dropdown-split-container"
                    style="min-height: 380px;"
                  >
                    <!-- Left Panel: Category Items -->
                    <div class="col-5 border-r border-slate-200/80 p-2 dropdown-scroll-body">
                      <div class="text-caption text-weight-bolder text-teal-8 uppercase tracking-wider px-3 py-1.5 mb-1">
                        Kategori {{ item.label }}
                      </div>
                      <div class="flex flex-col gap-1">
                        <q-item
                          v-for="(subItem, subIndex) in item.items"
                          :key="subIndex"
                          v-ripple
                          clickable
                          class="dropdown-menu-item rounded-xl p-2.5 transition-all duration-200"
                          :class="{
                            'bg-teal-50 text-teal-8 shadow-xs': (activeNestedSubMap[index] ?? getFirstNestedIndex(item)) === subIndex
                          }"
                          @mouseenter="activeNestedSubMap[index] = subIndex"
                          @click="!subItem?.submenu?.length ? navigateTo(subItem.href, subItem, item) : null"
                        >
                          <q-item-section side class="q-pr-xs">
                            <div
                              class="glow-dot"
                              :class="{'bg-teal-8 scale-125': (activeNestedSubMap[index] ?? getFirstNestedIndex(item)) === subIndex}"
                            />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label class="text-weight-bold text-body2 leading-snug">
                              {{ subItem.label }}
                            </q-item-label>
                          </q-item-section>

                          <q-item-section side>
                            <q-icon
                              v-if="subItem?.submenu?.length"
                              name="chevron_right"
                              size="18px"
                              class="transition-transform duration-200"
                              :class="{
                                'translate-x-1 text-teal-7': (activeNestedSubMap[index] ?? getFirstNestedIndex(item)) === subIndex,
                                'text-slate-400': (activeNestedSubMap[index] ?? getFirstNestedIndex(item)) !== subIndex
                              }"
                            />
                            <q-icon
                              v-else
                              name="east"
                              size="14px"
                              class="text-slate-400 opacity-60"
                            />
                          </q-item-section>
                        </q-item>
                      </div>
                    </div>

                    <!-- Right Panel: Dedicated Submenu Content Area -->
                    <div class="col-7 p-3 bg-slate-50/60 dropdown-scroll-body">
                      <template v-if="getActiveNestedItem(index, item)">
                        <div class="row items-center justify-between border-b border-slate-200 pb-2 mb-2">
                          <div>
                            <div class="text-subtitle2 text-weight-bolder text-slate-900 leading-tight">
                              {{ getActiveNestedItem(index, item).label }}
                            </div>
                            <div class="text-caption text-slate-500">
                              {{ getActiveNestedItem(index, item)?.submenu?.length ? 'Daftar Sub-Layanan Tersedia' : 'Tautan Langsung Halaman' }}
                            </div>
                          </div>
                          <q-badge
                            v-if="getActiveNestedItem(index, item)?.submenu?.length"
                            color="teal-8"
                            rounded
                            class="q-px-sm"
                          >
                            {{ getActiveNestedItem(index, item).submenu.length }} Item
                          </q-badge>
                        </div>

                        <!-- Submenu Items List -->
                        <div
                          v-if="getActiveNestedItem(index, item)?.submenu?.length"
                          class="flex flex-col gap-1.5"
                        >
                          <q-item
                            v-for="(subSubItem, subSubIdx) in getActiveNestedItem(index, item).submenu"
                            :key="subSubIdx"
                            v-ripple
                            clickable
                            class="dropdown-menu-item bg-white rounded-xl p-2.5 border border-slate-100 shadow-2xs transition-all duration-200 hover:border-teal-300"
                            @click="navigateTo(subSubItem.href)"
                          >
                            <q-item-section side class="q-pr-xs">
                              <q-icon name="subdirectory_arrow_right" size="14px" class="text-teal-7 opacity-80" />
                            </q-item-section>

                            <q-item-section>
                              <q-item-label class="text-weight-medium text-slate-700 text-body2 leading-snug">
                                {{ subSubItem.label }}
                              </q-item-label>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon name="arrow_forward" size="14px" class="text-slate-400" />
                            </q-item-section>
                          </q-item>
                        </div>

                        <!-- Direct Link Info Card (If no submenus) -->
                        <div v-else class="flex flex-center text-center p-6 h-full">
                          <div>
                            <q-icon name="touch_app" size="36px" class="text-teal-7 q-mb-xs" />
                            <div class="text-subtitle2 text-weight-bold text-slate-800">
                              {{ getActiveNestedItem(index, item).label }}
                            </div>
                            <div class="text-caption text-slate-500 q-mb-md">
                              Klik tombol di bawah ini untuk membuka halaman secara langsung.
                            </div>
                            <q-btn
                              unelevated
                              rounded
                              color="primary"
                              no-caps
                              label="Buka Halaman"
                              icon-right="east"
                              size="sm"
                              class="q-px-md"
                              @click="navigateTo(getActiveNestedItem(index, item).href, getActiveNestedItem(index, item), item)"
                            />
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>

                  <!-- CASE 2: Standard / Mega Grid for Non-nested Dropdowns (e.g. Pokja / Pelayanan) -->
                  <div v-else class="dropdown-scroll-body p-2">
                    <div
                      :class="[
                        item.items && item.items.length > 8 ? 'grid grid-cols-2 gap-1' : 'flex flex-col gap-1'
                      ]"
                    >
                      <template
                        v-for="(subItem, subIndex) in item.items"
                        :key="subIndex"
                      >
                        <q-item
                          v-ripple
                          clickable
                          class="dropdown-menu-item rounded-xl transition-all duration-250 p-2 text-slate-800"
                          @click="navigateTo(subItem.href, subItem, item)"
                        >
                          <q-item-section side class="q-pr-xs">
                            <div class="glow-dot" />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label class="text-weight-bold text-slate-800 text-body2 leading-snug">
                              {{ subItem.label }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </div>
                  </div>
                </q-card>
                </div>
              </transition>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button (Cool Black Hamburger) -->
        <div class="lg:hidden flex items-center">
          <q-btn
            flat
            dense
            color="dark"
            size="md"
            :icon="mobileMenuOpen ? 'close' : 'menu_open'"
            class="mobile-hamburger-btn p-2"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Drawer (Intact) -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden"
      >
        <mobileDrawer
          v-model="mobileMenuOpen"
          :logo="logo"
          :menus="menus"
          :menu-items="menuItems"
          :route="route.name"
        />
      </div>
    </nav>

    <div class="hidden">
      <app-tab-header
        v-if="route.name==='berita'"
        style="z-index:0"
      />
      <TabPelayanan
        v-else-if="route.name==='pelayanan'"
        v-model="storePelayanan.tab"
        :items="storePelayanan.menus"
      />
      <TabProfil
        v-else-if="route.name==='profil' "
        v-model="storeProfil.tab"
        :items="storeProfil.items"
      />
      <TabPpid
        v-else-if="route.name==='ppid'"
        v-model="storePpid.tab"
        :items="storePpid.items"
      />
      <TabPokja
        v-else-if="route.name==='pokja'"
        v-model="storePokja.tab"
        :items="storePokja.menus"
      />
    </div>
  </header>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { usePengaduanWeb } from 'src/stores/web/pengaduan'
import { usePokjaWeb } from 'src/stores/web/pokja'
import { usePpidWeb } from 'src/stores/web/ppid'
import { useProfilWeb } from 'src/stores/web/profil'
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import TabPelayanan from 'src/pages/Web/v1/Pelayanan/TabPelayanan.vue'
import TabPpid from 'src/pages/Web/v1/Ppid/TabPpid.vue'
import TabProfil from 'src/pages/Web/v1/Profil/TabProfil.vue'
import TabPokja from 'src/pages/Web/v1/Pokja/TabPokja.vue'

import mobileDrawer from '../mobileDrawer.vue'

defineProps({

  fixed: {
    type: Boolean,
    default: false
  }
})

// console.log(props.transparent)

const store = useAppStore()

const logo = computed(() => {
  if (store.logo === null) {
    return '/images/logos/logo-rsud.png'
  }
  return pathImg + store.logo
})

const router = useRouter()
const route = useRoute()
const activeDropdown = ref(null)
const activeSubmenu = ref(null)
const mobileMenuOpen = ref(false)
const hoveredSubmenu = ref(null)
const closeTimeout = ref(null)
const isHoveringDropdown = ref(false)
const isHoveringParentItem = ref(false)

const navigateTo = (href, item, parentItem) => {
  // console.log('Navigating to:', href, item, parentItem)
  // console.log('item:', item)
  // console.log('parentItem:', parentItem)
  if (href?.startsWith('/')) {
    router?.push(href)
    if (parentItem?.label === 'Profil') {
      storeProfil.setTab(item?.label)
    } else if (parentItem?.label === 'PPID') {
      storePpid.setTab(item?.label)
    } else if (parentItem?.label === 'Pokja Akreditasi') {
      storePokja.setTab(item?.label)
    } else if (parentItem?.label === 'Pengaduan') {
      storePengaduan.setTab(item?.label)
    } else if (parentItem?.label === 'Pelayanan') {
      storePelayanan.setTab(item?.label)
    }
  } else {
    if (process.env.CLIENT) {
      window.location.href = href
    }
  }
  mobileMenuOpen.value = false
  activeDropdown.value = null
  activeSubmenu.value = null
}

const closeDropdown = (index) => {
  // console.log('Attempting to close dropdown:', index)
  // Hanya tutup jika tidak ada yang di-hover
  if (!isHoveringDropdown.value && !isHoveringParentItem.value) {
    // console.log('Closing dropdown:', index)
    activeDropdown.value = null
    hoveredSubmenu.value = null
  }
}

const toggleDropdown = (index) => {
  activeDropdown.value = activeDropdown.value === index ? null : index
}

const handleParentItemEnter = (subIndex) => {
  hoveredSubmenu.value = subIndex
  isHoveringParentItem.value = true
}

const handleParentItemLeave = () => {
  isHoveringParentItem.value = false
  // Hanya tutup jika mouse sudah tidak di area submenu
  setTimeout(() => {
    if (!isHoveringParentItem.value) {
      hoveredSubmenu.value = null
    }
  }, 100)
}

const handleDropdownMouseEnter = (index) => {
  // console.log('Dropdown enter:', index)
  isHoveringDropdown.value = true
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
    closeTimeout.value = null
  }
  activeDropdown.value = index
}

const handleDropdownMouseLeave = (index) => {
  // console.log('Dropdown leave:', index)
  isHoveringDropdown.value = false

  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
  }

  // Delay harus >= durasi leave animation (180ms) agar smooth
  closeTimeout.value = setTimeout(() => {
    if (!isHoveringParentItem.value) {
      closeDropdown(index)
    }
  }, 220)
}

// Tambahkan watch untuk memonitor perubahan
watch(hoveredSubmenu, (newVal) => {
  // console.log('watch:', newVal)
})

// ini untuk desktop
const menuItems = [
  { label: 'Beranda', href: '/' },
  { label: 'Berita', href: '/berita' },
  {
    label: 'Pelayanan',
    dropdown: true,
    items: [
      {
        label: 'Rawat Inap',
        submenu: [
          { label: 'VIP', href: '/pelayanan/rawat-inap/vip' },
          { label: 'Kelas 1', href: '/pelayanan/rawat-inap/kelas-1' },
          { label: 'Kelas 2', href: '/pelayanan/rawat-inap/kelas-2' }
        ]
      },
      {
        label: 'Rawat Jalan',
        submenu: [
          { label: 'Poli Umum', href: '/pelayanan/rawat-jalan/poli-umum' },
          { label: 'Poli Gigi', href: '/pelayanan/rawat-jalan/poli-gigi' }
        ]
      },
      { label: 'IGD', href: '/pelayanan/igd' }
    ]
  },
  {
    label: 'Profil',
    dropdown: true,
    items: [
      { label: 'Sejarah', href: '/profil/sejarah' },
      { label: 'Visi Misi', href: '/profil/visi-misi' },
      { label: 'Struktur Organisasi', href: '/profil/struktur' }
    ]
  },
  {
    label: 'PPID',
    dropdown: true,
    items: [
      { label: 'Profil PPID', href: '/ppid/profil' },
      { label: 'Informasi Publik', href: '/ppid/informasi' },
      { label: 'Laporan', href: '/ppid/laporan' }
    ]
  },
  {
    label: 'Pokja Akreditasi',
    dropdown: true,
    items: [
      { label: 'ARK', href: '/pokja/ark' },
      { label: 'PMKP', href: '/pokja/pmkp' },
      { label: 'PPI', href: '/pokja/ppi' }
    ]
  },
  {
    label: 'Pengaduan',
    dropdown: true,
    items: [
      { label: 'Form Pengaduan', href: '/pengaduan/form' },
      { label: 'Tracking', href: '/pengaduan/tracking' }
    ]
  },
  { label: 'Buku Tamu', href: '/buku-tamu' }
]

// ini untuk mobile
const menus = ref([
  { name: 'beranda', url: 'beranda', title: 'Beranda', active: false },
  { name: 'berita', url: 'berita/all', title: 'Berita', active: false },
  { name: 'pelayanan', url: 'pelayanan', title: 'Pelayanan', active: false },
  { name: 'profil', url: 'profil', title: 'Profil', active: false },
  { name: 'ppid', url: 'ppid', title: 'PPID', active: false },
  { name: 'pokja', url: 'pokja', title: 'Pokja Akreditasi', active: false },
  { name: 'pengaduan', url: 'pengaduan', title: 'Pengaduan', active: false },
  { name: 'buku-tamu', url: 'buku-tamu', title: 'Buku Tamu', active: false }
])

const storePelayanan = usePelayananWeb()
const storeProfil = useProfilWeb()
const storePpid = usePpidWeb()
const storePokja = usePokjaWeb()
const storePengaduan = usePengaduanWeb()

onMounted(() => {
  Promise.all([
    store.getAppHeader(),
    storePelayanan.getMenu(),
    storeProfil.getData(),
    storePpid.getData(),
    storePokja.getMenu(),
    storePengaduan.getMenu()
  ])

  // console.log('header Web..', route.matched[2])

  handleRouteAwal()
  // handlePpidMenu()
})

// eslint-disable-next-line no-unused-vars
const handleRouteAwal = () => {
  const path = route?.matched[2]?.path ?? null
  const page = route?.matched[1]?.path
  const fullPath = route?.fullPath
  const noSub = path?.includes('/submenu')
  // const paramsPage = route?.params?.page

  if (!noSub) { // jika tidak ada submenu
    // console.log('page tanpa submenu', noSub, fullPath, page)
    // console.log('page tanpa submenu route', fullPath)
    if (page === '/ppid') {
      handlePpidMenu(fullPath)
    }
    if (page === '/profil') {
      handleProfileMenu(fullPath)
    }
    if (page === '/pelayanan') {
      handlePelayananMenu(fullPath)
    }
    if (page === '/pokja') {
      handlePokjaMenu(fullPath)
    }
    if (page === '/pengaduan') {
      handlePengaduanMenu(fullPath)
    }
  }
}

const handlePelayananMenu = (path) => {
  const pelayanan = storePelayanan.menus
  const newPel = pelayanan?.map(x => {
    return {
      label: x?.nama,
      submenu: x?.submenu.length
        ? x?.submenu?.map(y => {
          return {
            label: y.nama,
            href: '/pelayanan/submenu/' + y.slug
          }
        })
        : [],
      href: '/pelayanan/' + x.slug
    }
  })
  // console.log('pelayanan xxxx', newPel)
  const x = menuItems.find(x => x.label === 'Pelayanan').items = newPel
  if (path) {
    const page = x?.find(y => y.href === route.fullPath)?.label || null
    if (page) storePelayanan.setTab(page)
  }
}
const handleProfileMenu = (path) => {
  const menus = storeProfil.items
  const newPel = menus?.map(x => {
    return {
      label: x?.nama,
      submenu: x?.submenu?.length
        ? x?.submenu?.map(y => {
          return {
            label: y.nama,
            href: '/profil/submenu/' + y.slug
          }
        })
        : [],
      href: '/profil/' + x.slug
    }
  })
  // console.log('profil xxxx', newPel)
  const x = menuItems.find(x => x.label === 'Profil').items = newPel

  if (path) {
    const page = x?.find(y => y.href === route.fullPath)?.label || null
    if (page) storeProfil.setTab(page)
  }
}
const handlePpidMenu = (path) => {
  const menus = storePpid.items
  const newPel = menus?.map(x => {
    return {
      label: x?.nama,
      submenu: x?.submenu.length
        ? x?.submenu?.map(y => {
          return {
            label: y.nama,
            href: '/ppid/submenu/' + y.slug
          }
        })
        : [],
      href: '/ppid/' + x.slug
    }
  })
  // console.log('ppid xxxx', newPel)
  const x = menuItems.find(x => x.label === 'PPID').items = newPel
  // console.log('ppid tac', x)
  // console.log('path', path)
  if (path) {
    const page = x?.find(y => y.href === route.fullPath)?.label || null
    // console.log('ppid page', page)

    if (page) storePpid.setTab(page)
  }
}
const handlePokjaMenu = (path) => {
  const menus = storePokja.menus
  const newPel = menus?.map(x => {
    return {
      label: x?.nama,
      submenu: x?.submenu.length
        ? x?.submenu?.map(y => {
          return {
            label: y.nama,
            href: '/pokja/submenu/' + y.slug
          }
        })
        : [],
      href: '/pokja/' + x.slug
    }
  })
  // console.log('pelayanan xxxx', newPel)
  const x = menuItems.find(x => x.label === 'Pokja Akreditasi').items = newPel
  if (path) {
    const page = x?.find(y => y.href === route.fullPath)?.label || null
    if (page) storePokja.setTab(page)
  }
}
const handlePengaduanMenu = (path) => {
  const menus = storePengaduan.menus
  const newPel = menus?.map(x => {
    return {
      label: x?.nama,
      submenu: x?.submenu.length
        ? x?.submenu?.map(y => {
          return {
            label: y.nama,
            href: '/pengaduan/submenu/' + y.slug
          }
        })
        : [],
      href: '/pengaduan/' + x.slug
    }
  })
  // console.log('pelayanan xxxx', newPel)
  const x = menuItems.find(x => x.label === 'Pengaduan').items = newPel
  if (path) {
    const page = x?.find(y => y.href === route.fullPath)?.label || null
    if (page) storePengaduan.setTab(page)
  }
}

watch(() => storePelayanan.menus, handlePelayananMenu)
watch(() => storeProfil.items, handleProfileMenu)
watch(() => storePpid.items, handlePpidMenu)
watch(() => storePokja.menus, handlePokjaMenu)
watch(() => storePengaduan.menus, handlePengaduanMenu)

const prim = computed(() => {
  let pri = '#F2E3C6'
  if (store.themes.length > 0) {
    pri = store.themes[0].value
  }
  return pri
})

const second = computed(() => {
  let sec = '#06b8b8'
  if (store.themes.length > 0) {
    sec = store.themes[1].value
  }
  return sec
})

const activeNestedSubMap = ref({})

function hasAnyNestedSubmenu(menuItem) {
  return menuItem && menuItem.items && menuItem.items.some(sub => sub?.submenu && sub?.submenu?.length > 0)
}

function getFirstNestedIndex(menuItem) {
  if (!menuItem || !menuItem.items) return 0
  const idx = menuItem.items.findIndex(s => s?.submenu && s?.submenu?.length > 0)
  return idx >= 0 ? idx : 0
}

function getActiveNestedItem(menuIndex, menuItem) {
  if (!menuItem || !menuItem.items || menuItem.items.length === 0) return null
  const savedIdx = activeNestedSubMap.value[menuIndex]
  const activeIdx = savedIdx !== undefined ? savedIdx : getFirstNestedIndex(menuItem)
  return menuItem.items[activeIdx] || menuItem.items[0] || null
}

</script>

<style lang="scss" scoped>
.header-top-bar {
  background: linear-gradient(90deg, var(--q-primary) 0%, var(--q-secondary) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.top-social-btn {
  color: white !important;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-2px);
  }
}

.pulse-dot-sm {
  width: 6px;
  height: 6px;
  background-color: #00f2fe;
  border-radius: 50%;
  box-shadow: 0 0 8px #00f2fe;
}

.desktop-nav {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
    align-items: center;
  }
}

.futuristic-nav-item {
  position: relative;
  border-radius: 20px !important;
  padding: 6px 14px !important;
  transition: color 0.25s ease, background 0.25s ease !important;
  overflow: hidden;

  // Elegant underline sweep
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: calc(100% - 24px);
    height: 2px;
    background: linear-gradient(90deg, #0284c7, #06b6d4);
    border-radius: 4px;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-origin: center;
  }

  &:hover {
    background: rgba(2, 132, 199, 0.07) !important;
    color: #0284c7 !important;

    &::after {
      transform: translateX(-50%) scaleX(1);
    }
  }
}

.active-nav-link {
  background: rgba(2, 132, 199, 0.1) !important;
  color: #0284c7 !important;

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%) scaleX(1);
    width: calc(100% - 24px);
    height: 2px;
    background: linear-gradient(90deg, #0284c7, #06b6d4);
    border-radius: 4px;
  }
}

.glass-dropdown-card {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid #e2e8f0 !important;
  border-radius: 20px !important;
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.18) !important;
}

.dropdown-scroll-body {
  max-height: calc(78vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;

  /* Custom slim scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(241, 245, 249, 0.6);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
    &:hover {
      background: #0284c7;
    }
  }
}

.dropdown-menu-item {
  transition: all 0.25s ease;

  &:hover {
    background: rgba(2, 132, 199, 0.08) !important;

    .glow-dot {
      transform: scale(1.4);
      background-color: #0284c7;
      box-shadow: 0 0 10px #0284c7;
    }
  }
}

.glow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #94a3b8;
  transition: all 0.3s ease;
}

// Dropdown — Vue transition ultra-smooth
.dropdown-fade-enter-active {
  will-change: opacity, transform;
  pointer-events: none;
  transition:
    opacity 0.2s ease-out,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.dropdown-fade-leave-active {
  will-change: opacity, transform;
  pointer-events: none;
  transition:
    opacity 0.15s ease-in,
    transform 0.18s ease-in;
}
.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.dropdown-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.submenu-container {
  pointer-events: auto;
  min-width: 200px;
}

.mobile-hamburger-btn {
  color: #0f172a !important;
  background: rgba(15, 23, 42, 0.06) !important;
  border: 1px solid rgba(15, 23, 42, 0.15) !important;
  border-radius: 14px !important;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) !important;

  &:hover, &:active {
    background: rgba(15, 23, 42, 0.12) !important;
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15) !important;
  }
}
</style>
