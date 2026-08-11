<template>
  <header
    class="w-full z-50 transition-all duration-300 enterprise-sticky-header"
    :class="{'glass-nav-fixed': isScrolled, 'glass-nav': !isScrolled}"
  >
    <!-- Top Utility Bar (Selalu Ada & Stabil - Tanpa v-if yang Membuat Halaman Meloncat) -->
    <div class="header-top-bar">
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

    <!-- Main Futuristic Navbar (Tampil Utuh Pada Layar 1300px - Breakpoint gt-sm) -->
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

        <!-- Desktop Navigation (Selalu Tampak di Layar 1300px / Breakpoint gt-sm) -->
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
                  'active-nav-link': isLinkActive(item),
                  'text-slate-800': true
                }"
                @click="item.dropdown ? toggleDropdown(index) : navigateTo(item.href, item)"
              >
                <div class="font-bold text-xs tracking-tight">
                  {{ item.label }}
                </div>
              </q-btn>

              <!-- Dropdown Content (Futuristic Glass Card & Split-View Mega Menu) -->
              <transition name="dropdown-fade">
                <div
                  v-if="item.dropdown && activeDropdown === index && item.items && item.items.length > 0"
                  class="absolute top-full transform-gpu z-50 overflow-visible pt-2"
                  :class="getDropdownClass(item, index)"
                >
                  <q-card
                    class="glass-dropdown-card shadow-24 animate-slide-down rounded-2xl border-light overflow-hidden"
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

                        <!-- Direct Link Info Card -->
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

                  <!-- CASE 2: Standard Mega Grid -->
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

        <!-- Mobile Menu Button (Hanya Muncul Pada HP / Layar di Bawah 768px) -->
        <div class="mobile-hamburger-wrap flex items-center">
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

      <!-- Mobile Drawer -->
      <div
        v-if="mobileMenuOpen"
        class="mobile-drawer-wrap"
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
import { useInteraksiWeb } from 'src/stores/web/interaksi'
import { useAntrianOnlineWeb } from 'src/stores/web/antrianOnline'
import { ref, onMounted, computed, watch, onBeforeUnmount, reactive } from 'vue'
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

const store = useAppStore()
const storePelayanan = usePelayananWeb()
const storeProfil = useProfilWeb()
const storePpid = usePpidWeb()
const storePokja = usePokjaWeb()
const storePengaduan = usePengaduanWeb()
const storeInteraksi = useInteraksiWeb()
const storeAntrianOnline = useAntrianOnlineWeb()

const logo = computed(() => {
  if (store.logo === null) {
    return '/images/logos/logo-rsud.png'
  }
  return pathImg + store.logo
})

const router = useRouter()
const route = useRoute()
const activeDropdown = ref(null)
const mobileMenuOpen = ref(false)
const hoveredSubmenu = ref(null)
const closeTimeout = ref(null)
const isHoveringDropdown = ref(false)
const isHoveringParentItem = ref(false)
const isScrolled = ref(false)

function handleScroll() {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 20
  }
}

const navigateTo = (href, item, parentItem) => {
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
    if (process.env.CLIENT && href) {
      window.location.href = href
    }
  }
  mobileMenuOpen.value = false
  activeDropdown.value = null
}

const closeDropdown = (index) => {
  if (!isHoveringDropdown.value && !isHoveringParentItem.value) {
    activeDropdown.value = null
    hoveredSubmenu.value = null
  }
}

const toggleDropdown = (index) => {
  activeDropdown.value = activeDropdown.value === index ? null : index
}

const handleDropdownMouseEnter = (index) => {
  isHoveringDropdown.value = true
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
    closeTimeout.value = null
  }
  activeDropdown.value = index
}

const handleDropdownMouseLeave = (index) => {
  isHoveringDropdown.value = false
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
  }
  closeTimeout.value = setTimeout(() => {
    if (!isHoveringParentItem.value) {
      closeDropdown(index)
    }
  }, 220)
}

