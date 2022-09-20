<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-12 col-lg-12 col-xl-12 col-xs-12">
        <div class="row q-col-gutter-md">
          <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
            <q-card
              flat
              bordered
              class="bg-primary text-white"
            >
              <q-card-section>
                <div class="flex items-center justify-between">
                  <div class="q-pa-md">
                    <q-icon
                      name="query_stats"
                      size="120px"
                    />
                  </div>
                  <div class="column">
                    <div class="text-h2 text-right">
                      {{ store.kunjungan }}
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="f-18">
                      Orang yang Berkunjung
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
            <q-card
              flat
              bordered
              class="bg-dark text-white"
            >
              <q-card-section>
                <div class="flex items-center justify-between">
                  <div class="q-pa-md">
                    <q-icon
                      name="event"
                      size="120px"
                    />
                  </div>
                  <div class="column">
                    <div class="text-h2 text-right">
                      {{ store.hari_ini }}
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="f-18">
                      Orang yang Berkunjung Hari ini
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
            <q-card
              flat
              bordered
              class="bg-teal text-white"
            >
              <q-card-section>
                <div class="flex items-center justify-between">
                  <div class="q-pa-md">
                    <q-icon
                      name="feed"
                      size="120px"
                    />
                  </div>
                  <div class="column">
                    <div class="text-h2 text-right">
                      {{ store.berita }}
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="f-18">
                      Data berita
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-6 col-lg-6 col-xl-6 col-xs-12">
            <q-card
              flat
              bordered
              class="bg-negative text-white"
            >
              <q-card-section>
                <div class="flex items-center justify-between">
                  <div class="q-pa-md">
                    <q-icon
                      name="people"
                      size="120px"
                    />
                  </div>
                  <div class="column">
                    <div class="text-h2 text-right">
                      {{ store.users }}
                    </div>
                    <q-separator class="q-my-md" />
                    <div class="f-18">
                      Data Pengguna Admin
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <!-- <div
        class="col-md-4 col-lg-4 col-xl-4 col-xs-12"
      >
        <q-card
          flat
          bordered
          class="bg-negative text-white full-height"
        >
          <q-card-section>
            <div class="flex items-center justify-between">
              <div>
                <q-icon
                  name="people"
                  size="120px"
                />
              </div>
              <div class="column">
                <div class="text-h2 text-right">
                  {{ store.users }}
                </div>
                <q-separator class="q-my-md" />
                <div class="f-12">
                  Data Pengguna Admin
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div> -->
    </div>
  </q-page>
</template>

<script setup>
import { useDashboardStore } from 'src/stores/admin/dashboard'
import { onMounted } from 'vue'

const store = useDashboardStore()

onMounted(() => {
  store.getData()
})
</script>

<style lang="scss" scoped>

</style>
