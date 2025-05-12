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
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(101769326, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        ecommerce:"dataLayer"
   });
      `,
        },
    ],
    noscript: [
        {
            innerHTML: '<img src="https://mc.yandex.ru/watch/XXXXXX " style="position:absolute; left:-9999px;" alt="" />',
        },
    ],
})
</script>
<style>
input::-ms-reveal,
input::-ms-clear {
    display: none;
}
</style>
