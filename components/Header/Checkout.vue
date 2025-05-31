<template>
    <div class="py-5 px-0 w-full bg-white">
        <div class="flex items-center max-w-[960px] px-5 mx-auto">
            <horizontal-nav v-if="!!menuItems.length" :items="menuItems"/>
            <u-button
                color="white"
                v-if="!!menuItems.length"
                class="sm:hidden"
                icon="i-lucide-menu"
                @click="menuOpen = !menuOpen"
            />
            <div class="ml-auto flex items-center gap-2 font-iskra text-base">
                <u-icon class="text-[20px]" name="i-lucide-lock"/>
                Оформление заказа
            </div>
        </div>
    </div>
    <closable-slideover title="Меню" v-model="menuOpen">
        <u-vertical-navigation @click="menuOpen = false" :links="menuItems"/>
    </closable-slideover>
</template>
<script setup lang="ts">

const menuOpen = ref(false)
const menuItems = [
    {
        label: 'Главная',
        to: '/',
    },
]
</script>