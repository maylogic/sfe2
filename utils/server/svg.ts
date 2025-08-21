import {
    Element,
    SVG,
    Text
} from "@svgdotjs/svg.js";
import type {
    TextMetricsReal,
    TextRenderData
} from "~/utils/text";
import {
    CanvasRenderingContext2D,
    createCanvas
} from "canvas";
import { getEnvOrPubVal } from "~/utils/env";


export const updTextAttributesSvgJs = (el: Text, data: TextRenderData) => {
    el.data('id', data.id)
    el.fill(data.fill)
    el.attr('font-family', data.font)
    el.attr('font-size', data.size.toFixed(4))
    el.attr('text-anchor', 'middle')
    el.attr('x', data.x.toFixed(4))
    el.attr('y', data.y.toFixed(4))
    el.addClass('text-data')
    el.text(data.value)
}

export const findTextByIdSvgJs = (id: string, svg: Element) => {
    return svg.findOne(`text.text-data[data-id="${id}"]`) as Text
}

export const getCanvasNodejsSize = () => Number(getEnvOrPubVal('CANVAS_SIZE')) // если будет слишком малым то будет баг с шириной текста
export const getCanvasNodejsDpi = () => Number(getEnvOrPubVal('CANVAS_DPI'))

export const getTextMetricsRealNodejs = (data: TextRenderData, fontSize?: number): TextMetricsReal => {
    const canvasSize = getCanvasNodejsSize(),
        dpi = getCanvasNodejsDpi()
    const canvasWidth = canvasSize * dpi,
        canvasHeight = canvasSize * dpi
    const ctx = getCanvasContext(dpi)
    if (!ctx) throw new Error('Cannot access canvas context')
    // Устанавливаем шрифт и текст
    const size = fontSize ?? data.size
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.font = `${size}px ${data.font}`;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = "center"
    const baselineLogical = canvasSize / 2;
    const baselinePhysical = baselineLogical * dpi;
    ctx.fillText(data.value, canvasSize / 2, baselineLogical);

    // Получаем пиксельные данные текста
    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixels = imageData.data;

    // Анализируем пиксельные данные
    let top = canvasHeight;
    let bottom = 0;
    let left = canvasWidth;
    let right = 0;

    for (let y = 0; y < canvasHeight; y++) {
        for (let x = 0; x < canvasWidth; x++) {
            const index = (y * canvasWidth + x) * 4; // Индекс пикселя
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

    const width = Math.max(0, (right - left) / dpi),
        height = Math.max(0, (bottom - top) / dpi),
        descent = Math.max(0, (bottom - baselinePhysical) / dpi)

    return {
        width,
        height,
        descent
    }
}

export const getTextMetricsNodejs = (data: TextRenderData): { actualBoundingBoxDescent: number } => {
    const dpi = getCanvasNodejsDpi()
    const ctx = getCanvasContext(dpi)
    if (ctx) {
        const size = data.size
        ctx.textBaseline = 'alphabetic'
        ctx.font = `${size}px ${data.font}`;
        return ctx.measureText(data.value);
    }
    throw new Error('Cannot access canvas context')
}

let canvasContext: CanvasRenderingContext2D | null = null
export const getCanvasContext = (dpi: number): CanvasRenderingContext2D | null => {
    if (!canvasContext) {
        const canvasSize = getCanvasNodejsSize()
        const width = canvasSize * dpi,
            height = canvasSize * dpi
        const sharedCanvas = createCanvas(width, height)
        canvasContext = sharedCanvas.getContext('2d', {alpha: true});
        if (canvasContext) {
            canvasContext.scale(dpi, dpi)
        }
    }
    return canvasContext
}
export const createTextElementNodejs = () => {
    return SVG('<text></text>')
}
export const appendTextToSvgNodejs = (el: Text, svg: Element) => {
    svg.add(el)
}