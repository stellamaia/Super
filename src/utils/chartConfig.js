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

Chart.defaults.font.family = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
Chart.defaults.font.size = 12
Chart.defaults.color = '#11151B'
Chart.defaults.plugins.legend.display = false
Chart.defaults.plugins.tooltip.cornerRadius = 12
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(17,21,27,0.92)'
Chart.defaults.plugins.tooltip.titleColor = '#FFFFFF'
Chart.defaults.plugins.tooltip.bodyColor = '#FFFFFF'
Chart.defaults.plugins.tooltip.padding = 12

const gridColor = '#E6E3DC'
const tickColor = '#86898B'

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
        color: tickColor,
        maxRotation: 0,
        font: {
          size: 10,
        },
      },
    },
    y: {
      grid: {
        color: gridColor,
        drawBorder: false,
      },
      min: 0,         
      max: 200000,
      ticks: {
        color: tickColor,
        stepSize: 50000,
        callback: (value) => {
          if (value === 0) {
            return ' 0';
          }
          return ` ${value / 1000}k`;
        },
        maxTicksLimit: 5,
      },
    },
  },
  plugins: {
  },
};

export const createSparklineOptions = (strokeColor = '#0641FC') => ({
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
      borderWidth: 2,
      tension: 0.5,
    },
    point: {
      radius: 0,
    },
  },
})

export const createConversionChartOptions = () => ({
  cutout: '75%',
  rotation: -90,
  circumference: 360,
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
    duration: 800,
  },
})

export { Chart }

