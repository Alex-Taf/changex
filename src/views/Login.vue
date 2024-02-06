<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api'
import { useRouter } from 'vue-router'
import RenderOn from '@/components/utils/RenderOn.vue'

const $router = useRouter()

const token = ref('')

function tokenLogin() {
    login(token.value).then(() => {
        $router.push('/finances')
    })
}
</script>

<template>
    <section class="tw-flex tw-flex-col tw-justify-center tw-h-[calc(100vh-0px)] sm:tw-bg-white">
        <RenderOn :px="1280">
            <div
                class="tw-absolute tw-bg-radial-gradient tw-h-2/3 tw-w-1/2 -tw-bottom-[100px] -tw-left-[300px] -tw-z-10"
            ></div>
            <div
                class="tw-absolute tw-bg-radial-gradient tw-h-2/3 tw-w-1/2 -tw-top-[100px] -tw-right-[300px] -tw-z-10"
            ></div>
        </RenderOn>
        <section class="tw-flex tw-justify-center tw-items-center tw-gap-x-20">
            <RenderOn :px="1280">
                <img src="/login.png" />
            </RenderOn>
            <div
                class="tw-flex tw-flex-col tw-justify-center tw-items-center
                        md:tw-w-[512px] md:tw-h-[485px] min-lg:tw-w-[512px]
                        sm:tw-w-full sm:tw-h-full
                        min-lg:tw-h-[485px] tw-bg-white tw-rounded-2xl tw-gap-y-10"
            >
                <span class="tw-text-2xl tw-font-semibold">Авторизация</span>
                <v-responsive class="mx-auto" min-width="320" max-width="462" min-height="64" max-height="64">
                    <v-text-field
                        v-model.trim="token"
                        label="Token"
                        variant="outlined"
                        single-line
                    ></v-text-field>
                </v-responsive>
                <v-responsive class="mx-auto" min-width="320" max-width="462" min-height="72" max-height="72">
                    <v-btn
                        class="!tw-rounded-2xl !tw-normal-case !tw-w-full hover:!tw-shadow-[0px_10px_18px_2px_rgba(4,182,245,0.2)]"
                        @click="tokenLogin"
                        variant="elevated"
                        color="#04B6F5"
                        size="x-large"
                    >
                        <span class="tw-text-white tw-text-[15px] tw-tracking-normal"
                            >Войти</span
                        >
                    </v-btn>
                </v-responsive>
            </div>
        </section>
    </section>
</template>
