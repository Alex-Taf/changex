<script setup lang="ts">
import { ref, reactive } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { getNavItemStroke } from '@/utils'
import ArrowLeft from './components/icons/ArrowLeft.vue'
import ArrowRight from './components/icons/ArrowRight.vue'
import Squares from './components/icons/Squares.vue'
import CreditCard from './components/icons/CreditCard.vue'
import ArrowsLeftRight from './components/icons/ArrowsLeftRight.vue'
import Warning from './components/icons/Warning.vue'
import Mobile from './components/icons/Mobile.vue'

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
              <span v-show="!navOptions.rail" class="tw-font-bold tw-text-2xl tw-ml-3"
                >Changeex</span
              >
            </div>

            <v-list density="compact" nav>
              <template v-for="navItem in navItems" :key="navItem.id">
                <v-list-item :value="navItem.name" active-color="#F8FCFE" @click="$router.push(navItem.path)">
                  <template v-slot:prepend>
                    <component :is="navItem.icon" v-bind="{ stroke: getNavItemStroke(navItem.name, $route.name as string, { active: '#04B6F5', default: '#2B3A4C' }) }"></component>
                  </template>
                  <template v-slot:title>
                    <span class="tw-ml-2 tw-text-[15px] tw-text-[#2B3A4C]" v-show="!navOptions.rail">{{ navItem.title }}</span>
                  </template>
                </v-list-item>
              </template>
            </v-list>
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-4 tw-w-full tw-cursor-pointer" v-show="!navOptions.rail" @click="navOptions.rail = !navOptions.rail">
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

      <v-main class="tw-w-full md:!tw-pl-[74px]">
        <section class="tw-px-4">
          <RouterView />
        </section>
      </v-main>
    </v-layout>
  </div>
</template>
