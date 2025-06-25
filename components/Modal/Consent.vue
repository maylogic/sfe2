<template>
    <modal-closable v-model="modalStore.cookieTerms">
        <template #header>
            Политика использования cookies
        </template>
        <template #default>
            <p>Для обеспечения оптимальной работы, анализа использования и улучшения пользовательского опыта на
                веб-сайте могут использоваться системы веб-аналитики
                <nuxt-link @click="close" class="link" to="/metrika">(в том числе Яндекс.Метрика)</nuxt-link>
                , которые могут
                размещать на вашем устройстве cookie-файлы.
            </p>
            <p>Продолжая использование веб-сайта, вы соглашаетесь с применением указанных технологий и размещением
                cookie-файлов. Вы можете удалить cookie-файлы с вашего устройства через настройки браузера, а также
                заблокировать размещение cookie-файлов, однако при этом некоторые функции веб-сайта могут быть
                недоступными в связи с технологическими ограничениями движка.</p>
            <p>Дополнительную информацию вы можете найти в
                <nuxt-link @click="close" class="link" to="/privacy">политике конфиденциальности</nuxt-link>
                .
            </p>
        </template>
        <template #footer>
            <u-button @click="onButtonClick">Хорошо</u-button>
        </template>
    </modal-closable>
</template>
<script setup lang="ts">
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore()

const emit = defineEmits(['consent'])
const close = () => {
    modalStore.cookieTerms = false
}
const onButtonClick = () => {
    modalStore.cookieTerms = false
    emit('consent')
}
</script>