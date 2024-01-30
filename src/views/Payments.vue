<script setup lang="ts">
import Header from '../components/common/Header/Header.vue'
import PaymentList from '../components/common/PaymentList/PaymentList.vue'
</script>

<template>
    <Header title="Платежи" />
    <section class="tw-flex tw-flex-col">
        <PaymentList />
    </section>
</template>
