<template>
    <div class="flex items-center">
        <UButton
            icon="i-heroicons-minus"
            color="gray"
            :disabled="quantity <= 1"
            @click="decrementQuantity"
        />
        <input
            :value="quantity"
            disabled
            class="w-8 text-center p-1"
        />
        <UButton
            icon="i-heroicons-plus"
            color="gray"
            @click="incrementQuantity"
        />
    </div>
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
