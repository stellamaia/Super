<script setup>
import { Icon } from "@iconify/vue";
import SuperLogo from "../brand/SuperLogo.vue";
import CompanySelector from "../common/CompanySelector.vue";

defineEmits(["toggleSidebar"]);

const quickActions = [
  { icon: "solar:calculator-minimalistic-linear", label: "Widgets" },
  { icon: "solar:settings-linear", label: "Configurações" },
  { icon: "solar:bell-bing-linear", label: "Alertas" },
];
</script>

<template>
  <header
    class="top-0 left-0 right-0 z-20 lg:z-40 lg:fixed sm:bg-white sm:border-b sm:border-neutral-cloud"
  >
    <div
      class="hidden sm:flex mx-auto w-full max-w-[1440px] flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-4"
    >
      <!-- Primeira linha (sm) / Lado esquerdo (lg): Logo e Super central de gestão -->
      <div class="flex items-center gap-8">
        <SuperLogo />
        <div class="flex items-center gap-2 lg:pl-[9rem]">
          <span class="text-sm font-medium text-neutral-midnight whitespace-nowrap text-[22px]">Super central de gestão</span>
          <img
            src="/src/assets/super-gestao.png"
            alt="Super Logo"
            class="h-7 w-5"
          />
        </div>
      </div>

      <!-- Segunda linha (sm) / Lado direito (lg): Ações e usuário -->
      <div class="flex items-center justify-end gap-3">
        <div class="flex items-center gap-2">
          <button
            v-for="action in quickActions"
            :key="action.icon"
            class="relative inline-flex h-11 w-11 items-center justify-center text-neutral-midnight transition hover:text-brand-primary"
            type="button"
          >
            <Icon :icon="action.icon" class="h-5 w-5 text-[#0f4159]" />
            <span
              v-if="action.dot"
              class="absolute right-2 top-2 inline-flex h-2 w-2 rounded-full bg-accent-crimson"
            ></span>
            <span class="sr-only">{{ action.label }}</span>
          </button>
        </div>
        <CompanySelector variant="desktop" />
      </div>
    </div>
    <div class="bg-[#0641FC] pb-2 pt-4 text-white lg:hidden md:hidden sm:hidden rounded-b-[15px]">

        <!-- Linha 1: CompanySelector e Sino -->
        <div class="flex items-center justify-between px-6">
          <CompanySelector variant="mobile" />
          <button type="button">
            <Icon icon="solar:bell-bing-linear" class="h-5 w-5 text-white" />
          </button>
        </div>

        <!-- Linha 2: Faturamento -->
        <div class="mt-4 px-6" >
          <p class="text-[25px] font-semibold py-2">Faturamento</p>
        </div>

        <!-- Linha 3: Valor e Ícone de Olho -->
        <div class="flex items-center justify-between pb-2 px-6">
          <span class="flex items-center gap-1">
            <p class="text-sm py-2 pr-2">R$</p>
            <p class="text-3xl font-semibold">1.249.651,14</p>
          </span>
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-[#3364FF]"
          >
            <Icon icon="solar:eye-linear" class="h-6 w-6 text-white" />
          </button>
        </div>

        <!-- Linha 4: Divisor -->
        <hr class="border-0 border-t border-[#1E54FF] mt-2" />

        <!-- Linha 5: Ir para a carteira e Arrow -->
        <button
          class=" px-6 mt-3 flex items-center justify-between gap-2 rounded-full py-2 text-xs text-white w-full"
        >
          <span>Ir para a carteira</span>
          <Icon icon="solar:alt-arrow-right-linear" class="h-4 w-4 text-white" />
        </button>
      </div>
    <!-- Botão Nova cobrança - apenas mobile -->
    <div class="px-4 sm:hidden">
      <button
        class="mt-5 w-full rounded-full px-6 py-4 text-base font-semibold text-white flex items-center justify-between"
        style="
          background-color: #2a2e33;
          box-shadow: 0 -2px 0 2px #852df691, 0 2px 0 2px #0641fc59,
            inset 0 4px 15px 0 rgba(133, 45, 246, 0.4),
            inset 0 -19px 40px 0 rgba(6, 65, 252, 0.25);
        "
      >
        Nova cobrança
        <Icon icon="solar:add-circle-bold" class="h-6 w-6 text-[#D1DCFF]" />
      </button>
    </div>
  </header>
</template>
