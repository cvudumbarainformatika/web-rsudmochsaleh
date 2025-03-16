<template>
  <q-page
    v-scroll="onScroll"
  >
    <div
      id="top"
      class="fixed-top"
    />
    <!-- banner -->
    <app-banner-web />
    <div>
      <app-tab-header v-if="route.name==='berita'" />
    </div>
    <div
      style="min-height:400px"
      class=""
    >
      <router-view
        v-slot="{ Component }"
        :key="route.fullPath"
      >
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
    <!-- <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-page-sticky
        v-if="store.btnScrollTop"
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          fab
          icon="keyboard_arrow_up"
          color="secondary"
          glossy
          @click="scrollToElement()"
        />
      </q-page-sticky>
    </transition> -->
  </q-page>
</template>
<script setup>
import { useAppStore } from 'src/stores/app'
import { useCategoryStore } from 'src/stores/admin/category'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import { scroll } from 'quasar'
// const { getScrollTarget, setVerticalScrollPosition } = scroll
// import { computed } from 'vue'
// import { ref } from 'vue'

const storeCategory = useCategoryStore()
const route = useRoute()
// const categories = computed(() => storeCategory.items)

onMounted(() => {
  storeCategory.getAll()
})

const store = useAppStore()

const onScroll = (position) => {
  // const moveToY = position.verticalPosition
  // console.log('onScroll', position)
  if (position > 75) {
    store.changeVisible(true)
  } else {
    store.changeVisible(false)
  }

  if (position > 300) {
    store.setBtnScrollTop(true)
  } else {
    store.setBtnScrollTop(false)
  }
}

// function goTop() {
//   window.scrollTo(0, 0)
// }

// function scrollToElement() {
//   const el = document.getElementById('top')
//   const target = getScrollTarget(el)
//   const offset = el.offsetTop
//   const duration = 500
//   setVerticalScrollPosition(target, offset, duration)
// }
</script>

<style lang="scss" scoped>

.top--header{
  position: fixed;
  top:60px;
}

.web--padding{

}
</style>
