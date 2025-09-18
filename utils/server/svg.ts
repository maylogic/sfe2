import {
    Element,
    SVG,
    Text
} from "@svgdotjs/svg.js";
import type { TextRenderData } from "~/utils/text";
import { getEnvOrPubVal } from "~/utils/env";

export const updTextAttributesSvgJs = (el: Text, data: TextRenderData) => {
    el.data('id', data.id)
    el.fill(data.fill)
    el.attr('font-family', data.font)
    el.attr('font-size', data.size.toFixed(4))
    el.attr('dominant-baseline', 'middle')
    el.attr('text-anchor', 'middle')
    el.attr('x', data.x.toFixed(4))
    el.attr('y', data.y.toFixed(4))
    el.addClass('text-data')
    el.text(data.value)
}

export const findTextByIdSvgJs = (id: string, svg: Element) => {
    return svg.findOne(`text.text-data[data-id="${id}"]`) as Text
}

export const getCanvasNodejsSize = () => Number(getEnvOrPubVal('CANVAS_SIZE')) // если будет слишком малым то будет баг с шириной текста

export const createTextElementNodejs = () => {
    return SVG('<text></text>')
}
export const appendTextToSvgNodejs = (el: Text, svg: Element) => {
    svg.add(el)
}