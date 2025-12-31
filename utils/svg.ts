import {
    createTextElement,
    createTextsContainer
} from "~/utils/element";
import type {
    BasePreviewFragmentFragment,
    Color,
    ProductLineDefinition
} from "~/gql/graphql";
import { computeTextLayout } from "~/utils/text";
import { getSortedTextLines } from "~/utils/product";
import {
    createOrUpdateAreaRects,
    createOrUpdateBaselines,
    removeAreas,
    removeLines
} from "~/utils/text_area";
import { getCanvasContext } from "~/utils/canvas";
import type { InputTextLinesMap } from "~/types/product";
import type { TextRenderData } from "~/types/svg";

export const applyColorOnBlock = (block: SVGGElement, color: Color | null | undefined) => {
    block.setAttribute('fill', color?.hex ?? 'currentColor')
}

export const applyTextsOnBlock = (
    svg: SVGSVGElement,
    base: BasePreviewFragmentFragment,
    font: string | null | undefined,
    color: Color | null | undefined,
    lineDefinitions: ProductLineDefinition[],
    textLinesRenderValues: InputTextLinesMap,
    renderAreas: boolean = true
) => {
    const sortedLines = getSortedTextLines(lineDefinitions, textLinesRenderValues);

    const {textsData, areas, usedDefIds} = computeTextLayout(
        base,
        font,
        color,
        sortedLines,
        getCanvasContext
    );

    const container = findOrCreateTextsContainer(svg)
    const applyDOMChanges = () => {
        removeTextsForUnusedDefIds(usedDefIds, lineDefinitions, container);
        createOrUpdateTexts(textsData, container);

        if (renderAreas && import.meta.dev) {
            removeLines(container);
            removeAreas(container);
            createOrUpdateAreaRects([...areas.values()], container);
            createOrUpdateBaselines(textsData, container);
        }
    };

    requestAnimationFrame(applyDOMChanges);

    return {textsData, areas, usedDefIds};
};

const updTextAttributes = (el: SVGTextElement, data: TextRenderData) => {
    el.setAttribute('data-id', data.id)
    el.setAttribute('font-family', data.font)
    el.setAttribute('font-size', data.size.toFixed(4))
    el.setAttribute('fill', data.fill)
    el.setAttribute('text-anchor', 'middle')
    el.setAttribute('x', data.x.toFixed(4))
    el.setAttribute('y', data.y.toFixed(4))
    el.classList.add('text-data')
    el.children[0].innerHTML = data.value
}

const createOrUpdateTexts = (
    textData: TextRenderData[],
    svg: SVGElement
) => {
    textData.forEach(data => {
        const existingEl = findTextById(data.id, svg)
        if (existingEl) {
            updTextAttributes(existingEl, data)
            return
        }

        const el = createTextElement()
        updTextAttributes(el, data)
        svg.appendChild(el)
    })
}

const findTextById = (id: string, svg: SVGElement) => {
    return svg.querySelector<SVGTextElement>(`text.text-data[data-id="${id}"]`)
}

const findOrCreateTextsContainer = (svg: SVGElement) => {
    let container = svg.querySelector<SVGGElement>('g.texts')
    if (!container) {
        container = createTextsContainer()
        svg.appendChild(container)
    }
    return container
}

const removeTextsForUnusedDefIds = (
    usedDefIds: string[],
    defs: ProductLineDefinition[],
    svg: SVGElement,
) => {
    defs.map(line => line.id) // get def ids
        .filter((id) => !usedDefIds.includes(id)) // include only unused def ids
        .forEach((id) => {
            findTextById(id, svg)?.remove()
        })
}