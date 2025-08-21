import { getEnvOrPubVal } from "~/utils/env";

export const getCanvasSize = () => Number(getEnvOrPubVal('CANVAS_SIZE'))
export const getCanvasDpi = () => Number(getEnvOrPubVal('CANVAS_DPI'))
let canvasContext: CanvasRenderingContext2D | null = null
export const getCanvasContext = (dpi: number): CanvasRenderingContext2D | null => {
    if (!canvasContext) {
        const size = getCanvasSize()
        const sharedCanvas = document.createElement('canvas');
        sharedCanvas.width = size * dpi
        sharedCanvas.height = size * dpi
        canvasContext = sharedCanvas.getContext('2d', {willReadFrequently: true});
        if (canvasContext) {
            canvasContext.scale(dpi, dpi)
            canvasContext.textBaseline = 'middle'
        }
    }
    return canvasContext
}