<template>
    <UButton
        color="gray"
        variant="link"
        :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        :aria-pressed="show"
        @click="$emit('toggle')"
    />
</template>
<script setup>
defineProps({
    show: {
        type: Boolean,
    },
})
defineEmits(['toggle'])
</script>
