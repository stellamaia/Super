<script setup>
defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="flex items-center gap-3">
    <img src="/src/assets/logo.png" alt="Super Logo" class="h-6 w-6">
    <div v-if="!compact" class="leading-tight">
      <p class="font-semibold tracking-tight text-neutral-midnight text-[28px] pb-2">
        super
      </p>
    </div>
  </div>
</template>
