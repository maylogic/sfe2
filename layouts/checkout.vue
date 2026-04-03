<template>
    <div class="checkout-page-layout">
        <header-checkout/>
        <main class="main-content-checkout">
            <slot/>
            <modal-return-policy/>
        </main>
    </div>
    <footer-content/>
</template>
<style lang="scss">
.checkout-page-layout {
    @apply bg-storm-dust-50 dark:bg-storm-dust-950;
}

.main-content-checkout {
    @apply min-h-screen;
}

footer {
    @apply text-sm py-2;
}
</style>
<script setup lang="ts">
</script>