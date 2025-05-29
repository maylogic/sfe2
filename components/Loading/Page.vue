<template>
    <div class="flex flex-col gap-2 p-5 mx-auto w-[310px] justify-center sticky top-1/2 -translate-y-1/2">
        <span class="font-fira-sans">{{ label }}</span>
        <u-progress/>
    </div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
    label?: string
}>(), {
    label: 'Загрузка...'
})
</script>