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
    ],

    script: [
        {
            innerHTML: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PQ3Z5R55');
`
        }
    ],
    noscript: [
        {innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQ3Z5R55" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}
    ]
})
</script>
<style>
input::-ms-reveal,
input::-ms-clear {
    display: none;
}
</style>
