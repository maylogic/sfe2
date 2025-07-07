<script setup>
import {useBooleanCookie} from '~/composables/useBooleanCookie'
import {useModalStore} from "~/stores/modal";

const oneYearFromNow = new Date();
oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
const consentGiven = useBooleanCookie('consent_banner_closed', {
    expires: oneYearFromNow
})
const modalStore = useModalStore()

const consent = () => {
    consentGiven.value = true
}
</script>

<template>
    <div v-if="!consentGiven" class="cookie-consent-banner">
        <u-container>
            <u-card :ui="{ body: {padding: 'p-3 sm:p-3'},footer: {padding: 'p-3 sm:p-3'} }">
                <div class="flex items-start w-full gap-2">
                    <span>
                        Мы используем файлы cookies. Оставаясь на нашем сайте, вы соглашаетесь с&nbsp;
                        <a class="link" href="#"
                           @click.prevent="modalStore.cookieTerms=true">условиями их использования</a>.
                    </span>
                    <u-icon name="i-lucide-x" class="ml-auto cursor-pointer shrink-0" @click="consent"/>
                </div>
                <template #footer>
                    <u-button size="xs" @click="consent">Хорошо</u-button>
                </template>
            </u-card>
        </u-container>
    </div>
    <modal-consent @consent="consent"/>
</template>

<style lang="scss">
.cookie-consent-banner {
    @apply fixed bottom-0 w-full py-2 text-xs z-10;
}
</style>