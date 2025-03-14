<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
</template>
<script setup lang="ts">

const {siteName} = useAppConfig();

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    title: siteName,
    meta: [
        {
            name: 'description',
            content: 'NuxtCommerce is a dynamic e-commerce solution developed with Nuxt 3 and GraphQL, tailored for WooCommerce.'
        },
        {property: 'og:image', content: 'https://commerce.nuxt.dev/social-card.jpg'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@zhatlen'},
        {name: 'twitter:creator', content: '@zhatlen'},
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover'
        },
    ],
});

</script>
<style>
input::-ms-reveal,
input::-ms-clear {
    display: none;
}
</style>