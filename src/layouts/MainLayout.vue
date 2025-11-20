<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import Sidebar from '../components/layout/Sidebar.vue'
import HeaderBar from '../components/layout/Header.vue'
import MobileBottomNav from '../components/layout/MobileBottomNav.vue'

const SIDEBAR_WIDTH = 288
const isDesktop = ref(false)
const isSidebarOpen = ref(false)

const syncLayout = () => {
  if (typeof window === 'undefined') return
  const desktop = window.innerWidth >= 1024
  if (desktop !== isDesktop.value) {
    isDesktop.value = desktop
    isSidebarOpen.value = desktop
  }
}

const toggleSidebar = () => {
  if (isDesktop.value) return
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  if (isDesktop.value) return
  isSidebarOpen.value = false
}

onMounted(() => {
  syncLayout()
  window.addEventListener('resize', syncLayout)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', syncLayout)
})

const showOverlay = computed(() => !isDesktop.value && isSidebarOpen.value)

const mainContentStyle = computed(() => {
  if (!isDesktop.value) {
    return {}
  }

  return {
    marginLeft: `${SIDEBAR_WIDTH}px`,
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
  }
})
</script>

<template>
  <div class="min-h-screen bg-[#edeff5] text-neutral-midnight">
    <Sidebar
      :open="isSidebarOpen"
      :is-desktop="isDesktop"
      @close="closeSidebar"
    />
    <div
      class="flex min-h-screen flex-col transition-all duration-300 ease-out"
      :style="mainContentStyle"
    >
      <HeaderBar @toggle-sidebar="toggleSidebar" />

      <main
      class="mx-auto min-h-screen w-full max-w-6xl pb-20  transition-all duration-300 ease-out px-5 sm:px-10 md:px-10 lg:px-10 sm:pt-10 lg:pt-28"
      >
        <slot />
      </main>

      <button
        class="fixed bottom-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0641FC] text-2xl font-semibold text-white shadow-lg shadow-brand-primary/40 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-primary/30 sm:block hidden"
        type="button"
      >
        ?
      </button>
    </div>

    <MobileBottomNav @toggle-sidebar="toggleSidebar" />

    <transition name="fade">
      <div
        v-if="showOverlay"
        class="fixed inset-0 z-30 bg-neutral-midnight/60 backdrop-blur-sm lg:hidden"
        @click="closeSidebar"
      ></div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

