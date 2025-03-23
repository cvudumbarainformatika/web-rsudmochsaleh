<template>
  <q-page>
    <app-loading-new v-if="store.loading" />
    <q-tab-panels
      v-else
      v-model="store.tab"
      animated
      vertical
      swipeable
      class="q-pt-lg q-mt-lg"
    >
      <q-tab-panel name="all">
        <app-text-judul :judul="route.name==='pelayanan'?'Pelayanan':'Pokja Akreditasi'" />
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
        <!-- <div v-if="item.submenu.length===0"> -->

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
          <div
            v-if="item.content.length > 10"
            class="q-mb-xl"
          >
            <app-editor
              v-model="item.content"
              :edited="false"
            />
          </div>
        </div>

        <!-- INI JIKA ADA SUB MENU -->
        <div v-if="item.submenu.length > 0">
          <!-- {{ item.submenu }} -->
          <div
            class="row justify-center q-col-gutter-lg relative-position q-my-lg items-strech content-strech"
          >
            <div
              v-for="(sub, i) in item.submenu"
              :key="i"
              class="col-12 col-md-3 col-sm-4 col-lg-3"
            >
              <q-card
                flat
                bordered
                class="cursor-pointer"
                @click="goTo(sub, item)"
              >
                <div
                  class="bg-grey-2"
                >
                  <app-lottie-web
                    ref="anim"
                    :url="sub.animation"
                    :height="250"
                  />
                </div>
                <q-separator />
                <div>
                  <div class="f-18 text-center q-pa-sm q-mt-sm">
                    {{ sub.nama }}
                    <div class="text-grey f-10">
                      @{{ item.slug }}
                    </div>
                  </div>
                  <div class="text-right q-pa-xs">
                    <q-btn
                      flat
                      round
                      size="sm"
                      color="primary"
                      icon="forward"
                    >
                      <q-tooltip>Selengkapnya</q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <!-- </div> -->
    <div class="q-mb-xl" />
  </q-page>
</template>

<script setup>
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { onMounted, ref } from 'vue'
import { pathImg } from 'src/boot/axios'
import ListBigPelayanan from './ListBigPelayanan.vue'
import { useRoute, useRouter } from 'vue-router'

const store = usePelayananWeb()
const anim = ref(null)
const router = useRouter()
const route = useRoute()

console.log('pelayanan route', route)
onMounted(() => {
  store.getData(route.name)
})

function clickList(val) {
  console.log(val)
  if (route.name === 'pelayanan') {
    router.push('/pelayanan')
  } else {
    router.push('/pokja')
  }

  store.setTab(val)
}

function goTo(val, item) {
  router.push('/pelayanan/submenu/' + val.slug)
}

console.log('ref', anim)
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
