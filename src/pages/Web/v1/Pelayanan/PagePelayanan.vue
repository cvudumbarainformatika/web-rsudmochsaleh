<template>
  <q-page>
    <TabPelayanan
      v-model="store.tab"
      :items="store.items"
    />

    <!-- <q-separator /> -->

    <q-tab-panels
      v-model="store.tab"
      animated
      vertical
      swipeable
    >
      <q-tab-panel name="all">
        <div class="text-h6 text-weight-bold">
          <div
            class="bg-primary text-white q-py-sm q-px-md sotel"
            style="max-width:40%"
          >
            Pelayanan
          </div>
        </div>
        <q-separator />
        <div class="content">
          <ListBigPelayanan
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
        <div class="text-h6 text-weight-bold">
          <div
            class="bg-primary text-white q-py-sm q-px-md sotel"
            style="max-width:40%"
          >
            {{ item.nama }}
          </div>
        </div>
        <q-separator />
        <div class="content">
          <div v-if="item.thumbnail">
            <div class="q-py-md">
              <q-img
                :src="pathImg + item.thumbnail"
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
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { onMounted } from 'vue'
import { pathImg } from 'src/boot/axios'
import ListBigPelayanan from './ListBigPelayanan.vue'
import TabPelayanan from './TabPelayanan.vue'
// import TabPelayanan from './TabPelayanan.vue'
// const tab = ref('all')
const store = usePelayananWeb()

onMounted(() => {
  store.getData()
})

function clickList(val) {
  console.log(val)
  store.setTab(val)
}

console.log('pelayanan', store.tab)
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
