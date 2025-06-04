<template>
    <footer class="bg-white mt-2 py-5">
        <u-container>
            <div class="flex flex-col gap-2 max-w-[280px] md:max-w-none mx-auto items-center md:items-start text-center md:text-left">
                <div class="text-sm flex flex-col md:flex-row items-center gap-2 w-full">
                    <div class="flex flex-col md:flex-row items-center gap-2">
                        <nuxt-link to="/details">Реквизиты</nuxt-link>
                        <nuxt-link to="/privacy">Политика конфиденциальности</nuxt-link>
                        <nuxt-link to="/offer">Оферта</nuxt-link>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-2 items-center md:items-start w-full">
                    <div class="flex flex-col gap-2 items-center md:items-start">
                        <nuxt-link to="/metrika">
                            Согласие на обработку персональных данных с помощью сервиса «ЯНДЕКС.МЕТРИКА»
                        </nuxt-link>
                        <span class="font-sans">&copy;&nbsp;2025</span>
                    </div>
                    <pay-logos class="md:ml-auto"/>
                </div>
            </div>
        </u-container>
    </footer>
</template>
<script setup lang="ts">
</script>