<script setup lang="ts">
import FinancesBalanceIcon from '../../icons/FinancesBalanceIcon.vue'
import FinancesDialog from '../FinancesDialog/FinancesDialog.vue'
import { ref } from 'vue';

const dialogOpen = ref(false)

function closeDialog(close: boolean) {
    dialogOpen.value = close
}
</script>

<template>
    <v-card class="tw-w-full tw-h-[142px] !tw-rounded-2xl !tw-py-[23px] !tw-px-[24px] tw-mb-6">
        <section class="tw-flex tw-justify-between tw-items-center">
            <section class="tw-flex tw-items-center tw-gap-x-4">
                <FinancesBalanceIcon />
                <div class="tw-flex tw-flex-col tw-leading-8">
                    <span class="tw-text-[13px] tw-text-gray-400">Баланс</span>
                    <span>
                        <span class="tw-text-[30px] tw-text-gray-800">345 000.00</span> <span class="tw-text-[16px] tw-text-gray-400">USDT</span>
                    </span>
                    <span class="tw-text-[13px] tw-text-gray-400">~65 238 894 RUB</span>
                </div>
            </section>
            <v-btn class="!tw-rounded-xl" color="#04B6F5" variant="elevated" size="x-large" @click="dialogOpen = true">
                <template v-slot:prepend>
                    <span class="tw-text-white tw-text-xl">+</span>
                </template>
                <span class="tw-text-white tw-text-[12px] !tw-normal-case">Пополнить</span>
            </v-btn>
        </section>
    </v-card>
    <FinancesDialog :open="dialogOpen" @close="closeDialog"/>
</template>