<script setup lang="ts">
import Avatar from '../../user/Avatar/Avatar.vue'
</script>

<template>
    <header class="tw-flex tw-justify-between tw-w-full tw-mb-6">
        <span class="tw-text-2xl">Финансы</span>
        <section class="tw-flex tw-items-center">
            <div class="tw-flex tw-items-center tw-gap-x-4">
                <div class="tw-flex tw-w-fit tw-h-fit tw-bg-[#04b6f50d] tw-rounded-lg">
                    <div class="tw-px-3">
                        <span class="tw-text-xs tw-text-gray-500">Курс Garantex</span><br>
                        <span class="tw-text-sm">USDT/RUB: 93.40 RUB</span>
                    </div>
                    <div class="tw-self-center tw-h-[29px] tw-border-0 tw-border-r-2 tw-border-solid tw-border-r-gray-300"></div>
                    <div class="tw-px-3">
                        <span class="tw-text-xs tw-text-gray-500">Курс Обмена</span><br>
                        <span class="tw-text-sm">USDT/RUB: 94.50 RUB</span>
                    </div>
                </div>
                <div class="tw-flex tw-gap-x-2">
                    <div class="tw-flex tw-flex-col">
                        <span class="tw-text-[15px]">89876543210</span>
                        <span class="tw-self-end tw-text-[#04B6F5] tw-text-[10px] tw-cursor-pointer tw-select-none">Выйти</span>
                    </div>
                    <div><Avatar /></div>
                </div>
            </div>
        </section>
    </header>
</template>
