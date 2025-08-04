<template>
  <q-page class="q-px-lg q-py-xl bg-grey-10 text-white rounded-borders-bottom">
    <div class="text-h4 text-weight-bold text-center text-cyan-4 q-mb-xl animate__animated animate__fadeInDown">
      TOP 10 Penyakit Terbanyak per Kategori Rawat
    </div>

    <!-- <q-layout-grid :cols="screen.xs ? 1 : screen.md ? 2 : 3" class="q-gutter-lg"> -->
    <div class="row q-col-gutter-lg flex-center">
      <div
        v-for="section in sections"
        :key="section.title"
        
        class="col-xs-12 col-sm-6 col-md-6 col-lg-6 "
      >
      <q-card
        class="bg-grey-9 text-white q-pa-md shadow-10 rounded-borders q-hoverable"
        bordered
      >
        <div class="text-subtitle1 text-cyan-3 text-weight-bold q-mb-sm">
          {{ section.title }}
        </div>

        <app-client-only>
          <v-chart :option="generateChart(section)" style="height: 250px" autoresize class="q-mb-md" />
        </app-client-only>

        <q-markup-table dark dense flat class="icd-table">
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Keterangan</th>
              <!-- <th class="text-right">Jumlah</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in section.data" :key="row.icd">
              <td class="text-cyan-2 text-weight-bold">{{ row.icd }}</td>
              <td>{{ row.keterangan }}</td>
              <!-- <td class="text-right">
                <q-badge color="cyan" class="text-black">{{ row.jumlah.toLocaleString() }}</q-badge>
              </td> -->
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import {  onMounted, ref } from 'vue'
import { api2 } from 'boot/axios'

// const VChart = defineAsyncComponent(() => import('vue-echarts'))

const screen = useQuasar().screen

const sections = ref([
  {
    title: 'Rawat Inap (TOP 10)',
    data: [
      { icd: "I20.0", keterangan: "Unstable angina", jumlah: 305 },
      { icd: "I21.9", keterangan: "Acute myocardial infarction, unspecified", jumlah: 194 },
      { icd: "D64.9", keterangan: "Anaemia, unspecified", jumlah: 192 },
      { icd: "A16.2", keterangan: "Tb lung without mention of bact or histological confirm", jumlah: 182 },
      { icd: "I63.9", keterangan: "Cerebral infarction, unspecified", jumlah: 136 },
      { icd: "N18.5", keterangan: "Chronic kidney disease, stage 5", jumlah: 132 },
      { icd: "A91", keterangan: "Dengue haemorrhagic fever", jumlah: 132 },
      { icd: "N13.2", keterangan: "Hydronephrosis with renal and ureteral calculous obstruction", jumlah: 128 },
      { icd: "A09.9", keterangan: "Gastroenteritis and colitis of unspecified origin", jumlah: 119 },
      { icd: "Z47.0", keterangan: "Follow-up care involving removal of fracture plate and other internal fixation device", jumlah: 102 }
    ]
  },
  {
    title: 'Rawat Jalan (TOP 10)',
    data: [
      { icd: "N18.5", keterangan: "Chronic kidney disease, stage 5", jumlah: 6487 },
      { icd: "Z50.1", keterangan: "Other physical therapy", jumlah: 5591 },
      { icd: "I25.9", keterangan: "Chronic ischaemic heart disease, unspecified", jumlah: 4180 },
      { icd: "M54.5", keterangan: "Low back pain", jumlah: 1615 },
      { icd: "M25.6", keterangan: "Stiffness of joint, not elsewhere classified", jumlah: 1556 },
      { icd: "I11.9", keterangan: "Hypertensive heart disease without (congestive) heart failure", jumlah: 1323 },
      { icd: "I69.3", keterangan: "Sequelae of cerebral infarction", jumlah: 1100 },
      { icd: "I10", keterangan: "Essential (primary) hypertension", jumlah: 941 },
      { icd: "Z50.5", keterangan: "Speech therapy", jumlah: 935 },
      { icd: "M17.4", keterangan: "Other secondary gonarthrosis, bilateral", jumlah: 774 }
    ]
  },
  {
    title: 'IGD (TOP 10)',
    data: [
      { icd: "R11", keterangan: "Nausea and vomiting", jumlah: 847 },
      { icd: "R10.4", keterangan: "Other and unspecified abdominal pain", jumlah: 671 },
      { icd: "R50.9", keterangan: "Fever, unspecified", jumlah: 506 },
      { icd: "E86", keterangan: "Volume depletion", jumlah: 475 },
      { icd: "E11.9", keterangan: "Non-insulin-dependent diabetes mellitus without complications", jumlah: 454 },
      { icd: "I10", keterangan: "Essential (primary) hypertension", jumlah: 441 },
      { icd: "K30", keterangan: "Dyspepsia", jumlah: 435 },
      { icd: "D64.9", keterangan: "Anaemia, unspecified", jumlah: 412 },
      { icd: "I20.0", keterangan: "Unstable angina", jumlah: 386 },
      { icd: "A09.9", keterangan: "Gastroenteritis and colitis of unspecified origin", jumlah: 346 }
    ]
  }
])




