import {
    BaseFragmentFragmentDoc,
    BasePreviewFragmentFragmentDoc,
    DesignItemFragmentDoc,
    OrderItemToGenDocument
} from "~/gql/graphql";
import { createSVGWindow } from 'svgdom'
import {
    Element,
    registerWindow,
    SVG
} from '@svgdotjs/svg.js'
import { useFragment } from "~/gql";
import { applyTextsOnBlock } from "~/shared/utils/base-svg";
import {
    appendTextToSvgNodejs,
    createTextElementNodejs,
    findTextByIdSvgJs,
    getTextMetricsNodejs,
    getTextMetricsRealNodejs,
    updTextAttributesSvgJs
} from "~/utils/server/svg";
import { Client } from '@urql/core'
import { getClient } from "~/utils/server/graphql";

export default defineEventHandler(async (event) => {
    const orderItemId = getRouterParam(event, 'id')
    const client = getClient(event)

    if (!orderItemId) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена'
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
    const height = orderItem.product_size?.height || 25
    const design = useFragment(DesignItemFragmentDoc, orderItem.design)
    const base = useFragment(BaseFragmentFragmentDoc, design?.bases[0])
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
            svg?.attr('height', height + 2)
            applyTextsOnBlock(
                svg,
                base,
                orderItem.font?.system_name,
                orderItem.color,
                orderItem.product.line_definitions,
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
        const svg = canvas.x(10).y(10).svg()

        event.node.res.setHeader('Content-Type', 'image/svg+xml')

        return svg
    } catch (error) {
        throw createError({statusCode: 500, statusMessage: 'Ошибка при обработке изображения'})
    }
})

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