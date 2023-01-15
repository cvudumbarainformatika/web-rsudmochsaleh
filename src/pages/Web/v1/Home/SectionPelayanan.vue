<template>
  <div class="container-padding bg-grey-2 q-pt-lg">
    <div class="text-center q-py-lg">
      <div class="text-h4 text-primary text-weight-bold">
        <span class="text-dark">Pelayanan  </span>
        <span class="text-primary">UOBK RSUD DOKTER MOHAMAD SALEH</span>
      </div>
    </div>
    <q-separator class="q-mb-lg" />
    <!-- SLIDES -->

    <app-splide
      :items="items"
      :height="420"
    >
      <template #image="{row}">
        <app-lottie-web
          :url="row.animation"
          :height="250"
        />
      </template>
      <template #text="{row}">
        <div class="f-18 text-weight-bold text-center ellipsis q-pa-md">
          {{ row.nama }}
        </div>
        <div class="text-center q-pt-md">
          <app-btn
            rounded
            label="Selengkapnya"
            @click="clickList(row.nama)"
          />
        </div>
      </template>
    </app-splide>
    <div class="q-pt-md">
      <app-splide
        :items="subitems"
        :height="220"
        :width="150"
        :per-page="5"
        :interval="1000"
        @on-click-card="(val)=> goTo(val)"
      >
        <template #image="{row}">
          <app-lottie-web
            :url="row.animation"
            :height="140"
          />
        </template>
        <template #text="{row}">
          <div
            class="f-12 text-weight-bold text-center ellipsis q-pa-md"
          >
            {{ row.nama }}
          </div>
        </template>
      </app-splide>
    </div>
  </div>
</template>

<script setup>
import { usePelayananWeb } from 'src/stores/web/pelayanan'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = usePelayananWeb()
const items = computed(() => store.items)
const subitems = computed(() => {
  const thumb = []
  const arr = items.value
  if (arr.length > 0) {
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i].submenu
      if (arr2.length > 0) {
        for (let n = 0; n < arr2.length; n++) {
          thumb.push(arr2[n])
        }
      }
    }
  }
  return thumb
})

console.log('items pelayanan: ', items.value)
console.log('splide pelayanan: ', subitems.value)

function clickList(val) {
  store.setTab(val)
  router.push('/pelayanan')
}

function goTo(val) {
  router.push('/pelayanan/submenu/' + val.slug)
}
</script>
