<script setup lang="ts">
import { ref } from 'vue'
import { formatter } from '../../../utils'
import ArrowUpRight from '../../icons/ArrowUpRight.vue'
import ArrowDownLeft from '../../icons/ArrowDownLeft.vue'

const dialog = ref(false)
const dialogConfirm = ref(false)

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
        title: 'Номер',
        sortable: true,
        key: 'card'
    },
    {
        title: 'Банк',
        sortable: true,
        key: 'bank'
    },
    {
        title: 'Устройство',
        sortable: true,
        key: 'device'
    },
    {
        title: 'Комментарий',
        sortable: true,
        key: 'comment'
    },
    {
        title: 'Статус',
        sortable: true,
        key: 'status'
    },
    {
        title: 'Влючена',
        key: 'switch'
    },
    {
        title: '',
        key: 'actions'
    }
])

const itemsAll = ref([
    {
        id: 0,
        card: {
            type: 'jcb',
            num: '**** **** **** 4353'
        },
        bank: {
            id: 1,
            slug: 'raiff',
            name: 'Райфайзен'
        },
        device: 'Моё устройство 1',
        comment: 'Lorem ipsum dolor sit amet',
        status: 'active',
        switch: true
    },
    {
        id: 1,
        card: {
            type: 'maestro',
            num: '**** **** **** 4353'
        },
        bank: {
            id: 2,
            slug: 'sbank',
            name: 'Сбербанк'
        },
        device: 'Моё устройство 1',
        comment: 'Lorem ipsum dolor sit amet',
        status: 'active',
        switch: true
    },
    {
        id: 3,
        card: {
            type: 'unionpay',
            num: '**** **** **** 4353'
        },
        bank: {
            id: 3,
            slug: 'tinkoff',
            name: 'Тинькофф'
        },
        device: 'Моё устройство 1',
        comment: 'Lorem ipsum dolor sit amet',
        status: 'disabled',
        switch: true
    },
    {
        id: 3,
        card: {
            type: 'visa',
            num: '**** **** **** 4678'
        },
        bank: {
            id: 4,
            slug: 'alpha',
            name: 'Альфабанк'
        },
        device: 'Моё устройство 1',
        comment: 'Lorem ipsum dolor sit amet',
        status: 'connect',
        switch: false
    }
])
</script>

