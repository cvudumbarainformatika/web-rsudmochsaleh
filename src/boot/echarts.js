// src/boot/echarts.js
import { boot } from 'quasar/wrappers'
import { defineAsyncComponent } from 'vue'

// Import core ECharts and modules you need
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  // BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

import ECharts from 'vue-echarts'

// Register the required components
echarts.use([
  CanvasRenderer,
  BarChart,LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
])

export default boot(({ app }) => {
  console.log('✅ boot echarts loaded')
  app.component('v-chart', defineAsyncComponent(() => Promise.resolve(ECharts)))
})
