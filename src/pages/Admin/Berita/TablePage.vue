<template>
  <q-card>
    <q-list
      bordered
      separator
      class="rounded-borders q-mb-xl"
    >
      <q-item-label header>
        Table Data Berita
      </q-item-label>
      <q-separator />
      <div
        v-if="store.items.length === 0"
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
          class="col-2"
        >
          <q-img
            :ratio="16/9"
            :src="pathImg + item.thumbnail"
          />
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-bold f-16">{{ item.judul }}</span>
          </q-item-label>
          <q-item-label
            caption
            lines="2"
          >
            <div v-html="item.content" />
          </q-item-label>
          <q-item-label
            lines="1"
            class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
          >
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label>
        </q-item-section>

        <q-item-section
          side
        >
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click="store.deletesData(item.id)"
            />
            <q-btn
              class="gt-xs"
              size="12px"
              flat
              dense
              round
              icon="done"
            />
            <q-btn
              size="12px"
              flat
              dense
              round
              icon="more_vert"
            />
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item-label header>
        Table Data Berita
      </q-item-label>
    </q-list>
  </q-card>
</template>

<script setup>
import { pathImg } from 'src/boot/axios'
import { useBeritaTable } from 'src/stores/admin/berita/table'

const store = useBeritaTable()

store.getDataTable()

</script>
