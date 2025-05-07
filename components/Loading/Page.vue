<template>
    <div class="flex flex-col gap-2 p-5 mx-auto w-[200px] h-full">
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