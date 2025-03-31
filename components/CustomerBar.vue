<template>
    <u-dropdown
        :items="items"
        :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
        }"
        :ui="{
            width: 'w-64',
        }"
    >
        <u-button
            class="w-64 hidden sm:flex"
            :label="`Здравствуйте, ${auth.user?.name}`"
            icon="i-lucide-menu"
            variant="outline"
        />
        <u-button
            class="flex sm:hidden"
            icon="i-lucide-menu"
            label="Профиль"
            variant="outline"
        />
    </u-dropdown>
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const items = [
    [
        {
            label: 'Profile',
            icon: 'i-lucide-user',
        },
        {
            label: 'Billing',
            icon: 'i-lucide-credit-card',
        },
        {
            label: 'Settings',
            icon: 'i-lucide-cog',
        },
    ],
]
</script>
