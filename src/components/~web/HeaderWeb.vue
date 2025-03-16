<template>
  <div
    class="bg-transparent text-white"
    :class="fixed?'fixed-top':'relative'"
    style="z-index:10"
  >
    <!-- <Transition
      appear
      enter-active-class="animate__animated animate__fadeInDown animate__faster"
    >
      <div
        v-if="store.visible"
        class="bg-primary"
      >
        <q-bar
          class="container-padding"
          style="height:60px"
        >
          <div class="logo-web text-center q-pa-xs bg-primary overflow-hidden deskt-only">
            <q-img
              :src="logo"
              :ratio="1"
              fit="cover"
            />
          </div>
          <q-space />

          <div
            v-if="fixed"
            class="menu__header deskt-only on-right q-py-sm"
          >
            <template
              v-for="(menu, i) in menus"
              :key="i"
            >
              <q-btn
                :id="menu.name"
                flat
                no-caps
                color="white"
                :label="menu.title"
                :to="`/${menu.url}`"
                class="menu__item"
                :class="route.name===menu.name? 'active' : '' "
                @mouseover="checkMenu(menu.name)"
                @mouseout="menuOver = false"
              >
                <template v-if="menu.name==='pelayanan'">
                  <dropdown-menu
                    v-model="menuPelayanan"
                    :items="storePelayanan.menus"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="pelayanan"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>storePelayanan.setTab(val.nama)"
                    @on-click-submenu="(val) => router.push('/pelayanan/submenu/'+ val.slug)"
                  />
                </template>
                <template v-else-if="menu.name==='profil'">
                  <dropdown-menu
                    v-model="menuProfil"
                    :items="storeProfil.items"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="profil"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoProfile(val)"
                  />
                </template>
                <template v-else-if="menu.name==='ppid'">
                  <dropdown-menu
                    v-model="menuPpid"
                    :items="storePpid.items"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="ppid"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoPpid(val)"
                    @on-click-submenu="(val) => router.push('/ppid/submenu/'+ val.slug)"
                  />
                </template>
                <template v-else-if="menu.name==='pokja'">
                  <dropdown-menu
                    v-model="menuPokja"
                    :items="storePokja.menus"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="pokja"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoPokja(val)"
                    @on-click-submenu="(val) => router.push('/pokja/submenu/'+ val.slug)"
                  />
                </template>
                <template v-else-if="menu.name==='pengaduan'">
                  <dropdown-menu
                    v-model="menuPengaduan"
                    :items="storePengaduan.menus"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="pengaduan"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoPengaduan(val)"
                    @on-click-submenu="(val) => router.push('/pengaduan/submenu/'+ val.slug)"
                  />
                </template>
              </q-btn>
            </template>
          </div>
          <div
            class="mobile-only on-right"
          >
            <q-btn
              flat
              round
              :color="`${store.visible?'white':'primary'}`"
              icon="menu"
              @click="drawer = !drawer"
            />
          </div>
        </q-bar>
      </div>
    </Transition> -->

    <!-- <transition-group
      appear
      enter-active-class="animate__animated animate__fadeIn animate__faster"
    >
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
            size="18px"
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
            size="xs"
            :href="store.header.link_fb"
            target="_blank"
          />
          <q-btn
            class="q-mr-sm"
            dense
            flat
            icon="ti-instagram"
            size="xs"
            :href="store.header.link_instagram"
            target="_blank"
          />
          <q-btn
            class="q-mr-sm"
            dense
            flat
            icon="ti-youtube"
            size="xs"
            :href="store.header.link_youtube"
            target="_blank"
          />
        </q-bar>
      </div>
      <div
        v-if="!store.visible"
        class="transparent"
      >
        <q-bar
          class="container-padding"
          style="height:60px"
        >
          <div class="logo-web text-center q-pa-xs bg-primary overflow-hidden deskt-only">
            <q-img
              :src="logo"
              :ratio="1"
              fit="cover"
            />
          </div>
          <q-space />

          <div
            v-if="fixed"
            class="menu__header deskt-only on-right q-py-sm"
          >
            <template
              v-for="(menu, i) in menus"
              :key="i"
            >
              <q-btn
                :id="menu.name"
                flat
                no-caps
                color="white"
                :label="menu.title"
                :to="`/${menu.url}`"
                class="menu__item"
                :class="route.name===menu.name? 'active' : '' "
                @mouseover="checkMenu(menu.name)"
                @mouseout="menuOver = false"
              >
                <template v-if="menu.name==='pelayanan'">
                  <dropdown-menu
                    v-model="menuPelayanan"
                    :items="storePelayanan.menus"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="pelayanan"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>storePelayanan.setTab(val.nama)"
                    @on-click-submenu="(val) => router.push('/pelayanan/submenu/'+ val.slug)"
                  />
                </template>
                <template v-else-if="menu.name==='profil'">
                  <dropdown-menu
                    v-model="menuProfil"
                    :items="storeProfil.items"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="profil"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoProfile(val)"
                  />
                </template>
                <template v-else-if="menu.name==='ppid'">
                  <dropdown-menu
                    v-model="menuPpid"
                    :items="storePpid.items"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="ppid"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoPpid(val)"
                    @on-click-submenu="(val) => router.push('/ppid/submenu/'+ val.slug)"
                  />
                </template>
                <template v-else-if="menu.name==='pokja'">
                  <dropdown-menu
                    v-model="menuPokja"
                    :items="storePokja.menus"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="pokja"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoPokja(val)"
                    @on-click-submenu="(val) => router.push('/pokja/submenu/'+ val.slug)"
                  />
                </template>
                <template v-else-if="menu.name==='pengaduan'">
                  <dropdown-menu
                    v-model="menuPengaduan"
                    :items="storePengaduan.menus"
                    :submenu="submenu"
                    :sub-item-to-open="subItem"
                    to="pengaduan"
                    @on-mouse-over-list="listOver =true"
                    @on-mouse-out-list="listOver =false"
                    @on-mouse-over-item="(val)=>checkItem(val)"
                    @on-mouse-over-list-submenu="listSubmenu = true"
                    @on-mouse-out-list-submenu="listSubmenu = false"
                    @on-click-menu="(val)=>gotoPengaduan(val)"
                    @on-click-submenu="(val) => router.push('/pengaduan/submenu/'+ val.slug)"
                  />
                </template>
              </q-btn>
            </template>
          </div>
          <div
            class="mobile-only on-right"
          >
            <q-btn
              flat
              round
              :color="`${store.visible?'white':'primary'}`"
              icon="menu"
              @click="drawer = !drawer"
            />
          </div>
        </q-bar>
      </div>
    </transition-group> -->

    <transition
      appear
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <app-tab-header
        v-if="route.name==='berita' && store.btnScrollTop"
        style="z-index:0"
      />
      <TabPelayanan
        v-else-if="route.name==='pelayanan' && store.btnScrollTop"
        v-model="storePelayanan.tab"
        :items="storePelayanan.menus"
      />
      <TabProfil
        v-else-if="route.name==='profil' && store.btnScrollTop"
        v-model="storeProfil.tab"
        :items="storeProfil.items"
      />
      <TabPpid
        v-else-if="route.name==='ppid' && store.btnScrollTop"
        v-model="storePpid.tab"
        :items="storePpid.items"
      />
      <TabPokja
        v-else-if="route.name==='pokja' && store.btnScrollTop"
        v-model="storePokja.tab"
        :items="storePokja.menus"
      />
    </transition>

    <!-- drawer for mobile -->
    <div
      v-if="mobile"
      class="mobile-only"
    >
      <mobileDrawer
        v-model="drawer"
        :logo="logo"
        :menus="menus"
        :route="route.name"
      />
    </div>
  </div>
