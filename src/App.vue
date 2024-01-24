<script setup lang="ts">
import { reactive } from 'vue'
import { RouterView } from 'vue-router'
import ArrowLeft from './components/icons/ArrowLeft.vue'
import ArrowRight from './components/icons/ArrowRight.vue'
import Squares from './components/icons/Squares.vue'
import CreditCard from './components/icons/CreditCard.vue'
import ArrowsLeftRight from './components/icons/ArrowsLeftRight.vue'
import Warning from './components/icons/Warning.vue'
import Mobile from './components/icons/Mobile.vue'

const navOptions = reactive({
  drawer: true,
  rail: true,
  minWidth: 74,
  maxWidth: 297
})
</script>

<template>
  <div class="tw-flex">
    <v-layout class="tw-absolute tw-p-[24px]">
      <v-navigation-drawer
        class="tw-rounded-2xl !tw-left-[20px] !tw-top-[10px] !tw-max-h-[96%]"
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
              <v-list-item value="home">
                <template v-slot:prepend>
                  <Squares />
                </template>
                <template v-slot:title>
                  <span class="tw-ml-2" v-show="!navOptions.rail">Финансы</span>
                </template>
              </v-list-item>
              <v-list-item value="account">
                <template v-slot:prepend>
                  <CreditCard />
                </template>
                <template v-slot:title>
                  <span class="tw-ml-2" v-show="!navOptions.rail">Банковские карты</span>
                </template>
              </v-list-item>
              <v-list-item value="account">
                <template v-slot:prepend>
                  <ArrowsLeftRight />
                </template>
                <template v-slot:title>
                  <span class="tw-ml-2" v-show="!navOptions.rail">Платежи</span>
                </template>
              </v-list-item>
              <v-list-item value="account">
                <template v-slot:prepend>
                  <Warning />
                </template>
                <template v-slot:title>
                  <span class="tw-ml-2" v-show="!navOptions.rail">Диспуты</span>
                </template>
              </v-list-item>
              <v-list-item value="account">
                <template v-slot:prepend>
                  <Mobile />
                </template>
                <template v-slot:title>
                  <span class="tw-ml-2" v-show="!navOptions.rail">Устройства</span>
                </template>
              </v-list-item>
            </v-list>
          </div>
          <div class="tw-flex tw-items-center tw-gap-x-4 tw-w-full" v-show="!navOptions.rail" @click="navOptions.rail = !navOptions.rail">
            <ArrowLeft />
            <p>Скрыть меню</p>
          </div>
          <div
            class="tw-flex tw-items-center tw-justify-center tw-self-end tw-w-full"
            v-show="navOptions.rail"
            @click="navOptions.rail = !navOptions.rail"
          >
            <span><ArrowRight /></span>
          </div>
        </div>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <RouterView />
      </v-main>
    </v-layout>
  </div>
</template>
