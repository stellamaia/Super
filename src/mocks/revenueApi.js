const DAYS_IN_MONTH = 31
const API_DELAY_MS = 400

const BASE_LABELS = Array.from({ length: DAYS_IN_MONTH }, (_, index) => String(index + 1))

const BASE_RECEIVED = [
  18000, 32000, 14000, 36000, 62000, 78000, 98000, 65000, 52000, 40000,
  48000, 18000, 54000, 60000, 118000, 132000, 104000, 76000, 64000, 52000,
  43000, 58000, 62000, 78000, 91000, 46000, 72000, 150000, 28000, 16000, 52000,
]

const BASE_FORECAST = [
  22000, 34000, 20000, 38000, 70000, 84000, 96000, 72000, 58000, 46000,
  52000, 26000, 56000, 62000, 110000, 124000, 99000, 82000, 70000, 60000,
  52000, 60000, 66000, 82000, 96000, 52000, 78000, 138000, 36000, 22000, 56000,
]

const simulateDelay = (ms = API_DELAY_MS) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const fetchRevenueData = async () => {
  await simulateDelay()

  return {
    labels: BASE_LABELS,
    received: BASE_RECEIVED,
    forecast: BASE_FORECAST,
  }
}


