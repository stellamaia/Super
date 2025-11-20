<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import '../../utils/chartConfig.js'
import { createConversionChartOptions } from '../../utils/chartConfig.js'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    default: '#0641FC',
  },
  size: {
    type: Number,
    default: 112,
  },
})

const chartData = computed(() => ({
  labels: [props.label, 'Meta'],
  datasets: [
    {
      data: [props.value, 100 - props.value],
      backgroundColor: [props.color, 'rgba(8,20,40,0.08)'],
      hoverBackgroundColor: [props.color, 'rgba(8,20,40,0.08)'],
      borderRadius: [props.size ? props.size / 2 : 56, 0],
    },
  ],
}))

const options = createConversionChartOptions()
</script>

<template>
  <div class="flex flex-col items-center text-center">
   
      <div
        class="relative"
        :style="{ height: `${size}px`, width: `${size}px` }"
      >
        <Doughnut :data="chartData" :options="options" />
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-base font-semibold text-neutral-midnight">{{ value }}%</span>
  
      </div>
    </div>
    <p class="mt-3 text-sm font-medium text-neutral-midnight">{{ label }}</p>
  </div>
</template>

