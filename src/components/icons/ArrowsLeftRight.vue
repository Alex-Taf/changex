<script setup lang="ts">
const props = defineProps<{
  stroke: string
}>()
</script>

<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.75 11.25L16.25 13.75L13.75 16.25"
      :stroke="props.stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M3.75 13.75H16.25" :stroke="props.stroke" stroke-linecap="round" stroke-linejoin="round" />
    <path
      d="M6.25 8.75L3.75 6.25L6.25 3.75"
      :stroke="props.stroke"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M16.25 6.25H3.75" :stroke="props.stroke" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
