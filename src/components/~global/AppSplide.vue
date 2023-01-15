<template>
  <div>
    <Splide
      :key="items"
      :options="options"
      aria-label="My Splide Components"
      :has-track="false"
    >
      <SplideTrack>
        <SplideSlide
          v-for="(item, index) in items"
          :key="index"
        >
          <q-card
            :style="`height:${height-30}px`"
            class="cursor-pointer shadow-1"
            @click="emits('onClickCard',item)"
          >
            <slot
              name="image"
              :row="item"
            />
            <q-separator class="q-mt-sm" />
            <slot
              name="text"
              :row="item"
            />
          </q-card>
        </SplideSlide>
      </SplideTrack>

      <!-- <div class="splide__arrows">
        <button class="splide__arrow splide__arrow--prev">
          Prev
        </button>
        <button class="splide__arrow splide__arrow--next">
          Next
        </button>
      </div> -->
    </Splide>
  </div>
</template>
<script setup>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css/core'
import '@splidejs/vue-splide/css'
import { ref } from 'vue'

const emits = defineEmits(['onClickCard'])
const props = defineProps({
  height: {
    type: Number,
    default: 520
  },
  width: {
    type: Number,
    default: 360
  },
  perPage: {
    type: Number,
    default: 3
  },
  start: {
    type: Number,
    default: 1
  },
  perMove: {
    type: Number,
    default: 1
  },
  interval: {
    type: Number,
    default: 2000
  },
  items: {
    type: Array,
    default: () => []
  }
})

const options = ref({
  type: 'loop',
  autoplay: true,
  pauseOnFocus: true,
  rewind: true,
  interval: props.interval,
  perPage: props.perPage,
  start: props.start,
  perMove: props.perMove,
  focus: 'center',
  gap: '1rem',
  height: props.height + 'px',
  fixedWidth: props.width + 'px'
})
</script>
