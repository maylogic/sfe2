<template>
    <div class="personalize-block" :class="{'valid': valid === true, 'invalid': valid === false}">
        <h3 class="font-iskra">{{ index }}. {{ label }}</h3>
        <slot/>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    index: number
    label: string
    valid: boolean | null
}>()
</script>
<style lang="scss">
.personalize-block {
    @apply w-full select-none;
    @apply p-[6px] pr-0 bg-white dark:bg-black border-l-storm-dust-100 border-l-[6px];

    h3 {
        @apply pb-2 pt-0 indent-3 text-lg;
    }

    &.valid {
        @apply border-l-viking-300;
    }

    &.invalid {
        @apply border-red-500 border-t-2 border-b-2 border-r-2 p-[4px] pr-0 pl-[6px];
    }
}
</style>