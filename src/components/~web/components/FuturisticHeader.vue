<template>
  <header
    class="w-full z-10"
    :class="{'bg-primary': fixed, 'bg-transparent': !fixed, 'fixed-top': fixed, 'relative': !fixed}"
  >
    <!-- Navbar Container -->
    <nav class="mx-auto px-4 w-full">
      <div class="flex items-center justify-between h-16 w-full">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <img
            src="logo.png"
            alt="Logo"
            class="h-8 w-auto"
          >
        </div>

        <!-- Desktop Navigation -->
        <div class="lg:flex lg:items-center lg:space-x-1 flex-grow justify-end">
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
                :class="[
                  'menu__item',
                  {'text-white': fixed, 'text-primary': !fixed}
                ]"
                :text-color="fixed ? 'white' : 'primary'"
                @click="item.dropdown ? toggleDropdown(index) : navigateTo(item.href)"
              >
                {{ item.label }}
                <q-icon
                  v-if="item.dropdown"
                  name="mdi-chevron-down"
                  class="ml-1 w-4 h-4 transition-transform duration-200"
                  :class="{'rotate-180': activeDropdown === index}"
                />
              </q-btn>

              <!-- Dropdown Content -->
              <div
                v-if="item.dropdown"
                v-show="activeDropdown === index"
                class="absolute top-full left-0 w-56 transform-gpu z-50 overflow-visible"
              >
                <q-card
                  class="bg-white shadow-xl"
                  style="border-radius: 12px;"
                >
                  <q-list padding>
                    <template
                      v-for="(subItem, subIndex) in item.items"
                      :key="subIndex"
                    >
                      <!-- Regular Dropdown Item -->
                      <template v-if="!subItem.submenu">
                        <q-item
                          v-ripple
                          clickable
                          class="menu-item rounded-lg transition-all duration-300"
                          @click="navigateTo(subItem.href)"
                        >
                          <q-item-section side>
                            <div class="circle-icon" />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label class="text-primary text-sm">
                              {{ subItem.label }}
                            </q-item-label>
                          </q-item-section>

                          <q-item-section side>
                            <q-icon
                              name="arrow_forward"
                              size="xs"
                              class="text-primary opacity-0 transition-all duration-300"
                            />
                          </q-item-section>
                        </q-item>
                      </template>

                      <!-- Nested Dropdown Item -->
                      <div
                        v-if="subItem.submenu"
                        class="relative group overflow-visible dropdown-wrapper"
                        @mouseenter="handleSubmenuHover(subIndex)"
                        @mouseleave="handleSubmenuLeave"
                      >
                        <q-item
                          v-ripple
                          clickable
                          class="menu-item rounded-lg transition-all duration-300"
                        >
                          <q-item-section side>
                            <div class="circle-icon" />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label class="text-primary text-sm">
                              {{ subItem.label }}
                            </q-item-label>
                          </q-item-section>

                          <q-item-section side>
                            <q-icon
                              name="chevron_right"
                              size="xs"
                              class="text-primary transition-transform duration-300"
                              :class="{'rotate-90': hoveredSubmenu === subIndex}"
                            />
                          </q-item-section>
                        </q-item>

                        <!-- Submenu -->
                        <div
                          class="absolute left-full top-0 w-56 z-50 submenu-container"
                          :class="{'submenu-visible': hoveredSubmenu === subIndex}"
                          style="margin-left: 1px; margin-top: -8px;"
                        >
                          <q-card
                            class="bg-white shadow-xl dropdown-content"
                            style="border-radius: 12px;"
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
                                  <q-item-label class="text-primary text-sm">
                                    {{ subSubItem.label }}
                                  </q-item-label>
                                </q-item-section>

                                <q-item-section side>
                                  <q-icon
                                    name="arrow_forward"
                                    size="xs"
                                    class="text-primary opacity-0 transition-all duration-300"
                                  />
                                </q-item-section>
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
          <button
            class="p-2 rounded-lg text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <q-icon
              v-if="!mobileMenuOpen"
              name="mdi-menu"
              class="w-6 h-6"
            />
            <q-icon
              v-else
              name="mdi-close"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-show="mobileMenuOpen"
        class="lg:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <button
            v-for="(item, index) in menuItems"
            :key="index"
            class="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50"
            @click="navigateTo(item.href)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAppStore } from 'src/stores/app'
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  transparent: {
    type: Boolean,
    default: false
  },
  fixed: {
    type: Boolean,
    default: false
  }
})

