<template>
  <q-card flat bordered class="rounded-2xl">
    <q-card-section class="bg-slate-50 border-b border-slate-100">
      <div class="flex items-center justify-between">
        <div class="text-subtitle1 font-extrabold text-slate-800">Daftar Interaksi &amp; Konsultasi Publik</div>
        <q-input v-model="search" dense outlined rounded placeholder="Cari interaksi..." bg-color="white">
          <template #prepend><q-icon name="search" size="18px" /></template>
        </q-input>
      </div>
    </q-card-section>

    <q-list separator>
      <q-item v-for="(item, idx) in filteredItems" :key="item.id || idx" class="q-py-md">
        <q-item-section avatar>
          <div class="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <q-icon name="forum" size="20px" />
          </div>
        </q-item-section>

        <q-item-section>
          <q-item-label class="font-extrabold text-slate-900 text-body2">
            {{ item.nama }}
          </q-item-label>
          <q-item-label caption class="text-slate-500 line-clamp-2 q-mt-xs">
            {{ item.content }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="flex items-center gap-1">
            <q-btn flat round dense icon="edit" color="teal-7" size="sm" @click="editItem(item)" />
            <q-btn flat round dense icon="delete" color="negative" size="sm" @click="deleteItem(idx)" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useInteraksiWeb } from 'src/stores/web/interaksi'

const store = useInteraksiWeb()
const router = useRouter()
const search = ref('')

const filteredItems = computed(() => {
  if (!search.value) return store.items
  const q = search.value.toLowerCase()
  return store.items.filter(i => (i.nama || '').toLowerCase().includes(q) || (i.content || '').toLowerCase().includes(q))
})

function editItem(item) {
  router.push(`/admin/interaksi/form/${item.id}`)
}

function deleteItem(idx) {
  if (confirm('Hapus data interaksi ini?')) {
    store.items.splice(idx, 1)
  }
}
</script>
