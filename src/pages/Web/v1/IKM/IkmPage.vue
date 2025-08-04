<template>
  <q-card class="bg-grey-10 text-white q-pa-md shadow-10">
    <q-card-section>
      <div class="text-h6 text-uppercase text-weight-bold text-primary">
        Grafik IKM 5 Tahun Terakhir
      </div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <app-client-only>
        <v-chart class="w-full h-200" :option="chartOptions" autoresize />
      </app-client-only>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'


// const VChartComponent = VChart

const dataIKM = [
  { tahun: '2021', jumlah: 84.27 },
  { tahun: '2022', jumlah: 80.57 },
  { tahun: '2023', jumlah: 83.75 },
  { tahun: '2024', jumlah: 90.35 },
  { tahun: '2025', jumlah: 88.93 }
]

// const chartOptions = ref({
//   tooltip: {
//     trigger: 'axis',
//     backgroundColor: '#2d2d2d',
//     borderColor: '#00eaff',
//     textStyle: { color: '#fff' }
//   },
//   grid: {
//     left: '4%',
//     right: '4%',
//     bottom: '8%',
//     top: '10%',
//     containLabel: true
//   },
//   xAxis: {
//     type: 'category',
//     data: dataIKM.map(d => d.tahun),
//     axisLine: { lineStyle: { color: '#ccc' } },
//     axisLabel: { color: '#eee' }
//   },
//   yAxis: {
//     type: 'value',
//     min: 70,
//     max: 100,
//     axisLine: { lineStyle: { color: '#ccc' } },
//     axisLabel: { color: '#eee' },
//     splitLine: { lineStyle: { color: '#444' } }
//   },
//   series: [
//     {
//       name: 'IKM',
//       type: 'bar',
//       data: dataIKM.map(d => d.jumlah),
//       barWidth: '50%',
//       itemStyle: {
//         color: function (params) {
//           const colors = ['#9e9e9e', '#7c4dff', '#00bcd4', '#ffc107', '#00e676']
//           return colors[params.dataIndex] || '#fff'
//         },
//         borderRadius: [6, 6, 0, 0]
//       },
//       label: {
//         show: true,
//         position: 'top',
//         color: '#fff',
//         fontWeight: 'bold',
//         formatter: '{c}'
//       }
//     }
//   ]
// })

const chartOptions = ref({

  title: {
    text: 'Grafik IKM 5 Tahun Terakhir',
    left: 'center',
    top: 10,
    textStyle: {
      color: '#00eaff',
      fontSize: 18,
      fontWeight: 'bold'
    }
  },

  tooltip: {
    trigger: 'axis',
    backgroundColor: '#2d2d2d',
    borderColor: '#00eaff',
    textStyle: { color: '#fff' }
  },
  grid: {
    left: '4%',
    right: '4%',
    bottom: '8%',
    top: '10%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: dataIKM.map(d => d.tahun),
    axisLine: { lineStyle: { color: '#ccc' } },
    axisLabel: { color: '#eee' }
  },
  yAxis: {
    type: 'value',
    min: 70,
    max: 100,
    axisLine: { lineStyle: { color: '#ccc' } },
    axisLabel: { color: '#eee' },
    splitLine: { lineStyle: { color: '#444' } }
  },
  series: [
    {
      name: 'IKM (Bar)',
      type: 'bar',
      data: dataIKM.map(d => d.jumlah),
      barWidth: '50%',
      itemStyle: {
        color: function (params) {
          const colors = ['#9e9e9e', '#7c4dff', '#00bcd4', '#ffc107', '#00e676']
          return colors[params.dataIndex] || '#fff'
        },
        borderRadius: [6, 6, 0, 0]
      },
      // label: {
      //   show: true,
      //   position: 'top',
      //   color: '#fff',
      //   fontWeight: 'bold',
      //   formatter: '{c}'
      // }
    },
    {
      name: 'IKM (Line)',
      type: 'line',
      data: dataIKM.map(d => d.jumlah),
      smooth: true,
      symbol: 'circle',
      symbolSize: 12,
      lineStyle: {
        color: '#00eaff',
        width: 3
      },
      itemStyle: {
        color: '#00eaff',
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'top',
        color: '#00eaff',
        fontWeight: 'bold',
        formatter: '{c}'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#00eaff44' },
            { offset: 1, color: '#00eaff00' }
          ]
        }
      }
    }
  ]
})

</script>

<style scoped>
.v-chart {
  width: 100%;
  height: 800px;
}
</style>