<template>
    <v-card class="tw-w-full tw-h-[94px] !tw-rounded-2xl !tw-py-[23px] !tw-px-[24px] tw-mb-6">
        <section class="tw-w-full tw-flex tw-items-center">
            <section class="tw-w-full tw-flex tw-items-center tw-gap-x-4">
                <v-responsive class="mx-auto" min-width="262" max-width="462">
                    <v-text-field
                        variant="outlined"
                        label="Поиск"
                        append-inner-icon="mdi mdi-magnify"
                        single-line
                    ></v-text-field>
                </v-responsive>
                <v-responsive class="mx-auto" min-width="262" max-width="462">
                    <v-select label="Все банки" variant="outlined"></v-select>
                </v-responsive>
                <v-responsive class="mx-auto" min-width="262" max-width="462">
                    <v-select label="Все статусы" variant="outlined"></v-select>
                </v-responsive>
                <v-responsive class="mx-auto -tw-mt-5" min-width="262" max-width="262">
                    <v-btn
                        class="!tw-rounded-2xl !tw-normal-case"
                        variant="outlined"
                        color="#04B6F5"
                        size="x-large"
                        >Сбросить фильтр</v-btn
                    >
                </v-responsive>
            </section>
            <v-btn
                class="!-tw-mt-5 !tw-rounded-xl"
                color="#04B6F5"
                variant="elevated"
                size="x-large"
                @click="dialog = !dialog"
            >
                <template v-slot:prepend>
                    <span class="tw-text-white tw-text-xl">+</span>
                </template>
                <span class="tw-text-white tw-text-[12px] !tw-normal-case">Добавить карту</span>
            </v-btn>
        </section>
    </v-card>
    <v-card class="!tw-rounded-2xl tw-mb-6">
        <v-data-table :headers="headers" :items="itemsAll" :footer="false">
            <template v-slot:item.card="{ value }">
                <div class="tw-flex tw-items-center tw-gap-x-4">
                    <img :src="`/payment/${value.type}.png`" />
                    <span class="tw-text-[18px]">{{ value.num }}</span>
                </div>
            </template>
            <template v-slot:item.bank="{ value }">
                <div class="tw-flex tw-items-center tw-gap-x-4">
                    <img :src="`/payment/${value.slug}.png`" />
                    <span class="tw-text-[18px]">{{ value.name }}</span>
                </div>
            </template>
            <template v-slot:item.device="{ value }">
                <span class="tw-text-[18px]">{{ value }}</span>
            </template>
            <template v-slot:item.comment="{ value }">
                <span class="tw-text-[18px]">{{ value }}</span>
            </template>
            <!-- <template v-slot:item.price="{ value }">
                <span
                    ><span class="tw-text-[18px]">{{ formatter.format(value) }}</span>
                    <span class="tw-text-[17px] tw-text-gray-400">USD</span></span
                >
            </template> -->
            <template v-slot:item.status="{ value }">
                <div
                    v-if="value === 'connect'"
                    class="tw-bg-gray-200 tw-rounded-xl tw-border-2 tw-border-solid tw-border-gray-400 tw-w-[104px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-gray-400 tw-text-xs">Подключение</span>
                </div>
                <div
                    v-if="value === 'disabled'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-yellow-500 tw-w-[104px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-yellow-400 tw-text-xs">Отключена</span>
                </div>
                <div
                    v-if="value === 'active'"
                    class="tw-rounded-xl tw-border-2 tw-border-solid tw-border-green-500 tw-w-[104px] tw-px-2 tw-py-1 tw-text-center"
                >
                    <span class="tw-text-green-400 tw-text-xs">Активна</span>
                </div>
            </template>
            <template v-slot:item.switch="{ value }">
                <v-switch :model-value="value" color="#04B6F5"></v-switch>
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
    <v-dialog v-model="dialog" width="auto">
        <v-card class="tw-flex tw-flex-col tw-items-center tw-h-fit !tw-rounded-2xl !tw-p-[48px]">
            <span class="tw-text-2xl tw-mb-[14px]">Добавление новой карты</span>
            <div class="tw-flex tw-flex-col tw-items-start tw-w-full">
                <span class="tw-text-[13px] tw-text-[#677483]">Банк</span>
                <v-select class="tw-w-full" label="Выберите" variant="outlined"></v-select>
            </div>
            <div class="tw-flex tw-flex-col tw-items-start tw-w-full">
                <span class="tw-text-[13px] tw-text-[#677483]">Устройство</span>
                <v-select class="tw-w-full" label="Выберите" variant="outlined"></v-select>
            </div>
            <div class="tw-flex tw-flex-col tw-items-start tw-w-full">
                <span class="tw-text-[13px] tw-text-[#677483]">Номер карты</span>
                <v-text-field class="tw-w-full" label="0000 0000 0000 0000" variant="outlined"></v-text-field>
            </div>
            <div class="tw-flex tw-flex-col tw-items-start tw-w-full">
                <span class="tw-text-[13px] tw-text-[#677483]">Комментарий</span>
                <v-textarea class="tw-w-full" label="Комментарий к карте" variant="outlined"></v-textarea>
            </div>
            <v-card-actions>
                <section class="tw-flex tw-flex-col tw-gap-y-4">
                    <v-btn class="tw-w-[426px] !tw-h-[50px] !tw-rounded-xl !tw-normal-case" color="#04B6F5" variant="elevated" block @click="switchToConfirm">
                        <span class="tw-text-white tw-text-[15px] !tw-normal-case">Сохранить</span>
                    </v-btn>
                    <v-btn class="tw-w-[426px] !tw-h-[50px] !tw-rounded-xl !tw-normal-case !tw-m-auto" color="#04B6F5" variant="outlined" @click="closeDialog">
                        Отмена
                    </v-btn>
                </section>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogConfirm"
      width="auto"
    >
      <v-card class="tw-flex tw-flex-col tw-items-center !tw-rounded-2xl !tw-p-[48px]">
        <div class="tw-mb-[24px]">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 6C26.8577 6 21.8309 7.52487 17.5552 10.3818C13.2795 13.2387 9.94702 17.2994 7.97914 22.0502C6.01127 26.8011 5.49638 32.0288 6.49959 37.0723C7.50281 42.1159 9.97907 46.7486 13.6152 50.3848C17.2514 54.0209 21.8842 56.4972 26.9277 57.5004C31.9712 58.5036 37.1989 57.9887 41.9498 56.0209C46.7007 54.053 50.7613 50.7205 53.6182 46.4448C56.4751 42.1691 58 37.1423 58 32C57.9868 25.1084 55.2433 18.5029 50.3702 13.6298C45.4971 8.75674 38.8916 6.01321 32 6ZM30 20C30 19.4696 30.2107 18.9609 30.5858 18.5858C30.9609 18.2107 31.4696 18 32 18C32.5304 18 33.0392 18.2107 33.4142 18.5858C33.7893 18.9609 34 19.4696 34 20V34C34 34.5304 33.7893 35.0391 33.4142 35.4142C33.0392 35.7893 32.5304 36 32 36C31.4696 36 30.9609 35.7893 30.5858 35.4142C30.2107 35.0391 30 34.5304 30 34V20ZM32 46C31.4067 46 30.8266 45.8241 30.3333 45.4944C29.84 45.1648 29.4554 44.6962 29.2284 44.148C29.0013 43.5999 28.9419 42.9967 29.0577 42.4147C29.1734 41.8328 29.4591 41.2982 29.8787 40.8787C30.2982 40.4591 30.8328 40.1734 31.4147 40.0576C31.9967 39.9419 32.5999 40.0013 33.1481 40.2284C33.6962 40.4554 34.1648 40.8399 34.4944 41.3333C34.8241 41.8266 35 42.4067 35 43C35 43.7957 34.6839 44.5587 34.1213 45.1213C33.5587 45.6839 32.7957 46 32 46Z" fill="#EFC327"/>
            </svg>
        </div>
        <span class="tw-text-2xl tw-mb-[24px] tw-text-center">Подтверждение<br>действия</span>
        <div class="tw-mb-[24px] tw-w-[320px] tw-text-center">
          <span class="tw-text-[15px] tw-break-words tw-overflow-ellipsis">
            Lorem ipsum dolor sit amet consectetur. Volutpat sit dui congue massa aliquam sed cursus. Odio sed eget ultrices urna phasellus nibh. Tortor amet sed velit amet. Fames ut lacus non lectus blandit mi faucibus amet nulla. Lectus urna sollicitudin est proin. Sodales mauris.
          </span>
        </div>
        <v-card-actions>
                <section class="tw-flex tw-flex-col tw-gap-y-4">
                    <v-btn class="tw-w-[320px] !tw-h-[50px] !tw-rounded-xl !tw-normal-case" color="#04B6F5" variant="elevated" block @click="switchToConfirm">
                        <span class="tw-text-white tw-text-[15px] !tw-normal-case">Подтвердить</span>
                    </v-btn>
                    <v-btn class="tw-w-[320px] !tw-h-[50px] !tw-rounded-xl !tw-normal-case !tw-m-auto" color="#04B6F5" variant="outlined" @click="closeConfirmDialog">
                        Отмена
                    </v-btn>
                </section>
            </v-card-actions>
      </v-card>
    </v-dialog>
</template>
