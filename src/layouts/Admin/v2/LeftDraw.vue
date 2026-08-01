<template>
  <q-drawer
    show-if-above
    side="left"
    :width="275"
    class="admin-sidebar-drawer bg-slate-900 text-slate-100"
  >
    <div class="flex column no-wrap full-height bg-slate-900">
      <!-- 1. Header Sidebar: RSUD Brand & Dark Toggle -->
      <div class="sidebar-header p-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-400 p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
            <div class="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <q-icon name="local_hospital" size="20px" class="text-cyan-3" />
            </div>
          </div>
          <div>
            <h1 class="text-xs font-black text-white tracking-wide uppercase margin-0 leading-tight">
              RSUD MOH. SALEH
            </h1>
            <span class="text-[0.68rem] text-teal-400 font-bold block mt-0.5">
              Panel Administrator
            </span>
          </div>
        </div>

        <q-btn
          flat
          round
          dense
          :icon="dark ? 'dark_mode' : 'light_mode'"
          :color="dark ? 'amber' : 'cyan-3'"
          size="sm"
          @click="setDark(!dark)"
        >
          <q-tooltip>Ganti Mode Tampilan</q-tooltip>
        </q-btn>
      </div>

      <!-- 2. Scrollable Menu Items -->
      <div class="sidebar-content flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        <div class="text-[0.65rem] font-extrabold text-slate-400 uppercase tracking-wider px-3 q-mb-xs">
          Menu Utama
        </div>

        <q-list padding class="space-y-1">
          <q-item
            v-for="(menu, i) in menus"
            :key="i"
            clickable
            v-ripple
            :to="{ name: menu.route }"
            class="sidebar-menu-item rounded-xl transition-all duration-200 min-h-[44px] mb-1"
            :active-class="route.path.indexOf(menu.path) > -1 ? 'active-menu-pill' : 'inactive-menu-pill'"
          >
            <q-item-section avatar class="min-w-0 pr-3">
              <q-icon
                :name="menu.icon"
                size="20px"
                :class="route.path.indexOf(menu.path) > -1 ? 'text-white' : 'text-slate-400'"
              />
            </q-item-section>

            <q-item-section class="text-xs font-bold">
              {{ menu.label }}
            </q-item-section>

            <q-item-section v-if="menu.route === 'admin.buku-tamu'" side>
              <q-badge color="amber-8" class="font-black text-[0.62rem]">Baru</q-badge>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- 3. Footer Sidebar: User Profile & Logout -->
      <div class="sidebar-footer p-3 border-t border-slate-800 bg-slate-950/60 flex-shrink-0">
        <div class="flex items-center justify-between bg-slate-800/80 rounded-2xl p-2.5 border border-slate-700/60">
          <div class="flex items-center gap-2.5">
            <q-avatar size="34px" class="bg-teal-700 text-white font-black text-sm">
              {{ (auth.user?.name || 'A').charAt(0).toUpperCase() }}
            </q-avatar>
            <div class="overflow-hidden">
              <div class="text-xs font-extrabold text-white truncate max-w-[110px]">
                {{ auth.user?.name || 'Administrator' }}
              </div>
              <div class="text-[0.65rem] text-teal-400 font-semibold truncate">
                Super Admin
              </div>
            </div>
          </div>

          <q-btn
            flat
            round
            dense
            color="red-4"
            icon="logout"
            size="sm"
            class="hover:bg-red-500/20"
            @click="auth.logout()"
          >
            <q-tooltip anchor="top middle" self="bottom middle">Keluar (Logout)</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const menus = ref([
  { route: 'admin.dashboard', path: '/admin/dashboard', label: 'Dashboard', icon: 'space_dashboard' },
  { route: 'admin.settings', path: '/admin/settings', label: 'Seting Website', icon: 'settings_suggest' },
  { route: 'admin.berita', path: '/admin/berita', label: 'Manage Berita', icon: 'newspaper' },
  { route: 'admin.pelayanan', path: '/admin/pelayanan', label: 'Manage Pelayanan', icon: 'medical_services' },
  { route: 'admin.profil', path: '/admin/profil', label: 'Manage Profil', icon: 'groups' },
  { route: 'admin.ppid', path: '/admin/ppid', label: 'Manage PPID', icon: 'folder_shared' },
  { route: 'admin.pokja', path: '/admin/pokja', label: 'Manage Pokja Akreditasi', icon: 'assignment' },
  { route: 'admin.pengaduan', path: '/admin/pengaduan', label: 'Manage Pengaduan', icon: 'support_agent' },
  { route: 'admin.buku-tamu', path: '/admin/buku-tamu', label: 'Buku Tamu & Aspirasi', icon: 'rate_review' },
  { route: 'admin.gallery_animasi', path: '/admin/gallery_animasi', label: 'Gallery Animasi', icon: 'animation' },
  { route: 'admin.user', path: '/admin/user', label: 'Manage User', icon: 'manage_accounts' }
])

const $q = useQuasar()
const dark = computed(() => $q.dark.isActive)

function setDark(val) {
  $q.dark.set(val)
}

const auth = useAuthStore()
onMounted(() => {
  auth.getUser()
})

const route = useRoute()
</script>

<style lang="scss">
.admin-sidebar-drawer {
  background-color: #0f172a !important;
}

.active-menu-pill {
  background: linear-gradient(135deg, #0f766e 0%, #0891b2 100%) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(15, 118, 110, 0.35) !important;
}

.inactive-menu-pill {
  color: #94a3b8 !important;
  background: transparent;

  &:hover {
    background-color: rgba(30, 41, 59, 0.8) !important;
    color: #38bdf8 !important;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
</style>