const getData = async () => {
  const currentYear = new Date().getFullYear()

  const dateRange = ref({
    start: `${currentYear}-01-01`,
    end: `${currentYear}-12-31`
  })
  const resp = await api2.get(`/api/v1/dashboardexecutive/rekammedik?d=31&month=12&year=${currentYear}&tgl=${currentYear}-12-31`)
  const { data } = resp

  sections.value = [
    {
      title: 'Rawat Inap (TOP 10)',
      data: data.topicd10ranap
    },
    {
      title: 'Rawat Jalan (TOP 10)',
      data: data.topicd10rajal
    },
    {
      title: 'IGD (TOP 10)',
      data: data.topicd10igd
    }
  ]

  // console.log(resp);
  
}

onMounted(() => {
  
  getData()
})



function generateChart(section) {
  const sortedData = [...section.data].sort((a, b) => a.jumlah - b.jumlah)
  const colors = [
    '#9e9e9e', // 🥉 Rank 10
    '#607d8b', // 9
    '#3f51b5', // 8
    '#7c4dff', // 7
    '#ff4081', // 6
    '#ff9800', // 5
    '#ff5722', // 4
    '#ffc107', // 3
    '#00bcd4', // 2
    '#00e676'  // 🥇 Rank 1
  ]
  return {
    tooltip: { trigger: 'item' },
    grid: { left: 0, right: 10, top: 10, bottom: 0, containLabel: true },
    xAxis: { type: 'value', show: false },
    yAxis: {
      type: 'category',
      data: sortedData.map(d => d.icd),
      axisLabel: {
        color: '#fff',
        // formatter: (val, idx) => `{code|${val}}
        //  {desc|${sortedData[idx].keterangan}}`
        //  ,
        formatter: (val, idx) => `{code|${val}} `
         ,
        rich: {
          code: { color: '#00eaff', fontWeight: 'bold' },
          desc: { color: '#aaa' }
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: sortedData.map((d, idx) => ({
            value: d.jumlah,
            itemStyle: { color: colors[idx] || '#ccc', borderRadius: [0, 6, 6, 0] },  // fallback color
            label: { show: true, position: 'right', color: colors[idx] || '#ccc', fontWeight: 'bold' }
          })),
        // itemStyle: { color: '#00bcd4', borderRadius: [0, 6, 6, 0] },
        // label: { show: true, position: 'right', color: '#fff', fontWeight: 'bold' }
      }
    ]
  }
}
</script>

<style scoped>
.icd-table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.rounded-borders {
  border-radius: 16px;
}
.rounded-borders-bottom {
  border-bottom-left-radius: 32px; border-bottom-right-radius: 32px;
}
</style>
