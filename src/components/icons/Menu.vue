<script setup lang="ts">
const props = defineProps<{
  stroke: string
}>()
</script>

<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.75 6.375H20.25"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M8.25 10.125H20.25"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M3.75 13.875H20.25"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M8.25 17.625H20.25"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
