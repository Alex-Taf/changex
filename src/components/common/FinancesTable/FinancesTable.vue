<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { formatter } from '../../../utils'
import { useFinancesStore } from '@/stores/finances'
import { storeToRefs } from 'pinia'
import ArrowUpRight from '../../icons/ArrowUpRight.vue'
import ArrowDownLeft from '../../icons/ArrowDownLeft.vue'
import Stars from '../../icons/Stars.vue'

const financesStore = useFinancesStore()
const { lastPage, itemsAll, itemsDeposit, itemsWithdrawal } = storeToRefs(financesStore)

const tab = ref(null)
const headers = ref([
    {
        title: "",
        sortable: false,
        key: 'direction'
    },
    {
        title: "Дата и время",
        sortable: true,
        key: 'date'
    },
    {
        title: "Комментарий",
        sortable: true,
        key: 'comment'
    },
    {
        title: "Сумма",
        sortable: true,
        key: 'amount'
    },
    {
        title: "Статус",
        sortable: true,
        key: 'status'
    }
])

// const itemsAll = ref([
//     {
//       id: 0,
//       type: 'credit',
//       date: '12.12.2023 09:45',
//       comment: 'Наименование назначения платежа',
//       price: 10000,
//       status: 'process'
//     },
//     {
//       id: 1,
//       type: 'debit',
//       date: '12.12.2023 09:45',
//       comment: 'Наименование назначения платежа',
//       price: 10000,
//       status: 'done'
//     },
//     {
//       id: 2,
//       type: 'credit',
//       date: '12.12.2023 09:45',
//       comment: 'Наименование назначения платежа',
//       price: 10000,
//       status: 'error'
//     }
// ])

// const itemsCredit = ref([
//     {
//       id: 0,
//       type: 'credit',
//       date: '12.12.2023 09:45',
//       comment: 'Наименование назначения платежа',
//       price: 10000,
//       status: 'process'
//     },
//     {
//       id: 2,
//       type: 'credit',
//       date: '12.12.2023 09:45',
//       comment: 'Наименование назначения платежа',
//       price: 10000,
//       status: 'error'
//     }
// ])

// const itemsDebit = ref([
//     {
//       id: 1,
//       type: 'debit',
//       date: '12.12.2023 09:45',
//       comment: 'Наименование назначения платежа',
//       price: 10000,
//       status: 'done'
//     }
// ])

const page = ref(1)

onMounted(() => {
    financesStore.fetchFinancesStory({ page: page.value, countPerPage: 10 })
})
</script>

