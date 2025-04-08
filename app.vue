<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>
<script setup lang="ts">
import { getLocalFontPreloads } from "~/utils/fonts";

const {siteName} = useAppConfig()

useHead({
    htmlAttrs: {
        lang: 'ru',
    },
    title: siteName,
    meta: [
        {
            name: 'description',
            content: 'Адресники',
        },
        {
            name: 'viewport',
            content:
                'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover',
        },
    ],
    link: [
        ...getLocalFontPreloads()
    ]
})
</script>
<style>
input::-ms-reveal,
input::-ms-clear {
    display: none;
}
</style>
