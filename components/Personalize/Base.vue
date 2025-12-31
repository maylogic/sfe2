<template>
    <g class="base" v-html="base.content" ref="block"/>
</template>
<script lang="ts" setup>
import {
    type FragmentType,
    useFragment
} from "~/gql";
import {
    BaseFragmentFragmentDoc,
    BasePreviewFragmentFragmentDoc,
    type ProductLineDefinition
} from "~/gql/graphql";
import {
    type InputTextLinesMap,
    type PersonalizeInputData
} from "~/utils/product";
import {
    applyColorOnBlock,
    applyTextsOnBlock
} from "~/utils/svg";

const props = defineProps<{
    baseData: FragmentType<typeof BaseFragmentFragmentDoc>
    data: PersonalizeInputData,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap
}>()
const rootBase = useFragment(BaseFragmentFragmentDoc, props.baseData)
const previewBase = useFragment(BasePreviewFragmentFragmentDoc, rootBase.base_preview)
const base = previewBase ?? rootBase
const block = useTemplateRef<SVGGElement>('block')

watch(props.data, () => {
    applyData()
}, {deep: true})

const applyData = () => {
    applyColor()
    applyTexts()
}
const applyColor = () => {
    if (!block.value) return
    applyColorOnBlock(block.value, props.data.color)
}
const applyTexts = () => {
    if (!block.value) return
    const svg = block.value.querySelector('svg')
    if (!svg) {
        return
    }
    applyTextsOnBlock(
        svg,
        base,
        props.data.font?.name,
        props.data.color,
        props.lineDefinitions,
        props.textLinesRenderValues
    )
}
onMounted(() => {
    applyData()
    if (document.fonts) {
        document.fonts.ready.then(() => {
            setTimeout(() => applyTexts())
        })
    } else {
        setTimeout(() => applyTexts(), 100)
    }
})
</script>