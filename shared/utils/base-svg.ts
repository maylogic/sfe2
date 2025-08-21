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
import {
    createOrUpdateAreaRects,
    createOrUpdateBaselines,
    removeAreas,
    removeLines,
    type TextPieceArea
} from "~/utils/text_area";
import { useFragment } from "~/gql";
import {
    type BaseFragmentFragment,
    type BasePreviewFragmentFragment,
    type Color,
    type ProductLineDefinition,
    type TextAreaFragment,
    TextAreaFragmentDoc
} from "~/gql/graphql";

export type BaseOrPreview = BaseFragmentFragment | BasePreviewFragmentFragment

export const applyColorOnBlock = (block: SVGGElement, color: Color | null | undefined) => {
    block.setAttribute('fill', color?.hex ?? 'currentColor')
}
export const applyTextsOnBlock = (
    svg: SVGSVGElement,
    base: BaseOrPreview,
    font: string | null | undefined,
    color: Color | null | undefined,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap,
    updater?: (el: SVGTextElement, data: TextRenderData) => void,
    finder?: (id: string, el: SVGSVGElement) => SVGTextElement | null,
    renderAreas: boolean = true,
    getMetricsReal?: (data: TextRenderData, fontSize?: number) => TextMetricsReal,
    creator?: () => SVGTextElement,
    appender?: (el: SVGTextElement, svg: SVGSVGElement) => void
) => {
    const usedDefIds: string[] = [] // используется для удаление не использованных
    const areas = new Map<string, TextPieceArea>
    const textsData: TextRenderData[] = []
    const textsByArea = new Map<string, TextRenderData[]>
    const sortedLines = getSortedTextLines(lineDefinitions, textLinesRenderValues)

    base.text_areas?.forEach(area => {
        const rect = useFragment(TextAreaFragmentDoc, area)
        apply(rect)
    })

    if (import.meta.client) {
        requestAnimationFrame(() => {
            removeTextsForUnusedDefIds(usedDefIds, lineDefinitions, svg, finder)
        })
        requestAnimationFrame(() => {
            createOrUpdateTexts(textsData, svg, updater, finder, creator, appender)
        })
    } else {
        removeTextsForUnusedDefIds(usedDefIds, lineDefinitions, svg, finder)
        createOrUpdateTexts(textsData, svg, updater, finder, creator, appender)
    }

    if (renderAreas && import.meta.dev) {
        removeLines(svg)
        // removeAreas(svg)
        // createOrUpdateAreaRects([...areas.values()], svg)
        createOrUpdateBaselines(textsData, svg)
    }

    function apply(rect: TextAreaFragment) {
        let currentLineSeq = 0
        const rectTexts = textsByArea.get(rect.id) ?? []
        for (const [id, value] of sortedLines) {
            if (++currentLineSeq < rect.first_line) continue
            if (currentLineSeq - rect.first_line >= rect.lines) continue
            if (!value) continue

            let fill = rect.text_color ?? '#fff'
            if (rect.inherit_color && color) {
                fill = color.hex
            }
            const fontFamily = font ?? 'sans-serif'
            const textData = {
                id,
                value,
                font: fontFamily,
                fill,
                x: 0, // calculate
                y: 0, // calculate
                size: 0 // calculate
            }
            textsData.push(textData)
            rectTexts.push(textData)
            textsByArea.set(rect.id, rectTexts)
            usedDefIds.push(id)
        }
        const pieceAreaHeight = rect.height / rectTexts.length
        for (const piece of rectTexts) {
            const index = rectTexts.indexOf(piece);
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
        const minFontSize = rectTexts.reduce((min, current) => (current.size < min ? current.size : min), 30);
        for (const piece of rectTexts) {
            piece.size = minFontSize
            const area = areas.get(piece.id)
            if (area) {
                calculateTextDataPos(piece, area, getMetricsReal)
            }
        }
    }
}