function getDropdownClass(item, index) {
  const isNested = hasAnyNestedSubmenu(item)
  const isLarge = item.items && item.items.length > 8
  const isMega = isNested || isLarge
  const widthStyle = isNested ? 'w-[720px]' : (isLarge ? 'w-[680px]' : 'w-80')

  // Menu paling awal (index 0 / Beranda): Rata kiri aman agar tidak tembus layar kiri
  if (index === 0) {
    return `${widthStyle} left-0`
  }

  // Menu paling akhir (Buku Tamu): Rata kanan aman agar tidak tembus layar kanan
  if (index >= menuItems.length - 1) {
    return `${widthStyle} right-0`
  }

  // Untuk Mega Menu (720px / 680px):
  // Center alignment yang presisi dan aman dari batas layar
  if (isMega) {
    if (index <= 2) {
      return `${widthStyle} left-1/2 -translate-x-[25%]`
    }
    if (index >= menuItems.length - 3) {
      return `${widthStyle} left-1/2 -translate-x-[75%]`
    }
    return `${widthStyle} left-1/2 -translate-x-1/2`
  }

  // Untuk Dropdown Standar (320px / w-80):
  // 100% PERFECTLY CENTERED DI TENGAH-TENGAH TOMBOL MENU INDUK
  return `${widthStyle} left-1/2 -translate-x-1/2`
}

// Menu Statis Resmi — JANGAN dihapus oleh logika custom menu
const menuItems = reactive([
  { label: 'Beranda', href: '/', isStatic: true },
  { label: 'Berita', href: '/berita/all', isStatic: true },
  {
    label: 'Pelayanan',
    dropdown: true,
    href: '/pelayanan',
    isStatic: true,
    items: []
  },
  {
    label: 'Profil',
    dropdown: true,
    href: '/profil',
    isStatic: true,
    items: []
  },
  {
    label: 'PPID',
    dropdown: true,
    href: '/ppid',
    isStatic: true,
    items: []
  },
  {
    label: 'Pokja Akreditasi',
    dropdown: true,
    href: '/pokja',
    isStatic: true,
    items: []
  },
  {
    label: 'Pengaduan',
    dropdown: true,
    href: '/pengaduan',
    isStatic: true,
    items: []
  },
  {
    label: 'Interaksi',
    dropdown: true,
    href: '/interaksi',
    isStatic: true,
    items: []
  },
  {
    label: 'Antrian Online',
    dropdown: true,
    href: '/antrian-online',
    isStatic: true,
    items: []
  },
  { label: 'Buku Tamu', href: '/buku-tamu', isStatic: true }
])

const menus = ref([
  { name: 'beranda', url: 'beranda', title: 'Beranda', active: false },
  { name: 'berita', url: 'berita/all', title: 'Berita', active: false },
  { name: 'pelayanan', url: 'pelayanan', title: 'Pelayanan', active: false },
  { name: 'profil', url: 'profil', title: 'Profil', active: false },
  { name: 'ppid', url: 'ppid', title: 'PPID', active: false },
  { name: 'pokja', url: 'pokja', title: 'Pokja Akreditasi', active: false },
  { name: 'pengaduan', url: 'pengaduan', title: 'Pengaduan', active: false },
  { name: 'interaksi', url: 'interaksi', title: 'Interaksi', active: false },
  { name: 'antrian-online', url: 'antrian-online', title: 'Antrian Online', active: false },
  { name: 'buku-tamu', url: 'buku-tamu', title: 'Buku Tamu', active: false }
])

function isLinkActive(item) {
  if (item.href && route.path === item.href) return true
  if (item.items && item.items.some(sub => route.path.startsWith(sub.href))) return true
  return false
}

const handlePelayananMenu = (path) => {
  const pelayanan = storePelayanan.menus
  if (!pelayanan || pelayanan.length === 0) return
  const newPel = pelayanan.map(x => ({
    label: x?.nama,
    submenu: x?.submenu?.length
      ? x.submenu.map(y => ({ label: y.nama, href: '/pelayanan/submenu/' + y.slug }))
      : [],
    href: '/pelayanan/' + x.slug
  }))
  const target = menuItems.find(x => x.label === 'Pelayanan')
  if (target) target.items = newPel
  if (path) {
    const page = newPel?.find(y => y.href === route.fullPath)?.label || null
    if (page) storePelayanan.setTab(page)
  }
}

const handleProfileMenu = (path) => {
  const menus = storeProfil.items
  if (!menus || menus.length === 0) return
  const newPel = menus.map(x => ({
    label: x?.nama,
    submenu: x?.submenu?.length
      ? x.submenu.map(y => ({ label: y.nama, href: '/profil/submenu/' + y.slug }))
      : [],
    href: '/profil/' + x.slug
  }))
  const target = menuItems.find(x => x.label === 'Profil')
  if (target) target.items = newPel
  if (path) {
    const page = newPel?.find(y => y.href === route.fullPath)?.label || null
    if (page) storeProfil.setTab(page)
  }
}

