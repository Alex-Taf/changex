<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { logout } from '@/api'
import RenderOn from '@/components/utils/RenderOn.vue'
import Rate from '@/components/info/Rate.vue'
import Avatar from '../../user/Avatar/Avatar.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const $router = useRouter()

const props = defineProps<{
    title: string
}>()

function exit() {
    logout().then(() => {
        console.log('logout')
        $router.push('/')
    })
}

onMounted(() => {
    userStore.fetchUserInfo()
})
</script>

<template>
    <header class="tw-flex tw-justify-between tw-w-full tw-mb-6">
        <span class="tw-text-2xl">{{ props.title }}</span>
        <RenderOn :px="1280">
            <section class="tw-flex tw-items-center">
                <div class="tw-flex tw-items-center tw-gap-x-4">
                    <Rate />
                    <div class="tw-flex tw-gap-x-2">
                        <div class="tw-flex tw-flex-col">
                            <span v-if="userInfo && userInfo?.maskedToken" class="tw-text-[15px]">{{ userInfo?.maskedToken }}</span>
                            <span v-else>*********</span>
                            <span
                                class="tw-self-end tw-text-[#04B6F5] tw-text-[10px] tw-cursor-pointer tw-select-none"
                                @click="exit"
                            >
                                Выйти
                            </span>
                        </div>
                        <div><Avatar /></div>
                    </div>
                </div>
            </section>
        </RenderOn>
    </header>
</template>
