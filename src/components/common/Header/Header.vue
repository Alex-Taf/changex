<script setup lang="ts">
import RenderOn from '@/components/utils/RenderOn.vue';
import Rate from '@/components/info/Rate.vue'
import Avatar from '../../user/Avatar/Avatar.vue'

const props = defineProps<{
    title: string
}>()
</script>

<template>
    <header class="tw-flex tw-justify-between tw-w-full tw-mb-6">
        <span class="tw-text-2xl">{{ props.title }}</span>
        <RenderOn :px="1280">
            <section class="tw-flex tw-items-center">
                <div class="tw-flex tw-items-center tw-gap-x-4">
                    <Rate />
                    <div class="tw-flex tw-gap-x-2">
                        <div class="tw-flex tw-flex-col">
                            <span class="tw-text-[15px]">89876543210</span>
                            <span class="tw-self-end tw-text-[#04B6F5] tw-text-[10px] tw-cursor-pointer tw-select-none">Выйти</span>
                        </div>
                        <div><Avatar /></div>
                    </div>
                </div>
            </section>
        </RenderOn>
    </header>
</template>