<template>
  <v-card v-if="itemsAll.length > 0" class="!tw-rounded-2xl tw-mb-6">
    <v-tabs v-model="tab" bg-color="white" align-tabs="center">
      <v-tab value="one" color="blue" width="33.3%" class="!tw-normal-case !tw-tracking-normal">Все</v-tab>
      <v-tab value="two" color="blue" width="33.3%" class="!tw-normal-case !tw-tracking-normal">Пополнения</v-tab>
      <v-tab value="three" color="blue" width="33.3%" class="!tw-normal-case !tw-tracking-normal">Списания</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <v-data-table :headers="headers" :items="itemsAll" :footer='false'>
            <template v-slot:item.direction="{ value }">
                <ArrowUpRight v-if="value === 'deposit'" />
                <ArrowDownLeft v-if="value === 'withdrawal'" />
            </template>
            <template v-slot:headers="{ columns, toggleSort, isSorted }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td class="tw-cursor-pointer" @click="() => toggleSort(column)">
                            <span class="tw-text-[13px] tw-text-[#677483] tw-mr-2">{{ column.title }}</span>
                            {{  column.sort  }}
                            <template v-if="column.sortable">
                                <template v-if="isSorted(column)">
                                    <svg style="transform: rotate(180deg);" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z" fill="#677483"/>
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z" fill="#677483"/>
                                    </svg>
                                </template>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
            <template v-slot:item.date="{ value }">
                <span class="tw-text-[15px]">{{ value }}</span>
            </template>
            <template v-slot:item.comment="{ value }">
                <span class="tw-text-[15px]">{{ value }}</span>
            </template>
            <template v-slot:item.amount="{ value }">
                <span><span class="tw-text-[15px]">{{ formatter.format(value) }}</span> <span class="tw-text-[13px] tw-text-gray-400">USD</span></span>
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
          <v-data-table :headers="headers" :items="itemsDeposit">
            <template v-slot:item.direction="{ value }">
                <ArrowUpRight v-if="value === 'deposit'" />
                <ArrowDownLeft v-if="value === 'withdrawal'" />
            </template>
            <template v-slot:headers="{ columns, toggleSort, isSorted }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td class="tw-cursor-pointer" @click="() => toggleSort(column)">
                            <span class="tw-text-[13px] tw-text-[#677483] tw-mr-2">{{ column.title }}</span>
                            <template v-if="column.sortable">
                                <template v-if="isSorted(column)">
                                    <svg style="transform: rotate(180deg);" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z" fill="#677483"/>
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z" fill="#677483"/>
                                    </svg>
                                </template>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
            <template v-slot:item.date="{ value }">
                <span class="tw-text-[15px]">{{ value }}</span>
            </template>
            <template v-slot:item.comment="{ value }">
                <span class="tw-text-[15px]">{{ value }}</span>
            </template>
            <template v-slot:item.amount="{ value }">
                <span><span class="tw-text-[15px]">{{ formatter.format(value) }}</span> <span class="tw-text-[13px] tw-text-gray-400">USD</span></span>
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

        <v-window-item value="three">
          <v-data-table :headers="headers" :items="itemsWithdrawal">
            <template v-slot:item.direction="{ value }">
                <ArrowUpRight v-if="value === 'deposit'" />
                <ArrowDownLeft v-if="value === 'withdrawal'" />
            </template>
            <template v-slot:headers="{ columns, toggleSort, isSorted }">
                <tr>
                    <template v-for="column in columns" :key="column.key">
                        <td class="tw-cursor-pointer" @click="() => toggleSort(column)">
                            <span class="tw-text-[13px] tw-text-[#677483] tw-mr-2">{{ column.title }}</span>
                            <template v-if="column.sortable">
                                <template v-if="isSorted(column)">
                                    <svg style="transform: rotate(180deg);" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z" fill="#677483"/>
                                    </svg>
                                </template>
                                <template v-else>
                                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.621 0.943362C10.5852 0.858049 10.5249 0.785259 10.4477 0.734166C10.3706 0.683073 10.28 0.655963 10.1875 0.656252H0.812455C0.719912 0.655963 0.629354 0.683073 0.552193 0.734166C0.475032 0.785259 0.414721 0.858049 0.378861 0.943362C0.345089 1.02994 0.336522 1.12432 0.35415 1.21557C0.371777 1.30682 0.41488 1.39121 0.47847 1.45899L5.16597 6.14649C5.25557 6.23312 5.37532 6.28155 5.49995 6.28155C5.62459 6.28155 5.74434 6.23312 5.83394 6.14649L10.5214 1.45899C10.585 1.39121 10.6281 1.30682 10.6458 1.21557C10.6634 1.12432 10.6548 1.02994 10.621 0.943362Z" fill="#677483"/>
                                    </svg>
                                </template>
                            </template>
                        </td>
                    </template>
                </tr>
            </template>
            <template v-slot:item.date="{ value }">
                <span class="tw-text-[15px]">{{ value }}</span>
            </template>
            <template v-slot:item.comment="{ value }">
                <span class="tw-text-[15px]">{{ value }}</span>
            </template>
            <template v-slot:item.amount="{ value }">
                <span><span class="tw-text-[15px]">{{ formatter.format(value) }}</span> <span class="tw-text-[13px] tw-text-gray-400">USD</span></span>
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
      </v-window>
    </v-card-text>
  </v-card>
  <section v-else class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-h-full">
    <div class="tw-text-center">
        <Stars /><br>
        <span class="tw-text-lg tw-text-[#677483] tw-font-semibold">Операции отстутствуют</span>
    </div>
  </section>
  <v-pagination
    v-if="itemsAll.length > 0"
    class="tw-self-start"
    v-model="page"
    :length="lastPage"
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
            <div class="tw-text-[15px] tw-font-semibold tw-mt-[6px]">{{ page }}</div>
        </div>
        <div v-if="page === '...'" class="tw-mt-2">
            <span class="tw-text-[15px] tw-text-[#AEB7C1] tw-font-semibold">{{ page }}</span>
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
