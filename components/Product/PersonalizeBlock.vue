<template>
    <div class="personalize-block" :class="{'valid': valid === true, 'invalid': valid === false}">
        <h3 class="font-fira-sans">{{ label }}</h3>
        <div class="personalize-items">
            <slot/>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    label: string
    valid: boolean | null
}>()
</script>
<style lang="scss">
.personalize-block {
    @apply md:w-[320px] lg:w-[425px] xl:w-[640px] select-none;
    @apply p-1 pt-0 bg-white border-l-storm-dust-100 border-l-[6px];
    .personalize-items {
        @apply grid grid-flow-col auto-cols-max gap-2 overflow-hidden p-2;
        grid-template-rows: repeat(2, min-content);
    }

    h3 {
        @apply py-3 indent-2;
    }

    &.valid {
        @apply border-l-viking-300;
    }

    &.invalid {
        @apply border-red-500 border-t-2 border-b-2 border-r-2;
    }
}
</style>