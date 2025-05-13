<template>
    <div class="checkout-block py-2"
         :class="{ bordered, inactive, valid, invalid: !valid }">
        <div class="title font-iskra" v-if="label">
            <span>{{ label }}</span>
            <span v-if="valid" @click.prevent="emit('update:valid', null)" class="edit">изменить</span>
        </div>
        <div class="block-content">
            <slot/>
        </div>
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
const emit = defineEmits(['update:valid'])
</script>
<style lang="scss">
.checkout-block {
    @apply px-[20px];
    @apply bg-white w-full;
    &.invalid {
        @apply opacity-80;
    }

    &.valid {
        &.bordered {
            @apply border-l-robins-egg-blue-500;
        }

        .block-content {
            @apply hidden;
        }
    }

    .title {
        @apply text-xl flex items-center gap-5;
        .edit {
            @apply ml-auto uppercase text-xs text-storm-dust-800/50 cursor-pointer;
        }
    }

    &.bordered {
        @apply border-l-storm-dust-100 border-l-[6px] pl-[14px];
    }
}
</style>