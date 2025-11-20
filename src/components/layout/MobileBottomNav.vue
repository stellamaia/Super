<script setup>
import { Icon } from '@iconify/vue'

const emit = defineEmits(['toggleSidebar'])

const navItems = [
  {
    id: 'simule',
    label: 'Simule',
    icon: 'solar:calculator-minimalistic-linear',
  },
  {
    id: 'cobrancas',
    label: 'Cobranças',
    icon: 'solar:chat-round-money-linear',
  },
  {
    id: 'add',
    label: '',
    icon: 'solar:add-circle-bold',
    isCenter: true,
  },
  {
    id: 'carteira',
    label: 'Carteira',
    icon: 'solar:wallet-money-linear',
  },
  {
    id: 'menu',
    label: 'Menu',
    icon: 'solar:widget-2-linear',
  },
]

const handleClick = (item) => {
  if (item.id === 'menu') {
    emit('toggleSidebar')
  }
  // Adicione outras ações conforme necessário
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-cloud sm:hidden">
    <div class="flex items-center justify-around px-4 py-2">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="handleClick(item)"
        :class="[
          'flex flex-col items-center justify-center transition-colors',
          item.isCenter
            ? 'relative -mt-14'
            : 'flex-1 py-2'
        ]"
        type="button"
      >
        <div
          :class="[
            'flex items-center justify-center',
            item.isCenter
              ? 'h-16 w-16 rounded-full bg-[#0641FC] shadow-lg'
              : 'h-10 w-10'
          ]"
        >
          <Icon
            :icon="item.icon"
            :class="[
              item.isCenter
                ? 'h-8 w-8 text-white'
                : 'h-6 w-6 text-[#2A2E33]'
            ]"
          />
        </div>
        <span
          v-if="!item.isCenter"
          class="mt-1 text-xs text-[#86898B]"
        >
          {{ item.label }}
        </span>
        <span
          v-else
          class="absolute -bottom-5 h-2 w-2 rounded-full bg-[#0641FC]"
        ></span>
      </button>
    </div>
  </nav>
</template>

