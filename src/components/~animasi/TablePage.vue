<template>
  <div>
    <div
      class="row q-col-gutter-sm"
      style="margin-bottom:100px; margin-top: 70px;"
    >
      <div class="bg-white q-pa-md absolute-top full-width">
        <q-input
          v-model="search"
          outlined
          borderless
          debounce="500"
          clearable
          dense
          placeholder="Search..."
        >
          <template #prepend>
            <q-icon
              name="search"
              size="20px"
            />
          </template>
        </q-input>
      </div>
      <div
        v-for="(item, i) in store.items"
        :key="i"
        class="col-4"
      >
        <q-card round>
          <div
            class=""
          >
            <div v-if="store.loading">
              <q-skeleton
                height="100px"
                square
              />
            </div>
            <Vue3Lottie
              v-else
              :animation-link="getFile(item.url)"
              :height="100"
            />
            <div
              class="f-8 text-center q-pa-md ellipsis absolute-bottom"
              style="margin-bottom:30px;"
            >
              {{ item.url }}
            </div>
          </div>

          <q-separator />
          <q-card-actions align="right">
            <q-skeleton
              v-if="store.loading"
              type="circle"
              size="14px"
            />
            <q-btn
              v-else
              flat
              round
              size="xs"
              color="primary"
              icon="file_copy"
              @click="cc(item.url)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div
      class="flex flex-center q-pa-md bg-white full-width absolute-bottom"
    >
      <q-pagination
        v-model="current"
        color="black"
        :max="maxPagin"
        :max-pages="6"
        :boundary-numbers="false"
      />
    </div>
  </div>
</template>

<script setup>
import { QIcon, QInput, QSkeleton, QSeparator, QBtn, QCardActions, QCard, QPagination } from 'quasar'
import { Vue3Lottie } from 'vue3-lottie'
import { useLottieTable } from 'src/stores/admin/lottie/table'
import { computed, onMounted } from 'vue'
import { pathImg } from 'src/boot/axios'

const store = useLottieTable()
const emits = defineEmits(['onCopy'])

const current = computed({
  get() {
    return store.params.page
  },
  set(nValue) {
    store.setPage(nValue)
  }
})

const search = computed({
  get() {
    return store.params.q
  },
  set(nValue) {
    store.setSearch(nValue)
  }
})

const maxPagin = computed(() => {
  const m = store.meta
  return m === null ? 0 : m.last_page
})

const getFile = (file) => {
  return pathImg + 'lottie/' + file
}
onMounted(() => {
  store.getDataTable()
})

function cc(file) {
  emits('onCopy', file)
}

</script>
