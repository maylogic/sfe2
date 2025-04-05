<template>
    <u-dropdown
        :items="items"
        :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8,
        }"
        :ui="{
            width: 'auto',
        }"
    >
        <u-button
            icon="i-lucide-user" color="storm-dust" class="hover:text-primary-500"
            label="Кабинет"
            variant="outline"
        />
    </u-dropdown>
</template>
<script setup lang="ts">

const items = [
    [
        {
            label: 'Мой профиль',
            icon: 'i-lucide-user',
        },
        {
            label: 'Мои адреса',
            icon: 'i-lucide-credit-card',
        },
        {
            label: 'Мои заказы',
            icon: 'i-lucide-truck',
        },
    ],
]
</script>
