<template>
    <div class="">
        <span class="font-fira-sans text-2xl price-label inline-block mr-1">{{ label }}</span>
        <slot/>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    label: string
}>()
</script>