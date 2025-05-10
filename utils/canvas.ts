export const CANVAS_SIZE = 200
let canvasContext: CanvasRenderingContext2D | null = null
export const getCanvasContext = (): CanvasRenderingContext2D | null => {
    if (!canvasContext) {
        const sharedCanvas = document.createElement('canvas');
        sharedCanvas.width = CANVAS_SIZE
        sharedCanvas.height = CANVAS_SIZE
        canvasContext = sharedCanvas.getContext('2d', {willReadFrequently: true});
    }
    return canvasContext
}