</template>
<script setup>
import { pathImg } from 'src/boot/axios'
import { useAppStore } from 'src/stores/app'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TabPelayanan from 'src/pages/Web/v1/Pelayanan/TabPelayanan.vue'
import TabPpid from 'src/pages/Web/v1/Ppid/TabPpid.vue'
import TabProfil from 'src/pages/Web/v1/Profil/TabProfil.vue'
import TabPokja from 'src/pages/Web/v1/Pokja/TabPokja.vue'
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { useProfilWeb } from 'src/stores/web/profil'
import { usePpidWeb } from 'src/stores/web/ppid'
import { usePokjaWeb } from 'src/stores/web/pokja'
import { usePengaduanWeb } from 'src/stores/web/pengaduan'

// eslint-disable-next-line no-unused-vars
import DropdownMenu from './DropdownMenu.vue'

import mobileDrawer from './mobileDrawer.vue'

import { debounce, useQuasar } from 'quasar'

defineProps({
  fixed: {
    type: Boolean,
    default: true
  }
})

const drawer = ref(false)

const store = useAppStore()
const storePelayanan = usePelayananWeb()
const storeProfil = useProfilWeb()
const storePpid = usePpidWeb()
const storePokja = usePokjaWeb()
const storePengaduan = usePengaduanWeb()
const route = useRoute()
// eslint-disable-next-line no-unused-vars
const router = useRouter()
const $q = useQuasar()
// const beranda = computed(() => route.name === 'beranda')
// const berita = computed(() => route.name === 'berita')
// const pelayanan = computed(() => route.name === 'pelayanan')

