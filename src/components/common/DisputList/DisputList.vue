<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { formatter } from '@/utils'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const dialog = ref(false)
const dialogConfirm = ref(false)
const date = ref(new Date())
const page = ref(1)

function switchToConfirm() {
    dialog.value = false
    dialogConfirm.value = true
}

function openDialog() {
    dialog.value = true
}

function closeDialog() {
    dialog.value = false
}

function closeConfirmDialog() {
    dialogConfirm.value = false
}

const headers = ref([
    {
        title: 'ID',
        sortable: true,
        key: 'id'
    },
    {
        title: 'Время',
        sortable: true,
        key: 'date'
    },
    {
        title: 'Сумма',
        sortable: true,
        key: 'sum'
    },
    {
        title: 'Оплаченная сумма клиентом',
        sortable: true,
        key: 'clientSum'
    },
    {
        title: 'Карта',
        sortable: true,
        key: 'card'
    },
    {
        title: 'Статус',
        sortable: true,
        key: 'status'
    }
])

const itemsAll = ref([
    {
        id: 1256,
        date: '12.12.2023 09:45',
        sum: 10000,
        clientSum: 0.0324,
        card: {
            type: 'jcb',
            num: '**** 4353'
        },
        status: 'await'
    },
    {
        id: 1258,
        date: '12.12.2023 09:45',
        sum: 10000,
        clientSum: 0.0324,
        card: {
            type: 'visa',
            num: '**** 4353'
        },
        status: 'approved'
    },
    {
        id: 2556,
        date: '12.12.2023 09:45',
        sum: 10000,
        clientSum: 0.0324,
        card: {
            type: 'maestro',
            num: '**** 4353'
        },
        status: 'rejected'
    },
    {
        id: 1356,
        date: '12.12.2023 09:45',
        sum: 10000,
        clientSum: 0.0324,
        card: {
            type: 'unionpay',
            num: '**** 4353'
        },
        status: 'approved'
    },
    {
        id: 3556,
        date: '12.12.2023 09:45',
        sum: 10000,
        clientSum: 0.0324,
        card: {
            type: 'unionpay',
            num: '**** 4353'
        },
        status: 'expired'
    }
])

onMounted(() => {
    const startDate = new Date()
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
    date.value = [startDate, endDate]
})
</script>