const handlePpidMenu = (path) => {
  const menus = storePpid.items
  if (!menus || menus.length === 0) return
  const newPel = menus.map(x => ({
    label: x?.nama,
    submenu: x?.submenu?.length
      ? x.submenu.map(y => ({ label: y.nama, href: '/ppid/submenu/' + y.slug }))
      : [],
    href: '/ppid/' + x.slug
  }))
  const target = menuItems.find(x => x.label === 'PPID')
  if (target) target.items = newPel
  if (path) {
    const page = newPel?.find(y => y.href === route.fullPath)?.label || null
    if (page) storePpid.setTab(page)
  }
}

const handlePokjaMenu = (path) => {
  const menus = storePokja.menus
  if (!menus || menus.length === 0) return
  const newPel = menus.map(x => ({
    label: x?.nama,
    submenu: x?.submenu?.length
      ? x.submenu.map(y => ({ label: y.nama, href: '/pokja/submenu/' + y.slug }))
      : [],
    href: '/pokja/' + x.slug
  }))
  const target = menuItems.find(x => x.label === 'Pokja Akreditasi')
  if (target) target.items = newPel
  if (path) {
    const page = newPel?.find(y => y.href === route.fullPath)?.label || null
    if (page) storePokja.setTab(page)
  }
}

const handlePengaduanMenu = (path) => {
  const menus = storePengaduan.menus
  if (!menus || menus.length === 0) return
  const newPel = menus.map(x => ({
    label: x?.nama,
    submenu: x?.submenu?.length
      ? x.submenu.map(y => ({ label: y.nama, href: '/pengaduan/submenu/' + y.slug }))
      : [],
    href: '/pengaduan/' + x.slug
  }))
  const target = menuItems.find(x => x.label === 'Pengaduan')
  if (target) target.items = newPel
  if (path) {
    const page = newPel?.find(y => y.href === route.fullPath)?.label || null
    if (page) storePengaduan.setTab(page)
  }
}

watch(() => storePelayanan.menus, () => handlePelayananMenu(route.fullPath))
watch(() => storeProfil.items, () => handleProfileMenu(route.fullPath))
const handleInteraksiMenu = (path) => {
  const menus = storeInteraksi.items
  if (!menus || menus.length === 0) return
  const newPel = menus.map(x => ({
    label: x?.nama,
    submenu: x?.submenu?.length
      ? x.submenu.map(y => ({ label: y.nama, href: '/interaksi/submenu/' + y.slug }))
      : [],
    href: '/interaksi/' + x.slug
  }))
  const target = menuItems.find(x => x.label === 'Interaksi')
  if (target) target.items = newPel
  if (path) {
    const page = newPel?.find(y => y.href === route.fullPath)?.label || null
    if (page) storeInteraksi.setTab(page)
  }
}

const handleAntrianOnlineMenu = (path) => {
  const menus = storeAntrianOnline.items
  if (!menus || menus.length === 0) return
  const newPel = menus.map(x => ({
    label: x?.nama,
    submenu: x?.submenu?.length
      ? x.submenu.map(y => ({ label: y.nama, href: '/antrian-online/submenu/' + y.slug }))
      : [],
    href: '/antrian-online/' + x.slug
  }))
  const target = menuItems.find(x => x.label === 'Antrian Online')
  if (target) target.items = newPel
  if (path) {
    const page = newPel?.find(y => y.href === route.fullPath)?.label || null
    if (page) storeAntrianOnline.setTab(page)
  }
}

watch(() => storeInteraksi.items, () => handleInteraksiMenu(route.fullPath))
watch(() => storeAntrianOnline.items, () => handleAntrianOnlineMenu(route.fullPath))
watch(() => storePpid.items, () => handlePpidMenu(route.fullPath))
watch(() => storePokja.menus, () => handlePokjaMenu(route.fullPath))
watch(() => storePengaduan.menus, () => handlePengaduanMenu(route.fullPath))

import { useCustomMenuWeb } from 'src/stores/web/customMenu'
const storeCustomMenu = useCustomMenuWeb()

