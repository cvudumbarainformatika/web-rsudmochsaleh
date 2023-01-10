<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div
    class="bg-transparent text-white"
    :class="fixed?'fixed-top':'relative'"
    style="z-index:10"
  >
    <!-- <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    > -->
    <div
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
    <!-- </transition> -->
    <div
      :class="store.visible?'bg-primary':'transparent'"
    >
      <q-bar
        class="container-padding"
        style="height:60px"
      >
        <div class="logo-web text-center q-pa-xs bg-primary overflow-hidden deskt-only">
          <!-- <q-skeleton
            v-if="store.loading"
            type="QAvatar"
            style="height: 45px; margin-top:5px; margin-bottom: 10px;"
          /> -->
          <q-img
            :src="logo"
            :ratio="1"
            fit="cover"
          />
        </div>
        <div class="title-website q-ml-sm deskt-only">
          <div :class="`f-14 text-weight-bold ${store.visible? 'text-white':'text-primary'}`">
            {{ store.header.title }}
          </div>
          <div :class="`f-8 text-weight-light ${store.visible? 'text-white':'text-black'}`">
            {{ store.header.desc }}
          </div>
        </div>
        <q-space />

        <!-- <div
          v-if="fixed"
          class="menu__header deskt-only on-right"
        >
          <router-link
            v-for="(menu, i) in menus"
            :key="i"
            :to="`/${menu.url}`"
            class="menu__item"
            :class="route.name===menu.name? 'active' : '' "
            exact
          >
            {{ menu.title }}
          </router-link>
        </div> -->
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
              @mouseover="() => {
                menuOver = true
                checkMenu(menu.name)
              }"
              @mouseout="menuOver = false"
            >
              <!-- <template v-if="menu.name==='pelayanan'"> -->
              <q-menu
                v-if="menu.name==='pelayanan'"
                v-model="menuPelayanan"
                fit
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list
                  style="min-width: 100px"
                  dense
                  @mouseover.native="listOver = true"
                  @mouseout.native="listOver = false"
                >
                  <q-item
                    v-for="(dropdownPelayanan, n) in storePelayanan.items"
                    :key="n"
                    v-close-popup
                    clickable
                    :to="{ name: 'pelayanan' }"
                    @click="storePelayanan.setTab(dropdownPelayanan.nama)"
                  >
                    <q-item-section>{{ dropdownPelayanan.nama }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <!-- <q-item
                    v-close-popup
                    clickable
                  >
                    <q-item-section>Help &amp; Pelayanan</q-item-section>
                  </q-item> -->
                </q-list>
              </q-menu>
              <q-menu
                v-if="menu.name==='profil'"
                v-model="menuProfil"
                fit
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list
                  dense
                  style="min-width: 100px"
                  @mouseover.native="listOver = true"
                  @mouseout.native="listOver = false"
                >
                  <q-item
                    v-for="(dopdownProfil, n) in storeProfil.items"
                    :key="n"
                    v-close-popup
                    clickable
                    :to="{ name: 'profil' }"
                    @click="storeProfil.setTab(dopdownProfil.nama)"
                  >
                    <q-item-section>{{ dopdownProfil.nama }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <!-- <q-item
                    v-close-popup
                    clickable
                  >
                    <q-item-section>Help &amp; Profil</q-item-section>
                  </q-item> -->
                </q-list>
              </q-menu>
              <q-menu
                v-if="menu.name==='PPID'"
                v-model="menuPpid"
                fit
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list
                  style="min-width: 100px"
                  @mouseover.native="listOver = true"
                  @mouseout.native="listOver = false"
                >
                  <q-item
                    v-for="(dropdownPpid, n) in storePpid.items"
                    :key="n"
                    v-close-popup
                    clickable
                    :to="{ name: 'ppid' }"
                    @click="storePpid.setTab(dropdownPpid.nama)"
                  >
                    <q-item-section>{{ dropdownPpid.nama }}</q-item-section>
                  </q-item>
                  <q-separator />
                  <!-- <q-item
                    v-close-popup
                    clickable
                  >
                    <q-item-section>Help &amp; Profil</q-item-section>
                  </q-item> -->
                </q-list>
              </q-menu>
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

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="berita && store.visible"
      >
        <app-tab-header />
      </div>
    </transition>

    <div
      v-show="pelayanan && store.visible"
    >
      <TabPelayanan
        v-model="storePelayanan.tab"
        :items="storePelayanan.items"
      />
    </div>

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
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TabPelayanan from 'src/pages/Web/v1/Pelayanan/TabPelayanan.vue'
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { useProfilWeb } from 'src/stores/web/profil'
import { usePpidWeb } from 'src/stores/web/ppid'

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
const route = useRoute()
const $q = useQuasar()
// const beranda = computed(() => route.name === 'beranda')
const berita = computed(() => route.name === 'berita')
const pelayanan = computed(() => route.name === 'pelayanan')
const menuOver = ref(false)
const listOver = ref(false)
const menuPelayanan = ref(false)
const menuProfil = ref(false)
const menuPpid = ref(false)

const mobile = ref($q.platform.is.mobile)
// const targetEl = ref(null)

store.getAppHeader()
storePelayanan.getData()
storeProfil.getData()
storePpid.getData()

console.log('route from headerWeb', route)
console.log('header Web..', storePelayanan.items)
console.log('header Web q..', $q.platform)

const logo = computed(() => {
  if (store.logo === null) {
    return new URL('../../assets/logos/logo-rsud.png', import.meta.url).href
  }

  return pathImg + store.logo
})

const checkMenu = (val) => {
  // const non = (val === 'berita' || val === 'beranda' || val === 'buku-tamu')
  if (menuOver.value || listOver.value) {
    // debounce(menuOpen.value = val, 500)
    if (val === 'pelayanan') {
      menuPelayanan.value = true
      menuProfil.value = false
      menuPpid.value = false
    } else if (val === 'profil') {
      menuProfil.value = true
      menuPelayanan.value = false
      menuPpid.value = false
    } else if (val === 'PPID') {
      menuPpid.value = true
      menuPelayanan.value = false
      menuProfil.value = false
    }
  } else {
    // debounce(menuOpen.value = null, 500)
    menuPelayanan.value = false
    menuProfil.value = false
    menuPpid.value = false
  }
}

// debounce(checkMenu, 500)
const debouncedFilter = debounce(checkMenu, 300)

watch(() => menuOver.value, debouncedFilter)
watch(() => listOver.value, debouncedFilter)

const menus = ref([
  { name: 'beranda', url: 'beranda', title: 'Beranda', active: false },
  { name: 'berita', url: 'berita/all', title: 'Berita', active: false },
  { name: 'pelayanan', url: 'pelayanan', title: 'Pelayanan', active: false },
  { name: 'profil', url: 'profil', title: 'Profil', active: false },
  { name: 'PPID', url: 'ppid', title: 'PPID', active: false },
  { name: 'buku-tamu', url: 'buku-tamu', title: 'Buku Tamu', active: false }
  // { name: 'galeri', url: '/galeri', title: 'Galeri', active: false },
  // { name: 'profil', url: '/profil', title: 'Profil', active: false }
])

// onMounted(() => {
//   console.log('header Web..', storePelayanan.items)
// })

</script>

<style lang="scss" scoped>
.logo-web {
    width:60px;
    height:60px;
    overflow: hidden;
}

.menu__item {
  position: relative;
  margin-right: 3px;
  font-size: 12px;
  padding: 5px 10px;
  color:#fff;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    border-radius: 10px;
    background-color: $secondary;
    top: 25px;
    /* bottom: -3px; */
    left: 10px;
    width: 0px;
    height: 2px;
    opacity: 0;
    transition: all 0.3s ease;
  }
  &:hover {
      &::before {
        width: 20px;
        opacity: 1
      }
    }
}
a.router-link-active {
  background-color: $secondary;
  border-radius: 5px;
  transition: all 0.3s ease;
}
a.active {
  background-color: $secondary;
  border-radius: 5px;
  transition: all 0.3s ease;
}
</style>
