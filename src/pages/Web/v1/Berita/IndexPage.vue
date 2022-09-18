<template>
  <q-page>
    <!-- <div class="row q-col-gutter-lg">
      <div class="col-md-8 col-xs-12">
        <app-cardnews :big-card-news="store.bigCardNews" />
        <q-separator class="q-my-md" />
        <div class="f-14 text-weight-bold">
          Berita Terpopuler
        </div>
      </div>
      <div class="col-md-4 col-xs-12">
        <div class="f-14 text-weight-bold">
          Berita Terbaru
        </div>
        <q-separator class="q-my-md" />
        <app-list-news :items="store.smallCardNews" />
        <q-separator class="q-my-md" />
        <div class="f-14 text-weight-bold">
          Kategori
        </div>
        <q-separator class="q-my-md" />
      </div>
    </div> -->
    <router-view v-slot="{ Component }">
      <transition
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </q-page>
</template>

<script setup>
// import { ref } from 'vue'
// import { useBeritaWeb } from 'src/stores/web/berita'
// import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()
// // import { computed } from 'vue'
// const store = useBeritaWeb()

// onMounted(() => {
//   const params = Object.keys(route.params).length === 0 ? 'all' : route.params.page
//   store.getData(params)
// })
// const slide = ref(1)
</script>

<style lang="scss" scoped>
.padding-page {
  padding-top:60px;
}

.border__tab {
  border:1px solid $grey-4;
}
</style>
