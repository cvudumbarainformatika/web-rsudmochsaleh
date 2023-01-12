<template>
  <div>
    <div
      v-if="items.length===0"
      class="column flex-center"
      style="height:300px"
    >
      Belum Ada Content
    </div>
    <div
      class="row justify-center q-col-gutter-lg relative-position q-my-lg items-strech"
    >
      <div
        v-for="(item, i) in items"
        :key="i"
        class="col-12 col-md-3 col-sm-4 col-lg-3"
      >
        <q-card
          flat
          bordered
          class="cursor-pointer"
          @click="emits('click',item.nama)"
        >
          <div class="bg-grey-2">
            <app-lottie-web
              :url="item.animation"
              :height="250"
            />
          </div>
          <q-separator />
          <div>
            <div class="f-18 text-center q-pa-sm q-mt-sm">
              {{ item.nama }}
              <div class="text-grey f-10">
                @{{ item.slug }}
              </div>
            </div>
            <div class="text-right q-pa-xs">
              <q-btn
                flat
                round
                color="primary"
                icon="forward"
                size="sm"
                @click="emits('click',item.nama)"
              >
                <q-tooltip>Selengkapnya</q-tooltip>
              </q-btn>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
  <!-- </div> -->
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