const menuPelayanan = ref(false)
const menuProfil = ref(false)
const menuPpid = ref(false)
const menuPokja = ref(false)
const menuPengaduan = ref(false)

const mobile = ref($q.platform.is.mobile)

const menuOver = ref(false)
const listOver = ref(false)
const listSubmenu = ref(false)
const submenu = ref(false)
const subItem = ref(null)
// const targetEl = ref(null)

onMounted(() => {
  Promise.all([
    store.getAppHeader(),
    storePelayanan.getMenu(),
    storeProfil.getData(),
    storePpid.getData(),
    storePokja.getMenu(),
    storePengaduan.getMenu()
  ])
})

// console.log('route from headerWeb', route)
// console.log('header Web..', storePokja.items)
// console.log('header Web q..', $q.platform)

const logo = computed(() => {
  if (store.logo === null) {
    return new URL('../../assets/logos/logo-rsud.png', import.meta.url).href
  }

  return pathImg + store.logo
})

const checkMenu = (val) => {
  if (val === 'berita' || val === 'buku-tamu' || val === 'beranda') {
    menuOver.value = false
    menuPelayanan.value = false
    menuProfil.value = false
    menuPpid.value = false
    menuPokja.value = false
    menuPengaduan.value = false
    submenu.value = false
    listOver.value = false
    listSubmenu.value = false
  } else {
    menuOver.value = true
  }

  // menuOver.value = true

  // if (menuOver.value || listOver.value || submenu.value) {
  if (menuOver.value || listOver.value || submenu.value) {
    if (val === 'pelayanan') {
      menuPelayanan.value = true
      menuProfil.value = false
      menuPpid.value = false
      menuPokja.value = false
      menuPengaduan.value = false
    } else if (val === 'profil') {
      menuProfil.value = true
      menuPelayanan.value = false
      menuPpid.value = false
      menuPokja.value = false
      menuPengaduan.value = false
    } else if (val === 'ppid') {
      menuPpid.value = true
      menuPelayanan.value = false
      menuProfil.value = false
      menuPokja.value = false
      menuPengaduan.value = false
    } else if (val === 'pokja') {
      menuPpid.value = false
      menuPelayanan.value = false
      menuProfil.value = false
      menuPokja.value = true
      menuPengaduan.value = false
    } else if (val === 'pengaduan') {
      console.log('pengaduan')

      menuPengaduan.value = true
      menuPpid.value = false
      menuPelayanan.value = false
      menuProfil.value = false
      menuPokja.value = false
    }
  } else {
    menuPelayanan.value = false
    menuProfil.value = false
    menuPpid.value = false
    menuPokja.value = false
    menuPengaduan.value = false
    submenu.value = false
    listOver.value = false
    listSubmenu.value = false
    menuOver.value = false
  }
  console.log('checkMenuOver...', menuOver.value, val)
  console.log('listOver...', listOver.value)
  console.log('submenu...', submenu.value)
}

// const listSubmenu = ref(false)

// eslint-disable-next-line no-unused-vars
function checkItem(item) {
  // console.log('checkItem', item)
  if (item.submenu) {
    if (item.submenu.length > 0) {
      submenu.value = true
      subItem.value = item
    } else {
      submenu.value = false
      subItem.value = null
    }
  } else {
    submenu.value = false
    subItem.value = null
  }
}

const checkSubmenu = () => {
  if (listSubmenu.value) {
    submenu.value = true
  } else {
    submenu.value = false
  }
  console.log('checkSubmenu...', submenu.value)
}

// debounce(checkMenu, 500)
const debouncedFilter = debounce(checkMenu, 300)
const debouncedSub = debounce(checkSubmenu, 300)

watch(() => menuOver.value, debouncedFilter)
watch(() => listOver.value, debouncedFilter)
watch(() => listSubmenu.value, debouncedSub)
// watch(() => listSubmenu.value, debouncedSub)

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

// function gotoProfile(i) {
//   router.push('/profil')
//   storeProfil.setTab(i.nama)
// }
// function gotoPpid(i) {
//   router.push('/ppid')
//   storePpid.setTab(i.nama)
// }
// function gotoPokja(i) {
//   console.log('tab pokja...', i)
//   router.push('/pokja')
//   storePokja.setTab(i.nama)
// }
// function gotoPengaduan(i) {
//   console.log('tab pengaduan...', i)
//   router.push('/pengaduan')
//   storePokja.setTab(i.nama)
// }

// onMounted(() => {
//   console.log('header Web..', storePelayanan.items)
// })

// console.log(store.visible)
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

<style lang="scss" scoped>
.logo-web {
    width:60px;
    height:60px;
    overflow: hidden;
}

.menu__item {
  position: relative;
  margin-right: 10px;
  font-size: 14px;
  padding: 5px 10px;
  color:#fff;
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
</style>
