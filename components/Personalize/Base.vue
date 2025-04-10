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
import { createTextElement } from "~/utils/element";

type TextRenderData = {
    id: string,
    value: string,
    font: string,
    fill: string,
    x: number,
    y: number,
    size: number
}
type TextPieceArea = {
    x: number,
    y: number,
    width: number,
    height: number
}
const props = defineProps<{
    baseData: FragmentType<typeof BaseFragmentFragmentDoc>
    data: PersonalizeInputData,
    lineDefinitions: ProductLineDefinition[]
}>()
const base = useFragment(BaseFragmentFragmentDoc, props.baseData)
const block = useTemplateRef<SVGGElement>('block')
const textArea = ref<null | TextAreaFragment>(null)

watch(props.data, () => {
    applyData()
}, {deep: true})

const applyData = () => {
    if (!block.value) return
    const systemPath = block.value.querySelector('g#system > path')
    systemPath?.setAttribute('fill', props.data.color?.hex ?? 'currentColor')
    applyTexts()
}
const applyTexts = () => {
    if (!block.value) return
    const textData: TextRenderData[] = []
    const rect = getTextArea()
    if (!rect) return
    const usedIds: string[] = []
    for (const [id, value] of props.data.textLines) {
        if (value) {
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
            usedIds.push(id)
        }
    }
    const pieceAreaHeight = rect.height / textData.length
    textData.forEach((piece, index) => {
        const area: TextPieceArea = {
            height: pieceAreaHeight * index,
            width: rect.width,
            x: rect.left,
            y: rect.top + pieceAreaHeight * index
        }
        calculateTextDataPos(piece, area)
    })

    props.lineDefinitions.map(line => line.id).filter((id) => !usedIds.includes(id)).forEach((id) => {
        findTextById(id)?.remove()
    })

    renderTextData(textData)
}
const calculateTextDataPos = (data: TextRenderData, area: TextPieceArea) => {
    data.x = area.x
    data.y = area.y
    data.size = 5
}
const getTextArea = () => {
    if (!textArea.value && !!base.text_areas?.length) {
        textArea.value = useFragment(TextAreaFragmentDoc, base.text_areas[0])
    }
    return textArea.value
}
const renderTextData = (textData: TextRenderData[]) => {
    if (!block.value) return
    const svg = block.value.querySelector('svg')
    textData.forEach(data => {
        const existingEl = findTextById(data.id)
        if (existingEl) {
            applyTextData(existingEl, data)
            return
        }

        const el = createTextElement()
        el.classList.add('text-data')
        applyTextData(el, data)
        if (svg) {
            svg.appendChild(el)
        }
    })
}
const findTextById = (id: string) => {
    return block.value?.querySelector<SVGTextElement>(`text.text-data[data-id="${id}"]`)
}
const applyTextData = (el: SVGTextElement, data: TextRenderData) => {
    el.setAttribute('data-id', data.id)
    el.setAttribute('font-family', data.font)
    el.setAttribute('font-size', data.size.toString())
    el.setAttribute('fill', data.fill)
    el.setAttribute('text-anchor', 'start')
    el.setAttribute('dominant-baseline', 'hanging')
    el.setAttribute('x', data.x.toFixed(4))
    el.setAttribute('y', data.y.toFixed(4))
    el.children[0].innerHTML = data.value
}
onMounted(() => {
    applyData()
})
</script>