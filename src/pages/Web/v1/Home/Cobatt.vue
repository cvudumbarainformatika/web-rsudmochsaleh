<template>
  <section class="dashboard-summary bg-dark">
    <!-- <div class="summary-grid">
      <div class="summary-card" v-for="item in stats" :key="item.label">
        <div class="icon-box" :class="item.color">
          <q-icon :name="item.icon" size="32px" />
        </div>
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
        <div class="unit">{{ item.unit }}</div>
      </div>
    </div> -->
<div class="summary-grid">
    <q-card class="summary-card text-white shadow-10 relative-position">
      <q-card-section>
        <div class="text-h6 text-uppercase text-weight-bold">
          INFO TT
        </div>
        <q-separator dark class="q-my-sm" />
        <div class="text-subtitle2">Ketersediaan Tempat Perawatan</div>
        <div class="q-my-md">
          <q-linear-progress size="20px" :value="0.75" color="green" rounded>
            <div class="absolute-full flex flex-center">
              <q-icon name="bed" class="q-mr-sm" />
              <span>75% Terisi</span>
            </div>
          </q-linear-progress>
        </div>
      </q-card-section>
      <q-card-actions align="center" class="absolute-bottom q-pb-lg">
        <!-- <q-btn flat label="Lihat Detail" icon="visibility" to="/info-tt" /> -->
         <app-btn
          rounded
          label="Selengkapnya"
          class="view-more-btn"
          @click="router.push('/informasi-ruang-perawatan')"
        >
          <template #append>
            <q-icon
              name="arrow_forward"
              class="q-ml-sm"
            />
          </template>
        </app-btn>
      </q-card-actions>
    </q-card>


       <!-- IKM -->
      <q-card class="summary-card text-white shadow-10 relative-position">
        <q-card-section>
          <div class="text-h6 text-uppercase text-weight-bold">
            IKM
          </div>
          <q-separator dark class="q-my-sm" />
          <div class="text-subtitle2">Indeks Kepuasan Masyarakat</div>
          <div class="q-my-md flex flex-center">
            <q-circular-progress
              show-value
              font-size="14px"
              :value="88.93"
              size="100px"
              color="cyan"
              track-color="grey-8"
              class="q-mr-sm"
            />
            <div>
              <div class="text-h6">Tahun 2025</div>
              <div class="text-caption">IKM meningkat dari tahun sebelumnya</div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="">
          <app-btn
            rounded
            label="Selengkapnya"
            class="view-more-btn"
            @click="router.push('/informasi-index-kepuasan-masyarakat')"
          >
            <template #append>
              <q-icon
                name="arrow_forward"
                class="q-ml-sm"
              />
            </template>
          </app-btn>
        </q-card-actions>
      </q-card>


       <!-- Top 10 Penyakit -->
      <q-card class="summary-card text-white shadow-10 relative-position">
        <q-card-section>
          <div class="text-h6 text-uppercase text-weight-bold">
            Top 10 Penyakit
          </div>
          <q-separator dark class="q-my-sm" />
          <div class="text-subtitle2">Data Diagnosa Tertinggi</div>
          <div class="q-my-md">
            <!-- <ul class="q-pl-none" style="list-style: none">
              <li v-for="i in 3" :key="i" class="q-mb-sm">
                <q-icon name="medication" class="q-mr-sm" />
                {{ i + 1 }} aaa
              </li>
            </ul> -->
            <div class="text-h1">📈</div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="absolute-bottom q-pb-lg">
          <app-btn
            rounded
            label="Selengkapnya"
            class="view-more-btn"
            @click="router.push('/informasi-top-icd10')"
          >
            <template #append>
              <q-icon
                name="arrow_forward"
                class="q-ml-sm"
              />
            </template>
          </app-btn>
        </q-card-actions>
      </q-card>
</div>

  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useTempatTidurStore } from 'src/stores/web/tempatTidur'
import { useRouter } from 'vue-router'

const router = useRouter()

const stats = reactive([
  {
    label: 'Total Tempat Tidur',
    value: 58,
    unit: 'Tempat',
    icon: 'bed',
    color: 'cyan'
  },
  {
    label: 'Terisi',
    value: 34,
    unit: 'Pasien',
    icon: 'group',
    color: 'red'
  },
  {
    label: 'Kosong',
    value: 24,
    unit: 'Sisa',
    icon: 'event_available',
    color: 'green'
  },
  {
    label: 'Ruangan Aktif',
    value: 7,
    unit: 'Unit',
    icon: 'meeting_room',
    color: 'amber'
  }
])

const store = useTempatTidurStore()

onMounted(() => {
  Promise.all([
    store.getData()
  ])
})

</script>

<style scoped>
.dashboard-summary {
  padding: 2rem;
  background: #0a0a0a;
  min-height: 100%;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.15);
}

.icon-box {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.icon-box.cyan {
  color: #00ffff;
}
.icon-box.red {
  color: #ff6b6b;
}
.icon-box.green {
  color: #66ff66;
}
.icon-box.amber {
  color: #ffc107;
}

.label {
  font-size: 1rem;
  color: #ccc;
  margin-bottom: 0.4rem;
}

.value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
}

.unit {
  font-size: 0.9rem;
  color: #999;
  margin-top: 0.3rem;
}
</style>
