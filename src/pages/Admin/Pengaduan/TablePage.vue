<template>
  <q-card>
    <q-list
      bordered
      separator
      class="rounded-borders q-mb-xl"
    >
      <q-item-label header>
        <div class="row items-center justify-between">
          <div>Table Data {{ getNama() }}</div>
          <!-- <div>
            <q-select
              v-model="sel"
              dense
              filled
              :options="filters"
              label="Filter"
              map-options
              emit-value
              option-label="label"
              option-value="status"
              style="min-width:100px"
              @update:model-value="changeFilter"
            />
          </div> -->
        </div>
      </q-item-label>
      <q-separator />
      <div
        v-if="store.loading"
        class="column flex-center text-grey-8"
        style="min-height:300px"
      >
        <q-spinner-cube
          color="primary"
          size="3em"
        />
        <div> Harap Tunggu ... </div>
      </div>
      <!-- <div v-else> -->
      <div
        v-else-if="store.items.length === 0"
        class="column flex-center text-grey-8"
        style="min-height:300px"
      >
        <q-icon
          name="list_alt"
          size="md"
        />
        <div>Data belum ada</div>
      </div>
      <q-item
        v-for="(item, n) in store.items"
        v-else
        :key="n"
        class="q-py-sm"
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
        <q-item-section
          avatar
          class="col-1"
        >
          <app-lottie :url="item.animation" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-bold f-16">{{ item.nama }}</span>
          </q-item-label>
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
              @click="deleteData(item)"
            />
            <q-btn
              size="sm"
              flat
              dense
              round
              icon="edit"
              @click="form.editForm(item, route.name)"
            />
            <q-btn
              unelevated
              size="sm"
              dense
              round
              :color="`${item.submenu.length>0?'secondary':'dark'}`"
              icon="arrow_forward"
              @click="handleSubmenu(item)"
            >
              <q-tooltip :class="item.submenu.length > 0 ?'bg-secondary':'bg-dark'">
                Tambah Submenu
              </q-tooltip>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
      <!-- </div> -->
      <q-separator />
      <q-item-label header>
        <app-pagination-table
          v-if="store.items.length > 0"
          :meta="store.meta"
          @next="(val)=>store.setPage(val)"
          @prev="(val)=>store.setPage(val)"
          @last="(val)=>store.setPage(val)"
          @first="(val)=>store.setPage(val)"
        />
      </q-item-label>
    </q-list>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { pathImg } from 'src/boot/axios'
import { usePelayananForm } from 'src/stores/admin/pelayanan/form'
import { usePelayananTable } from 'src/stores/admin/pelayanan/table'
import { useRoute, useRouter } from 'vue-router'
// import { ref } from 'vue'

const $q = useQuasar()
const store = usePelayananTable()
const form = usePelayananForm()
const router = useRouter()
const route = useRoute()

// const sel = ref('')
// const filters = ref([
//   { status: '', label: 'Semua' },
//   { status: 1, label: 'Draft' },
//   { status: 2, label: 'Publish' }
// ])
store.setRouteName(route.name)
store.getDataTable()

function getImage(image) {
  if (image === null || image === '') {
    return new URL('../../../assets/images/no-image.png', import.meta.url).href
  }
  return pathImg + image
}

function deleteData(item) {
  $q.dialog({
    title: 'Pemberitahuan!',
    message: `Apakah data <b> ${item.nama} </b> Akan di hapus?`,
    cancel: true,
    persistent: true,
    html: true
  }).onOk(() => {
    store.deletesData(item.id)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

// function changeFilter(val) {
//   store.setStatus(val)
// }
// function updateStatus(val) {
//   console.log(val)
//   const status = val.status === 1 ? 2 : 1
//   store.updateStatus(val.id, status)
// }

// function getCategories(item) {
//   return item.map(x => x.nama).join(', ')
// }

function getNama() {
  if (route.name === 'admin.pengaduan' || route.name === 'form.pengaduan') {
    return 'Pengaduan'
  } else {
    return 'Pelayanan'
  }
}

function handleSubmenu(item) {
  if (route.name === 'admin.pengaduan' || route.name === 'form.pengaduan') {
    router.push('/admin/pengaduan/submenu/' + item.id)
  } else {
    router.push('/admin/pelayanan/submenu/' + item.id)
  }
}

</script>
