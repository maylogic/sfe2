import {
    createAreaRectElement,
    createLineElement
} from "~/utils/element";
import type {
    TextPieceArea,
    TextRenderData
} from "~/types/svg";

export const createOrUpdateAreaRects = (areas: TextPieceArea[], svg: SVGElement) => {
    areas.forEach(data => {
        const existingEl = findAreaById(data.id, svg)
        if (existingEl) {
            return
        }

        const el = createAreaRectElement()
        el.classList.add('text-area')
        el.setAttribute('data-id', data.id)
        el.setAttribute('x', data.x.toFixed(4))
        el.setAttribute('y', data.y.toFixed(4))
        el.setAttribute('width', data.width.toFixed(4))
        el.setAttribute('height', data.height.toFixed(4))
        if (svg) {
            svg.appendChild(el)
        }
    })
}
export const createOrUpdateBaselines = (texts: TextRenderData[], svg: SVGElement) => {
    texts.forEach(data => {
        const existingEl = findLineById(data.id, svg)
        if (existingEl) {
            return
        }

        const el = createLineElement()
        el.classList.add('text-baseline')
        el.setAttribute('data-id', data.id)
        el.setAttribute('x1', (data.x - 10).toFixed(4))
        el.setAttribute('x2', (data.x + 10).toFixed(4))
        el.setAttribute('y1', data.y.toFixed(4))
        el.setAttribute('y2', data.y.toFixed(4))
        if (svg) {
            svg.appendChild(el)
        }
    })
}

export const findAreaById = (id: string, svg: SVGElement) => {
    return svg.querySelector<SVGRectElement>(`rect.text-area[data-id="${id}"]`)
}

export const findLineById = (id: string, svg: SVGElement) => {
    return svg.querySelector<SVGLineElement>(`line.text-baseline[data-id="${id}"]`)
}

export const removeAreas = (svg: SVGElement) => {
    svg.querySelectorAll<SVGRectElement>(`rect.text-area`).forEach(rect => rect.remove())
}

export const removeLines = (svg: SVGElement) => {
    svg.querySelectorAll<SVGLineElement>(`line.text-baseline`).forEach(line => line.remove())
}