<template>
    <div class="flex items-center gap-2" v-if="!auth.isAuthenticated">
        <u-button variant="outline" color="storm-dust" class="hover:text-brilliant-rose-500" to="/login">Войти
        </u-button>
        <u-button variant="outline" color="storm-dust" class="hover:text-brilliant-rose-500" to="/register">
            Регистрация
        </u-button>
    </div>
    <customer-bar v-else/>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import CustomerBar from '~/components/CustomerBar.vue'

const auth = useAuthStore()
await auth.hydrate()
</script>
