<template>
    <u-form-group :error="error">
        <div class="grid grid-cols-[1fr__max-content] items-center gap-5">
            <u-input size="xl"
                     :maxlength="def.max_length"
                     :placeholder="def.required ? def.label + '*' : def.label"
                     @update:modelValue="update"
                     :model-value="value??''"
                     :required="def.required"/>
            <div class="bg-dust-500 flex flex-col text-center items-center justify-center cursor-pointer"
                 v-if="!def.required"
                 @click="hide">
                <div class="rounded-full w-6 h-6 bg-storm-dust-100 flex items-center justify-center">
                    <u-icon class="w-4 h-4" name="i-lucide-minus"/>
                </div>
                <span class="text-xs">скрыть</span>
            </div>
        </div>
    </u-form-group>
</template>
<script lang="ts" setup>
import type { ProductLineDefinition } from "~/gql/graphql";

const props = defineProps<{
    def: ProductLineDefinition
    error?: string
    value?: string | null
}>()

const update = (newVal: string) => {
    emit('update:text-line', props.def.id, newVal.length ? newVal : null)
}

const hide = () => {
    emit('hide', props.def.id)
}

const emit = defineEmits(['update:text-line', 'hide'])
</script>