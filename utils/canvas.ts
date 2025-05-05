export const CANVAS_SIZE = 32
let canvasContext: CanvasRenderingContext2D | null = null
export const getCanvasContext = (): Promise<CanvasRenderingContext2D | null> => {
    if (!canvasContext) {
        const sharedCanvas = document.createElement('canvas');
        sharedCanvas.width = CANVAS_SIZE
        sharedCanvas.height = CANVAS_SIZE
        canvasContext = sharedCanvas.getContext('2d', {willReadFrequently: true});
    }
    return new Promise(resolve => {
        setTimeout(_ => resolve(canvasContext))
    })
}