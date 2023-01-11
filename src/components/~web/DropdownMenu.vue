<template>
  <q-menu
    fit
    transition-show="jump-down"
    transition-hide="jump-up"
  >
    <q-list
      style="min-width: 100px"
      dense
      separator
      @mouseover="emits('onMouseOverList')"
      @mouseout="emits('onMouseOutList')"
    >
      <q-item
        v-for="(item, n) in items"
        :key="n"
        v-close-popup
        clickable
        :to="{ name: 'pelayanan' }"
      >
        <!-- @click="storePelayanan.setTab(item.nama)" -->
        <q-item-section
          @mouseover="emits('onMouseOverItem', item)"
        >
          {{ item.nama }}
        </q-item-section>
        <q-item-section
          v-if="item.submenu.length > 0"
          side
        >
          <q-icon name="keyboard_arrow_right" />
        </q-item-section>

        <!-- SUBMENU -->
        <q-menu
          anchor="top end"
          self="top start"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-list
            separator
            @mouseover="coba"
          >
            <q-item
              v-for="(sub, index) in item.submenu"
              :key="index"
              dense
              clickable
            >
              <q-item-section>{{ sub.nama }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-item>
      <q-separator />
    </q-list>
  </q-menu>
</template>

<script setup>
// @mouseover="() => {
//               listSubmenu = true
//             }"
//             @mouseout="listSubmenu = false"
// import { debounce, useQuasar } from 'quasar'
import { watch } from 'vue'
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  menuOver: {
    type: Boolean,
    default: false
  },
  submenuOpen: {
    type: Boolean,
    default: false
  }
})

function coba() {
  console.log('oooo')
}

const emits = defineEmits(['onMouseOverItem', 'onMouseOverList', 'onMouseOutList'])
// const itemListOver = ref(false)

watch(() => props.menuOver, console.log('ooooo'))
</script>
