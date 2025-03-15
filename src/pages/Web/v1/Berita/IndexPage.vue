<template>
  <q-page>
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
</script>

<style lang="scss" scoped>
.padding-page {
  padding-top:60px;
}

.border__tab {
  border:1px solid $grey-4;
}
</style>
