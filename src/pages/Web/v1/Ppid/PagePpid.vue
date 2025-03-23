<template>
  <q-page>
    <!-- <TabPpid
      v-model="store.tab"
      :items="store.items"
    /> -->

    <!-- <q-separator /> -->

    <q-tab-panels
      v-model="store.tab"
      animated
      vertical
      swipeable
      class="q-pt-lg q-mt-lg"
    >
      <q-tab-panel name="all">
        <app-text-judul judul="Ppid" />
        <q-separator />
        <div class="content">
          <ListBigPpid
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
          <!-- <div
            v-if="item.thumbnail"
            class="row q-col-gutter-lg"
          >
            <div class="col-md-7 col-lg-7 col-xl-7 col-xs-12 col-sm-12">
              <app-editor
                v-model="item.content"
                :edited="false"
              />
            </div>
            <div class="col-md-5 col-lg-5 col-xl-5 col-xs-12 col-sm-12">
              <div class="q-py-md">
                <q-img
                  :ratio="1"
                  :src="pathImg + item.thumbnail"
                  img-class="my-pict-style"
                  class="my-pict-style"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <app-editor
              v-model="item.content"
              :edited="false"
            />
          </div> -->
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
import { usePpidWeb } from 'src/stores/web/ppid'
import { onMounted } from 'vue'
import { pathImg } from 'src/boot/axios'
import ListBigPpid from './ListBigPpid.vue'
// import TabPpid from './TabPpid.vue'
// import TabPpid from './TabPpid.vue'
// const tab = ref('all')
const store = usePpidWeb()

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
