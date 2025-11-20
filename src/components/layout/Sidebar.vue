<script setup>
import { Icon } from '@iconify/vue'
import SuperLogo from '../brand/SuperLogo.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  isDesktop: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])

const primaryMenu = [
  { label: 'Dashboard', icon: 'solar:home-2-linear',  active: true },
  { label: 'Clientes', icon: 'solar:user-heart-linear' },
  { label: 'Cobranças', icon: 'solar:chat-round-money-linear' },
  { label: 'Carteira', icon: 'solar:wallet-money-linear' },
  { label: 'Vendedores', icon: 'solar:fire-square-linear' },
  { label: 'Antecipações', icon: 'solar:cash-out-linear', hasDropdown: true },
  { label: 'Gestão', icon: 'solar:case-round-minimalistic-linear', hasDropdown: true },
  { label: 'Integrações', icon: 'solar:chat-square-code-linear' },
]

const secondaryMenu = [
  { label: 'Configurações', icon: 'solar:settings-linear' },
  { label: 'Perfil', icon: 'solar:user-circle-linear' },
]
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 w-72 min-w-72 max-w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col"
  :class="[
      props.isDesktop
        ? 'translate-x-0'
        : props.open
          ? 'translate-x-0'
          : '-translate-x-full',
    ]"
  >
    <!-- Logo e título - apenas mobile -->
    <div class="px-6 pt-6 pb-4 lg:hidden flex-shrink-0">
      <SuperLogo />
    </div>

    <!-- Espaço fixo do topo - apenas desktop -->
    <div class="h-20 flex-shrink-0 hidden lg:block"></div>

    <!-- Conteúdo com scroll -->
    <div class="flex flex-1 flex-col overflow-y-auto pb-6 sidebar-scroll">
      <nav class="space-y-4 px-6 py-4">
        <div>
          <p class="px-4 mt-4 text-xs uppercase tracking-widest text-neutral-slate">Menu</p>
          <ul class="mt-2 space-y-0.5">
            <li v-for="item in primaryMenu" :key="item.label">
              <button
                class="flex w-full items-center justify-between rounded-2xl px-4 py-1.5 text-[12px] font-medium transition hover:bg-neutral-porcelain"
                :class="item.active ? 'text-neutral-midnight' : 'text-neutral-midnight'"
                type="button"
              >
                <span class="flex items-center gap-3">
                  <span class="inline-flex h-9 w-9 items-center justify-center rounded-full"
                    :class="item.active ? 'bg-[#D6E0FF] text-brand-primary' : 'bg-neutral-porcelain text-neutral-midnight'"
                  >
                    <Icon :icon="item.icon" class="h-5 w-5"
                      :class="item.active ? 'text-brand-primary' : 'text-[#2A2E33]'"
                    />
                  </span>
                  <span :class="item.active ? 'text-[#2A2E33]' : ''">
                    {{ item.label }}
                  </span>
                </span>
                <Icon
                  v-if="item.hasDropdown"
                  icon="solar:alt-arrow-down-linear"
                  class="h-4 w-4 text-black"
                />
              </button>
            </li>
          </ul>
        </div>
        <div>
          <p class="px-4 text-xs uppercase tracking-widest text-neutral-slate">Geral</p>
          <ul class="mt-2 space-y-0.5">
            <li v-for="item in secondaryMenu" :key="item.label">
              <button
                class="flex w-full items-center gap-3 rounded-2xl px-4 py-1.5 text-[12px] font-medium text-neutral-midnight transition hover:bg-neutral-porcelain"
                type="button"
              >
                <span class="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-neutral-porcelain">
                  <Icon :icon="item.icon" class="h-5 w-5 text-[#2A2E33]"/>
                </span>
                {{ item.label }}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div class="mt-auto px-6">
        <div class="relative overflow-hidden rounded-2xl border border-white/10">
          <img src="/src/assets/super-image.png" alt="Cartões Super" class="h-full w-full object-cover" />
          <div class="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center px-4 pb-5 z-10">
            <p class="mt-4 font-medium leading-relaxed text-white z-10 text-[15px] text-center">
              Solicite agora o seu cartão físico e crie quantos cartões virtuais quiser.
            </p>
            <button class="mt-4 w-full rounded-2xl px-4 py-2 text-sm font-semibold text-white bg-[#0641FC] transition hover:bg-brand-indigo z-10">
              Super Cartão Pré-Pago
            </button>
          </div>
        </div>

       
      </div>
      <div class="mt-auto px-6">
      <button
          class="mt-6 flex w-full items-center justify-center gap-2 rounded-[30px] border border-[#D9D9D9] px-4 py-3 text-sm font-medium text-[#2A2E33] hover:text-neutral-midnight"
          type="button"
        >
          Deslogar da conta
          <img src="/src/assets/logout.png" alt="Logout" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* Scrollbar customizada que não ocupa espaço */
.sidebar-scroll {
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: transparent transparent; /* Firefox - thumb e track transparentes */
  overflow-y: overlay; /* Scrollbar overlay (não ocupa espaço) */
  overflow-x: hidden;
}

/* Fallback para navegadores que não suportam overlay */
@supports not (overflow-y: overlay) {
  .sidebar-scroll {
    overflow-y: auto;
  }
}

.sidebar-scroll::-webkit-scrollbar {
  width: 6px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 3px;
  transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out; /* Transição suave */
  opacity: 0;
}

/* Mostra a scrollbar no hover com transição suave */
.sidebar-scroll:hover {
  scrollbar-color: rgba(209, 213, 219, 0.8) transparent; /* Firefox */
}

.sidebar-scroll:hover::-webkit-scrollbar-thumb {
  background: rgba(209, 213, 219, 0.8);
  opacity: 1;
}

.sidebar-scroll:hover::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.9);
}

/* Garante que o conteúdo não se mova */
.sidebar-scroll::-webkit-scrollbar-track {
  margin: 0;
}
</style>

