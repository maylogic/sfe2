<template>
    <u-form-group :error="error">
        <u-input size="xl" :placeholder="def.required ? def.label + '*' : def.label"
                 @update:modelValue="update"
                 :model-value="value??''"
                 :required="def.required"/>
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

const emit = defineEmits(['update:text-line'])
</script>