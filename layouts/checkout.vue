<template>
    <div class="checkout-page-layout">
        <header-checkout/>
        <main class="main-content-checkout">
            <slot/>
        </main>
    </div>
    <footer-content/>
</template>
<style lang="scss">
.checkout-page-layout {
    @apply bg-storm-dust-50;
}

footer {
    @apply text-sm py-2;
}
</style>
<script setup lang="ts">
</script>