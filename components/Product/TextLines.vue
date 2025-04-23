<template>
    <personalize-block :valid="valid" :index="index" label="Добавьте ваш текст">
        <div class="flex flex-col gap-2 pr-5 pl-3 pb-3">
            <personalize-text-input @update:text-line="update"
                                    @hide="emit('hide', $event)"
                                    v-for="def in data"
                                    :class="{'hidden': !!hidden.get(def.id)}"
                                    :value="values.get(def.id)"
                                    :error="errors.get(def.id)"
                                    :def="def" :key="def.id"/>
            <u-button @click="emit('show')" v-if="hidden.size !== 0" class="font-fira-sans max-w-max"
                      label="Добавить линию"/>
        </div>
    </personalize-block>
</template>
<script setup lang="ts">
import type { ProductLineDefinition } from "~/gql/graphql";

defineProps<{
    valid: boolean | null
    index: number
    data: Array<ProductLineDefinition>
    errors: Map<PersonalizeLineDefId, string>
    hidden: Map<PersonalizeLineDefId, boolean>
    values: Map<PersonalizeLineDefId, string | null>
}>()

const update = (lineId: PersonalizeLineDefId, val: string | null) => {
    emit('update:text-line', lineId, val)
}

const emit = defineEmits(['update:text-line', 'hide', 'show'])
</script>