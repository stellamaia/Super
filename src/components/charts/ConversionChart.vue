<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import '../../utils/chartConfig.js'
import { createConversionChartOptions } from '../../utils/chartConfig.js'
import { COLORS, COLORS_WITH_ALPHA } from '../../constants/colors.js'

const DEFAULT_SIZE = 112
const DEFAULT_BORDER_RADIUS = 56
const MAX_PERCENTAGE = 100

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
    default: COLORS.PRIMARY,
  },
  size: {
    type: Number,
    default: DEFAULT_SIZE,
  },
})

const chartData = computed(() => ({
  labels: [props.label, 'Meta'],
  datasets: [
    {
      data: [props.value, MAX_PERCENTAGE - props.value],
      backgroundColor: [props.color, COLORS_WITH_ALPHA.ARC_BG],
      hoverBackgroundColor: [props.color, COLORS_WITH_ALPHA.ARC_BG],
      borderRadius: [props.size ? props.size / 2 : DEFAULT_BORDER_RADIUS, 0],
    },
  ],
}))

const options = createConversionChartOptions()
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <div class="relative" :style="{ height: `${size}px`, width: `${size}px` }">
      <Doughnut :data="chartData" :options="options" />
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-base font-semibold text-neutral-midnight">{{ value }}%</span>
      </div>
    </div>
    <p class="mt-3 text-sm font-medium text-neutral-midnight">{{ label }}</p>
  </div>
</template>
