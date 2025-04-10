export const createTextElement = (): SVGTextElement => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    text.appendChild(tspan)
    return text
}