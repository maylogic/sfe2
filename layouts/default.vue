<template>
    <UContainer>
        <UHorizontalNavigation :links="links"/>
        <slot/>
    </UContainer>
</template>
<script setup lang="ts">
const links = [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
}, {
    label: 'Login',
    to: '/login'
}, {
    label: 'Register',
    to: '/register'
}]
</script>