<template>
    <u-slideover :model-value="modelValue" @update:modelValue="update">
        <div class="p-5">
            <div
                class="justify-between flex w-full items-center text-2xl pb-3 font-bold"
            >
                {{ title }}
                <u-icon
                    class="cursor-pointer"
                    name="i-lucide-x"
                    @click="close"
                />
            </div>
            <slot />
        </div>
    </u-slideover>
</template>
<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean
    title: string
}>()
const update = (newValue: boolean) => {
    emit('update:modelValue', newValue)
}
const close = () => {
    update(false)
}
const emit = defineEmits(['update:modelValue'])
</script>
