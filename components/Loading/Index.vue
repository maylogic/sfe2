<template>
    <div class="loading flex items-center gap-2 p-5 mx-auto w-[310px] justify-center">
        <loading-icon/>
        <span class="font-fira-sans">{{ label }}</span>
    </div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
    label?: string
}>(), {
    label: 'Загрузка'
})
</script>