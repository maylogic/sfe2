<template>
    <UButtonGroup size="sm">
        <UButton
            icon="i-heroicons-minus"
            color="gray"
            :disabled="quantity <= 1"
            @click="decrementQuantity"
        />
        <input
            :value="quantity"
            disabled
            class="w-12 text-center border rounded-md p-1"
        />
        <UButton
            icon="i-heroicons-plus"
            color="gray"
            @click="incrementQuantity"
        />
    </UButtonGroup>
</template>
<script setup lang="ts">
const props = defineProps<{
    quantity: number
}>()
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
