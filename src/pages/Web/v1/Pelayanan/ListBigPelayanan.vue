<template>
  <div>
    <div
      v-if="items.length===0"
      class="column flex-center"
      style="height:300px"
    >
      Belum Ada Content
    </div>
    <q-list
      v-else
      bordered
      separator
      class="rounded-borders"
    >
      <q-item-label header />

      <q-item
        v-for="(item, n) in items"
        :key="n"
        class="q-py-md"
      >
        <q-item-section
          avatar
          top
        >
          <q-icon
            name="medical_services"
            color="black"
            size="34px"
          />
        </q-item-section>

        <q-item-section
          top
          class="col-2 gt-sm"
        >
          <q-item-label class="q-mt-sm">
            {{ item.nama }}
          </q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="2">
            <div v-html="item.content" />
          </q-item-label>
          <q-item-label
            caption
            lines="1"
          >
            @{{ item.slug }}
          </q-item-label>
          <q-item-label
            lines="1"
            class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
          >
            <span
              class="cursor-pointer"
              @click="emits('click',item.nama)"
            >Selengkapnya</span>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['click'])
</script>
