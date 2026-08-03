<template>
  <div class="q-pa-xs">
    <!-- Header Page -->
    <div class="row items-center justify-between no-wrap w-full q-mb-md gap-4">
      <div class="col">
        <h2 class="text-xl font-extrabold text-slate-800 margin-0">
          Manajemen Menu Dinamis Universal
        </h2>
        <p class="text-xs text-slate-500 margin-0">
          Kelola menu utama dan hirarki submenu bertingkat (Tingkat 1, 2, 3+) tanpa batas untuk website RSUD.
        </p>
      </div>
      <div class="row items-center gap-2 flex-shrink-0">
        <q-btn
          v-if="parentId"
          flat
          rounded
          color="slate-700"
          icon="arrow_back"
          label="Kembali"
          no-caps
          class="bg-slate-100 font-bold"
          @click="goBackParent"
        />
        <q-btn
          color="primary"
          icon="add"
          label="Tambah Menu Dinamis"
          no-caps
          class="rounded-xl font-bold px-4 py-2 shadow-md hover:shadow-lg transition-all"
          @click="openFormAdd"
        />
      </div>
    </div>

    <!-- Parent Breadcrumb (Jika sedang di Submenu Level 2/3+) -->
    <div v-if="parentItem" class="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 q-mb-md flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs text-teal-900 font-bold">
        <q-icon name="folder_open" size="18px" class="text-teal-7" />
        <span>Submenu dari: <strong class="text-teal-900 text-sm font-black">{{ parentItem.nama }}</strong> ({{ parentItem.slug }})</span>
      </div>
      <q-badge color="teal-8" class="font-bold uppercase tracking-wider text-[10px] px-2.5 py-1">
        Nesting Level: {{ getParentDepth(parentItem) }}
      </q-badge>
    </div>

    <!-- Search & Filter Bar -->
    <div class="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs q-mb-md flex items-center justify-between gap-4">
      <div class="w-72">
        <q-input
          v-model="store.searchQuery"
          dense
          outlined
          placeholder="Cari nama atau slug menu..."
          class="bg-slate-50 text-xs"
          @keyup.enter="store.getData(parentId)"
        >
          <template #append>
            <q-icon name="search" class="cursor-pointer" @click="store.getData(parentId)" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Menu Grid Cards (Futuristik, Elegan & Mewah dengan Right-Locked Action Buttons) -->
    <div v-if="store.loading" class="text-center py-12">
      <q-spinner-dots color="primary" size="40px" />
      <div class="text-xs text-slate-400 q-mt-sm">Memuat data menu dinamis...</div>
    </div>

    <div v-else-if="store.items.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
      <q-icon name="format_list_bulleted" size="48px" class="text-slate-300 q-mb-sm" />
      <div class="text-sm font-bold text-slate-700">Belum Ada Menu Dinamis</div>
      <p class="text-xs text-slate-400 margin-0">Klik tombol "Tambah Menu Dinamis" untuk membuat menu baru di tingkat ini.</p>
    </div>

    <div v-else class="flex flex-col gap-3">
      <div
        v-for="item in store.items"
        :key="item.id"
        class="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-between gap-4"
      >
        <!-- Info Kiri: Thumbnail & Nama Menu -->
        <div class="flex items-center gap-3.5 min-w-0 flex-1">
          <div class="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/80 flex items-center justify-center">
            <img
              v-if="item.thumbnail"
              :src="pathImg + item.thumbnail"
              alt="Thumbnail"
              class="w-full h-full object-cover"
              @error="handleImgError"
            >
            <q-icon v-else name="folder" size="24px" class="text-slate-400" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <h3 class="text-sm font-extrabold text-slate-900 truncate margin-0">
                {{ item.nama }}
              </h3>
              <q-badge
                :color="item.is_active ? 'teal-8' : 'grey-6'"
                class="font-bold text-[10px] px-2 py-0.5"
              >
                {{ item.is_active ? 'Aktif' : 'Non-Aktif' }}
              </q-badge>
              <q-badge
                v-if="item.children && item.children.length > 0"
                color="indigo-8"
                class="font-bold text-[10px] px-2 py-0.5"
              >
                {{ item.children.length }} Submenu
              </q-badge>
            </div>
            <div class="text-xs text-slate-400 font-mono truncate q-mt-2xs">
              /menu/{{ item.slug }}
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Kanan (Right-Locked Alignment) -->
        <div class="flex items-center gap-1.5 flex-shrink-0 ml-auto">
          <q-btn
            v-if="canHaveSubmenu(item)"
            dense
            flat
            round
            color="teal-8"
            icon="folder_open"
            size="sm"
            class="hover:bg-teal-50"
            @click="openSubmenu(item)"
          >
            <q-tooltip>Kelola Submenu Bertingkat ({{ item.children?.length || 0 }})</q-tooltip>
          </q-btn>

          <q-btn
            dense
            flat
            round
            color="amber-9"
            icon="edit"
            size="sm"
            class="hover:bg-amber-50"
            @click="openFormEdit(item)"
          >
            <q-tooltip>Edit Menu / Submenu</q-tooltip>
          </q-btn>

          <q-btn
            dense
            flat
            round
            color="red-7"
            icon="delete"
            size="sm"
            class="hover:bg-red-50"
            @click="deleteMenu(item)"
          >
            <q-tooltip>Hapus Menu</q-tooltip>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useAdminCustomMenu } from 'src/stores/admin/customMenu'
import { useQuasar } from 'quasar'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const store = useAdminCustomMenu()

const parentId = computed(() => {
  const pId = route.params.id || route.query.parent_id
  return (pId && pId !== 'null' && pId !== '0') ? pId : null
})

const parentItem = ref(null)

function handleImgError(e) {
  e.target.src = new URL('../../../assets/images/no-image.png', import.meta.url).href
}

function getParentDepth(item) {
  if (!item) return 'Tingkat 1'
  if (item.parent_id) return 'Tingkat 3+'
  return 'Tingkat 2'
}

function openFormAdd() {
  if (parentId.value) {
    router.push({ path: '/admin/custom-menu/form', query: { parent_id: parentId.value } })
  } else {
    router.push('/admin/custom-menu/form')
  }
}

function canHaveSubmenu(item) {
  // Jika induknya memiliki parent_id (Level 2), maka anak di halaman ini berada di Level 3 (Batas Kedalaman).
  if (parentItem.value && parentItem.value.parent_id !== null) {
    return false
  }
  return true
}

function openFormEdit(item) {
  router.push({ path: `/admin/custom-menu/form/${item.id}`, query: { parent_id: parentId.value } })
}

function openSubmenu(item) {
  router.push({ path: '/admin/custom-menu', query: { parent_id: item.id } })
}

function goBackParent() {
  router.push('/admin/custom-menu')
}

function deleteMenu(item) {
  $q.dialog({
    title: 'Pemberitahuan!',
    message: `Apakah menu <b>${item.nama}</b> beserta seluruh submenunya akan dihapus?`,
    cancel: true,
    persistent: true,
    html: true
  }).onOk(async () => {
    await store.deleteMenu(item.id, parentId.value)
  })
}

watch(parentId, (newId) => {
  store.getData(newId)
}, { immediate: true })

onMounted(() => {
  store.getData(parentId.value)
})
</script>

<style lang="scss" scoped>
.margin-0 {
  margin: 0;
}
</style>
