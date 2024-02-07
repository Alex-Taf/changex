<script setup lang="ts">
import Header from '../components/common/Header/Header.vue'
import FinancesBalance from '../components/common/FinancesBalance/FinancesBalance.vue'
import FinancesTable from '../components/common/FinancesTable/FinancesTable.vue'
</script>

<template>
    <Header title="Финансы" />
    <section class="tw-flex tw-flex-col">
        <FinancesBalance />
        <FinancesTable />
    </section>
</template>