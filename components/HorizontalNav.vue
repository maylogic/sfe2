<template>
<div class="horizontal-nav">
    <div class="nav-item font-fira-sans" v-for="item in items">
        <nuxt-link v-if="item.to" @click="item.onClick" :to="item.to">{{ item.label }}</nuxt-link>
        <span v-else @click="item.onClick">{{ item.label }}</span>
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
        to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined,
        onClick?: () => void
    }[]
}>()
</script>
<style lang="scss">
.horizontal-nav {
    @apply sm:flex hidden items-center gap-5;
    .nav-item {
        @apply text-black dark:text-white uppercase tracking-wider cursor-pointer;
        &:hover {
            @apply text-viking-500 dark:text-brilliant-rose-500;
        }
    }
}
</style>