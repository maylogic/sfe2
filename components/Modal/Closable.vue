<template>
    <u-modal :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)">
        <u-card>
            <template #header>
                <div class="flex items-center w-full">
                    <slot name="header"/>
                    <u-icon
                        class="cursor-pointer ml-auto"
                        name="i-lucide-x"
                        @click="emit('update:modelValue', false)"
                    />
                </div>
            </template>
            <template #default>
                <slot name="default"/>
            </template>
            <template #footer v-if="$slots.footer">
                <slot name="footer"/>
            </template>
        </u-card>
    </u-modal>
</template>
<script setup lang="ts">
defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])
</script>