<template>
  <nav
    class="nav-menu q-px-md"
    :class="{ 'fixed-top': fixed }"
  >
    <q-list class="row no-wrap items-center q-gutter-x-md">
      <q-item
        v-for="menu in menus"
        :key="menu.name"
        clickable
        :active="route.name === menu.name"
        :to="{ name: menu.name }"
        class="menu__item"
      >
        <q-item-section>{{ menu.title }}</q-item-section>
      </q-item>
    </q-list>
  </nav>
</template>

<script setup>
defineProps({
  store: {
    type: Object,
    required: true
  },
  menus: {
    type: Array,
    required: true
  },
  route: {
    type: Object,
    required: true
  },
  fixed: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle-drawer'])
</script>

<style scoped>
.nav-menu {
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
}
</style>
