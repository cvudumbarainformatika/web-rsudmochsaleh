<template>
  <q-menu
    v-if="items.length > 0"
    fit
    transition-show="jump-down"
    transition-hide="jump-up"
    class="bg-primary text-white"
  >
    <q-list
      style="min-width: 100px"
      dense
      separator
      @mouseover="emits('onMouseOverList')"
      @mouseout="emits('onMouseOutList')"
    >
      <q-linear-progress
        :value="1"
        color="secondary"
      />
      <q-item
        v-for="(item, n) in items"
        :key="n"
        v-close-popup
        clickable
        :to="{ name: to }"
        active-class="bg-primary text-white"
        @click="emits('onClickMenu', item)"
      >
        <!-- @click="storePelayanan.setTab(item.nama)" -->
        <q-item-section
          @mouseover="emits('onMouseOverItem', item)"
          @mouseout="emits('onMouseOutItem', item)"
        >
          <div class="row justify-between">
            <div>{{ item.nama }}</div>
            <div v-if="item.submenu">
              <div
                v-if="item.submenu.length > 0"
                class="text-right on-right"
              >
                <q-icon
                  name="keyboard_arrow_right"
                  size="16px"
                />
              </div>
            </div>
          </div>
        </q-item-section>
        <q-menu
          v-if="subItemToOpen === item"
          v-model="submenuA"
          fit
          anchor="top end"
          self="top start"
          transition-show="flip-right"
          transition-hide="flip-left"
          class="bg-primary text-white"
        >
          <q-list
            separator
            style="min-width: 100px"
            @mouseover="emits('onMouseOverListSubmenu')"
            @mouseout="emits('onMouseOutListSubmenu')"
          >
            <q-item
              v-for="(sub, index) in item.submenu"
              :key="index"
              v-close-popup
              dense
              clickable
              @click="emits('onClickSubmenu',sub)"
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
import { toRef, ref, watch } from 'vue'
// import { toRef, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => []
  },
  menuOver: {
    type: Boolean,
    default: false
  },
  submenu: {
    type: Boolean,
    default: false
  },
  subItemToOpen: {
    type: Object,
    default: () => {}
  },
  to: {
    type: String,
    default: 'pelayanan'
  }
})

const submenuA = ref(false)
const submenuOpen = toRef(props, 'submenu') // react to prop

// function coba() {
//   console.log('oooo')
// }

const emits = defineEmits(['update:modelValue', 'onMouseOverItem', 'onMouseOverList', 'onMouseOutList', 'onMouseOutItem', 'onMouseOutListSubmenu', 'onMouseOverListSubmenu', 'onClickMenu', 'onClickSubmenu'])
// const itemListOver = ref(false)

watch(submenuOpen, (value) => {
  submenuA.value = submenuOpen.value // OK, textEnvoye is yours
})
</script>
