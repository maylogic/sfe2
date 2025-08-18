import { createGraphqlClient } from "~/system/createGraphqlClient";
import { FontDocument } from "~/gql/graphql";
import { createSVGWindow } from "svgdom";
import {
    registerWindow,
    SVG
} from "@svgdotjs/svg.js";
import sharp from "sharp";
import { promises as fs } from 'fs';
import { dirname } from 'path';

export default defineEventHandler(async (event) => {
    const fontId = getRouterParam(event, 'id'),
        updatedAtHash = getRouterParam(event, 'updatedAtHash')

    if (!fontId || !updatedAtHash) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена'
        })
    }
    const {data} = await getFont(fontId)
    const font = data?.font

    if (!font) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Страница не найдена'
        })
    }
    const window = createSVGWindow()
    const document = window.document
    registerWindow(window, document)
    const canvas = SVG(`<svg viewBox="0 0 200 100">
        <svg width="200" height="100">
            <rect width="200" height="100" fill="#f3f4f6"/>
            <text
            font-family="${font.system_name}"
            x="50%"
            y="50%"
            fill="#000000"
            font-size="${font.preview_size}"
            text-anchor="middle"
            dominant-baseline="central">
                ${font.label}
            </text>
        </svg>
    </svg>`)
    try {
        const svg = canvas.svg()

        const webpBuffer = await sharp(Buffer.from(svg), {density: 400})
            .webp({quality: 100})
            .toBuffer()

        await writeFileAndCreateDir(`${process.cwd()}/public/font-preview/${fontId}/${updatedAtHash}`, webpBuffer)
        await writeFileAndCreateDir(`${process.cwd()}/.output/public/font-preview/${fontId}/${updatedAtHash}`, webpBuffer)

        event.node.res.setHeader('Content-Type', 'image/webp')
        event.node.res.setHeader('Content-Disposition', 'inline; filename=output.webp')

        return webpBuffer
    } catch (error) {
        console.log(error)
        throw createError({statusCode: 500, statusMessage: 'Ошибка при обработке изображения'})
    }
})

const getFont = async (fontId: string) => {
    const client = createGraphqlClient()

    try {
        return await client.query(
            FontDocument,
            {
                id: fontId
            }
        )
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Ошибка при получении данных'
        })
    }
}

const writeFileAndCreateDir = async (filePath: string, data: any) => {
    const dir = dirname(filePath);
    try {
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(filePath, data);
    } catch (err) {
        console.error('Error writing file or creating directory:', err);
    }
}