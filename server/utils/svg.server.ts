import {
    Element,
    G,
    SVG,
    Text
} from "@svgdotjs/svg.js";
import { computeTextLayout } from "~/utils/text";
import type {
    BaseFragmentFragment,
    Color,
    ProductLineDefinition
} from "~/gql/graphql";
import { getSortedTextLines } from "~/utils/product";
import { getCanvasContextNodeJs } from "~/server/utils/canvas.server";
import { InputTextLinesMap } from "~/types/product";
import { TextRenderData } from "~/types/svg";

export const findTextByIdNodeJs = (id: string, container: Element) => {
    return container.findOne(`text.text-data[data-id="${id}"]`) as Text | null
}

export const findOrCreateTextsContainerNodeJs = (svg: Element) => {
    let container = svg.findOne(`g.texts`) as G | null
    if (!container) {
        container = SVG('<g class="texts"></g>') as G
        svg.add(container)
    }
    return container
}

export const applyTextsOnBlockNodeJs = (
    svg: Element,
    base: BaseFragmentFragment,
    font: string | null | undefined,
    color: Color | null | undefined,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap,
) => {
    const sortedLines = getSortedTextLines(lineDefinitions, textLinesRenderValues);

    const {textsData, areas, usedDefIds} = computeTextLayout(
        base,
        font,
        color,
        sortedLines,
        getCanvasContextNodeJs
    );

    const container = findOrCreateTextsContainerNodeJs(svg)
    removeTextsForUnusedDefIdsNodeJs(usedDefIds, lineDefinitions, container);
    createOrUpdateTextsNodeJs(textsData, container);

    return {textsData, areas, usedDefIds};
};

const createOrUpdateTextsNodeJs = (
    textData: TextRenderData[],
    svg: Element
) => {
    textData.forEach(data => {
        const existingEl = findTextByIdNodeJs(data.id, svg)
        if (existingEl) {
            updTextAttributesNodeJs(existingEl, data)
            return
        }
        const el = SVG('<text></text>') as Text
        updTextAttributesNodeJs(el, data)
        svg.add(el)
    })
}

const removeTextsForUnusedDefIdsNodeJs = (
    usedDefIds: string[],
    defs: ProductLineDefinition[],
    svg: Element,
) => {
    defs.map(line => line.id) // get def ids
        .filter((id) => !usedDefIds.includes(id)) // include only unused def ids
        .forEach((id) => {
            findTextByIdNodeJs(id, svg)?.remove()
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