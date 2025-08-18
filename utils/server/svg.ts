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

export const CANVAS_SIZE = 32
export const getTextMetricsRealNodejs = (data: TextRenderData, fontSize?: number): TextMetricsReal => {
    const dpi = getDpi(),
        width = CANVAS_SIZE * dpi,
        height = CANVAS_SIZE * dpi
    const ctx = getCanvasContext(dpi)
    if (!ctx) throw new Error('Cannot access canvas context')
    // Устанавливаем шрифт и текст
    const size = fontSize ?? data.size
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${size}px ${data.font}`;
    ctx.textBaseline = 'top';
    ctx.fillText(data.value, 1, 1);

    // Получаем пиксельные данные текста
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    // Анализируем пиксельные данные
    let top = height;
    let bottom = 0;
    let left = width;
    let right = 0;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4; // Индекс пикселя
            const alpha = pixels[index + 3]; // Альфа-канал

            if (alpha > 254) {
                // Обновляем границы текста
                if (x < left) left = x;
                if (x > right) right = x;
                if (y < top) top = y;
                if (y > bottom) bottom = y;
            }
        }
    }

    return {
        width: Math.max(0, (right - left) / dpi),
        height: Math.max(0, (bottom - top) / dpi),
    }
}

export const getTextMetricsNodejs = (data: TextRenderData): { actualBoundingBoxDescent: number } => {
    const ctx = getCanvasContext(getDpi())
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
        const width = CANVAS_SIZE * dpi,
            height = CANVAS_SIZE * dpi
        const sharedCanvas = createCanvas(width, height)
        canvasContext = sharedCanvas.getContext('2d', {alpha: true});
        if (canvasContext) canvasContext.scale(dpi, dpi)
    }
    return canvasContext
}
export const getDpi = () => {
    return 10
}
export const createTextElementNodejs = () => {
    return SVG('<text></text>')
}
export const appendTextToSvgNodejs = (el: Text, svg: Element) => {
    svg.add(el)
}