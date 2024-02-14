<script setup lang="ts">
import Header from '../components/common/Header/Header.vue'
import NotificationsList from '../components/common/NotificationsList/NotificationsList.vue'
</script>

<template>
    <Header title="Уведомления" />
    <section class="tw-flex tw-flex-col">
        <NotificationsList />
    </section>
</template>
