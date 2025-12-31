import {
    Element,
    G,
    SVG,
    Text
} from "@svgdotjs/svg.js";
import { computeTextLayout } from "~/utils/text";
import { getEnvOrPubVal } from "~/utils/env";
import type {
    Color,
    ProductLineDefinition
} from "~/gql/graphql";
import { getSortedTextLines } from "~/utils/product";
import {
    createOrUpdateTextsNodeJs,
    removeTextsForUnusedDefIdsNodeJs
} from "~/server/utils/text.server";
import { getCanvasContextNodeJs } from "~/server/utils/canvas.server";
import { InputTextLinesMap } from "~/types/product";
import { BaseOrPreview } from "~/types/svg";

console.log("(svg.server loaded – only should appear in server logs!)");
if (import.meta.client) {
    throw new Error("svg.server.ts was loaded on CLIENT! This should never happen!");
}


export const findTextByIdNodeJs = (id: string, svg: Element) => {
    return svg.findOne(`text.text-data[data-id="${id}"]`) as Text
}

export const findTextsContainerNodeJs = (svg: Element) => {
    return svg.findOne(`g.texts`) as G
}

export const getCanvasNodejsSize = () => Number(getEnvOrPubVal('CANVAS_SIZE')) // если будет слишком малым то будет баг с шириной текста

export const createTextElementNodejs = () => {
    return SVG('<text></text>')
}
export const createTextsContainerNodeJs = () => {
    return SVG('<g class="texts"></g>')
}
export const appendTextToSvgNodejs = (el: Text, svg: Element) => {
    svg.add(el)
}

export const applyTextsOnBlockNodeJs = (
    svg: Element,
    base: BaseOrPreview,
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

    removeTextsForUnusedDefIdsNodeJs(usedDefIds, lineDefinitions, svg);
    createOrUpdateTextsNodeJs(textsData, svg);

    return {textsData, areas, usedDefIds};
};