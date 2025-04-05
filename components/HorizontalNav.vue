<template>
<div class="horizontal-nav">
    <div class="nav-item font-fira-sans" v-for="item in items">
        <nuxt-link :to="item.to">{{ item.label }}</nuxt-link>
    </div>
</div>
</template>
<script setup lang="ts">
import type {
    RouteLocationAsPathGeneric,
    RouteLocationAsRelativeGeneric
} from "vue-router";

defineProps<{
    items: {
        label: string,
        to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
    }[]
}>()
</script>
<style lang="scss">
.horizontal-nav {
    @apply sm:flex hidden items-center gap-2;
    .nav-item {
        @apply text-black uppercase tracking-wider;
        &:hover {
            @apply text-viking-500;
        }
    }
}
</style>