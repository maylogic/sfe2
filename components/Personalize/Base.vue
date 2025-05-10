<template>
    <g v-html="base.content" ref="block"/>
</template>
<script lang="ts" setup>
import {
    type FragmentType,
    useFragment
} from "~/gql";
import {
    BaseFragmentFragmentDoc,
    type ProductLineDefinition,
    type TextAreaFragment,
    TextAreaFragmentDoc
} from "~/gql/graphql";
import {
    calculateFontSize,
    calculateTextDataPos,
    createOrUpdateTexts,
    removeTextsForUnusedDefIds,
    type TextRenderData
} from '~/utils/text'
import {
    createOrUpdateAreaRects,
    removeAreas,
    type TextPieceArea
} from "~/utils/text_area";
import {
    getSortedTextLines,
    type InputTextLinesMap,
    type PersonalizeInputData
} from "~/utils/product";

const props = defineProps<{
    baseData: FragmentType<typeof BaseFragmentFragmentDoc>
    data: PersonalizeInputData,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap
}>()
const base = useFragment(BaseFragmentFragmentDoc, props.baseData)
const block = useTemplateRef<SVGGElement>('block')
const textArea = ref<null | TextAreaFragment>(null)

watch(props.data, () => {
    applyData()
}, {deep: true})

const applyData = () => {
    applyColor()
    applyTexts()
}
const applyColor = () => {
    if (!block.value) return
    const systemPath = block.value.querySelector('g#system > path')
    systemPath?.setAttribute('fill', props.data.color?.hex ?? 'currentColor')
}
const applyTexts = () => {
    if (!block.value) return
    const svg = block.value.querySelector('svg')
    if (!svg) return
    const textData: TextRenderData[] = []
    const rect = getTextArea()
    if (!rect) return
    const usedDefIds: string[] = []
    let currentLineSeq = 0
    for (const [id, value] of getSortedTextLines(props.lineDefinitions, props.textLinesRenderValues)) {
        if (++currentLineSeq < rect.first_line) continue
        if (currentLineSeq - rect.first_line >= rect.lines) continue
        if (!value) continue

        let fill = rect.text_color ?? '#fff'
        if (rect.inherit_color && props.data.color) {
            fill = props.data.color.hex
        }
        let font = 'Arial'
        if (props.data.font) {
            font = props.data.font.name
        }
        textData.push({
            id,
            value,
            font,
            fill,
            x: 0, // calculate
            y: 0, // calculate
            size: 0 // calculate
        })
        usedDefIds.push(id)
    }
    const pieceAreaHeight = rect.height / textData.length
    const areas = new Map<string, TextPieceArea>
    for (const piece of textData) {
        const index = textData.indexOf(piece);
        const area: TextPieceArea = {
            id: piece.id,
            height: pieceAreaHeight,
            width: rect.width,
            x: rect.left,
            y: rect.top + pieceAreaHeight * index
        }
        areas.set(piece.id, area)
        piece.size = calculateFontSize(piece, area)
    }
    const minFontSize = textData.reduce((min, current) => (current.size < min ? current.size : min), 30);
    for (const piece of textData) {
        piece.size = minFontSize
        const area = areas.get(piece.id)
        if (area) {
            calculateTextDataPos(piece, area)
        }
    }
    removeTextsForUnusedDefIds(usedDefIds, props.lineDefinitions, svg)
    createOrUpdateTexts(textData, svg)
    if (import.meta.dev) {
        removeAreas(svg)
        createOrUpdateAreaRects([...areas.values()], svg)
    }
}
const getTextArea = () => {
    if (!textArea.value && !!base.text_areas?.length) {
        textArea.value = useFragment(TextAreaFragmentDoc, base.text_areas[0])
    }
    return textArea.value
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