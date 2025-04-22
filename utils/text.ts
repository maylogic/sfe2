import {
    createAreaRectElement,
    createTextElement
} from "~/utils/element";
import type { ProductLineDefinition } from "~/gql/graphql";

export type TextRenderData = {
    id: string,
    value: string,
    font: string,
    fill: string,
    x: number,
    y: number,
    size: number
}

export type TextPieceArea = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number
}

export const TEXT_CANVAS_SIZE = 32

export const updTextAttributes = (el: SVGTextElement, data: TextRenderData) => {
    el.setAttribute('data-id', data.id)
    el.setAttribute('font-family', data.font)
    el.setAttribute('font-size', data.size.toFixed(4))
    el.setAttribute('fill', data.fill)
    el.setAttribute('dominant-baseline', 'central')
    el.setAttribute('text-anchor', 'middle')
    el.setAttribute('x', data.x.toFixed(4))
    el.setAttribute('y', data.y.toFixed(4))
    el.children[0].innerHTML = data.value
}

export const createOrUpdateTexts = (textData: TextRenderData[], svg: SVGSVGElement) => {
    textData.forEach(data => {
        const existingEl = findTextById(data.id, svg)
        if (existingEl) {
            updTextAttributes(existingEl, data)
            return
        }

        const el = createTextElement()
        el.classList.add('text-data')
        updTextAttributes(el, data)
        if (svg) {
            svg.appendChild(el)
        }
    })
}

export const createOrUpdateAreaRects = (areas: TextPieceArea[], svg: SVGSVGElement) => {
    areas.forEach(data => {
        const existingEl = findAreaById(data.id, svg)
        if (existingEl) {
            return
        }

        const el = createAreaRectElement()
        el.classList.add('text-area')
        el.setAttribute('data-id', data.id)
        el.setAttribute('x', data.x.toFixed(4))
        el.setAttribute('y', data.y.toFixed(4))
        el.setAttribute('width', data.width.toFixed(4))
        el.setAttribute('height', data.height.toFixed(4))
        if (svg) {
            svg.appendChild(el)
        }
    })
}

export const findTextById = (id: string, svg: SVGSVGElement) => {
    return svg.querySelector<SVGTextElement>(`text.text-data[data-id="${id}"]`)
}

export const findAreaById = (id: string, svg: SVGSVGElement) => {
    return svg.querySelector<SVGTextElement>(`rect.text-area[data-id="${id}"]`)
}

export const removeAreas = (svg: SVGSVGElement) => {
    svg.querySelectorAll<SVGRectElement>(`rect.text-area`).forEach(rect => rect.remove())
}
export const calculateTextDataSize = (data: TextRenderData, area: TextPieceArea) => {
    data.size = calculateFontSize(data, area, getCanvasContext())
}
export const calculateTextDataPos = (data: TextRenderData, area: TextPieceArea) => {
    data.x = area.x + area.width / 2
    data.y = area.y + (area.height) / 2
}

let canvasContext: CanvasRenderingContext2D | null = null
const getCanvasContext = () => {
    if (!canvasContext) {
        const sharedCanvas = document.createElement('canvas');
        sharedCanvas.width = TEXT_CANVAS_SIZE
        sharedCanvas.height = TEXT_CANVAS_SIZE
        canvasContext = sharedCanvas.getContext('2d', {willReadFrequently: true});
    }
    return canvasContext
}

export const calculateFontSize = (data: TextRenderData,
                                  area: TextPieceArea,
                                  context: CanvasRenderingContext2D | null,
                                  initialFontSize: number = 5,
                                  precision: number = 0.001
) => {
    if (!context) return initialFontSize;
    const targetWidth = area.width - 2,
        targetHeight = area.height - 0.5

    const doesTextFit = (fontSize: number): boolean => {
        context.font = `${fontSize}px ${data.font}`;
        const metrics = context.measureText(data.value);

        const textWidth = metrics.width;
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        return textWidth <= targetWidth && textHeight <= targetHeight;
    };

    // Начальные значения
    let fontSize = initialFontSize; // Начальный размер шрифта
    let step = fontSize / 2;        // Начальный шаг
    let lastAdjustment = 0;         // Последнее изменение (увеличение/уменьшение)

    // Итеративный процесс подбора размера шрифта
    while (step >= precision) {
        const fits = doesTextFit(fontSize);

        if (fits) {
            // Если текст помещается, увеличиваем размер шрифта
            lastAdjustment = step;
            fontSize += step;
        } else {
            // Если текст не помещается, уменьшаем размер шрифта
            lastAdjustment = -step;
            fontSize -= step;
        }

        // Уменьшаем шаг вдвое
        step /= 2;
    }

    // Возвращаем последний подходящий размер шрифта
    return doesTextFit(fontSize) ? fontSize : fontSize - lastAdjustment;
}

export const removeTextsForUnusedDefIds = (usedDefIds: string[], defs: ProductLineDefinition[], svg: SVGSVGElement) => {
    defs.map(line => line.id) // get def ids
        .filter((id) => !usedDefIds.includes(id)) // include only unused def ids
        .forEach((id) => {
            findTextById(id, svg)?.remove() // remove text elements for unused def ids
        })
}