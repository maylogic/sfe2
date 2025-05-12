<template>
    <div class="checkout-page-layout">
        <div class="py-5 px-0 mb-5 w-full bg-white">
            <div class="flex items-center max-w-[960px] px-5 mx-auto">
                <horizontal-nav v-if="!!menuItems.length" :items="menuItems"/>
                <u-button
                    color="white"
                    v-if="!!menuItems.length"
                    class="sm:hidden"
                    icon="i-lucide-menu"
                    @click="menuOpen = !menuOpen"
                />
                <div class="ml-auto flex items-center gap-2 font-iskra text-xl">
                    <u-icon class="text-[32px] mt-[-5px]" name="i-lucide-lock"/>
                    Оформление заказа
                </div>
            </div>
        </div>
        <closable-slideover title="Меню" v-model="menuOpen">
            <u-vertical-navigation @click="menuOpen = false" :links="menuItems"/>
        </closable-slideover>
        <main class="main-content">
            <slot/>
        </main>
        <footer class="bg-white">
            <u-container class="mx-auto">
                <footer-content/>
            </u-container>
        </footer>
    </div>
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
<style lang="scss">
.checkout-page-layout {
    @apply bg-storm-dust-50;
}

main.main-content {
    @apply min-h-screen;
}

footer {
    @apply text-sm py-2;
}
</style>
