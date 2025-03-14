<template>
    <UInput :autocomplete="autocomplete"
            @update:modelValue="onChange"
            :model-value="modelValue"
            :type="show ? 'text': 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
            <form-button-show-password :show="show" @toggle="$emit('toggle')"/>
        </template>
    </UInput>
</template>
<script setup>
defineProps({
    show: {
        type: Boolean
    },
    modelValue: {
        type: String
    },
    autocomplete: {
        type: String,
        default: 'current-password'
    }
})
const onChange = (val) => {
    emit('update:modelValue', val);
}
const emit = defineEmits(['update:modelValue', 'toggle'])
</script>