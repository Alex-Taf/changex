<script setup lang="ts">
import { ref } from 'vue'
import Header from '../components/common/Header/Header.vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ArrowsClockwise from '@/components/icons/ArrowsClockwise.vue'
import Lightning from '@/components/icons/Lightning.vue'
import DepositeBalance from '@/components/icons/DepositeBalance.vue'
import ConfirmedDeal from '@/components/icons/ConfirmedDeal.vue'
import ActiveDevices from '@/components/icons/ActiveDevices.vue'
import PeriodGrow from '@/components/icons/PeriodGrow.vue'
import Question from '@/components/icons/Question.vue'
import RenderOn from '@/components/utils/RenderOn.vue'

const date = ref(['', ''])
const perc = ref(60)
</script>

<template>
    <Header title="Дашборд" />
    <section class="tw-flex tw-flex-col">
        <section class="tw-flex tw-justify-between tw-items-center tw-w-full tw-mb-6">
            <div class="tw-flex tw-items-center tw-gap-x-4">
                <RenderOn :px="1280">
                    <ArrowsClockwise stroke="#677483" />
                </RenderOn>
                <div class="tw-flex min-lg:tw-flex-col sm:tw-text-[10px] md:tw-text-[10px] sm:tw-gap-x-1 md:tw-gap-x-1 tw-leading-4">
                    <span class="tw-text-[15px] tw-text-[#677483]">Последнее обновление</span>
                    <span class="tw-text-[15px] tw-text-[#677483]">12.12.2024 09:46</span>
                </div>
            </div>
            <div class="min-lg:tw-w-[300px] sm:!tw-w-[30px] md:!tw-w-[30px]">
                <Datepicker
                    v-model="date"
                    input-class-name="tw-h-[56px] !tw-rounded-xl !tw-border-gray-400
                                    sm:!tw-bg-transparent md:!tw-bg-transparent
                                    sm:!tw-border-none md:!tw-border-none
                                    sm:!tw-w-[30px] md:!tw-w-[30px]"
                    menu-class-name="sm:!tw-fixed sm:tw-top-0 sm:tw-left-0 sm:tw-w-full sm:tw-h-[100dvh]
                                    md:!tw-fixed md:tw-top-0 md:tw-left-0 md:tw-w-full md:tw-h-[100dvh]"
                    :teleport="true"
                    :enable-time-picker="false"
                    multi-calendars
                    range
                    @cleared="date = ['', '']"
                >
                    <template #left-sidebar="props">
                        <RenderOn :px="1280">
                            <aside class="tw-flex tw-flex-col tw-gap-y-6 tw-w-[120px] tw-py-5 tw-px-3">
                                <span class="tw-text-[15px] tw-cursor-pointer hover:tw-text-[#677483]">Сегодня</span>
                                <span class="tw-text-[15px] tw-cursor-pointer hover:tw-text-[#677483]">Эта неделя</span>
                                <span class="tw-text-[15px] tw-cursor-pointer hover:tw-text-[#677483]">Этот месяц</span>
                                <span class="tw-text-[15px] tw-cursor-pointer hover:tw-text-[#677483]">Этот год</span>
                                <span class="tw-text-[15px] tw-cursor-pointer hover:tw-text-[#677483]">Всё время</span>
                            </aside>
                        </RenderOn>
                    </template>

                    <template #action-row="{ closePicker, selectDate }">
                        <div class="tw-h-[100px]"></div>
                        <section class="sm:tw-absolute sm:tw-bottom-2 tw-flex sm:tw-flex-col md:tw-flex-col sm:tw-gap-y-2 md:tw-gap-y-2 min-lg:tw-justify-end tw-items-center min-lg:tw-gap-x-1 tw-w-full">
                            <v-btn class="!tw-rounded-xl sm:!tw-w-[90%] md:!tw-w-[90%]" variant="outlined" color="#04B6F5" size="large" @click="closePicker">Отменить</v-btn>
                            <v-btn class="!tw-rounded-xl sm:!tw-w-[90%] md:!tw-w-[90%]" variant="elevated" color="#04B6F5" size="large" @click="selectDate">
                                <span class="tw-text-white">Применить</span>
                            </v-btn>
                        </section>
                    </template>
                </Datepicker>
            </div>
        </section>
        <section class="sm:tw-flex sm:tw-flex-col md:tw-flex md:tw-flex-col
                        min-lg:tw-grid min-lg:tw-grid-cols-3 min-lg:tw-grid-rows-2 tw-gap-4">
            <div class="tw-flex tw-flex-col tw-items-center min-lg:tw-row-span-2 min-lg:tw-min-w-[320px]
                        sm:tw-w-full md:tw-w-full tw-min-h-[226px] tw-max-h-[467px] tw-bg-white tw-rounded-2xl
                        tw-py-8 tw-px-4"
            >
                <div class="tw-mb-8">
                    <v-progress-circular
                        :model-value="perc"
                        :rotate="360"
                        :size="269"
                        :width="23"
                        bg-color="#EFC327"
                        color="#30DE61"
                    >
                        <div class="tw-flex tw-flex-col tw-items-center tw-gap-y-2">
                            <Lightning />
                            <span class="tw-text-[#677483]">Всего сделок</span>
                            <span class="tw-text-black tw-text-[40px] tw-font-extrabold">4 323</span>
                        </div>
                    </v-progress-circular>
                </div>
                <div class="tw-flex tw-justify-between tw-items-center tw-w-full tw-mb-3">
                    <span class="tw-text-[#677483] lg:tw-text-[15px] md:tw-text-[13px] sm:tw-text-[13px]">Завершённых сделок</span>
                    <span class="tw-font-semibold lg:tw-text-[15px] md:tw-text-[13px] sm:tw-text-[13px]">1 454</span>
                </div>
                <div class="tw-flex tw-justify-between tw-items-center tw-w-full tw-mb-3">
                    <span class="tw-text-[#677483] lg:tw-text-[15px] md:tw-text-[13px] sm:tw-text-[13px]">Сделок в процессе</span>
                    <span class="tw-font-semibold lg:tw-text-[15px] md:tw-text-[13px] sm:tw-text-[13px]">1 433</span>
                </div>
                <div class="tw-flex tw-justify-between tw-items-center tw-w-full tw-mb-3">
                    <span class="tw-text-[#677483] lg:tw-text-[15px] md:tw-text-[13px] sm:tw-text-[13px]">Сумма завершённых сделок, RUB</span>
                    <span class="tw-font-semibold lg:tw-text-[15px] md:tw-text-[13px] sm:tw-text-[13px]">2 456 433</span>
                </div>
            </div>
            <div class="sm:tw-w-full md:tw-w-full sm:tw-h-[75px] md:tw-h-[75px]
                        min-lg:tw-min-w-[320px] min-lg:tw-min-h-[226px] min-lg:tw-max-h-[467px] tw-bg-white tw-rounded-2xl sm:tw-p-4 md:tw-p-4 min-lg:tw-p-8"
            >
                <div class="tw-flex tw-flex-col tw-justify-between tw-w-full tw-h-full">
                    <RenderOn :px="1280">
                        <div class="tw-flex tw-justify-between tw-w-full">
                            <DepositeBalance />
                            <Question />
                        </div>
                    </RenderOn>
                    <div>
                        <span class="tw-text-[#677483] sm:tw-text-[10px] md:tw-text-[10px]">Баланс депозита</span><br>
                        <span class="sm:tw-text-2xl md:tw-text-2xl min-lg:tw-text-[32px] tw-font-semibold">25 456.01</span><span class="sm:tw-text-[15px] md:tw-text-[15px] min-lg:tw-text-2xl tw-font-semibold tw-text-[#AEB7C1]"> USD</span>
                    </div>
                </div>
            </div>
            <div class="sm:tw-w-full md:tw-w-full sm:tw-h-[75px] md:tw-h-[75px]
                        min-lg:tw-min-w-[320px] min-lg:tw-min-h-[226px] min-lg:tw-max-h-[467px] tw-bg-white tw-rounded-2xl sm:tw-p-4 md:tw-p-4 min-lg:tw-p-8"
            >
                <div class="tw-flex tw-flex-col tw-justify-between tw-w-full tw-h-full">
                    <RenderOn :px="1280">
                        <div class="tw-flex tw-justify-between tw-w-full">
                            <ConfirmedDeal />
                            <Question />
                        </div>
                    </RenderOn>
                    <div>
                        <span class="tw-text-[#677483] sm:tw-text-[10px] md:tw-text-[10px]">Подтверждённые сделки</span><br>
                        <span class="sm:tw-text-2xl md:tw-text-2xl min-lg:tw-text-[32px] tw-font-semibold">25 456.01</span><span class="sm:tw-text-[15px] md:tw-text-[15px] min-lg:tw-text-2xl tw-font-semibold tw-text-[#AEB7C1]"> USD</span>
                    </div>
                </div>
            </div>
            <div class="sm:tw-w-full md:tw-w-full sm:tw-h-[75px] md:tw-h-[75px]
                        min-lg:tw-min-w-[320px] min-lg:tw-min-h-[226px] min-lg:tw-max-h-[467px] tw-bg-white tw-rounded-2xl sm:tw-p-4 md:tw-p-4 min-lg:tw-p-8"
            >
                <div class="tw-flex tw-flex-col tw-justify-between tw-w-full tw-h-full">
                    <RenderOn :px="1280">
                        <div class="tw-flex tw-justify-between tw-w-full">
                            <ActiveDevices />
                            <Question />
                        </div>
                    </RenderOn>
                    <div>
                        <span class="tw-text-[#677483] sm:tw-text-[10px] md:tw-text-[10px]">Активные устройства</span><br>
                        <span class="sm:tw-text-2xl md:tw-text-2xl min-lg:tw-text-[32px] tw-font-semibold">4</span><span class="sm:tw-text-[15px] md:tw-text-[15px] min-lg:tw-text-2xl tw-font-semibold tw-text-[#AEB7C1]"> / 5</span>
                    </div>
                </div>
            </div>
            <div class="sm:tw-w-full md:tw-w-full sm:tw-h-[75px] md:tw-h-[75px]
                        min-lg:tw-min-w-[320px] min-lg:tw-min-h-[226px] min-lg:tw-max-h-[467px] tw-bg-white tw-rounded-2xl sm:tw-p-4 md:tw-p-4 min-lg:tw-p-8"
            >
                <div class="tw-flex tw-flex-col tw-justify-between tw-w-full tw-h-full">
                    <RenderOn :px="1280">
                        <div class="tw-flex tw-justify-between tw-w-full">
                            <PeriodGrow />
                            <Question />
                        </div>
                    </RenderOn>
                    <div>
                        <span class="tw-text-[#677483] sm:tw-text-[10px] md:tw-text-[10px]">Прибыль за период</span><br>
                        <span class="sm:tw-text-2xl md:tw-text-2xl min-lg:tw-text-[32px] tw-font-semibold">456</span><span class="sm:tw-text-[15px] md:tw-text-[15px] min-lg:tw-text-2xl tw-font-semibold tw-text-[#AEB7C1]"> USD</span>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
