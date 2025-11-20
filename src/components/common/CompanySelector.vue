<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  variant: {
    type: String,
    default: 'desktop',
    validator: (value) => ['desktop', 'mobile'].includes(value),
  },
})
</script>

<template>
  <button
    v-if="variant === 'desktop'"
    class="flex items-center gap-2 px-3 py-1.5"
    type="button"
  >
    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-semibold text-white">
      AP
    </div>
    <div class="text-sm text-left">
      <p class="text-neutral-midnight">Empresarial</p>
      <p class="font-medium text-neutral-slate">Astra Pagamentos</p>
    </div>
    <Icon icon="solar:alt-arrow-down-linear" class="h-4 w-4 text-[#2A2E33]" />
  </button>

  <button
    v-else
    class="flex items-center gap-2 rounded-full bg-white px-4 py-2"
    type="button"
  >
    <img src="/src/assets/icon.png" alt="Company Icon" class="h-8 w-8 rounded-full" />
    <div class="text-left">
      <p class="text-xs font-semibold text-[#11151B]">Empresarial</p>
      <p class="text-[10px] text-[#86898B]">Astra Pagamentos</p>
    </div>
    <Icon icon="solar:alt-arrow-down-linear" class="h-3 w-3 text-black" />
  </button>
</template>
