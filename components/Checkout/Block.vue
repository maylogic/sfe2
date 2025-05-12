<template>
    <div class="checkout-block py-2"
         :class="{ bordered, inactive, valid, invalid: !valid }">
        <div class="title font-iskra" v-if="label">{{ label }}</div>
        <slot/>
    </div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
    bordered?: boolean
    label?: string | undefined
    inactive?: boolean
    valid?: boolean | null
}>(), {
    inactive: false,
    bordered: true,
    valid: null
})
</script>
<style lang="scss">
.checkout-block {
    @apply px-[20px];
    @apply bg-white w-full;
    &.invalid {
        @apply opacity-80;
    }

    .title {
        @apply text-xl;
    }

    &.bordered {
        @apply border-l-storm-dust-100 border-l-[6px] pl-[14px];
    }
}
</style>