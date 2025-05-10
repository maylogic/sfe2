import { createTextElement } from "~/utils/element";
import type { ProductLineDefinition } from "~/gql/graphql";
import {
    CANVAS_SIZE,
    getCanvasContext
} from "~/utils/canvas";

export type TextRenderData = {
    id: string,
    value: string,
    font: string,
    fill: string,
    x: number,
    y: number,
    size: number
}

const AREA_PADDING_Y = 0.2,
    AREA_PADDING_X = 0.1

export const updTextAttributes = (el: SVGTextElement, data: TextRenderData) => {
    el.setAttribute('data-id', data.id)
    el.setAttribute('font-family', data.font)
    el.setAttribute('font-size', data.size.toFixed(4))
    el.setAttribute('fill', data.fill)
    // el.setAttribute('dominant-baseline', 'middle')
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

export const findTextById = (id: string, svg: SVGSVGElement) => {
    return svg.querySelector<SVGTextElement>(`text.text-data[data-id="${id}"]`)
}
export const calculateTextDataPos = (data: TextRenderData, area: TextPieceArea) => {
    const metricsReal = getTextMetricsReal(data),
        metrics = getTextMetrics(data)
    const areaCenterY = area.y + area.height / 2
    const textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    data.y = areaCenterY + metrics.fontBoundingBoxAscent
    data.x = area.x + area.width / 2
}

const getTargetHeight = (area: TextPieceArea) => area.height - AREA_PADDING_Y * area.height,
    getTargetWidth = (area: TextPieceArea) => area.width - AREA_PADDING_X * area.width

export const calculateFontSize = (data: TextRenderData,
                                  area: TextPieceArea,
                                  precision: number = 0.001
) => {
    const targetWidth = getTargetWidth(area),
        targetHeight = getTargetHeight(area)

    const doesTextFit = (fontSize: number): boolean => {
        const metrics = getTextMetrics(data, fontSize)//getTextMetricsReal(data, fontSize)
        const textWidth = metrics.width;
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

        return textWidth <= targetWidth && textHeight <= targetHeight;
    };

    // Начальные значения
    let fontSize = targetHeight; // Начальный размер шрифта
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

const getTextMetrics = (data: TextRenderData, fontSize?: number) => {
    const context = getCanvasContext()
    if (context) {
        const size = fontSize ?? data.size
        context.font = `${size}px ${data.font}`;
        return context.measureText(data.value);
    }
    throw new Error('Cannot access canvas context')
}

const getTextMetricsReal = (data: TextRenderData, fontSize?: number): TextMetricsReal => {
    const ctx = getCanvasContext()
    if (!ctx) throw new Error('Cannot access canvas context')
    // Устанавливаем шрифт и текст
    const size = fontSize ?? data.size
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    ctx.font = `${size}px ${data.font}`;
    ctx.textBaseline = 'top';
    ctx.fillText(data.value, 0, 0);

    // Получаем пиксельные данные текста
    const imageData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    const pixels = imageData.data;

    // Анализируем пиксельные данные
    let top = CANVAS_SIZE;
    let bottom = 0;
    let left = CANVAS_SIZE;
    let right = 0;

    for (let y = 0; y < CANVAS_SIZE; y++) {
        for (let x = 0; x < CANVAS_SIZE; x++) {
            const index = (y * CANVAS_SIZE + x) * 4; // Индекс пикселя
            const alpha = pixels[index + 3]; // Альфа-канал

            if (alpha > 0) {
                // Обновляем границы текста
                if (x < left) left = x;
                if (x > right) right = x;
                if (y < top) top = y;
                if (y > bottom) bottom = y;
            }
        }
    }

    return {
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        width: right - left,
        height: bottom - top,
    }
}

type TextMetricsReal = {
    top: number,
    bottom: number,
    left: number,
    right: number,
    width: number,
    height: number,
}