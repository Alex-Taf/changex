<script setup lang="ts">
import FinancesHeader from '../components/common/FinancesHeader/FinancesHeader.vue'
import FinancesBalance from '../components/common/FinancesBalance/FinancesBalance.vue'
</script>

<template>
    <FinancesHeader />
    <section class="tw-flex tw-flex-col">
        <FinancesBalance />
    </section>
</template>