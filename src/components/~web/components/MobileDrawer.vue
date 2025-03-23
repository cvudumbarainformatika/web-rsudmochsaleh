<template>
  <q-drawer
    :model-value="modelValue"
    side="right"
    overlay
    bordered
    class="bg-primary text-white"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-scroll-area class="fit">
      <q-list>
        <q-item class="q-pa-md">
          <q-img
            :src="logo"
            width="150px"
            class="cursor-pointer"
            alt="logo rsud mohamad saleh"
            @click="$router.push('/')"
          />
        </q-item>

        <q-separator dark />

        <q-item
          v-for="menu in menus"
          :key="menu.name"
          :to="{ name: menu.name }"
          clickable
          :active="routeName === menu.name"
        >
          <q-item-section>{{ menu.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  menus: {
    type: Array,
    required: true
  },
  routeName: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>
