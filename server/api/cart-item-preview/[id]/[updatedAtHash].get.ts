import {
    BaseFragmentFragmentDoc,
    CartItemToGenDocument,
    DesignItemFragmentDoc
} from "~/gql/graphql";
import { createSVGWindow } from 'svgdom'
import {
    Element,
    registerWindow,
    SVG
} from '@svgdotjs/svg.js'
import sharp from "sharp";
import { useFragment } from "~/gql";
import { createGraphqlClient } from "~/system/createGraphqlClient";
import { applyTextsOnBlock } from "~/shared/utils/base-svg";

import {
    appendTextToSvgNodejs,
    createTextElementNodejs,
    findTextByIdSvgJs,
    getTextMetricsNodejs,
    getTextMetricsRealNodejs,
    updTextAttributesSvgJs
} from "~/utils/server/svg";

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
                cartItem.font?.system_name,
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
        // fs.writeFileSync(`${process.cwd()}/public/${cartItemId}-${updatedAtHash}.svg`, svg)

        const webpBuffer = await sharp(Buffer.from(svg), {density: 400})
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