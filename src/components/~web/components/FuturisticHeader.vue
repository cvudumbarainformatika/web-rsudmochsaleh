<template>
  <header
    class="w-full z-10 border-1 border-grey-200"
    :class="{'bg-primary': fixed, 'bg-gray-100': !fixed, 'fixed-top': fixed, 'relative': !fixed}"
  >
    <!-- bar -->

    <div
      v-if="!store.visible"
      class="header-one transparent"
    >
      <q-bar
        class="container-padding bg-primary text-white"
        style="height:40px !important;"
      >
        <q-icon
          name="call"
          size="24px"
        />
        <div class="f-12">
          {{ store.header.phone }}
        </div>

        <q-space />

        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="ti-facebook"
          size="sm"
          :href="store.header.link_fb"
          target="_blank"
        />
        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="ti-instagram"
          size="sm"
          :href="store.header.link_instagram"
          target="_blank"
        />
        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="ti-youtube"
          size="sm"
          :href="store.header.link_youtube"
          target="_blank"
        />
        <q-btn
          class="q-mr-sm"
          dense
          flat
          icon="ti-tumblr-alt"
          size="sm"
          :href="store.header.link_tiktok"
          target="_blank"
        />
      </q-bar>
    </div>

    <!-- Navbar Container -->
    <nav class="mx-auto px-4 container-padding w-full">
      <div class="flex items-center justify-between h-18 w-full">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <!-- <div
            class="text-center px-2 bg-primary overflow-hidden deskt-only"
            style="margin-top: -2px;"
          > -->
          <img
            src="/images/logos/logo-rsud.png"
            alt="Logo"
            class="h-18 deskt-only p-1"
          >
          <!-- </div> -->
        </div>

        <!-- Desktop Navigation -->
        <div class="desktop-nav flex-grow justify-end">
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
                :class="[
                  'menu__item',
                  {'text-white': fixed, 'text-primary': !fixed}
                ]"
                :text-color="fixed ? 'white' : 'primary'"
                @click="item.dropdown ? toggleDropdown(index) : navigateTo(item.href, item)"
              >
                <div class="text-bold">
                  {{ item.label }}
                </div>
              </q-btn>

              <!-- Dropdown Content -->
              <div
                v-if="item.dropdown"
                v-show="activeDropdown === index"
                class="absolute top-full left-0 w-56 transform-gpu z-50 overflow-visible"
                :class="{'w-64': item.label === 'Pokja Akreditasi'}"
                style="margin-top: 5px;"
              >
                <q-card
                  class="bg-white shadow-xl animate-slide-down"
                  style="border-radius: 12px;"
                >
                  <q-list padding>
                    <template
                      v-for="(subItem, subIndex) in item.items"
                      :key="subIndex"
                    >
                      <!-- Regular Dropdown Item -->
                      <template v-if="!subItem?.submenu?.length">
                        <q-item
                          v-ripple
                          clickable
                          class="menu-item rounded-lg transition-all duration-300"
                          @click="navigateTo(subItem.href, subItem, item)"
                        >
                          <q-item-section side>
                            <div class="circle-icon" />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label class="text-primary text-xs">
                              {{ subItem.label }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>

                      <!-- Nested Dropdown Item -->
                      <div
                        v-else
                        class="relative group overflow-visible dropdown-wrapper"
                      >
                        <!-- Parent Item -->
                        <q-item
                          v-ripple
                          clickable
                          class="menu-item rounded-lg transition-all duration-300"
                          @mouseenter="handleParentItemEnter(subIndex)"
                          @mouseleave="handleParentItemLeave"
                        >
                          <q-item-section side>
                            <div class="circle-icon" />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label class="text-primary text-xs">
                              {{ subItem.label }}
                            </q-item-label>
                          </q-item-section>

                          <q-item-section side>
                            <q-icon
                              name="arrow_forward"
                              size="xs"
                              class="text-primary transition-transform duration-300"
                              :class="{'scale-150': hoveredSubmenu === subIndex}"
                            />
                          </q-item-section>
                        </q-item>

                        <!-- Submenu -->
                        <div
                          v-show="hoveredSubmenu === subIndex"
                          class="absolute left-full top-0 w-56 z-50 rounded-xl submenu-container"
                          style="margin-left: 1px; margin-top: -8px;"
                        >
                          <q-card
                            class="bg-white shadow-xl rounded-xl overflow-hidden"
                            style="border-radius: 12px !important;"
                          >
                            <q-list
                              padding
                              class="overflow-visible"
                            >
                              <q-item
                                v-for="(subSubItem, subSubIndex) in subItem.submenu"
                                :key="subSubIndex"
                                v-ripple
                                clickable
                                class="menu-item rounded-lg transition-all duration-300"
                                @click="navigateTo(subSubItem.href)"
                              >
                                <q-item-section side>
                                  <div class="circle-icon" />
                                </q-item-section>

                                <q-item-section>
                                  <q-item-label class="text-primary text-xs">
                                    {{ subSubItem.label }}
                                  </q-item-label>
                                </q-item-section>

                                <!-- <q-item-section side>
                                  <q-icon
                                    name="arrow_forward"
                                    size="xs"
                                    class="text-primary opacity-0 transition-all duration-300"
                                  />
                                </q-item-section> -->
                              </q-item>
                            </q-list>
                          </q-card>
                        </div>
                      </div>

                      <q-separator
                        v-if="subIndex < item.items.length - 1"
                        class="opacity-30"
                      />
                    </template>
                  </q-list>
                </q-card>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden">
          <q-btn
            flat
            round
            :color="`${store.visible?'white':'primary'}`"
            :icon="mobileMenuOpen ? 'mdi-close' : 'mdi-menu'"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- drawer for mobile -->
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden"
      >
        <mobileDrawer
          v-model="mobileMenuOpen"
          :logo="logo"
          :menus="menus"
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

const logo = computed(() => {
  if (store.logo === null) {
    return new URL('../../assets/logos/logo-rsud.png', import.meta.url).href
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
  console.log('Navigating to:', href, item, parentItem)
  console.log('item:', item)
  console.log('parentItem:', parentItem)
  if (href.startsWith('/')) {
    router.push(href)
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
    window.location.href = href
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

  closeTimeout.value = setTimeout(() => {
    if (!isHoveringParentItem.value) {
      closeDropdown(index)
    }
  }, 300)
}

// Tambahkan watch untuk memonitor perubahan
watch(hoveredSubmenu, (newVal) => {
  console.log('watch:', newVal)
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

const store = useAppStore()
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
    console.log('page tanpa submenu', noSub, fullPath, page)
    console.log('page tanpa submenu route', fullPath)
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
</script>

<style lang="scss">
.desktop-nav {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-nav {
    display: flex;
    align-items: center;
  }
}

// Add or update these styles
.relative.group {
  position: relative !important;
  overflow: visible !important;
}

.q-list {
  overflow: visible !important;
}

.q-menu {
  overflow: visible !important;
}

// Enhanced dropdown animation
.animate-slide-down {
  animation: slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideDown {
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Enhanced shadow
.q-card {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05),
              0 0 15px rgba(0, 0, 0, 0.1) !important;
}

// Submenu animation
.absolute.left-full {
  opacity: 0;
  transition: opacity 0.2s ease;

  &[style*="display: block"] {
    opacity: 1;
  }
}

/* Ensure consistent spacing and alignment */
.flex-grow {
  flex-grow: 1;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/* Ensure proper z-index stacking */
.z-50 {
  z-index: 50;
}

.menu__item {
  position: relative;
  margin-right: 10px;
  font-size: 14px;
  padding: 2px 10px;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    border-radius: 15px;
    background-color: v-bind(prim);
    // top: 30px;
    /* bottom: -3px; */
    left: 10px;
    width: 0px;
    height: 2px;
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover {
      &::before {
        width: 30px;
        opacity: 1
      }
    }
}

.q-item.q-router-link--active, .q-item--active {
    color: white;
}
a.router-link-active {
  background-color: v-bind(second);
  border-radius: 5px;
  transition: all 0.3s ease;
}
a.active {
  background-color: v-bind(second);
  border-radius: 5px;
  transition: all 0.3s ease;
}

.q-item {
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.rotate-90 {
  transform: rotate(90deg);
}

.overflow-visible {
  overflow: visible !important;
}

.group {
  position: relative;
}

.group:hover .submenu {
  display: block;
}

/* Animasi untuk submenu */
.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

/* Perbaikan posisi submenu */
.absolute.left-full {
  position: absolute;
  left: 100%;
}

.menu-item {
  position: relative;
  overflow: hidden;

  &:hover {
    background: rgba(0, 0, 0, 0.03);

    .circle-icon {
      &::after {
        transform: scale(1);
        opacity: 1;
      }
    }

    .q-icon {
      opacity: 1 !important;
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.03) 50%);
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover::before {
    transform: translateX(0);
  }
}

.circle-icon {
  width: 16px;
  height: 16px;
  border: 2px solid var(--q-primary);
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: var(--q-primary);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

.relative.group {
  position: relative;
  overflow: visible !important;
}

.submenu-container {
  position: absolute;
  left: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  &[style*="display: block"] {
    opacity: 1;
    visibility: visible;
  }
}

// Pastikan parent containers memiliki overflow visible
.q-menu {
  overflow: visible !important;
}

.q-list {
  overflow: visible !important;
}

.submenu-container {
  pointer-events: auto;
  min-width: 200px;
}

.menu-item {
  &:hover {
    background: rgba(0, 0, 0, 0.03);

    .circle-icon {
      &::after {
        transform: scale(1);
        opacity: 1;
      }
    }

    .q-icon {
      opacity: 1 !important;
    }
  }
}

.relative.group {
  position: relative !important;
  overflow: visible !important;
}

.q-list {
  overflow: visible !important;
}

/* Ensure proper z-index stacking */
.absolute.left-full {
  z-index: 1000;
}

/* Add hover area padding */
.menu-item {
  padding-right: 2rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -20px; /* Create hover area to reach submenu */
    top: 0;
    height: 100%;
    width: 20px;
  }
}

/* Tambahkan atau update CSS berikut */
.submenu-container {
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  &:hover,
  &[v-show]:not([v-show="false"]) {
    pointer-events: auto;
    opacity: 1;
    visibility: visible;
  }
}

/* Pastikan parent containers memiliki overflow visible */
.q-menu,
.q-list,
.relative.group,
.overflow-visible {
  overflow: visible !important;
}

/* Pastikan z-index benar */
.z-50 {
  z-index: 9999 !important;
}

.dropdown-wrapper {
  position: relative !important;
  overflow: visible !important;
}

/* Update hover area untuk mencegah submenu menghilang saat mouse berpindah */
.menu-item {
  position: relative;
  z-index: 1;
  padding-right: 2rem;

  &::after {
    content: '';
    position: absolute;
    right: -20px; /* Area hover untuk mencapai submenu */
    top: 0;
    height: 100%;
    width: 20px;
  }

  &:hover {
    z-index: 2;
  }
}

/* Tambahkan style untuk dropdown wrapper */
.dropdown-wrapper {
  &:hover {
    .submenu-container {
      pointer-events: auto;
      opacity: 1;
      visibility: visible;
    }
  }
}

/* Update style untuk q-card dalam submenu */
.submenu-container .q-card {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
  background: white !important;
  display: block !important;
}

/* Pastikan parent menu item memiliki z-index yang tepat */
.menu-item {
  position: relative;
  z-index: 1;

  &:hover {
    z-index: 2;
  }
}

/* Tambahkan style untuk memastikan submenu tetap terlihat */
.absolute.left-full {
  position: absolute !important;
  left: 100% !important;
  top: 0 !important;
  display: block !important;
  visibility: visible !important;
}

/* Reset opacity jika sebelumnya ada */
.opacity-0 {
  opacity: 1 !important;
}

/* Tambahkan debug style untuk membantu visualisasi (bisa dihapus nanti) */
.submenu-container {
  border: 1px solid rgba(0,0,0,0.1);
  background: white;
}
</style>
