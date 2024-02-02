<script setup lang="ts">
import { ref } from 'vue';
import FinancesBalanceIcon from '../../icons/FinancesBalanceIcon.vue'
import FinancesDialog from '../FinancesDialog/FinancesDialog.vue'
import RenderOn from '@/components/utils/RenderOn.vue'

const dialogOpen = ref(false)

function closeDialog(close: boolean) {
    dialogOpen.value = close
}
</script>

<template>
    <v-card class="tw-w-full tw-h-[132px] !tw-rounded-2xl !tw-p-[24px] tw-mb-6">
        <section class="tw-flex tw-justify-between tw-items-center">
            <section class="tw-flex tw-items-center tw-gap-x-4">
                <RenderOn :px="1280"><FinancesBalanceIcon /></RenderOn>
                <div class="tw-flex tw-flex-col tw-leading-7">
                    <span class="tw-text-[13px] tw-text-[#AEB7C1]">Баланс</span>
                    <span>
                        <span class="tw-text-[30px] tw-text-[#2B3A4C] tw-font-bold">345 000.00</span> <span class="tw-text-[16px] tw-text-[#AEB7C1]">USDT</span>
                    </span>
                    <span class="tw-text-[13px] tw-text-[#677483]">~65 238 894 RUB</span>
                </div>
            </section>
            <v-btn class="!tw-rounded-xl !tw-min-w-[52px] min-lg:!tw-w-[172px] min-lg:!tw-h-[52px]
                            sm:!tw-w-[52px] md:!tw-w-[52px] sm:!tw-h-[52px] md:!tw-h-[52px]
                            hover:!tw-shadow-[0px_10px_18px_2px_rgba(4,182,245,0.2)]"
                    color="#04B6F5"
                    variant="elevated"
                    @click="dialogOpen = true"
            >
                <template v-slot:prepend>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.125 10H16.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 3.125V16.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </template>
                <span class="sm:tw-hidden md:tw-hidden min-lg:tw-inline tw-text-white tw-text-[16px] tw-normal-case tw-tracking-normal tw-leading-4">Пополнить</span>
            </v-btn>
        </section>
    </v-card>
    <FinancesDialog :open="dialogOpen" @close="closeDialog"/>
</template>
