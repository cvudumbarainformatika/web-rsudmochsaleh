<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between title-page q-mb-md">
      <div>
        <div class="text-h6">
          Ppid
        </div>
        <div class="f-14">
          <span v-if="!route.params.id">Manage data Pejabat Pengelola Informasi & Dokumentasi</span>
          <span v-else>Form Data Ppid</span>
        </div>
      </div>
      <div>
        <q-btn
          v-if="route.params.id"
          round
          elevated
          color="primary"
          icon="arrow_back"
          size="sm"
          @click="prev"
        />
        <q-btn
          v-else
          round
          elevated
          color="primary"
          icon="add"
          size="sm"
          @click="form.addForm"
        />
      </div>
    </div>
    <!-- content -->
    <div>
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </q-page>
</template>

<script setup>
import { usePpidForm } from 'src/stores/admin/ppid/form'
import { useRoute, useRouter } from 'vue-router'
const form = usePpidForm()
const route = useRoute()
const router = useRouter()
console.log('index ppid', router)
function prev() {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-to {
  position: absolute;
  right: 0;
}
.slide-enter-from {
  position: absolute;
  right: -100%;
}
.slide-leave-to {
  position: absolute;
  left: -100%;
}
.slide-leave-from {
  position: absolute;
  left: 0;
}

// ===================================fade
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
