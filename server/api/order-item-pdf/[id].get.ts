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
import { applyTextsOnBlock } from "~/shared/utils/base-svg";
import { Client } from '@urql/core'
import { getClient } from "~/utils/server/graphql";

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
        const svg = canvas.svg()

        event.node.res.setHeader('Content-Type', 'image/svg+xml')

        return svg
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
    if (!base) {
        return
    }
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
    const itemHeight = (orderItem.product_size?.height || 40) + 8;
    const itemWidth = (width / height) * itemHeight; // пропорциональная ширина

    // Сколько элементов помещается в строке и столбцах
    const itemsPerRow = Math.floor((pageWidth + gap) / (itemWidth + gap)); // +gap чтобы учесть крайний отступ
    const itemsPerCol = Math.floor((pageHeight + gap) / (itemHeight + gap));

    const totalItems = itemsPerRow * itemsPerCol;

    // Генерируем каждый элемент в нужной позиции
    for (let i = 0; i < totalItems; i++) {
        const row = Math.floor(i / itemsPerRow);
        const col = i % itemsPerRow;

        const x = col * (itemWidth + gap) + gap / 2;
        const y = row * (itemHeight + gap) + gap / 2;

        // Создаём отдельный элемент (аналогично getSingleItemCanvas)
        const itemGroup = SVG(`<g transform="translate(${x}, ${y})"></g>`);

        if (base && orderItem.product.line_definitions) {
            const baseGroup = itemGroup.attr('data-base-id', base.id);
            const basePiece = baseContentSvg.clone()
            baseGroup.add(basePiece)

            // Теперь ищем вложенный <svg>
            const innerSvg = baseGroup.findOne('svg');
            if (innerSvg) {
                innerSvg.attr('width', itemWidth);
                innerSvg.attr('height', itemHeight);
                innerSvg.attr('x', 0);
                innerSvg.attr('y', 0);
                innerSvg.attr('viewBox', innerSvg.attr('viewBox') || '0 0 100 100'); // если нет — можно задать дефолт
            }

            // Применяем тексты
            applyTextsOnBlock(
                innerSvg,
                base,
                orderItem.font?.system_name,
                orderItem.color,
                orderItem.product.line_definitions,
                textLinesRenderValues,
                false
            );
        }

        // Заливка цветом
        itemGroup.each(function () {
            // @ts-ignore
            const el = this as Element;
            el.fill(orderItem.color?.hex ?? 'currentColor');
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
            const svg = element.findOne('svg')
            svg?.attr('height', height + 8)
            svg?.attr('y', '10')
            applyTextsOnBlock(
                svg,
                base,
                orderItem.font?.system_name,
                orderItem.color,
                orderItem.product.line_definitions,
                textLinesRenderValues,
                false
            )
        }
    })
    return canvas
}

function cleanSVGContent(svgContent: string): string {
    return svgContent
        .replace('<?xml version="1.0" encoding="utf-8"?>', '') // удаляем декларацию
        .replace(/<!--[\s\S]*?-->/g, '') // удаляем комментарии
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