console.log(props.transparent)

const router = useRouter()
const activeDropdown = ref(null)
const activeSubmenu = ref(null)
const mobileMenuOpen = ref(false)
const hoveredItem = ref(null)
const hoveredSubmenu = ref(null)
const closeTimeout = ref(null)
const isHoveringDropdown = ref(false)
const isHoveringSubmenu = ref(false)

const navigateTo = (href) => {
  if (href.startsWith('/')) {
    router.push(href)
  } else {
    window.location.href = href
  }
  mobileMenuOpen.value = false
  activeDropdown.value = null
  activeSubmenu.value = null
}

const closeDropdown = (index) => {
  console.log('Attempting to close dropdown:', index)
  // Hanya tutup jika tidak ada yang di-hover
  if (!isHoveringDropdown.value && !isHoveringSubmenu.value) {
    console.log('Closing dropdown:', index)
    activeDropdown.value = null
    hoveredSubmenu.value = null
  }
}

// eslint-disable-next-line no-unused-vars
const openDropdown = (index) => {
  activeDropdown.value = index
}

const toggleDropdown = (index) => {
  activeDropdown.value = activeDropdown.value === index ? null : index
}

// const handleItemHover = (index, item) => {
//   hoveredItem.value = index
//   if (!item.submenu) {
//     hoveredSubmenu.value = null
//   }
// }

const handleSubmenuHover = (subIndex) => {
  console.log('Submenu hover:', subIndex)
  isHoveringSubmenu.value = true
  hoveredSubmenu.value = subIndex
  // Prevent dropdown from closing
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
    closeTimeout.value = null
  }
}

const handleSubmenuLeave = () => {
  console.log('Submenu leave')
  isHoveringSubmenu.value = false
  // Add small delay before closing submenu
  setTimeout(() => {
    if (!isHoveringSubmenu.value) {
      hoveredSubmenu.value = null
    }
  }, 100)
}

const handleDropdownMouseEnter = (index) => {
  console.log('Dropdown enter:', index)
  isHoveringDropdown.value = true
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
    closeTimeout.value = null
  }
  activeDropdown.value = index
}

const handleDropdownMouseLeave = (index) => {
  console.log('Dropdown leave:', index)
  isHoveringDropdown.value = false

  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value)
  }

  closeTimeout.value = setTimeout(() => {
    if (!isHoveringSubmenu.value) {
      closeDropdown(index)
    }
  }, 300)
}

// Tambahkan watch untuk memonitor perubahan
watch(hoveredSubmenu, (newVal) => {
  console.log('hoveredSubmenu changed to:', newVal)
})

// eslint-disable-next-line no-unused-vars
const handleMouseLeave = () => {
  hoveredItem.value = null
  hoveredSubmenu.value = null
}

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

const store = useAppStore()
onMounted(() => {
  Promise.all([
    store.getAppHeader()
    // storePelayanan.getMenu(),
    // storeProfil.getData(),
    // storePpid.getData(),
    // storePokja.getMenu(),
    // storePengaduan.getMenu()
  ])
})

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
  padding: 5px 10px;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    border-radius: 10px;
    background-color: v-bind(prim);
    top: 30px;
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
  pointer-events: auto;
  min-width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;

  &.submenu-visible {
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
  position: relative !important;
  overflow: visible !important;
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

/* Pastikan container dropdown memiliki ruang yang cukup */
.dropdown-content {
  min-height: 100px;
  position: relative;
}

/* Tambahkan debug style untuk membantu visualisasi (bisa dihapus nanti) */
.submenu-container {
  border: 1px solid rgba(0,0,0,0.1);
  background: white;
}
</style>
