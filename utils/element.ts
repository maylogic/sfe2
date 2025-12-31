export const createTextElement = (): SVGTextElement => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    text.appendChild(tspan)
    return text
}
export const createTextsContainer = (): SVGGElement => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.classList.add('texts')
    return g;
}
export const createAreaRectElement = (): SVGRectElement => {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('stroke', 'red')
    rect.setAttribute('stroke-width', '0.1')
    rect.setAttribute('fill', 'red')
    rect.setAttribute('fill-opacity', '0.05')
    return rect
}

export const createLineElement = (): SVGLineElement => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('stroke', 'red')
    line.setAttribute('stroke-width', '1')
    return line
}