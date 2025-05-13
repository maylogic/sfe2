<template>
    <div class="flex items-center quantity-input" :class="{'disabled' : disabled}">
        <UButton
            icon="i-heroicons-minus"
            color="gray"
            size="2xs"
            :disabled="disabled || quantity <= 1"
            @click.prevent="decrementQuantity"
        />
        <input
            :value="quantity"
            disabled
            class="w-7 text-center p-1 font-sans font-normal text-sm quantity-input-text"
        />
        <UButton
            icon="i-heroicons-plus"
            color="gray"
            size="2xs"
            @click.prevent="incrementQuantity"
            :disabled="disabled"
        />
    </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
    quantity: number
    disabled: boolean
}>(), {disabled: false})
const emit = defineEmits(['update:quantity'])
const incrementQuantity = () => {
    emit('update:quantity', props.quantity + 1)
}

const decrementQuantity = () => {
    if (props.quantity > 1) {
        emit('update:quantity', props.quantity - 1)
    }
}
</script>
<style>
.quantity-input {
    .quantity-input-text {
        @apply bg-transparent border-none outline-none outline-0;
    }
}
</style>