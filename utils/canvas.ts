import { getEnvOrPubVal } from "~/utils/env";

export const getCanvasSize = () => Number(getEnvOrPubVal('CANVAS_SIZE'))
let canvasContext: CanvasRenderingContext2D | null = null
export const getCanvasContext = (): CanvasRenderingContext2D | null => {
    if (!canvasContext) {
        const size = getCanvasSize()
        const sharedCanvas = document.createElement('canvas');
        sharedCanvas.width = size
        sharedCanvas.height = size
        canvasContext = sharedCanvas.getContext('2d', {willReadFrequently: true});
    }
    return canvasContext
}