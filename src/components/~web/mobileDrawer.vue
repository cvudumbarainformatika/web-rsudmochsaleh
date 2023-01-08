<template>
  <q-drawer
    show-if-above
    :width="250"
    :breakpoint="400"
    class="bg-gray text-black"
  >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list class="q-pt-xs">
        <template
          v-for="(menuItem, index) in menus"
          :key="index"
        >
          <q-item
            v-ripple
            clickable
            :active="menuItem.name === route"
            active-class="bg-primary text-white"
            :to="`/${menuItem.url}`"
          >
            <!-- <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section> -->
            <q-item-section>
              {{ menuItem.name }}
            </q-item-section>
          </q-item>
          <q-separator
            v-if="menuItem.separator"
            :key="'sep' + index"
          />
        </template>
      </q-list>
    </q-scroll-area>

    <div
      class="absolute-top bg-primary text-white"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent q-pa-md items-center">
        <q-avatar
          size="56px"
          class="q-mb-md text-center"
        >
          <img :src="logo">
        </q-avatar>
        <div class="f-8 text-weight-bold">
          {{ title }}
        </div>
        <div class="f-8 text-weight-thin">
          {{ desc }}
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
defineProps({
  logo: {
    type: String,
    default: 'logo'
  },
  title: {
    type: String,
    default: 'UOBK RSUD DOKTER MOHAMAD SALEH'
  },
  desc: {
    type: String,
    default: 'UOBK RSUD DOKTER MOHAMAD SALEH ADALAH RUMAH SAKIT PEMERINTAH YANG BERTIPE B PENDIDIKAN'
  },
  menus: {
    type: Array,
    default: () => []
  },
  route: {
    type: String,
    default: 'beranda'
  }
})
</script>

<style lang="scss" scoped>
// .q-router-link--active {
//   background-color: $primary;
//   color:#fff;
//   transition: all 0.3s ease;
// }
// .active {
//   background-color: $primary;
//   color:#fff;
//   transition: all 0.3s ease;
// }
</style>
