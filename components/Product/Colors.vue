<template>
    <personalize-block :valid="valid" :index="index" label="Выберите цвет">
        <personalize-color-item @update:color="updateColor"
                                :current-color-id="colorId"
                                :key="color.id"
                                :color="color"
                                v-for="color in data"/>
    </personalize-block>
</template>
<script setup lang="ts">
import type { Color } from "~/gql/graphql";
import PersonalizeBlock from "~/components/Personalize/Block.vue";

defineProps<{
    valid: boolean | null
    index: number
    colorId: string | null
    data: Array<Pick<Color, 'id' | 'label' | 'hex'>>
}>()

const updateColor = (val: string) => {
    emit("update:color", val)
}

const emit = defineEmits(['update:color'])
</script>