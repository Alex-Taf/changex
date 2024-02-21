<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { debounce } from 'vue-debounce'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs } from 'qrcode.vue'
import { useDevicesStore } from '@/stores/devices'
import { storeToRefs } from 'pinia'
import Download from '../../icons/Download.vue'
import RenderOn from '@/components/utils/RenderOn.vue'
import DeleteDialog from '@/components/common/DeleteDialog/DeleteDialog.vue'

const dialog = ref(false)
const editDialog = ref(false)
const dialogDelete = ref(false)

// const qrValue = ref('https://example.com')
const level = ref<Level>('H')
const renderAs = ref<RenderAs>('svg')

const searchModel = ref('')
const searchQuery = ref('')

const devicesStore = useDevicesStore()
const { loading, hasItems, deviceItemsAll, qr, lastPage } = storeToRefs(devicesStore)

const editDevice = reactive({
    id: '',
    name: '',
    comment: ''
})

const deleteDevice = reactive<{id: string | number, title: string}>({
    id: '',
    title: ''
})

function fetchData() {
    devicesStore.fetchDevices({ search: searchQuery.value, page: page.value, countPerPage: 10 }).then(() => {
        devicesStore.hideLoading()
    })
}

async function openEditDialog(deviceId: string) {
    editDialog.value = true

    const device = await devicesStore.fetchDeviceById(deviceId)

    editDevice.id = device.deviceId
    editDevice.name = device.name
    editDevice.comment = device.comment
}

function submitEditDevice() {
    devicesStore.saveEditDevice(editDevice)
    editDialog.value = false
}

function onDeleteDevice(id: number | string, title: string) {
    deleteDevice.id = id
    deleteDevice.title = title
    dialogDelete.value = true
}

function deleteDeviceAction(id: number | string) {
    devicesStore.removeDevice(id as string)
}

function openDialog() {
    dialog.value = true
    devicesStore.loadQR()
}

const headers = ref([
    {
        title: 'ID',
        sortable: true,
        key: 'id'
    },
    {
        title: 'Название',
        sortable: true,
        key: 'title'
    },
    {
        title: 'Модель телефона',
        sortable: true,
        key: 'device'
    },
    {
        title: 'Комментарий',
        sortable: true,
        key: 'comment'
    },
    {
        title: '',
        sortable: false,
        key: 'actions'
    }
])

const page = ref(1)

function searchValue(queryText: string) {
    searchQuery.value = queryText
    fetchData()
}

function changePage(newPage: string, isActive: boolean) {
    if (isActive) {
        return
    }

    page.value = Number(newPage)
    fetchData()
}

function decPage() {
    if (page.value !== 1) {
        page.value--
        fetchData()
    }
}

function incPage() {
    if (page.value !== lastPage.value) {
        page.value++
        fetchData()
    }
}

