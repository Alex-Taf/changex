<script setup lang="ts">
import { ref, reactive } from 'vue'
import { formatter } from '../../../utils'
import ArrowUpRight from '../../icons/ArrowUpRight.vue'
import ArrowDownLeft from '../../icons/ArrowDownLeft.vue'

const tab = ref(null)
const headers = ref([
    {
        title: "",
        key: 'type'
    },
    {
        title: "Дата и время",
        sortable: true,
        key: 'date'
    },
    {
        title: "Комментарий",
        key: 'comment'
    },
    {
        title: "Сумма",
        sortable: true,
        key: 'price'
    },
    {
        title: "Статус",
        sortable: true,
        key: 'status'
    }
])

const itemsAll = ref([
    {
      id: 0,
      type: 'credit',
      date: '12.12.2023 09:45',
      comment: 'Наименование назначения платежа',
      price: 10000,
      status: 'process'
    },
    {
      id: 1,
      type: 'debit',
      date: '12.12.2023 09:45',
      comment: 'Наименование назначения платежа',
      price: 10000,
      status: 'done'
    },
    {
      id: 2,
      type: 'credit',
      date: '12.12.2023 09:45',
      comment: 'Наименование назначения платежа',
      price: 10000,
      status: 'error'
    }
])

const itemsCredit = ref([
    {
      id: 0,
      type: 'credit',
      date: '12.12.2023 09:45',
      comment: 'Наименование назначения платежа',
      price: 10000,
      status: 'process'
    },
    {
      id: 2,
      type: 'credit',
      date: '12.12.2023 09:45',
      comment: 'Наименование назначения платежа',
      price: 10000,
      status: 'error'
    }
])

const itemsDebit = ref([
    {
      id: 1,
      type: 'debit',
      date: '12.12.2023 09:45',
      comment: 'Наименование назначения платежа',
      price: 10000,
      status: 'done'
    }
])

const page = ref(1)
</script>

<template>
  <v-card class="!tw-rounded-2xl tw-mb-6">
    <v-tabs v-model="tab" bg-color="white" align-tabs="center">
      <v-tab value="one" color="blue" width="33.3%">Все</v-tab>
      <v-tab value="two" color="blue" width="33.3%">Пополнения</v-tab>
      <v-tab value="three" color="blue" width="33.3%">Списания</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-data-table :headers="headers" :items="itemsAll" :footer='false'>
            <template v-slot:item.type="{ value }">
                <ArrowUpRight v-if="value === 'credit'" />
                <ArrowDownLeft v-if="value === 'debit'" />
            </template>
            <template v-slot:item.date="{ value }">
                <span class="tw-text-[18px]">{{ value }}</span>
            </template>
            <template v-slot:item.comment="{ value }">
                <span class="tw-text-[18px]">{{ value }}</span>
            </template>
            <template v-slot:item.price="{ value }">
                <span><span class="tw-text-[18px]">{{ formatter.format(value) }}</span> <span class="tw-text-[17px] tw-text-gray-400">USD</span></span>
            </template>
            <template v-slot:item.status="{ value }">
                <div
                    v-if="value === 'process'"
                    class="tw-bg-gray-200 tw-rounded-xl tw-border-2 tw-border-solid tw-border-gray-400 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-gray-400 tw-text-xs">В процессе</span>
                </div>
                <div
                    v-if="value === 'error'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-yellow-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-yellow-400 tw-text-xs">Ошибка</span>
                </div>
                <div
                    v-if="value === 'done'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-green-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-green-400 tw-text-xs">Выполнено</span>
                </div>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
        </v-window-item>

        <v-window-item value="two">
          <v-data-table :headers="headers" :items="itemsCredit">
            <template v-slot:item.type="{ value }">
                <ArrowUpRight v-if="value === 'credit'" />
                <ArrowDownLeft v-if="value === 'debit'" />
            </template>
            <template v-slot:item.status="{ value }">
                <div
                    v-if="value === 'process'"
                    class="tw-bg-gray-300 tw-rounded-xl tw-border-2 tw-border-solid tw-border-gray-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-gray-400 tw-text-xs">В процессе</span>
                </div>
                <div
                    v-if="value === 'error'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-yellow-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-yellow-400 tw-text-xs">Ошибка</span>
                </div>
                <div
                    v-if="value === 'done'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-green-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-green-400 tw-text-xs">Выполнено</span>
                </div>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
        </v-window-item>

        <v-window-item value="three">
          <v-data-table :headers="headers" :items="itemsDebit">
            <template v-slot:item.type="{ value }">
                <ArrowUpRight v-if="value === 'credit'" />
                <ArrowDownLeft v-if="value === 'debit'" />
            </template>
            <template v-slot:item.status="{ value }">
                <div
                    v-if="value === 'process'"
                    class="tw-bg-gray-300 tw-rounded-xl tw-border-2 tw-border-solid tw-border-gray-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-gray-400 tw-text-xs">В процессе</span>
                </div>
                <div
                    v-if="value === 'error'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-yellow-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-yellow-400 tw-text-xs">Ошибка</span>
                </div>
                <div
                    v-if="value === 'done'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-green-500 tw-w-[94px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-green-400 tw-text-xs">Выполнено</span>
                </div>
            </template>
            <template v-slot:bottom></template>
          </v-data-table>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
  <v-pagination
    class="tw-self-start"
    v-model="page"
    :length="15"
    :total-visible="7"
   >
    <template v-slot:prev>
        <div class="tw-bg-white tw-border-[1px] tw-border-solid tw-text-[17px]
            tw-rounded-xl tw-w-[40px] tw-h-[40px] tw-text-center tw-select-none tw-cursor-pointer
            tw-border-[#04B6F5] tw-text-[#04B6F5] hover:tw-bg-blue-200"
        >
            <div class="tw-mt-[6px]">
                <svg width="10" height="16" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 13.25L1.25 7L7.5 0.75" stroke="#04B6F5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    </template>
    <template v-slot:item="{ isActive, page }">
        <div v-if="page !== '...'" class="tw-bg-white tw-border-[1px] tw-border-solid tw-text-[17px]
            tw-rounded-xl tw-w-[40px] tw-h-[40px] tw-text-center tw-select-none tw-cursor-pointer"
            :class="{ 'tw-border-[#04B6F5] tw-text-[#04B6F5] hover:tw-bg-blue-200': !isActive, 'tw-border-[#AEB7C1] tw-text-[#AEB7C1]': isActive }"
        >
            <div class="tw-mt-[6px]">{{ page }}</div>
        </div>
        <div v-if="page === '...'" class="tw-mt-2">
            <span class="tw-text-xl tw-text-[#AEB7C1]">{{ page }}</span>
        </div>
    </template>
    <template v-slot:next>
        <div class="tw-bg-white tw-border-[1px] tw-border-solid tw-text-[17px]
            tw-rounded-xl tw-w-[40px] tw-h-[40px] tw-text-center tw-select-none tw-cursor-pointer
            tw-border-[#04B6F5] tw-text-[#04B6F5] hover:tw-bg-blue-200"
        >
            <div class="tw-mt-[6px]">
                <svg width="10" height="16" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.500001 0.749999L6.75 7L0.5 13.25" stroke="#04B6F5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    </template>
   </v-pagination>
</template>
