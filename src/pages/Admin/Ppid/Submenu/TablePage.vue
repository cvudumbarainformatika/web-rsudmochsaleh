<template>
  <q-card>
    <q-list
      bordered
      separator
      class="rounded-borders q-mb-xl bg-grey-2"
      style="min-height:300px"
    >
      <q-item-label
        header
        class="bg-white"
      >
        <div class="row items-center justify-between ">
          <div v-if="!form.formPage">
            Table Submenu {{ getNama() }}
          </div>
          <div v-else>
            Form Submenu {{ getNama() }}
          </div>
          <div>
            <q-btn
              round
              unelevated
              :color="!form.formPage?'secondary':'dark'"
              :icon="!form.formPage?'add':'arrow_back'"
              size="sm"
              @click="form.formPage? form.setFormPage(false): form.setFormPage(true)"
            />
          </div>
        </div>
      </q-item-label>
      <q-separator />
      <transition
        appear
        enter-active-class="animated animate__fadeInUp"
      >
        <!-- Wrapping only one DOM element, defined by QBtn -->
        <div v-if="!form.formPage">
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
          <div
            v-else
          >
            <content-table
              :key="store.items"
              :items="store.items"
              @on-delete="(val)=> deleteData(val)"
              @on-edit="(val)=>form.editForm(val)"
            />
          </div>
        </div>
      </transition>
      <transition
        appear
        enter-active-class="animated animate__fadeInUp"
      >
        <div
          v-if="form.formPage"
        >
          <FormPage />
        </div>
      </transition>
    </q-list>
    <q-card-section
      class="bg-white"
    />
  </q-card>
</template>

<script setup>
// import { useSubmenuTable } from 'src/stores/admin/submenu/table'
// import { useSubmenuForm } from 'src/stores/admin/submenu/form'
import FormPage from './FormPage.vue'
import ContentTable from './ContentTable.vue'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useSubmenuPpidTableStore } from 'src/stores/admin/submmenuppid/table'
import { useSubmenuPpidForm } from 'src/stores/admin/submmenuppid/form'

const store = useSubmenuPpidTableStore()
const form = useSubmenuPpidForm()
const route = useRoute()
const $q = useQuasar()

onMounted(() => {
  console.log('onmounted ...')
  store.getDataTable(route.params.id)
})

function deleteData(item) {
  $q.dialog({
    title: 'Pemberitahuan!',
    message: `Apakah data <b> ${item.nama} </b> Akan di hapus?`,
    cancel: true,
    persistent: true,
    html: true
  }).onOk(() => {
    store.deletesData(item)
  }).onCancel(() => {
    // console.log('Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

console.log('submenu route', route)
const getNama = () => {
  // if (route.name === 'submenu.pokja') {
  //   return 'Pokja'
  // } else {
  //   return 'Pelayanan'
  // }
  return 'Ppid'
}

// watch(store.items, () => {
//   console.log('watch')
// })

watch(() => store.items, (obj) => {
  console.log('watch...', obj)
})
</script>