const handleCustomMenu = async () => {
  await storeCustomMenu.getWebMenus()
  const customList = storeCustomMenu.menus
  if (!customList || customList.length === 0) return

  // Format seluruh item menu dinamis dari backend
  const formattedCustoms = customList.map(m => ({
    label: m.nama,
    href: m.external_link ? m.external_link : `/menu/${m.slug}`,
    dropdown: m.children && m.children.length > 0,
    isCustom: true, // flag penanda menu dinamis
    items: m.children?.map(sub => ({
      label: sub.nama,
      href: sub.external_link ? sub.external_link : `/menu/${sub.slug}`,
      submenu: sub.children?.map(sub3 => ({
        label: sub3.nama,
        href: sub3.external_link ? sub3.external_link : `/menu/${sub3.slug}`
      })) || []
    })) || []
  }))

  // Filter out menu dinamis jika nama/label nya sudah ada di menu statis resmi (mencegah duplikasi ganda)
  const existingStaticLabels = menuItems.filter(x => x.isStatic).map(x => x.label.trim().toLowerCase())
  const uniqueFormattedCustoms = formattedCustoms.filter(m => !existingStaticLabels.includes(m.label.trim().toLowerCase()))

  // Hanya hapus menu dinamis lama (isCustom = true), JANGAN sentuh menu statis
  for (let i = menuItems.length - 1; i >= 0; i--) {
    if (menuItems[i].isCustom) {
      menuItems.splice(i, 1)
    }
  }

  // Sisipkan menu dinamis unik persis SEBELUM "Buku Tamu"
  const bukuTamuIndex = menuItems.findIndex(x => x.label === 'Buku Tamu')
  if (bukuTamuIndex !== -1) {
    menuItems.splice(bukuTamuIndex, 0, ...uniqueFormattedCustoms)
  } else {
    menuItems.push(...uniqueFormattedCustoms)
  }
}

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

const handleRouteAwal = () => {
  const path = route?.matched[2]?.path ?? null
  const page = route?.matched[1]?.path
  const fullPath = route?.fullPath
  const noSub = path?.includes('/submenu')

  if (!noSub) {
    if (page === '/ppid') handlePpidMenu(fullPath)
    if (page === '/profil') handleProfileMenu(fullPath)
    if (page === '/pelayanan') handlePelayananMenu(fullPath)
    if (page === '/pokja') handlePokjaMenu(fullPath)
    if (page === '/pengaduan') handlePengaduanMenu(fullPath)
    if (page === '/interaksi') handleInteraksiMenu(fullPath)
    if (page === '/antrian-online') handleAntrianOnlineMenu(fullPath)
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
  }
  Promise.all([
    store.getAppHeader(),
    storePelayanan.getMenu(),
    storeProfil.getData(),
    storePpid.getData(),
    storePokja.getMenu(),
    storePengaduan.getMenu(),
    storeInteraksi.getData(),
    storeAntrianOnline.getData(),
    handleCustomMenu()
  ]).then(() => {
    handleRouteAwal()
  })
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style lang="scss" scoped>
// Kunci Posisi Header Sticky Tanpa Loncat (0% Layout Shift)
.enterprise-sticky-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: white;
}

// Skema Pewarnaan Asli Gradasi Primary ke Secondary
.header-top-bar {
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
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

// Breakpoint Desktop Navbar: Tampil Penuh di Layar Desktop (>= 768px / 1300px)
.desktop-nav {
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    display: none !important;
  }
}

// Hamburger Mobile Button: Hanya Tampil Pada HP (< 768px)
.mobile-hamburger-wrap {
  display: none;

  @media (max-width: 767px) {
    display: flex !important;
  }
}

.futuristic-nav-item {
  position: relative;
  border-radius: 14px !important;
  padding: 4px 8px !important;
  min-height: 32px !important;
  font-size: 0.78rem !important;
  transition: all 0.3s ease;

  :deep(.q-btn__content) {
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    padding: 0 !important;
    min-height: auto !important;
  }

  &:hover {
    background: rgba(13, 148, 136, 0.08) !important;
    color: #0d9488 !important;
  }
}

.active-nav-link {
  background: rgba(13, 148, 136, 0.12) !important;
  color: #0d9488 !important;
}

.glass-dropdown-card {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid #e2e8f0 !important;
  border-radius: 20px !important;
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.18) !important;
  max-width: calc(100vw - 32px) !important;
}

.dropdown-scroll-body {
  max-height: calc(78vh - 80px);
  overflow-y: auto;
  overflow-x: hidden;

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
      background: #0d9488;
    }
  }
}

.dropdown-menu-item {
  transition: all 0.25s ease;

  &:hover {
    background: rgba(13, 148, 136, 0.08) !important;

    .glow-dot {
      transform: scale(1.4);
      background-color: #0d9488;
      box-shadow: 0 0 10px #0d9488;
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

.animate-slide-down {
  animation: slideDown 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
