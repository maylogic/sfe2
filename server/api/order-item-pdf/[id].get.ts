import {
    BaseFragmentFragmentDoc,
    DesignItemFragmentDoc,
    OrderItemToGenDocument,
    OrderItemToGenQuery
} from "~/gql/graphql";
import { createSVGWindow } from 'svgdom'
import {
    Element,
    registerWindow,
    SVG
} from '@svgdotjs/svg.js'
import { useFragment } from "~/gql";
import { Client } from '@urql/core'
import { getClient } from "~/server/utils/graphql.server";
import { circularIterator } from "~/utils/iterators";
import { applyTextsOnBlockNodeJs } from "~/server/utils/svg.server";

const ADD_HEIGHT = 8

export default defineEventHandler(async (event) => {
    const orderItemId = getRouterParam(event, 'id')
    const many = getQuery(event).hasOwnProperty('many')
    const client = getClient(event)

    if (!orderItemId) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена1'
        })
    }
    const {data} = await getOrderItem(client, orderItemId)
    const orderItem = data?.orderItem
    if (!orderItem) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена'
        })
    }

    const window = createSVGWindow()
    const document = window.document

    registerWindow(window, document)

    const canvas = getItemsCanvas(orderItem, many)

    try {
        if (!canvas) throw new Error

        event.node.res.setHeader('Content-Type', 'image/svg+xml')

        return canvas.svg()
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Ошибка при обработке изображения'})
    }
})

function getItemsCanvas(orderItem: NonNullable<OrderItemToGenQuery['orderItem']>, many: boolean) {
    if (!many) {
        return getSingleItemCanvas(orderItem)
    }
    return getManyItemsCanvas(orderItem)
}

function getManyItemsCanvas(orderItem: NonNullable<OrderItemToGenQuery['orderItem']>) {
    const design = useFragment(DesignItemFragmentDoc, orderItem.design);
    const base = useFragment(BaseFragmentFragmentDoc, design?.bases[0]);
    if (!design || !base) {
        return
    }
    const availableColors = circularIterator(design.colors ?? []),
        availableFonts = circularIterator(design.fonts ?? [])
    const gap = 5; // отступ 10 мм
    const pageWidth = 210;
    const pageHeight = 297;

    // Создаём общий SVG-холст A4
    const canvas = SVG(`<svg width="210mm" height="297mm" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>`);

    // Подготовка текстов
    const textLinesRenderValues = new Map<string, string>();
    orderItem.text_lines?.forEach((textLine) => {
        textLinesRenderValues.set(textLine.product_line_definition.id, textLine.value);
    });
    const cleanedContent = cleanSVGContent(base.content);
    const baseContentSvg = SVG(cleanedContent)
    const viewBoxStr = baseContentSvg?.attr('viewBox')

    if (!viewBoxStr) {
        throw new Error('Атрибут viewBox отсутствует в base.content');
    }

    const [minX, minY, width, height] = viewBoxStr
        .split(/ /)
        .map(Number)

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
        throw new Error(`Некорректный viewBox: ${viewBoxStr}`);
    }

    // Целевая высота в мм
    const itemHeight = (orderItem.product_size?.height || 40) + ADD_HEIGHT;
    const itemWidth = (width / height) * itemHeight; // пропорциональная ширина

    // Сколько элементов помещается в строке и столбцах
    const itemsPerRow = Math.floor((pageWidth + gap) / (itemWidth + gap)); // +gap чтобы учесть крайний отступ
    const itemsPerCol = Math.floor((pageHeight + gap) / (itemHeight + gap));

    const totalItems = itemsPerRow * itemsPerCol;

    // Генерируем каждый элемент в нужной позиции
    for (let i = 0; i < totalItems; i++) {
        const color = availableColors.next().value,
            font = availableFonts.next().value
        const row = Math.floor(i / itemsPerRow);
        const col = i % itemsPerRow;

        const x = col * (itemWidth + gap) + gap / 2;
        const y = row * (itemHeight + gap) + gap / 2;

        // Создаём отдельный элемент (аналогично getSingleItemCanvas)
        const itemGroup = SVG(`<g transform="translate(${x}, ${y})"></g>`);
        const holeMark = SVG(`<g transform="translate(${x}, ${y})"></g>`);

        if (base && orderItem.product.line_definitions) {
            const baseGroup = itemGroup.attr('data-base-id', base.id);
            const basePiece = baseContentSvg.clone()
            baseGroup.add(basePiece)

            // Теперь ищем вложенный <svg>
            const innerSvg = baseGroup.findOne('svg') as Element;
            if (innerSvg) {
                innerSvg.attr('width', itemWidth);
                innerSvg.attr('height', itemHeight);
                innerSvg.attr('x', 0);
                innerSvg.attr('y', 0);
                innerSvg.attr('viewBox', innerSvg.attr('viewBox') || '0 0 100 100'); // если нет — можно задать дефолт

                applyTextsOnBlockNodeJs(
                    innerSvg,
                    base,
                    font?.system_name,
                    color,
                    orderItem.product.line_definitions,
                    textLinesRenderValues
                );
            }
        }

        // Заливка цветом
        itemGroup.each(function () {
            // @ts-ignore
            const el = this as Element;
            el.fill(color?.hex ?? 'currentColor');
        });

        canvas.add(itemGroup);
    }

    return canvas;
}

function getSingleItemCanvas(orderItem: NonNullable<OrderItemToGenQuery['orderItem']>) {
    const design = useFragment(DesignItemFragmentDoc, orderItem.design)
    const base = useFragment(BaseFragmentFragmentDoc, design?.bases[0])
    const height = orderItem.product_size?.height || 25
    const canvas = SVG(`<svg width="210mm" height="297mm" viewBox="0 0 210 297" xmlns="http://www.w3.org/2000/svg">
        ${base ? `<g data-base-id="${base.id}">${base.content}</g>` : ''}
    </svg>`)
    const textLinesRenderValues = new Map<string, string>()
    orderItem.text_lines?.forEach(textLine => {
        textLinesRenderValues.set(textLine.product_line_definition.id, textLine.value)
    })
    canvas.each(function (id, block) {
        // @ts-ignore
        const element = this as Element
        // @ts-ignore
        element.fill(orderItem.color?.hex ?? 'currentColor')
        if (base && orderItem.product.line_definitions) {
            const svg = element.findOne('svg') as Element
            svg?.attr('height', height + ADD_HEIGHT)
            svg?.attr('y', '10')
            applyTextsOnBlockNodeJs(
                svg,
                base,
                orderItem.font?.system_name,
                orderItem.color,
                orderItem.product.line_definitions,
                textLinesRenderValues
            )
        }
    })
    return canvas
}

function cleanSVGContent(svgContent: string): string {
    return svgContent
        .replace(/<\?xml[^?]*\?>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();
}

const getOrderItem = async (client: Client, orderItemId: string) => {
    try {
        return await client.query(
            OrderItemToGenDocument,
            {
                id: orderItemId
            }
        )
    } catch (error) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена'
        })
    }
}