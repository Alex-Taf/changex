<script setup lang="ts">
const props = defineProps<{
  stroke: string
}>()
</script>

<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.125 10L16.875 10" :stroke="props.stroke" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M11.25 15.625L16.875 10L11.25 4.375"
      :stroke="props.stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
