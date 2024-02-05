<script setup lang="ts">
import Header from '../components/common/Header/Header.vue'
import FinancesBalance from '../components/common/FinancesBalance/FinancesBalance.vue'
import FinancesTable from '../components/common/FinancesTable/FinancesTable.vue'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { fetchUserInfo } = storeToRefs(userStore)

onMounted(() => {
    userStore.fetchUserInfo()
})
</script>

<template>
    <Header title="Финансы" />
    <section class="tw-flex tw-flex-col">
        <FinancesBalance />
        <FinancesTable />
    </section>
</template>