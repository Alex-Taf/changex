<script setup lang="ts">
import Header from '../components/common/Header/Header.vue'
import DisputList from '../components/common/DisputList/DisputList.vue'
</script>

<template>
    <Header title="Диспуты" />
    <section class="tw-flex tw-flex-col">
        <DisputList />
    </section>
</template>
