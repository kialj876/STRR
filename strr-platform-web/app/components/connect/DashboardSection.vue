<script setup lang="ts">
defineProps<{ title: string }>()
</script>
<template>
  <div class="space-y-2">
    <slot name="header">
      <ConnectTypographyH2 :text="title" />
    </slot>
    <div class="rounded bg-white">
      <slot name="default" />
    </div>
  </div>
</template>
