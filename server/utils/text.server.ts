import {
    appendTextToSvgNodejs,
    createTextElementNodejs,
    findTextByIdNodeJs
} from "~/server/utils/svg.server";
import {
    Element,
    Text
} from "@svgdotjs/svg.js";
import type { ProductLineDefinition } from "~/gql/graphql";
import { TextRenderData } from "~/types/svg";

export const createOrUpdateTextsNodeJs = (
    textData: TextRenderData[],
    svg: Element
) => {
    textData.forEach(data => {
        const existingEl = findTextByIdNodeJs(data.id, svg as Element)
        if (existingEl) {
            updTextAttributesNodeJs(existingEl as Text, data)
            return
        }
        const el = createTextElementNodejs()
        updTextAttributesNodeJs(el as Text, data)
        appendTextToSvgNodejs(el as Text, svg as Element)
    })
}

export const removeTextsForUnusedDefIdsNodeJs = (
    usedDefIds: string[],
    defs: ProductLineDefinition[],
    svg: Element,
) => {
    defs.map(line => line.id) // get def ids
        .filter((id) => !usedDefIds.includes(id)) // include only unused def ids
        .forEach((id) => {
            findTextByIdNodeJs(id, svg as Element)?.remove()
        })
}

const updTextAttributesNodeJs = (el: Text, data: TextRenderData) => {
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