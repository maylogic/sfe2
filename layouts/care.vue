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
    .care-page {
        @apply bg-white py-2 px-5;
        h1 {
            @apply text-2xl;
        }

        h2 {
            @apply text-xl my-2;
        }

        & > div {
            @apply my-2;
        }

        table {
            @apply border-2 my-2;
            th, td {
                @apply border-2 text-left p-2;
            }
        }
    }
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