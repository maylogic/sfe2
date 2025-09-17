import { createTextElement } from "~/utils/element";
import type { ProductLineDefinition } from "~/gql/graphql";
import {
    appendTextToSvgNodejs,
    createTextElementNodejs,
    findTextByIdSvgJs,
    updTextAttributesSvgJs
} from "~/utils/server/svg";
import {
    Element,
    Text
} from "@svgdotjs/svg.js";
import type { TextPieceArea } from "~/utils/text_area";
import type { CANVAS_CONTEXT_GETTER } from "~/utils/canvas";

export type TextRenderData = {
    id: string,
    value: string,
    font: string,
    fill: string,
    x: number,
    y: number,
    size: number
}

export type SvgContainer = SVGSVGElement | Element

const AREA_PADDING_X = 0.1

export const updTextAttributes = (el: SVGTextElement, data: TextRenderData) => {
    el.setAttribute('data-id', data.id)
    el.setAttribute('font-family', data.font)
    el.setAttribute('font-size', data.size.toFixed(4))
    el.setAttribute('fill', data.fill)
    el.setAttribute('text-anchor', 'middle')
    el.setAttribute('x', data.x.toFixed(4))
    el.setAttribute('y', data.y.toFixed(4))
    el.classList.add('text-data')
    el.children[0].innerHTML = data.value
}

export const createOrUpdateTexts = (
    textData: TextRenderData[],
    svg: SvgContainer
) => {
    const createFn = import.meta.client ? createTextElement : createTextElementNodejs
    textData.forEach(data => {
        const existingEl = import.meta.client
            ? findTextById(data.id, svg as SVGSVGElement)
            : findTextByIdSvgJs(data.id, svg as Element)
        if (existingEl) {
            if (import.meta.client) {
                updTextAttributes(existingEl as SVGTextElement, data)
            } else {
                updTextAttributesSvgJs(existingEl as Text, data)
            }
            return
        }

        const el = createFn()
        if (import.meta.client) {
            updTextAttributes(el as SVGTextElement, data)
        } else {
            updTextAttributesSvgJs(el as Text, data)
        }
        import.meta.client
            ? appendTextToSvg(el as SVGTextElement, svg as SVGSVGElement)
            : appendTextToSvgNodejs(el as Text, svg as Element)
    })
}

const appendTextToSvg = (el: SVGTextElement, svg: SVGSVGElement) => {
    if (svg) {
        svg.appendChild(el)
    }
}

export const findTextById = (id: string, svg: SVGSVGElement) => {
    return svg.querySelector<SVGTextElement>(`text.text-data[data-id="${id}"]`)
}
export const calculateTextDataPos = (
    data: TextRenderData,
    area: TextPieceArea,
    canvasContextGetter: CANVAS_CONTEXT_GETTER
) => {
    const metrics = getTextMetrics(data, canvasContextGetter)

    const leftovers = area.height - metrics.height,
        zoneTop = area.y + leftovers / 2,
        zoneHeight = area.height - leftovers,
        zoneBottom = zoneTop + zoneHeight,
        areaBottom = area.y + area.height
    data.y = zoneBottom - metrics.descent / 2
    data.x = area.x + area.width / 2
}

const getTargetHeight = (area: TextPieceArea) => area.height - area.padding_y * area.height,
    getTargetWidth = (area: TextPieceArea) => area.width - AREA_PADDING_X * area.width

export const calculateFontSize = (
    canvasContextGetter: CANVAS_CONTEXT_GETTER,
    data: TextRenderData,
    area: TextPieceArea,
    precision: number = 0.01
) => {
    const targetWidth = getTargetWidth(area),
        targetHeight = getTargetHeight(area)

    const doesTextFit = (fontSize: number): boolean => {
        const metrics = getTextMetrics(data, canvasContextGetter, fontSize)
        const textWidth = metrics.width;
        const textHeight = metrics.height

        return textWidth <= targetWidth && textHeight <= targetHeight;
    };

    let fontSize = 1; // Начальный размер шрифта
    let step = fontSize / 2;     // Начальный шаг
    let lastAdjustment = 0;      // Последнее изменение (±)

    while (step >= precision) {
        const fits = doesTextFit(fontSize);

        let currentAdjustment = 0;

        if (fits) {
            currentAdjustment = step;
            fontSize += step;
        } else {
            currentAdjustment = -step;
            fontSize -= step;
        }

        // Проверяем, было ли изменение направления
        if (
            (lastAdjustment > 0 && currentAdjustment < 0) ||
            (lastAdjustment < 0 && currentAdjustment > 0)
        ) {
            step /= 2; // Меняем направление → уменьшаем шаг
        }

        lastAdjustment = currentAdjustment;
    }

    // Возвращаем последний подходящий размер шрифта
    return doesTextFit(fontSize) ? fontSize : fontSize - lastAdjustment;
}

export const removeTextsForUnusedDefIds = (
    usedDefIds: string[],
    defs: ProductLineDefinition[],
    svg: SvgContainer,
) => {
    defs.map(line => line.id) // get def ids
        .filter((id) => !usedDefIds.includes(id)) // include only unused def ids
        .forEach((id) => {
            if (import.meta.client) {
                findTextById(id, svg as SVGSVGElement)?.remove()
            } else {
                findTextByIdSvgJs(id, svg as Element)?.remove()
            }
        })
}

const getTextMetrics = (data: TextRenderData, canvasContextGetter: CANVAS_CONTEXT_GETTER, fontSize?: number): TextMetricsReal => {
    const ctx = canvasContextGetter()
    if (ctx) {
        const size = fontSize ?? data.size
        ctx.textBaseline = 'alphabetic'
        ctx.font = `${size}px ${data.font}`;
        ctx.textAlign = "center"
        const metrics = ctx.measureText(data.value);
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        return {
            width: metrics.width,
            height,
            descent: metrics.actualBoundingBoxDescent,
            ascent: metrics.actualBoundingBoxAscent
        }
    }
    throw new Error('Cannot access canvas context')
}

export type TextMetricsReal = {
    width: number,
    height: number,
    descent: number,
    ascent: number
}