function loadMore() {
    if (page.value < lastPage.value) {
        page.value++
        devicesStore.loadMoreDevices({ search: searchQuery.value, page: page.value, countPerPage: 10 }).then(() => {
            devicesStore.hideLoading()
        })
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <RenderOn :px="840">
        <v-card class="tw-w-full tw-h-[94px] !tw-rounded-2xl !tw-py-[23px] !tw-px-[24px] tw-mb-6">
            <section class="tw-w-full tw-flex tw-items-center">
                <section class="tw-w-full tw-flex tw-items-center tw-gap-x-4">
                    <v-responsive class="mx-auto" min-width="92" max-width="1600">
                        <v-text-field
                            v-model="searchModel"
                            variant="outlined"
                            label="Поиск по ID/Названию"
                            append-inner-icon="mdi mdi-magnify"
                            single-line
                            @update:model-value="debounce((val: any) => searchValue(val as string), 1000)(searchModel)"
                        ></v-text-field>
                    </v-responsive>
                    <v-btn
                        class="!-tw-mt-5 !tw-rounded-xl !tw-w-[245px] !tw-h-[52px] hover:!tw-shadow-[0px_10px_18px_2px_rgba(4,182,245,0.2)]"
                        color="#04B6F5"
                        variant="elevated"
                        @click="openDialog"
                    >
                            <template v-slot:prepend>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.125 10H16.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10 3.125V16.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </template>
                            <span class="tw-text-white tw-text-[16px] tw-normal-case tw-tracking-normal tw-leading-4">Добавить устройство</span>
                        </v-btn>
                </section>
            </section>
        </v-card>
        <v-card v-if="hasItems" class="!tw-rounded-2xl tw-mb-6">
            <v-data-table :headers="headers" :items="deviceItemsAll" :footer="false" :loading="loading">
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
                    <span class="tw-text-[15px] tw-text-gray-500">{{ value }}</span>
                </template>
                <template v-slot:item.title="{ value }">
                    <span class="tw-text-[15px]">{{ value }}</span>
                </template>
                <template v-slot:item.device="{ value }">
                    <span class="tw-text-[15px]">{{ value }}</span>
                </template>
                <template v-slot:item.comment="{ value }">
                    <span class="tw-text-[15px]">{{ value }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn
                                class="!tw-border-none !tw-bg-none !tw-shadow-none"
                                icon="mdi-dots-vertical"
                                v-bind="props"
                            ></v-btn>
                        </template>

                        <v-list>
                            <v-list-item class="tw-cursor-pointer hover:tw-bg-gray-200" @click="openEditDialog(item.id)">
                                <v-list-item-title>Редактировать</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="tw-cursor-pointer hover:tw-bg-gray-200" @click="onDeleteDevice(item.id, item.title)">
                                <v-list-item-title>Удалить</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
                </template>
                <template v-slot:bottom></template>
            </v-data-table>
        </v-card>
    </RenderOn>

    <RenderOn :px-min="320" :px-max="839">
        <section v-if="deviceItemsAll.length > 0" class="tw-flex tw-flex-col tw-gap-y-2 tw-overflow-y-scroll tw-p-2 tw-h-[420px]">
                <template v-for="item in deviceItemsAll" :key="item">
                    <div class="tw-flex tw-flex-col tw-w-full tw-bg-white tw-p-4 tw-rounded-2xl">
                        <div class="tw-flex tw-justify-between tw-mb-2">
                            <div class="tw-flex tw-flex-col tw-gap-x-2">
                                <div class="tw-leading-4">
                                    <span class="tw-text-[10px] tw-text-[#AEB7C1]">{{ item.id }},</span>
                                    <span class="tw-text-[10px] tw-text-[#AEB7C1] tw-ml-1">{{ item.device }}</span>
                                </div>
                                <span class="tw-text-[15px]">{{ item.title }}</span>
                            </div>
                            <v-menu>
                                    <template v-slot:activator="{ props }">
                                        <v-btn
                                            class="!tw-border-none !tw-bg-none !tw-shadow-none"
                                            icon="mdi-dots-vertical"
                                            v-bind="props"
                                        ></v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-item class="tw-cursor-pointer hover:tw-bg-gray-200">
                                            <v-list-item-title><span class="tw-select-none">Редактировать</span></v-list-item-title>
                                        </v-list-item>
                                        <v-list-item class="tw-cursor-pointer hover:tw-bg-gray-200">
                                            <v-list-item-title><span class="tw-select-none">Удалить</span></v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                        </div>
                        <div class="tw-border-t-2 tw-border-l-0 tw-border-r-0 tw-border-b-0 tw-border-[#E0E4E8] tw-border-dashed">
                            <span v-if="item.comment !== ''" class="tw-text-[13px] tw-min-w-[300px]">{{ item.comment }}</span>
                            <span v-else class="tw-text-[#8f8f8f] tw-text-[13px] tw-min-w-[300px]">Комментарий отсутствует</span>
                        </div>
                    </div>
                </template>
            </section>
            <div v-if="loading" class="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-[326px]">
                <v-progress-circular
                    indeterminate
                    color="#04B6F5"
                ></v-progress-circular>
            </div>
            <v-btn v-if="deviceItemsAll.length > 0" class="!tw-rounded-xl !tw-h-[50px] tw-mt-5" variant="outlined" color="#04B6F5" @click="loadMore">
                <span class="tw-tracking-normal tw-normal-case">Показать ещё</span>
            </v-btn>
            <v-btn v-if="deviceItemsAll.length > 0" class="!tw-rounded-xl !tw-h-[50px] tw-mt-5" variant="elevated" color="#04B6F5" @click="openDialog">
                <template v-slot:prepend>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.125 10H16.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 3.125V16.875" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </template>
                <span class="tw-tracking-normal tw-normal-case tw-text-white">Добавить устройство</span>
            </v-btn>
    </RenderOn>

    <section v-if="deviceItemsAll.length === 0" class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-w-full tw-h-[calc(100vh-400px)]">
        <div class="tw-text-center">
            <Stars /><br>
            <span class="tw-text-lg tw-text-[#677483] tw-font-semibold">Устройства отсутствуют</span>
        </div>
    </section>

    <DeleteDialog
        :open="dialogDelete"
        title="Вы действительно хотите удалить устройство?"
        :entity="deleteDevice"
        @delete="(e) => deleteDeviceAction(e.entityId)"
        @close="dialogDelete = !dialogDelete"
    />

    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card class="tw-flex tw-flex-col tw-items-center !tw-rounded-2xl !tw-p-[48px]">
        <span class="tw-text-2xl tw-mb-[24px] tw-text-center">Добавление нового устройства</span>
        <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-y-8
                    tw-mb-[24px] tw-w-[352px] tw-h-[352px] tw-text-center tw-border tw-border-solid tw-border-[#AEB7C1]
                    tw-rounded-xl"
        >
            <qrcode-vue :value="qr" :level="level" :size="184" :render-as="renderAs" />
            <span class="tw-text-[15px] tw-text-[#2B3A4C]">Отсканируйте в приложении<br> данный QR-Код</span>
        </div>
        <div class="tw-flex tw-items-center tw-gap-x-2 tw-cursor-pointer">
            <Download /> <span class="tw-text-[15px] tw-text-[#04B6F5] tw-select-none">Скачать APK приложение</span>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" width="auto">
            <v-card class="tw-flex tw-flex-col tw-items-center !tw-rounded-2xl sm:!tw-p-[28px] md:!tw-p-[48px] min-lg:!tw-p-[48px]">
                <span class="tw-text-2xl tw-mb-[14px]">Редактировать устройство</span>
                    <div class="tw-flex tw-flex-col tw-items-start tw-w-full">
                        <span class="tw-text-[13px] tw-text-[#677483]">Название</span>
                        <v-text-field
                            v-model="editDevice.name"
                            class="tw-w-full"
                            label="Название устройства"
                            variant="outlined"
                        ></v-text-field>
                    </div>
                    <div class="tw-flex tw-flex-col tw-items-start tw-w-full">
                        <span class="tw-text-[13px] tw-text-[#677483]">Комментарий</span>
                        <v-textarea
                            v-model="editDevice.comment"
                            class="tw-w-full"
                            label="Комментарий к устройству"
                            variant="outlined"
                        ></v-textarea>
                    </div>
                <v-card-actions>
                    <section class="tw-flex tw-flex-col tw-gap-y-4">
                        <v-btn class="tw-w-[326px] !tw-h-[50px] !tw-rounded-xl !tw-normal-case" color="#04B6F5" variant="elevated" block @click="submitEditDevice">
                            <span class="tw-text-white tw-text-[15px] !tw-normal-case">Сохранить</span>
                        </v-btn>
                        <v-btn class="tw-w-[326px] !tw-h-[50px] !tw-rounded-xl !tw-normal-case !tw-m-auto" color="#04B6F5" variant="outlined" @click="editDialog = !editDialog">
                            Отмена
                        </v-btn>
                    </section>
                </v-card-actions>
            </v-card>
    </v-dialog>

    <RenderOn :px="840">
        <v-pagination
            v-if="deviceItemsAll.length > 0"
            class="tw-self-start"
            v-model="page"
            :length="lastPage"
            :total-visible="7"
        >
            <template v-slot:prev>
                <div class="tw-bg-white tw-border-[1px] tw-border-solid tw-text-[17px]
                    tw-rounded-xl tw-w-[40px] tw-h-[40px] tw-text-center tw-select-none tw-cursor-pointer
                    tw-border-[#04B6F5] tw-text-[#04B6F5] hover:tw-bg-blue-200"
                    @click="decPage"
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
                    @click="changePage(page, isActive)"
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
                    @click="incPage"
                >
                    <div class="tw-mt-[6px]">
                        <svg width="10" height="16" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.500001 0.749999L6.75 7L0.5 13.25" stroke="#04B6F5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </template>
    </v-pagination>
  </RenderOn>
</template>
