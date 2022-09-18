<template>
  <q-page
    v-scroll="onScroll"
    class="container-padding"
  >
    <!-- <q-scroll-area
      class="absolute-top fit"
      @scroll="onScroll"
    > -->
    <!-- banner -->
    <app-banner-web />
    <!-- tab router header -->
    <!-- <keep-alive> -->
    <div>
      <app-tab-header />
    </div>
    <!-- </keep-alive> -->
    <div
      style="min-height:400px"
    >
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <!-- footer -->
    <!-- </q-scroll-area> -->
  </q-page>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'
import { useCategoryStore } from 'src/stores/admin/category'
import { onMounted } from 'vue'
// import { computed } from 'vue'
// import { ref } from 'vue'

const storeCategory = useCategoryStore()
// const categories = computed(() => storeCategory.items)

onMounted(() => {
  storeCategory.getAll()
})

const store = useAppStore()
const onScroll = (position) => {
  // const moveToY = position.verticalPosition
  // console.log(position)
  if (position > 150) {
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

.web--padding{

}
</style>
