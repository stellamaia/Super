<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import MainLayout from './layouts/MainLayout.vue'
import RevenueChart from './components/charts/RevenueChart.vue'
import ConversionChart from './components/charts/ConversionChart.vue'
import Sparkline from './components/charts/Sparkline.vue'
import { Icon } from '@iconify/vue'
import { fetchRevenueData } from './mocks/revenueApi'
import { SUMMARY_CARDS, STATUS_CARDS, CONVERSION_DATA, BRAND_BARS } from './constants/mockData'

const MOBILE_BREAKPOINT = 640
const MOBILE_CHART_ITEMS = 20

const summaryCards = SUMMARY_CARDS
const statusCards = STATUS_CARDS
const conversion = CONVERSION_DATA
const brandBars = BRAND_BARS

const revenueLabels = ref([])
const revenueReceived = ref([])
const revenueForecast = ref([])
const isRevenueLoading = ref(true)
const revenueError = ref(null)
const isMobile = ref(false)

const updateIsMobile = () => {
  if (typeof window === 'undefined') return
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
}

const loadRevenueData = async () => {
  try {
    const { labels, received, forecast } = await fetchRevenueData()
    revenueLabels.value = labels
    revenueReceived.value = received
    revenueForecast.value = forecast
  } catch (error) {
    console.error('Erro ao carregar os dados de faturamento', error)
    revenueError.value = 'Não foi possível carregar o gráfico no momento.'
  } finally {
    isRevenueLoading.value = false
  }
}

onMounted(() => {
  loadRevenueData()
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateIsMobile)
})
</script>

