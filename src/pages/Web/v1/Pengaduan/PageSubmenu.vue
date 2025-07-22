<template>
  <div>
    <app-loading v-if="store.loading" />
    <div class="q-my-xl">
      <app-text-judul :judul="store.item? store.item.nama:''" />
      <q-separator />
    </div>

    <div class="row q-col-gutter-lg">
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
        <div class="content">
          <div v-if="store?.item">
            <div
              v-if="store?.item?.thumbnail"
              class="q-py-md q-px-lg"
            >
              <q-img
                :src="pathImg + store?.item?.thumbnail"
                alt="thumbnail Rsud dr mohamad saleh"
              />
            </div>
          </div>
          <div
            v-if="store.item"
            class="q-mb-xl"
          >
            <app-editor
              v-model="store.item.content"
              :edited="false"
            />
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
        <div v-if="submenu?.length > 0">
          <!-- {{ store.item.pelayanan.submenu }} -->
          <div
            v-for="(sub, index) in submenu"
            :key="index"
            class="q-pa-md"
          >
            <q-card
              flat
              bordered
              class="cursor-pointer"
              @click="goTo(sub)"
            >
              <div
                class="bg-grey-2"
              >
                <app-lottie-web
                  ref="anim"
                  :url="sub?.animation"
                  :height="250"
                />
              </div>
              <q-separator />
              <div>
                <div class="f-18 text-center q-pa-sm q-mt-sm">
                  {{ sub.nama }}
                  <div class="text-grey f-10">
                    @{{ sub?.slug }}
                  </div>
                </div>
                <div class="text-right q-pa-xs">
                  <q-btn
                    flat
                    round
                    size="sm"
                    color="primary"
                    icon="forward"
                    @click="goTo(sub)"
                  >
                    <q-tooltip>Selengkapnya</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { useSubmenuWeb } from 'src/stores/web/submenu'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pathImg } from 'src/boot/axios'

const store = useSubmenuWeb()
const route = useRoute()
const router = useRouter()

const submenu = computed(() => {
  return store.getSubmenu
})

// const slug = ref(route.params.page)
// console.log('store submenu web', store)
// console.log('route submenu web', route)
// console.log('item submenu web', store.item)
// store.getData(route.params.page)
onMounted(() => {
  store.getData(route?.params?.page)
})

function goTo(val) {
  router.push('/pengaduan/submenu/' + val.slug)
}

</script>
