<template>
  <q-page>
    <app-loading v-if="store.loading" />
    <!-- <TabProfil
      v-model="store.tab"
      :items="store.items"
    /> -->

    <!-- <q-separator /> -->

    <q-tab-panels
      v-else
      v-model="store.tab"
      animated
      vertical
      swipeable
      class="q-pt-lg q-mt-lg"
    >
      <q-tab-panel name="all">
        <app-text-judul judul="Profil" />
        <q-separator />
        <div class="content">
          <ListBigProfil
            :items="store.items"
            @click="clickList"
          />
        </div>
      </q-tab-panel>
      <q-tab-panel
        v-for="(item, n) in store.items"
        :key="n"
        :name="item.nama"
      >
        <app-text-judul :judul="item.nama" />
        <q-separator />
        <div class="content">
          <div v-if="item.thumbnail">
            <div class="q-py-md">
              <q-img
                :src="pathImg + item.thumbnail"
                alt="thumbnail Rsud dr mohamad saleh"
              />
            </div>
          </div>
          <div class="q-mb-xl">
            <app-editor
              v-model="item.content"
              :edited="false"
            />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { useProfilWeb } from 'src/stores/web/profil'
import { onMounted } from 'vue'
import { pathImg } from 'src/boot/axios'
import ListBigProfil from './ListBigProfil.vue'
// import TabProfil from './TabProfil.vue'
// import TabProfil from './TabProfil.vue'
// const tab = ref('all')
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

.border__tab {
  border:1px solid $grey-4;
}
.q-tab-panel {
  padding: 0px !important;
}

.sotel {
  border-radius: 5px 0px;
}

.my-pict-style {
    border-radius:  30% 10px 30% 10px ;
}
</style>
