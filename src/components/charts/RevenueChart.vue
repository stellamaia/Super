<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import '../../utils/chartConfig.js'
import { revenueChartOptions } from '../../utils/chartConfig.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps({
  labels: {
    type: Array,
    default: () => [],
  },
  received: {
    type: Array,
    default: () => [],
  },
  forecast: {
    type: Array,
    default: () => [],
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const GREEN_START_VALUE = 45000

const getGradient = (context) => {
  const chart = context.chart;
  const { ctx, chartArea } = chart;
  const bar = context.parsed;
  
  if (!chartArea) {
    return '#0641FC';
  }

  const greenColor = '#2FCD66';
  const blueColor = '#0641FC';

  const yBottom = chart.scales.y.getPixelForValue(0);
  const yTopBar = chart.scales.y.getPixelForValue(bar.y);
  const gradient = ctx.createLinearGradient(0, yTopBar, 0, yBottom);
  
  gradient.addColorStop(0, greenColor); 
  gradient.addColorStop(1, blueColor); 

  return gradient;
};

const barTrackBackground = {
  id: 'barTrackBackground',
  beforeDatasetsDraw(chart) {
    // Não desenha o fundo se for mobile
    if (chart.options.isMobileChart) {
      return
    }

    const { ctx, scales } = chart

    const y = scales.y
    if (!y || !chart.chartArea) {
      return
    }
    const meta = chart.getDatasetMeta(0)

    const chartTop = y.top
    const chartBase = y.bottom
    const trackHeight = chartBase - chartTop

    meta.data.forEach((dataPoint, index) => {
      const { x: barX, width: barWidth, options } = dataPoint
      const trackWidth = chart.data.datasets[0].barThickness || barWidth
      const radius = options.borderRadius || 0

      ctx.save()
      ctx.fillStyle = '#F5F5F5'

      const rectX = barX - trackWidth / 2

      ctx.beginPath()

      if (ctx.roundRect) {
        ctx.roundRect(rectX, chartTop, trackWidth, trackHeight, radius)
      } else {
        ctx.fillRect(rectX, chartTop, trackWidth, trackHeight)
      }

      ctx.fill()
      ctx.restore()
    })
  },
}

ChartJS.register(barTrackBackground)

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Faturamento recebido',
      data: props.received,
      backgroundColor: (context) => getGradient(context),
      borderRadius: 10,
      barThickness: props.isMobile ? 6 : 8, // 3px no mobile, 8px no desktop
      borderSkipped: false,
    }
  ],
}))
const chartOptions = computed(() => ({
  ...revenueChartOptions,
  isMobileChart: props.isMobile, // Flag para o plugin saber se é mobile
  scales: {
    ...revenueChartOptions.scales,
    x: {
      ...revenueChartOptions.scales?.x,
      grid: { display: false },
      barPercentage: 0.8,
      categoryPercentage: 0.9,
      ticks: {
        ...revenueChartOptions.scales?.x?.ticks,
        display: !props.isMobile, // Oculta labels no mobile
      },
    },
    y: {
      ...revenueChartOptions.scales?.y,
      min: 0,
      ticks: {
        ...revenueChartOptions.scales?.y?.ticks,
        display: !props.isMobile, // Oculta labels no mobile
      },
      grid: {
        ...revenueChartOptions.scales?.y?.grid,
        display: !props.isMobile, // Oculta grid no mobile
      },
    },
  }
}));
</script>

<template>
  <div class="h-64 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>