<template>
    <v-card class="tw-w-full tw-h-[94px] !tw-rounded-2xl !tw-py-[23px] !tw-px-[24px] tw-mb-6">
        <section class="tw-w-full tw-flex tw-items-center">
            <section class="tw-w-full tw-flex tw-items-center tw-gap-x-4">
                <v-responsive class="mx-auto" min-width="92" max-width="462">
                    <v-text-field
                        variant="outlined"
                        label="Поиск по ID"
                        append-inner-icon="mdi mdi-magnify"
                        single-line
                    ></v-text-field>
                </v-responsive>
                <v-responsive class="mx-auto -tw-mt-5" min-width="92" max-width="462">
                    <!-- <v-select label="Все банки" variant="outlined"></v-select> -->
                    <VueDatePicker
                        v-model="date"
                        input-class-name="tw-h-[56px] !tw-rounded-xl !tw-border-gray-400 !tw-w-full"
                        range
                    ></VueDatePicker>
                </v-responsive>
                <v-responsive class="mx-auto" min-width="92" max-width="462">
                    <v-select label="Все карты" variant="outlined"></v-select>
                </v-responsive>
                <v-responsive class="mx-auto" min-width="92" max-width="462">
                    <v-select label="Все статусы" variant="outlined"></v-select>
                </v-responsive>
                <v-responsive class="mx-auto -tw-mt-5" min-width="92" max-width="462">
                    <v-btn
                        class="!tw-rounded-2xl !tw-normal-case !tw-w-full"
                        variant="outlined"
                        color="#04B6F5"
                        size="x-large"
                    >
                        <span class="tw-text-[#04B6F5] tw-text-[15px] tw-tracking-normal"
                            >Сбросить фильтр</span
                        >
                    </v-btn>
                </v-responsive>
            </section>
        </section>
    </v-card>
    <v-card class="!tw-rounded-2xl tw-mb-6">
        <v-data-table :headers="headers" :items="itemsAll" :footer="false">
            <template v-slot:headers="{ columns, toggleSort, isSorted }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td class="tw-cursor-pointer" @click="() => toggleSort(column)">
                            <span class="tw-text-[13px] tw-text-[#677483] tw-mr-2">{{
                                column.title
                            }}</span>
                            <template v-if="column.sortable">
                                <template v-if="isSorted(column)">
                                    <svg
                                        style="transform: rotate(180deg)"
                                        width="11"
                                        height="7"
                                        viewBox="0 0 11 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z"
                                            fill="#677483"
                                        />
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg
                                        width="11"
                                        height="7"
                                        viewBox="0 0 11 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z"
                                            fill="#677483"
                                        />
                                    </svg>
                                </template>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
            <template v-slot:item.id="{ value }">
                <span class="tw-text-[18px] tw-text-gray-500">{{ value }}</span>
            </template>
            <template v-slot:item.date="{ value }">
                <span class="tw-text-[18px]">{{ value }}</span>
            </template>
            <template v-slot:item.card="{ value }">
                <div class="tw-flex tw-items-center tw-gap-x-4">
                    <img :src="`/payment/${value.type}.png`" />
                    <span class="tw-text-[15px]">{{ value.num }}</span>
                </div>
            </template>
            <template v-slot:item.sum="{ value }">
                <span
                    ><span class="tw-text-[18px]">{{ formatter.format(value) }}</span>
                    <span class="tw-text-[17px] tw-text-gray-400 tw-ml-1">USD</span></span
                >
            </template>
            <template v-slot:item.clientSum="{ value }">
                <span
                    >
                    <img src="/ETH.png" />
                    <span class="tw-text-[18px] tw-ml-4">{{ formatter.format(value) }}</span>
                    <span class="tw-text-[17px] tw-ml-1">ETH</span></span
                >
            </template>
            <template v-slot:item.status="{ value }">
                <div
                    v-if="value === 'await'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-[#0085FF] tw-w-[158px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-[#0085FF] tw-text-xs">Ожидает</span>
                </div>
                <div
                    v-if="value === 'rejected'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-red-500 tw-w-[104px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-red-400 tw-text-xs">Отклонён</span>
                </div>
                <div
                    v-if="value === 'approved'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-green-500 tw-w-[104px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-green-400 tw-text-xs">Одобрен</span>
                </div>
                <div v-if="value === 'expired'" class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-yellow-500 tw-w-[158px] tw-px-2 tw-py-1 tw-text-center">
                    <span class="tw-text-yellow-400 tw-text-xs">Истекло время</span>
                </div>
            </template>
            <template v-slot:bottom></template>
        </v-data-table>
    </v-card>
    <v-pagination class="tw-self-start" v-model="page" :length="15" :total-visible="7">
        <template v-slot:prev>
            <div
                class="tw-bg-white tw-border-[1px] tw-border-solid tw-text-[17px] tw-rounded-xl tw-w-[40px] tw-h-[40px] tw-text-center tw-select-none tw-cursor-pointer tw-border-[#04B6F5] tw-text-[#04B6F5] hover:tw-bg-blue-200"
            >
                <div class="tw-mt-[6px]">
                    <svg
                        width="10"
                        height="16"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 13.25L1.25 7L7.5 0.75"
                            stroke="#04B6F5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </template>
        <template v-slot:item="{ isActive, page }">
            <div
                v-if="page !== '...'"
                class="tw-bg-white tw-border-[1px] tw-border-solid tw-text-[17px] tw-rounded-xl tw-w-[40px] tw-h-[40px] tw-text-center tw-select-none tw-cursor-pointer"
                :class="{
                    'tw-border-[#04B6F5] tw-text-[#04B6F5] hover:tw-bg-blue-200': !isActive,
                    'tw-border-[#AEB7C1] tw-text-[#AEB7C1]': isActive
                }"
            >
                <div class="tw-mt-[6px]">{{ page }}</div>
            </div>
            <div v-if="page === '...'" class="tw-mt-2">
                <span class="tw-text-xl tw-text-[#AEB7C1]">{{ page }}</span>
            </div>
        </template>
        <template v-slot:next>
            <div
                class="tw-bg-white tw-border-[1px] tw-border-solid tw-text-[17px] tw-rounded-xl tw-w-[40px] tw-h-[40px] tw-text-center tw-select-none tw-cursor-pointer tw-border-[#04B6F5] tw-text-[#04B6F5] hover:tw-bg-blue-200"
            >
                <div class="tw-mt-[6px]">
                    <svg
                        width="10"
                        height="16"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.500001 0.749999L6.75 7L0.5 13.25"
                            stroke="#04B6F5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </template>
    </v-pagination>
</template>
