<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api'
import { useRouter } from 'vue-router'

const $router = useRouter()

const token = ref('')

function tokenLogin() {
    login(token.value).then(() => {
        $router.push('/finances')
    })
}
</script>

<template>
    <section class="flex">
        <v-text-field v-model.trim="token" label="Token"></v-text-field>
        <v-btn @click="tokenLogin">Войти</v-btn>
    </section>
</template>
