import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { COLORS, COLORS_WITH_ALPHA } from '../constants/colors.js'

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
)

const FONT_FAMILY = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const FONT_SIZE_DEFAULT = 12
const FONT_SIZE_SMALL = 10
const TOOLTIP_CORNER_RADIUS = 12
const TOOLTIP_PADDING = 12

Chart.defaults.font.family = FONT_FAMILY
Chart.defaults.font.size = FONT_SIZE_DEFAULT
Chart.defaults.color = COLORS.TEXT_PRIMARY
Chart.defaults.plugins.legend.display = false
Chart.defaults.plugins.tooltip.cornerRadius = TOOLTIP_CORNER_RADIUS
Chart.defaults.plugins.tooltip.backgroundColor = COLORS_WITH_ALPHA.OVERLAY
Chart.defaults.plugins.tooltip.titleColor = COLORS.TEXT_WHITE
Chart.defaults.plugins.tooltip.bodyColor = COLORS.TEXT_WHITE
Chart.defaults.plugins.tooltip.padding = TOOLTIP_PADDING

const Y_AXIS_MIN = 0
const Y_AXIS_MAX = 200000
const Y_AXIS_STEP = 50000
const MAX_TICKS_LIMIT = 5
const VALUE_DIVIDER = 1000

export const revenueChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: COLORS.NEUTRAL_SLATE,
        maxRotation: 0,
        font: {
          size: FONT_SIZE_SMALL,
        },
      },
    },
    y: {
      grid: {
        color: COLORS.GRID_COLOR,
        drawBorder: false,
      },
      min: Y_AXIS_MIN,
      max: Y_AXIS_MAX,
      ticks: {
        color: COLORS.NEUTRAL_SLATE,
        stepSize: Y_AXIS_STEP,
        callback: (value) => {
          if (value === 0) {
            return ' 0'
          }
          return ` ${value / VALUE_DIVIDER}k`
        },
        maxTicksLimit: MAX_TICKS_LIMIT,
      },
    },
  },
}

const SPARKLINE_BORDER_WIDTH = 2
const SPARKLINE_TENSION = 0.5
const DOUGHNUT_CUTOUT = '75%'
const DOUGHNUT_ROTATION = -90
const DOUGHNUT_CIRCUMFERENCE = 360
const ANIMATION_DURATION = 800

export const createSparklineOptions = (strokeColor = COLORS.PRIMARY) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  plugins: {
    tooltip: { enabled: false },
  },
  elements: {
    line: {
      borderColor: strokeColor,
      borderWidth: SPARKLINE_BORDER_WIDTH,
      tension: SPARKLINE_TENSION,
    },
    point: {
      radius: 0,
    },
  },
})

export const createConversionChartOptions = () => ({
  cutout: DOUGHNUT_CUTOUT,
  rotation: DOUGHNUT_ROTATION,
  circumference: DOUGHNUT_CIRCUMFERENCE,
  plugins: {
    tooltip: { enabled: false },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  hover: { mode: null },
  animation: {
    duration: ANIMATION_DURATION,
  },
})

export { Chart }

