import {
    BaseFragmentFragmentDoc,
    CartItemToGenDocument,
    DesignItemFragmentDoc
} from "~/gql/graphql";
import { createSVGWindow } from 'svgdom'
import {
    Element,
    registerWindow,
    SVG,
    Text
} from '@svgdotjs/svg.js'
import sharp from "sharp";
import { useFragment } from "~/gql";
import { createGraphqlClient } from "~/system/createGraphqlClient";
import { applyTextsOnBlock } from "~/shared/utils/base-svg";
import type {
    TextMetricsReal,
    TextRenderData
} from "~/utils/text";
import {
    CanvasRenderingContext2D,
    createCanvas,
    registerFont
} from "canvas";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
    const cartItemId = getRouterParam(event, 'id'),
        updatedAtHash = getRouterParam(event, 'updatedAtHash')

    if (!cartItemId || !updatedAtHash) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена'
        })
    }
    const {data} = await getCartItem(cartItemId)
    const cartItem = data?.cartItem
    if (!cartItem) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена'
        })
    }

    const window = createSVGWindow()
    const document = window.document

    registerWindow(window, document)
    const reverseSideBase = useFragment(BaseFragmentFragmentDoc, cartItem.product.reverse_side_base)
    const design = useFragment(DesignItemFragmentDoc, cartItem.design)
    const firstDesignBase = useFragment(BaseFragmentFragmentDoc, design?.bases[0])
    const canvas = SVG(`<svg viewBox="0 0 200 100">
        ${reverseSideBase ? `<g data-base-id="${reverseSideBase.id}" transform="translate(5, 5)">${reverseSideBase.content}</g>` : ''}
        ${firstDesignBase ? `<g data-base-id="${firstDesignBase.id}" transform="translate(105, 5)">${firstDesignBase.content}</g>` : ''}
    </svg>`)
    const textLinesRenderValues = new Map<string, string>()
    cartItem.text_lines?.forEach(textLine => {
        textLinesRenderValues.set(textLine.product_line_definition.id, textLine.value)
    })
    const font = cartItem.font
    if (font) {
        registerFont(`/home/ubuntu/sbe1/storage/app/public/${font.filename_ttf}`, {family: font.name})
    }
    canvas.each(function (id, block) {
        // @ts-ignore
        const element = this as Element
        // @ts-ignore
        element.findOne('g#system > path').fill(cartItem.color?.hex ?? 'currentColor')
        // @ts-ignore
        const baseId = element.data('base-id') as string
        const base = firstDesignBase?.id == baseId ? firstDesignBase : reverseSideBase
        if (base && cartItem.product.line_definitions) {
            const svg = element.findOne('svg')
            applyTextsOnBlock(
                svg,
                base,
                cartItem.font,
                cartItem.color,
                cartItem.product.line_definitions,
                textLinesRenderValues,
                updTextAttributesSvgJs,
                findTextByIdSvgJs,
                false,
                getTextMetricsNodejs,
                getTextMetricsRealNodejs,
                createTextElementNodejs,
                appendTextToSvgNodejs
            )
        }
    })

    try {
        const svg = canvas.svg()
        fs.writeFileSync(`${process.cwd()}/public/${cartItemId}-${updatedAtHash}.svg`, svg)

        const webpBuffer = await sharp(Buffer.from(svg), {density: 1440})
            .webp({quality: 100})
            .toBuffer()

        event.node.res.setHeader('Content-Type', 'image/webp')
        event.node.res.setHeader('Content-Disposition', 'inline; filename=output.webp')

        return webpBuffer
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Ошибка при обработке изображения'})
    }
})

const getCartItem = async (cartItemId: string) => {
    const client = createGraphqlClient()

    try {
        return await client.query(
            CartItemToGenDocument,
            {
                id: cartItemId
            }
        )
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при получении данных'
        })
    }
}

const updTextAttributesSvgJs = (el: Text, data: TextRenderData) => {
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

const findTextByIdSvgJs = (id: string, svg: Element) => {
    return svg.findOne(`text.text-data[data-id="${id}"]`) as Text
}

const CANVAS_SIZE = 32
const getTextMetricsRealNodejs = (data: TextRenderData, fontSize?: number): TextMetricsReal => {
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
        width: (right - left) / dpi,
        height: (bottom - top) / dpi,
    }
}

const getTextMetricsNodejs = (data: TextRenderData): { actualBoundingBoxDescent: number } => {
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
const getCanvasContext = (dpi: number): CanvasRenderingContext2D | null => {
    if (!canvasContext) {
        const width = CANVAS_SIZE * dpi,
            height = CANVAS_SIZE * dpi
        const sharedCanvas = createCanvas(width, height)
        canvasContext = sharedCanvas.getContext('2d', {alpha: true});
        if (canvasContext) canvasContext.scale(dpi, dpi)
    }
    return canvasContext
}
const getDpi = () => {
    return 10
}
export const createTextElementNodejs = () => {
    return SVG('<text></text>')
}
export const appendTextToSvgNodejs = (el: Text, svg: Element) => {
    svg.add(el)
}