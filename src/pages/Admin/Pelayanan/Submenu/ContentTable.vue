<template>
  <q-list
    bordered
    separator
    class="rounded-borders q-mb-xl"
  >
    <q-item
      v-for="(item, n) in items"
      :key="n"
      class="q-py-sm bg-white"
      tag="String"
    >
      <q-item-section
        avatar
        class="col-1"
      >
        <q-img
          :ratio="16/9"
          :src="getImage(item.thumbnail)"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          <span class="text-weight-bold f-16">{{ item.nama }}</span>
        </q-item-label>
        <!-- <q-item-label
          lines="2"
        >
          <div v-html="item.content" />
        </q-item-label> -->
      </q-item-section>

      <q-item-section
        side
      >
        <div class="text-grey-8 q-gutter-xs">
          <q-btn
            class="gt-xs"
            size="sm"
            flat
            dense
            round
            icon="delete"
            @click="emits('onDelete',item)"
          />
          <q-btn
            size="sm"
            flat
            dense
            round
            icon="edit"
            @click="emits('onEdit',item)"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['onDelete', 'onEdit'])

function getImage(image) {
  if (image === null || image === '') {
    return new URL('../../../../assets/images/no-image.png', import.meta.url).href
  }
  return pathImg + image
}
</script>
