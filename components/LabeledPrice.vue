<template>
    <div class="" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
        <span class="font-fira-sans text-2xl price-label inline-block mr-1.5">{{ label }}</span>
        <slot/>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    label: string
}>()
</script>