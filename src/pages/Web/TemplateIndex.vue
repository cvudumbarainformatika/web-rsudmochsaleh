<template>
  <q-page
    class="container-padding page--web"
  >
    <q-scroll-area
      class="absolute-top fit"
      @scroll="onScroll"
    >
      <!-- banner -->
      <app-banner-web />
      <!-- tab router header -->
      <!-- <keep-alive> -->
      <div
        class="container-padding"
      >
        <app-tab-header />
      </div>
      <!-- </keep-alive> -->
      <div
        class="container-padding"
        style="min-height:400px"
      >
        <div>
          <router-view />
        </div>
      </div>
      <!-- footer -->
      <app-footer />
    </q-scroll-area>
  </q-page>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'
import { useCategoryStore } from 'src/stores/admin/category'
// import { computed } from 'vue'
// import { ref } from 'vue'

const storeCategory = useCategoryStore()
// const categories = computed(() => storeCategory.items)

storeCategory.getAll()

const store = useAppStore()
const onScroll = (info) => {
  const moveToY = info.verticalPosition
  if (moveToY > 100) {
    store.changeVisible(true)
  } else {
    store.changeVisible(false)
  }
}

</script>

<style lang="scss" scoped>

.top--header{
  position: fixed;
  top:60px;
}

</style>