<template>
  <MainLayout>
    <section class="space-y-6">
      <!-- Botões de filtro e ações - visível apenas em sm+ (tablet e desktop) -->
      <div class="hidden sm:flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-3">
          <!-- Botão Nova cobrança -->
          <button
            class="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-indigo"
          >
            Nova cobrança
            <Icon icon="solar:add-circle-bold" class="h-5 w-5 text-[#D9D9D9]" />
          </button>

          <!-- Divisor vertical -->
          <div class="h-10 w-px bg-[#D9D9D9]"></div>

          <!-- Botão Período -->
          <button
            class="inline-flex items-center gap-2 rounded-full border border-neutral-cloud bg-white px-4 py-2.5 text-sm font-medium text-[#2A2E33] transition hover:bg-neutral-porcelain"
          >
            <Icon icon="solar:calendar-linear" class="h-5 w-5 text-[#0641FC]" />
            Período: Específico
            <Icon icon="solar:alt-arrow-down-linear" class="h-4 w-4 text-[#2A2E33]" />
          </button>

          <!-- Date Picker Container -->
          <div class="inline-flex items-center gap-3 rounded-full border border-neutral-cloud bg-white px-4 py-2.5">
            <!-- Botão Data Início -->
            <button
              class="inline-flex items-center gap-2 text-sm font-medium text-[#2A2E33] transition hover:opacity-70"
            >
              <Icon icon="solar:calendar-mark-linear" class="h-5 w-5 text-[#86898B]" />
              10-06-2020
              <Icon icon="solar:alt-arrow-down-linear" class="h-4 w-4 text-[#2A2E33]" />
            </button>

            <!-- Divisor vertical -->
            <div class="h-6 w-px bg-[#D9D9D9]"></div>

            <!-- Botão Data Fim -->
            <button
              class="inline-flex items-center gap-2 text-sm font-medium text-[#2A2E33] transition hover:opacity-70"
            >
              30-01-2025
              <Icon icon="solar:alt-arrow-down-linear" class="h-4 w-4 text-[#2A2E33]" />
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Botão Tipo de cobrança -->
          <button
            class="inline-flex items-center gap-2 rounded-full border border-neutral-cloud bg-white px-4 py-2.5 text-sm font-medium text-neutral-midnight transition hover:bg-neutral-porcelain"
          >
            <Icon icon="solar:card-transfer-linear" class="h-5 w-5 text-[#0641FC]" />
            Tipo de cobrança
            <Icon icon="solar:alt-arrow-down-linear" class="h-4 w-4 text-black" />
          </button>

          <!-- Botão Download -->
          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-cloud bg-white text-neutral-midnight transition hover:bg-neutral-porcelain"
          >
            <Icon icon="solar:download-minimalistic-linear" class="h-5 w-5 text-black" />
          </button>
        </div>
      </div>

      <!-- Card de Estatísticas do período - Separado no Mobile -->
      <header class="rounded-[12px] bg-white p-6 lg:p-8">
        <!-- Desktop/Tablet Header -->
        <div v-if="!isMobile" class="flex items-center">
          <p class=" font-semibold pr-2 text-black text-[25px]">
            Faturamento
          </p>
          <Icon icon="solar:eye-bold-duotone" class="h-6 w-6 text-[#86898B]" />
        </div>

        <!-- Mobile Header -->
        <div v-else class="flex items-center justify-between">
          <p class="text-black font-semibold text-[17px]">
            Estatísticas do período
          </p>
          <button
            type="button"
            class="flex h-12 w-12 items-center justify-center rounded-full border text-[#D9D9D9]"
          >
            <Icon icon="solar:filter-linear" class="h-5 w-5 text-[#2A2E33]" />
          </button>
        </div>

        <div
          class="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between"
        >
          <div>
            <!-- Layout Desktop -->
            <div v-if="!isMobile" class="mt-3 flex flex-wrap gap-4">
              <span class="text-[#86898B] pt-4">R$</span>
              <p class="text-4xl font-semibold text-brand-primary md:text-5xl">
                1.060.551,14
              </p>
              <span
                class="inline-flex flex-col rounded-full px-3 py-1 text-sm font-semibold text-[#34A853]"
              >
                <div class="inline-flex items-center gap-1">
                  <Icon icon="solar:arrow-up-linear" class="h-4 w-4" />
                  <p>123,9%</p>
                </div>
                <p class="text-xs text-neutral-slate text-[#86898B] mt-0.5">
                  Em crescimento
                </p>
              </span>
            </div>

            <!-- Layout Mobile -->
            <div v-else class="mt-3">
              <p class="text-3xl font-semibold text-[#2A2E33]">
                <span class="text-black mr-2">R$</span>760.102,06
              </p>
              <div class="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#34A853]">
                <Icon icon="solar:arrow-up-linear" class="h-4 w-4" />
                <p>123,9%</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Gráfico - desktop/tablet -->
        <div v-if="!isMobile" class="mt-8 p-4">
          <div class="h-72">
            <div
              v-if="isRevenueLoading"
              class="flex h-full items-center justify-center rounded-[12px] border border-dashed border-neutral-cloud text-sm text-neutral-slate"
            >
              Carregando gráfico de faturamento...
            </div>
            <div
              v-else-if="revenueError"
              class="flex h-full items-center justify-center rounded-[12px] border border-accent-crimson/40 bg-accent-crimson/5 p-4 text-center text-sm text-accent-crimson"
            >
              {{ revenueError }}
            </div>
            <RevenueChart
              v-else
              :labels="revenueLabels"
              :received="revenueReceived"
              :forecast="revenueForecast"
            />
          </div>
        </div>

        <!-- Cards de resumo - Desktop (dentro do card de Faturamento) -->
        <div v-if="!isMobile" class="mt-6 grid gap-1 sm:grid-cols-2 xl:grid-cols-5">
          <article
            v-for="card in summaryCards"
            :key="card.label"
            class="rounded-[12px] border border-neutral-cloud px-4 py-3 text-[11px]"
          >
            <div class="flex items-center justify-between gap-2 mb-2">
              <p class="text-xs font-medium text-neutral-slate text-[10px] flex-shrink-0">
                {{ card.label }}
              </p>
              <span
                v-if="card.badge"
                class="bg-white border border-[#D9D9D9] rounded-[10px] px-2 py-0.5 text-[9px] text-neutral-midnight flex-shrink-0"
              >
                {{ card.badge }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span
                class="relative h-3 w-3 inline-flex items-center justify-center flex-shrink-0"
              >
                <span
                  class="absolute h-3 w-3 rounded-full left-[2px] top-0"
                  :style="{ backgroundColor: card.secondaryDotColor }"
                ></span>
                <span
                  class="absolute h-2 w-2 rounded-full right-1 top-[2px]"
                  :style="{ backgroundColor: card.dotColor }"
                ></span>
              </span>
              <p class="text-lg font-semibold text-neutral-midnight">
                {{ card.value }}
              </p>
              <span class="text-sm font-semibold" :class="card.changeColor">{{
                card.change
              }}</span>
            </div>
          </article>
        </div>

        <!-- Gráfico - mobile (dentro do mesmo card) -->
        <div v-else class="mt-6">
          <div class="h-56 mb-4">
            <div
              v-if="isRevenueLoading"
              class="flex h-full items-center justify-center rounded-[12px] border border-dashed border-neutral-cloud text-sm text-neutral-slate"
            >
              Carregando gráfico de faturamento...
            </div>
            <div
              v-else-if="revenueError"
              class="flex h-full items-center justify-center rounded-[12px] border border-accent-crimson/40 bg-accent-crimson/5 p-4 text-center text-sm text-accent-crimson"
            >
              {{ revenueError }}
            </div>
            <RevenueChart
              v-else
              :labels="revenueLabels.slice(0, MOBILE_CHART_ITEMS)"
              :received="revenueReceived.slice(0, MOBILE_CHART_ITEMS)"
              :forecast="revenueForecast.slice(0, MOBILE_CHART_ITEMS)"
              :is-mobile="true"
            />
          </div>
           <!-- Data do período - abaixo do gráfico -->
          <p class="p-2 w-full mt-9 text-center text-sm text-[#86898B] bg-[#F5F5F5] rounded-[20px] ">
            De 15 de Dez. de 2024 à 07 de Fev. de 2025
          </p>
          
        </div>
      </header>

      <!-- Cards de resumo - Mobile com scroll horizontal -->
      <div v-if="isMobile" class="mt-6 overflow-x-auto scrollbar-hide -mx-5 px-5">
        <div class="flex gap-3 pb-2">
          <article
            v-for="card in summaryCards"
            :key="card.label"
            class="flex-shrink-0 w-[280px] rounded-[12px] bg-white px-5 py-4"
          >
            <div class="flex justify-between items-center mb-3">
              <p class="text-sm font-medium text-[#86898B]">
                {{ card.label }}
              </p>
              <span
                v-if="card.badge"
                class="bg-white border border-[#D9D9D9] rounded-[10px] px-2 py-0.5 text-[9px] text-neutral-midnight"
              >
                {{ card.badge }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <span
                class="relative h-3 w-3 inline-flex items-center justify-center"
              >
                <span
                  class="absolute h-3 w-3 rounded-full left-[2px] top-0"
                  :style="{ backgroundColor: card.secondaryDotColor }"
                ></span>
                <span
                  class="absolute h-2 w-2 rounded-full right-1 top-[2px]"
                  :style="{ backgroundColor: card.dotColor }"
                ></span>
              </span>
              <p class="text-2xl font-semibold text-[#2A2E33]">
                {{ card.value }}
              </p>
              <span class="text-sm font-semibold" :class="card.changeColor">{{
                card.change
              }}</span>
            </div>
          </article>
        </div>
      </div>

      <section
        class="rounded-[12px] lg:rounded-full bg-white flex flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-between lg:gap-2 lg:p-2"
      >
        <div class="flex items-start gap-4 p-6">
          <div class="relative">
            <span
              class="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6E3DC] text-black"
            >
              <Icon icon="solar:arrow-up-linear" class="h-5 w-5" />
            </span>
            <span
              class="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9D3A] text-xs font-semibold text-black border-2 border-[#FFE8D1]"
            >
              !
            </span>
          </div>
          <div class="!text-left">
            <p class="text-lg text-[#2A2E33]">
              Solicitação de transferência pendente
            </p>
            <p class="text-sm text-neutral-slate">
              A transação no valor de R$ 29.119,13 está aguardando a sua
              aprovação.
            </p>
          </div>
        </div>
        <div class="flex justify-center w-full lg:w-auto lg:block">
          <button
            class="mb-0 sm:mb-[25px] md:mb-[25px] lg:mb-[1px] lg:mr-6 inline-flex items-center gap-2 bg-brand-primary px-6 py-3 text-sm font-semibold text-[#F9F9F9] transition hover:bg-brand-indigo rounded-none w-full rounded-bl-[12px] rounded-br-[12px] sm:rounded-full sm:w-auto md:rounded-full md:w-auto"
          >
            Autorizar transferência
            <Icon
              icon="solar:wallet-money-bold"
              color="#D1DCFF"
              class="h-5 w-5 text-white hidden sm:inline md:inline lg:inline"
            />
            <span class="flex-1"></span>
            <Icon
              icon="solar:alt-arrow-right-linear"
              class="h-5 w-5 text-white inline sm:hidden md:hidden lg:hidden self-end ml-auto"
            />
          </button>
        </div>
      </section>

      <section
        :class="[
          'sm:p-0 md:mb-6 lg:mb-6',
          isMobile ? 'bg-white rounded-[12px] block mx-auto' : '',
        ]"
      >
        <div class="grid grid-cols-2 sm:gap-4 md:grid-cols-4 rounded-[12px]">
          <article
            v-for="card in statusCards"
            :key="card.label"
            :class="['flex h-full flex-col bg-white !rounded-[12px]']"
          >
            <div class="flex w-full items-start justify-between gap-3 p-4">
              <div class="flex-1">
                <div class="relative inline-block">
                  <p
                    class="text-[11px] sm:text-[13px] md:text-[13px] font-medium uppercase"
                    :style="isMobile ? { color: '#86898B' } : {}"
                  >
                    {{ card.label }}
                  </p>
                  <!-- Ícone de alerta apenas para Chargebacks e não mobile -->
                  <span
                    v-if="!isMobile && card.label === 'Chargebacks'"
                    class="absolute -top-1 -right-6 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9D3A] text-xs font-semibold text-black"
                  >
                    !
                  </span>
                </div>
                <p
                  class="mt-2 text-lg font-semibold text-neutral-midnight text-[17px] sm:text-[20px] md:text-[20px]"
                >
                  {{ card.value }}
                </p>
              </div>
              <div class="flex flex-col items-end pt-4">
                <span
                  class="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-neutral-cloud text-xs font-semibold"
                >
                  %
                </span>
              </div>
            </div>

            <span
              v-if="!isMobile"
              class="border-0 !p-0 !m-0 border-t border-[#EEEEEE] w-full"
            ></span>

            <div
              :class="[
                'flex flex-row justify-between items-center text-[11px] sm:text-xs',
                isMobile ? 'p-4 pt-0' : 'p-4',
              ]"
            >
              <span v-if="!isMobile">{{ card.meta }}</span>
              <span
                class="font-semibold"
                :class="isMobile ? card.deltaColor : 'text-neutral-midnight'"
              >
                {{ card.delta }}
              </span>
              <div v-if="isMobile" class="mt-auto h-10 w-7 sm:w-10">
                <Sparkline
                  :points="card.trend"
                  :stroke-color="card.trendColor"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        :class="[
          'gap-6',
          isMobile ? 'grid grid-cols-2' : 'grid lg:grid-cols-2',
        ]"
      >
        <article
          :class="[
            'flex flex-col rounded-[12px] bg-white col-span-2 lg:col-span-1',
            isMobile ? 'h-[450px] pt-6 px-6 pb-8' : 'h-[280px] pt-6 px-6 pb-4',
          ]"
        >
          <p
            class="text-lg"
            :class="
              isMobile
                ? 'text-black font-semibold text-[17px]'
                : 'text-[#2A2E33] text-lg'
            "
          >
            Conversão por modalidade
          </p>
          <div
            class="mt-6 flex-1 p-5 rounded-[12px] shadow-sm ring-1 ring-neutral-cloud overflow-hidden grid grid-cols-2 sm:flex sm:items-center sm:justify-center md:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:justify-center  gap-x-6 gap-y-4 lg:gap-4 xl:gap-10 content-center"
          >
            <div
              v-for="item in conversion"
              :key="item.label"
              class="flex flex-col items-center justify-center"
            >
              <ConversionChart
                :label="item.label"
                :value="item.value"
                :color="item.color"
                :size="isMobile ? 80 : 50"
              />
            </div>
          </div>
        </article>

        <article
  :class="[
            'flex flex-col rounded-[12px] bg-white col-span-2 lg:col-span-1',
            isMobile ? 'h-[400px] pt-6 px-6 pb-8 mb-20' : 'h-[280px] pt-6 px-6 pb-4',
          ]"
        >
          <div class="flex items-center gap-2">
            <p
              :class="
                isMobile
                  ? 'text-black font-semibold text-[17px]'
                  : 'text-[#2A2E33] text-lg'
              "
            >
              Bandeiras mais utilizadas
            </p>
            <Icon
              icon="solar:info-circle-linear"
              class="h-5 w-5 text-[#2A2E33]"
            />
          </div>
          <div class="mt-6 flex-1 flex flex-col">
            <div
              class="rounded-[12px] border border-neutral-cloud bg-white flex-1 flex flex-col justify-center"
              :class="isMobile ? 'px-4 py-4' : 'px-6 '"
            >
              <div class="h-full flex items-end justify-between gap-1">
                <div
                  v-for="brand in brandBars"
                  :key="brand.name"
                  class="flex flex-col items-center"
                  :class="isMobile ? 'gap-0' : 'gap-1'"
                >
                  <div class="relative flex h-32 w-2 items-end">
                    <div
                      class="absolute inset-0 rounded-full bg-[#F5F5F5]"
                    ></div>
                    <div
                      class="relative w-full rounded-full bg-[#0641FC]"
                      :style="{ height: `${brand.value}%` }"
                    ></div>
                  </div>
                  <img
                    :src="brand.logo"
                    :alt="brand.name"
                    class="h-6 w-10 mb-3 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </section>
  </MainLayout>
</template>

<style scoped>
/* Esconde a scrollbar mas mantém a funcionalidade de scroll */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>
