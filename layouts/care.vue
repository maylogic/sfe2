<template>
    <div class="care-page-layout">
        <header-default/>
        <cart-slideover/>
        <u-container>
            <main class="main-content">
                <slot/>
            </main>
        </u-container>
        <footer-content/>
    </div>
</template>
<style lang="scss">
.care-page-layout {
    @apply bg-storm-dust-50;
}

main.main-content {
    @apply min-h-screen mt-2;
}

footer {
    @apply text-sm py-2;
}
</style>
<script setup lang="ts">
</script>