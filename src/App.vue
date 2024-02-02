<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { getNavItemStroke } from '@/utils'
import RenderOn from './components/utils/RenderOn.vue'
import ArrowLeft from './components/icons/ArrowLeft.vue'
import ArrowRight from './components/icons/ArrowRight.vue'
import Squares from './components/icons/Squares.vue'
import CreditCard from './components/icons/CreditCard.vue'
import ArrowsLeftRight from './components/icons/ArrowsLeftRight.vue'
import Warning from './components/icons/Warning.vue'
import Mobile from './components/icons/Mobile.vue'
import Menu from './components/icons/Menu.vue'
import Close from './components/icons/Close.vue'
import Avatar from './components/user/Avatar/Avatar.vue'
import Rate from './components/info/Rate.vue'

const $router = useRouter()

const navOptions = reactive({
    drawer: true,
    rail: true,
    minWidth: 74,
    maxWidth: 297
})

const navItems = ref([
    {
        id: 0,
        title: 'Финансы',
        path: '/finances',
        name: 'finances',
        icon: Squares
    },
    {
        id: 1,
        title: 'Банковские карты',
        path: '/cards',
        name: 'cards',
        icon: CreditCard
    },
    {
        id: 2,
        title: 'Платежи',
        path: '/payments',
        name: 'payments',
        icon: ArrowsLeftRight
    },
    {
        id: 3,
        title: 'Диспуты',
        path: '/disputs',
        name: 'disputs',
        icon: Warning
    },
    {
        id: 4,
        title: 'Устройства',
        path: '/devices',
        name: 'devices',
        icon: Mobile
    }
])
</script>

<template>
    <div class="tw-flex">
        <v-layout class="tw-absolute tw-p-[24px] tw-w-full">
            <RenderOn :px="1280">
                <v-navigation-drawer
                    class="tw-rounded-2xl !tw-left-[20px] !tw-top-[24px] !tw-max-h-[95%] !tw-translate-x-0"
                    :width="navOptions.maxWidth"
                    :rail-width="navOptions.minWidth"
                    v-model="navOptions.drawer"
                    :rail="navOptions.rail"
                >
                    <div class="tw-flex tw-flex-col tw-justify-between tw-p-3 tw-h-full">
                        <div>
                            <div class="tw-flex tw-items-center">
                                <div class="tw-w-[56px] tw-h-[61px]">
                                    <v-img :width="56" :height="61" src="/logo.png"></v-img>
                                </div>
                                <span
                                    v-show="!navOptions.rail"
                                    class="tw-font-bold tw-text-2xl tw-ml-3"
                                    >Changeex</span
                                >
                            </div>

                            <v-list density="compact" nav>
                                <template v-for="navItem in navItems" :key="navItem.id">
                                    <v-list-item
                                        :value="navItem.name"
                                        active-color="#F8FCFE"
                                        @click="$router.push(navItem.path)"
                                    >
                                        <template v-slot:prepend>
                                            <component
                                                :is="navItem.icon"
                                                v-bind="{
                                                    stroke: getNavItemStroke(
                                                        navItem.name,
                                                        $route.name as string,
                                                        { active: '#04B6F5', default: '#2B3A4C' }
                                                    )
                                                }"
                                            ></component>
                                        </template>
                                        <template v-slot:title>
                                            <span
                                                class="tw-ml-2 tw-text-[15px] tw-text-[#2B3A4C]"
                                                v-show="!navOptions.rail"
                                                >{{ navItem.title }}</span
                                            >
                                        </template>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </div>
                        <div
                            class="tw-flex tw-items-center tw-gap-x-4 tw-w-full tw-cursor-pointer"
                            v-show="!navOptions.rail"
                            @click="navOptions.rail = !navOptions.rail"
                        >
                            <ArrowLeft />
                            <p class="tw-select-none tw-text-[15px]">Скрыть меню</p>
                        </div>
                        <div
                            class="tw-flex tw-items-center tw-justify-center tw-self-end tw-w-full tw-cursor-pointer"
                            v-show="navOptions.rail"
                            @click="navOptions.rail = !navOptions.rail"
                        >
                            <span><ArrowRight /></span>
                        </div>
                    </div>
                </v-navigation-drawer>
            </RenderOn>

            <RenderOn :px-min="320" :px-max="1279">
                <v-app-bar color="white" prominent :height="101">
                    <div class="tw-flex tw-flex-col tw-items-center tw-w-[calc(100%-0px)] tw-p-4">
                        <div class="tw-flex tw-justify-between tw-items-center tw-w-full">
                            <div class="tw-flex tw-items-center">
                                <div class="tw-w-[36px] tw-h-[41px]">
                                    <v-img :width="36" :height="41" src="/logo.png"></v-img>
                                </div>
                                <span
                                    class="tw-font-bold tw-text-xl tw-ml-3"
                                    >Changeex</span
                                >
                            </div>
                            <div class="tw-cursor-pointer" @click.stop="navOptions.drawer = !navOptions.drawer">
                              <Menu v-if="navOptions.drawer" />
                              <Close v-else />
                            </div>
                        </div>
                        <div class="tw-mt-1">
                          <Rate />
                        </div>
                    </div>
                </v-app-bar>
                <div
                    class="tw-fixed tw-flex tw-flex-col tw-justify-between tw-w-full tw-h-[calc(100vh-101px)] tw-bg-white tw-z-10 tw-left-0 tw-top-[101px] tw-px-8 tw-py-5"
                    v-show="!navOptions.drawer"
                >
                    <v-list density="compact" nav>
                        <template v-for="navItem in navItems" :key="navItem.id">
                            <v-list-item
                                class="tw-h-[68px]"
                                :value="navItem.name"
                                active-color="#F8FCFE"
                                @click="$router.push(navItem.path)"
                            >
                                <template v-slot:prepend>
                                    <component
                                        :is="navItem.icon"
                                        v-bind="{
                                            stroke: getNavItemStroke(
                                                navItem.name,
                                                $route.name as string,
                                                { active: '#04B6F5', default: '#2B3A4C' }
                                            )
                                        }"
                                    ></component>
                                </template>
                                <template v-slot:title>
                                    <span class="tw-ml-2 tw-text-[15px] tw-text-[#2B3A4C]">{{
                                        navItem.title
                                    }}</span>
                                </template>
                            </v-list-item>
                        </template>
                    </v-list>
                    <div class="tw-flex tw-w-full tw-justify-between tw-items-center">
                      <div class="tw-flex tw-items-center tw-gap-x-2">
                        <Avatar />
                        <span class="tw-text-[15px]">89876543210</span>
                      </div>
                      <span class="tw-text-[#04B6F5] tw-text-[15px] tw-cursor-pointer tw-select-none">Выйти</span>
                    </div>
                </div>
            </RenderOn>

            <v-main class="tw-w-full">
                <section class="tw-px-4">
                    <RouterView />
                </section>
            </v-main>
        </v-layout>
    </div>
</template>
