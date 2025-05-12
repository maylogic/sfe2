export const CANVAS_SIZE = 32
let canvasContext: CanvasRenderingContext2D | null = null
export const getCanvasContext = (dpi: number): CanvasRenderingContext2D | null => {
    if (!canvasContext) {
        const sharedCanvas = document.createElement('canvas');
        sharedCanvas.width = CANVAS_SIZE * dpi
        sharedCanvas.height = CANVAS_SIZE * dpi
        canvasContext = sharedCanvas.getContext('2d', {willReadFrequently: true});
        if (canvasContext) canvasContext.scale(dpi, dpi)
    }
    return canvasContext
}
export const getDpi = () => {
    return 10
}