<template>
    <footer class="bg-white mt-2 py-5">
        <u-container>
            <div class="text-sm flex flex-col md:flex-row items-center gap-2">
                <span class="font-sans">&copy;&nbsp;2025</span>
                <nuxt-link to="/details">Реквизиты</nuxt-link>
                <nuxt-link to="/privacy">Политика конфиденциальности</nuxt-link>
                <nuxt-link to="/offer">Оферта</nuxt-link>
                <pay-logos class="md:ml-auto lg:flex lg:max-w-none"/>
            </div>
        </u-container>
    </footer>
</template>
<script setup lang="ts">
</script>