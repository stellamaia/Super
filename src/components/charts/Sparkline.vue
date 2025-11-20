<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import '../../utils/chartConfig.js'
import { createSparklineOptions } from '../../utils/chartConfig.js'

const props = defineProps({
  points: {
    type: Array,
    default: () => [],
  },
  strokeColor: {
    type: String,
    default: '#0641FC',
  },
})

const data = computed(() => ({
  labels: props.points.map((_, index) => index + 1),
  datasets: [
    {
      data: props.points,
      borderColor: props.strokeColor,
      backgroundColor: 'transparent',
      fill: false,
    },
  ],
}))

const options = computed(() => createSparklineOptions(props.strokeColor))
</script>

<template>
  <div class="h-12 w-full">
    <Line :data="data" :options="options" />
  </div>
</template>

