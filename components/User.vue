<template>
    <div class="flex items-center gap-2" v-if="!isAuthenticated">
        <u-button variant="outline" color="storm-dust" class="hover:text-primary-500" to="/login">
            Войти
        </u-button>
    </div>
    <customer-bar v-else/>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
await authStore.hydrate()

const {isAuthenticated} = storeToRefs(authStore)
</script>
