<template>
  <div
    :class="admin?'cursor-pointer':''"
    @click="setImage"
  >
    <q-parallax
      :height="250"
      :speed="0.5"
    >
      <template #media>
        <img
          :src="image"
        >
        <div
          v-if="admin"
          class="absolute-bottom bg-dark cursor-pointer q-pa-lg text-white"
        >
          <q-icon
            name="photo_camera"
            size="sm"
          /> Ubah Photo
          <q-file
            ref="refFile"
            v-model="imgTemp"
            name="image"
            label="Pick one file"
            accept="image/*"
            class="hidden"
            @update:model-value="changeImage"
          />
        </div>
      </template>

      <div class="absolute-bottom text-center q-ma-lg">
        <div class=" my--style text-h6 text-white text-capitalize">
          {{ route.name }}
        </div>
      </div>
    </q-parallax>
  </div>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '../../stores/app'

const route = useRoute()
console.log('banner', route)

const props = defineProps({
  admin: {
    type: Boolean,
    default: false
  }
})

const imgTemp = ref(null)
const refFile = ref(null)

const store = useAppStore()

const image = computed(() => {
  if (imgTemp.value === null) {
    if (store.banner === null) {
      return new URL('../../assets/images/rsud-carousel.jpg', import.meta.url).href
    } else {
      return pathImg + store.banner
    }
  }
  return URL.createObjectURL(imgTemp.value)
})

// function isFile(input) {
//   if ('File' in window && input instanceof File) { return true } else return false
// }

function setImage() {
  if (props.admin) {
    refFile.value.$el.click()
  }
}
function changeImage() {
  console.log('ok')
  const form = new FormData()
  form.append('banner', imgTemp.value)
  store.updateBanner(form)
}
</script>

<style lang="scss" scoped>
.my--style{
  min-width: 100px;
}
</style>
