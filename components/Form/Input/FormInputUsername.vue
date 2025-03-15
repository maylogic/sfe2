<template>
    <UInput
        :autocomplete="autocomplete"
        @update:modelValue="onChange"
        :model-value="modelValue"
        placeholder="you@example.com"
        icon="i-heroicons-envelope"
    />
</template>
<script setup>
defineProps({
    show: {
        type: Boolean,
    },
    modelValue: {
        type: String,
    },
    autocomplete: {
        type: String,
        default: 'username',
    },
})
const onChange = (val) => {
    emit('update:modelValue', val)
}
const emit = defineEmits(['update:modelValue'])
</script>
