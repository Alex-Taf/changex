<script setup lang="ts">
const props = defineProps<{
  stroke: string
}>()
</script>

<template>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.7656 7.78906H17.5156V4.03906"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M5.14062 5.14038C5.77843 4.50165 6.53591 3.99492 7.36973 3.64918C8.20355 3.30345 9.09735 3.12549 10 3.12549C10.9027 3.12549 11.7965 3.30345 12.6303 3.64918C13.4641 3.99492 14.2216 4.50165 14.8594 5.14038L17.5156 7.78882"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M6.23438 12.2109H2.48438V15.9609"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M14.8594 14.8594C14.2216 15.4981 13.4641 16.0048 12.6303 16.3506C11.7965 16.6963 10.9027 16.8743 10 16.8743C9.09735 16.8743 8.20355 16.6963 7.36973 16.3506C6.53591 16.0048 5.77843 15.4981 5.14063 14.8594L2.48438 12.2109"
            :stroke="props.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
