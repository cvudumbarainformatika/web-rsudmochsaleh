<template>
  <q-page class="profil-page py-6">
    <app-loading v-if="store.loading" />

    <q-tab-panels
      v-else
      v-model="store.tab"
      animated
      vertical
      swipeable
      class="custom-tab-panels bg-transparent"
    >
      <!-- Panel 1: List Semua Menu Profil -->
      <q-tab-panel name="all" class="panel-padding-none">
        <div class="panel-header q-mb-lg">
          <app-text-judul judul="Profil Rumah Sakit" />
        </div>
        <div class="content-box">
          <ListBigProfil
            :items="store.items"
            @click="clickList"
          />
        </div>
      </q-tab-panel>

      <!-- Panel 2: Detail Halaman Profil (Sejarah / Visi Misi dll.) -->
      <q-tab-panel
        v-for="(item, n) in store.items"
        :key="n"
        :name="item.nama"
        class="panel-padding-none"
      >
        <div class="panel-header q-mb-md">
          <app-text-judul :judul="item.nama" />
        </div>

        <div class="content-box">
          <!-- Featured Image (Bila Ada) -->
          <div v-if="item.thumbnail" class="featured-image-wrap q-mb-lg">
            <q-img
              :src="pathImg + item.thumbnail"
              class="featured-image-main rounded-2xl shadow-md"
              alt="thumbnail Rsud dr mohamad saleh"
            />
          </div>

          <!-- Deskripsi Content Utama -->
          <div class="content-description-card q-mb-xl">
            <app-editor
              v-model="item.content"
              :edited="false"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <div class="q-mb-xl" />
  </q-page>
</template>

<script setup>
import { useProfilWeb } from 'src/stores/web/profil'
import { onMounted } from 'vue'
import { pathImg } from 'src/boot/axios'
import ListBigProfil from './ListBigProfil.vue'

const store = useProfilWeb()

onMounted(() => {
  store.getData()
})

function clickList(val) {
  console.log(val)
  store.setTab(val)
}
</script>

<style lang="scss" scoped>
.profil-page {
  min-height: 100vh;
}

.custom-tab-panels {
  background: transparent !important;
}

.panel-padding-none {
  padding: 0 !important;
}

.panel-header {
  border-bottom: 2px solid rgba(13, 148, 136, 0.1);
  padding-bottom: 12px;
}

.content-box {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 4px 30px rgba(15, 23, 42, 0.04);
  padding: 1.5rem;
  
  @media (min-width: 768px) {
    padding: 2.25rem;
  }
}

.featured-image-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
}

.featured-image-main {
  width: 100%;
  max-height: 450px;
  display: block;
}

.content-description-card {
  color: #334155;
  line-height: 1.75;
}
</style>
