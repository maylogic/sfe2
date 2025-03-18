<template>
    <div>
        <h3>{{ code }}:</h3>
        <label v-for="value in availableValues" :key="value">
            <u-checkbox v-model="selected" :value="value" :label="value" />
        </label>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FilterAttributes } from '~/composables/useFilters'

const props = defineProps<{
    code: string
    attributes: FilterAttributes
    availableValues: string[]
}>()

const emit = defineEmits(['update:attributes'])

const selected = computed({
    get() {
        return props.attributes[props.code] || []
    },
    set(selected) {
        const attrs = props.attributes
        if (selected.length > 0) {
            attrs[props.code] = selected
        } else {
            delete attrs[props.code]
        }
        emit('update:attributes', attrs)
    },
})
</script>

<style scoped>
label {
    display: block;
    margin: 5px 0;
}
</style>
