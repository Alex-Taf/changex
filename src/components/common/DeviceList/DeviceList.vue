<script setup lang="ts">
import { onMounted, ref } from 'vue'
import QrcodeVue, { Level, RenderAs } from 'qrcode.vue'
import Download from '../../icons/Download.vue'

const dialog = ref(false)
const qrValue = ref('https://example.com')
const level = ref<Level>('H')
const renderAs = ref<RenderAs>('svg')

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

const itemsAll = ref([
    {
        id: 1256,
        title: "Моё устройство 1",
        device: "Iphone SE",
        comment: "Lorem ipsum dolor sit amet"
    },
    {
        id: 1257,
        title: "Моё устройство 2",
        device: "Iphone XR",
        comment: "Lorem ipsum dolor sit amet"
    },
    {
        id: 1258,
        title: "Моё устройство 3",
        device: "Realme Pro 6",
        comment: "Lorem ipsum dolor sit amet"
    },
    {
        id: 1259,
        title: "Моё устройство 4",
        device: "Google Pixel",
        comment: "Lorem ipsum dolor sit amet"
    }
])
</script>

<template>
    <v-card class="tw-w-full tw-h-[94px] !tw-rounded-2xl !tw-py-[23px] !tw-px-[24px] tw-mb-6">
        <section class="tw-w-full tw-flex tw-items-center">
            <section class="tw-w-full tw-flex tw-items-center tw-gap-x-4">
                <v-responsive class="mx-auto" min-width="92" max-width="1600">
                    <v-text-field
                        variant="outlined"
                        label="Поиск по ID/Названию"
                        append-inner-icon="mdi mdi-magnify"
                        single-line
                    ></v-text-field>
                </v-responsive>
                <v-btn
                    class="!-tw-mt-5 !tw-rounded-xl !tw-w-[245px] !tw-h-[52px] hover:!tw-shadow-[0px_10px_18px_2px_rgba(4,182,245,0.2)]"
                    color="#04B6F5"
                    variant="elevated"
                    @click="dialog = !dialog"
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
                        <v-list-item>
                            <v-list-item-title>Редактировать</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Удалить</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
            <template v-slot:bottom></template>
        </v-data-table>
    </v-card>
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
            <qrcode-vue :value="value" :level="level" :size="184" :render-as="renderAs" />
            <span class="tw-text-[15px] tw-text-[#2B3A4C]">Отсканируйте в приложении<br> данный QR-Код</span>
        </div>
        <div class="tw-flex tw-items-center tw-gap-x-2 tw-cursor-pointer">
            <Download /> <span class="tw-text-[15px] tw-text-[#04B6F5] tw-select-none">Скачать APK приложение</span>
        </div>
      </v-card>
    </v-dialog>
</template>
