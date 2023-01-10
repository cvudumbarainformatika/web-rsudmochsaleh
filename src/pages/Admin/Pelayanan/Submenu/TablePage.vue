<template>
  <q-card>
    <q-list
      bordered
      separator
      class="rounded-borders q-mb-xl"
    >
      <q-item-label header>
        <div class="row items-center justify-between">
          <div v-if="!pageForm">
            Table Submenu Pelayanan
          </div>
          <div v-else>
            Form Submenu Pelayanan
          </div>
          <div>
            <q-btn
              round
              unelevated
              color="secondary"
              icon="add"
              size="sm"
              @click="pageForm = !pageForm"
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
        <div v-if="!pageForm">
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
          <div v-else>
            <content-table />
          </div>
        </div>
      </transition>
      <transition
        appear
        enter-active-class="animated animate__fadeInUp"
      >
        <div
          v-if="pageForm"
        >
          <FormPage />
        </div>
      </transition>
    </q-list>
  </q-card>
</template>

<script setup>
import { useSubmenuTable } from 'src/stores/admin/submenu/table'
import { ref } from 'vue'
import FormPage from './FormPage.vue'
import ContentTable from './ContentTable.vue'

const store = useSubmenuTable()
const pageForm = ref(false)
</script>
