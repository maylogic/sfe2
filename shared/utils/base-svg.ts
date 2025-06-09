import type {
    TextMetricsReal,
    TextRenderData
} from "~/utils/text";
import {
    calculateFontSize,
    calculateTextDataPos,
    createOrUpdateTexts,
    removeTextsForUnusedDefIds
} from "~/utils/text";
import {
    getSortedTextLines,
    type InputTextLinesMap
} from "~/utils/product";
import type { TextPieceArea } from "~/utils/text_area";
import {
    createOrUpdateAreaRects,
    removeAreas
} from "~/utils/text_area";
import { useFragment } from "~/gql";
import {
    type BaseFragmentFragment,
    type Color,
    type ProductLineDefinition,
    type TextAreaFragment,
    TextAreaFragmentDoc
} from "~/gql/graphql";

export const applyColorOnBlock = (block: SVGGElement, color: Color | null | undefined) => {
    const systemPath = block.querySelector('g#system > path')
    systemPath?.setAttribute('fill', color?.hex ?? 'currentColor')
}
export const applyTextsOnBlock = (
    svg: SVGSVGElement,
    base: BaseFragmentFragment,
    font: string | null | undefined,
    color: Color | null | undefined,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap,
    updater?: (el: SVGTextElement, data: TextRenderData) => void,
    finder?: (id: string, el: SVGSVGElement) => SVGTextElement | null,
    renderAreas: boolean = true,
    getMetrics?: (data: TextRenderData) => { actualBoundingBoxDescent: number },
    getMetricsReal?: (data: TextRenderData, fontSize?: number) => TextMetricsReal,
    creator?: () => SVGTextElement,
    appender?: (el: SVGTextElement, svg: SVGSVGElement) => void
) => {
    const textData: TextRenderData[] = []
    const rect = getTextArea(base)
    if (!rect) return
    const usedDefIds: string[] = []
    let currentLineSeq = 0
    for (const [id, value] of getSortedTextLines(lineDefinitions, textLinesRenderValues)) {
        if (++currentLineSeq < rect.first_line) continue
        if (currentLineSeq - rect.first_line >= rect.lines) continue
        if (!value) continue

        let fill = rect.text_color ?? '#fff'
        if (rect.inherit_color && color) {
            fill = color.hex
        }
        const fontFamily = font ?? 'Arial'
        textData.push({
            id,
            value,
            font: fontFamily,
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
        piece.size = calculateFontSize(piece, area, getMetricsReal)
    }
    const minFontSize = textData.reduce((min, current) => (current.size < min ? current.size : min), 30);
    for (const piece of textData) {
        piece.size = minFontSize
        const area = areas.get(piece.id)
        if (area) {
            calculateTextDataPos(piece, area, getMetrics, getMetricsReal)
        }
    }
    removeTextsForUnusedDefIds(usedDefIds, lineDefinitions, svg, finder)
    createOrUpdateTexts(textData, svg, updater, finder, creator, appender)
    if (renderAreas && import.meta.dev) {
        removeAreas(svg)
        createOrUpdateAreaRects([...areas.values()], svg)
    }
}
const baseTextAreas = new Map<string, TextAreaFragment | null>()
const getTextArea = (base: BaseFragmentFragment) => {
    if (!baseTextAreas.get(base.id)) {
        baseTextAreas.set(base.id, useFragment(TextAreaFragmentDoc, base.text_areas ? base.text_areas[0] : null))
    }
    return baseTextAreas.get(base.id)
}