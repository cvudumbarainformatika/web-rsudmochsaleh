<template>
  <q-card>
    <q-list
      bordered
      separator
      class="rounded-borders q-mb-xl"
    >
      <q-item-label header>
        <div class="row items-center justify-between">
          <div>Table Data User</div>
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
        <div>Harap Tunggu ...</div>
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
          <q-avatar>
            <img :src="getImage('')">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <div class="f-12">
              Nama: {{ item.name }}
            </div>
            <div class="f-12">
              Email: {{ item.email }}
            </div>
          </q-item-label>
        </q-item-section>
        <!-- <q-item-section>
          <q-item-label lines="1">
            <span>{{ item }}</span>
          </q-item-label>
        </q-item-section> -->

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
              @click="form.editForm(item)"
            />
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
import { useUserForm } from 'src/stores/admin/user/form'
import { useUserTable } from 'src/stores/admin/user/table'
// import { ref } from 'vue'

const $q = useQuasar()
const store = useUserTable()
const form = useUserForm()

// const sel = ref('')
// const filters = ref([
//   { status: '', label: 'Semua' },
//   { status: 1, label: 'Draft' },
//   { status: 2, label: 'Publish' }
// ])

store.getDataTable()

function getImage(image) {
  if (image === null || image === '') {
    return new URL('../../../assets/images/user-avatar.svg', import.meta.url).href
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

</script>
