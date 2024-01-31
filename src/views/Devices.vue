<script setup lang="ts">
import Header from '../components/common/Header/Header.vue'
import DeviceList from '../components/common/DeviceList/DeviceList.vue'
</script>

<template>
    <Header title="Устройства" />
    <section class="tw-flex tw-flex-col">
        <DeviceList />
    </section>
</template>
