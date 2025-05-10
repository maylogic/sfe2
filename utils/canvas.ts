export const CANVAS_SIZE = 32
let canvasContext: CanvasRenderingContext2D | null = null
const dpr = window.devicePixelRatio || 1;
export const getCanvasContext = (): CanvasRenderingContext2D | null => {
    if (!canvasContext) {
        const sharedCanvas = document.createElement('canvas');
        sharedCanvas.width = CANVAS_SIZE * dpr
        sharedCanvas.height = CANVAS_SIZE * dpr
        canvasContext = sharedCanvas.getContext('2d', {willReadFrequently: true});
        if (canvasContext) {
            canvasContext.scale(dpr, dpr)
        }
    }
    return canvasContext
}