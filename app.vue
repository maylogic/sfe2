<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>
<script setup lang="ts">
import { type ResolvableLink } from "@unhead/vue/types";

const {siteName} = useAppConfig()

const getFontPreloadLink = (href: string): ResolvableLink => {
    return ({
        rel: 'preload',
        href: `/fonts/${href}`,
        as: 'font',
        type: 'font/woff2',
        crossorigin: ''
    })
}

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
        getFontPreloadLink('bebasneuebold.woff2'),
        getFontPreloadLink('FiraSansBlackCyr.woff2'),
        getFontPreloadLink('FiraSansBlackCyrExt.woff2'),
        getFontPreloadLink('FiraSansBlackLat.woff2'),
        getFontPreloadLink('FiraSansBlackLatExt.woff2'),
        getFontPreloadLink('FiraSansBoldCyr.woff2'),
        getFontPreloadLink('FiraSansBoldCyrExt.woff2'),
        getFontPreloadLink('FiraSansBoldLat.woff2'),
        getFontPreloadLink('FiraSansBoldLatExt.woff2'),
        // TODO: перечислить здесь шрифты которые будут использоваться в редакторе
    ]
})
</script>
<style>
input::-ms-reveal,
input::-ms-clear {
    display: none;
}
</style>
