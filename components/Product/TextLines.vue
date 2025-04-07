<template>
    <personalize-block :valid="valid" :index="index" label="Добавьте ваш текст">
        <div class="flex flex-col gap-2 pr-5 pl-3 pb-3">
            <personalize-text-input @update:text-line="update"
                                    v-for="def in data"
                                    :value="values.get(def.id)"
                                    :error="errors.get(def.id)"
                                    :def="def" :key="def.id"/>
        </div>
    </personalize-block>
</template>
<script setup lang="ts">
import type { ProductLineDefinition } from "~/gql/graphql";

const props = defineProps<{
    valid: boolean | null
    index: number
    data: Array<ProductLineDefinition>
    errors: Map<string, string>
    values: Map<string, string | null>
}>()

const update = (lineId: string, val: string | null) => {
    emit('update:text-line', lineId, val)
}

const emit = defineEmits(['update:text-line'])
</script>