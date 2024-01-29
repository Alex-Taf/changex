<script setup lang="ts">
import { ref, watch } from "vue"
import CopyIcon from "../../icons/CopyIcon.vue"
import Attention from "../../messages/Attention.vue"

const props = defineProps<{
    open: boolean
}>()

const dialog = ref(false)

const emit = defineEmits<{
    (e: 'close', open: boolean): void
}>()

watch(props, async (nextValue: Record<any, boolean>, _prevValue: Record<any, boolean>) => {
    dialog.value = nextValue.open
})

function close(closeFlag: boolean) {
  dialog.value = closeFlag;
  emit("close", closeFlag);
}
</script>

<template>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card class="tw-flex tw-flex-col tw-items-center !tw-rounded-2xl !tw-p-[48px]">
        <span class="tw-text-2xl tw-mb-[34px]">Пополнение баланса</span>
        <span class="tw-text-[#677483]">Адрес USDT</span>
        <div class="tw-flex tw-gap-x-4 tw-mb-[24px]">
          <span class="tw-text-lg tw-font-semibold">0000x34h3jk534jk5h45kh8cvb86bfdfs34h3jk</span>
          <div class="tw-cursor-pointer">
            <CopyIcon />
          </div>
        </div>
        <div class="tw-mb-[24px] tw-w-[466px] tw-text-center">
          <span class="tw-break-words tw-overflow-ellipsis">
            Данный кошелек привязан к Вам, пополняйте его в любое время дня и ночи - средства всегда зачислятся на баланс
          </span>
        </div>
        <Attention class="tw-mb-[24px]" text="Внимание! Не отправляйте USDT с Garantex - это приведет к блокировке аккаунта, также нельзя отправлять грязный по AML USDT" />
        <v-card-actions>
          <v-btn class="tw-w-[426px] !tw-rounded-xl !tw-normal-case" color="#04B6F5" variant="outlined" block @click="close(false)">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
