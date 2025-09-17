import { getEnvOrPubVal } from "~/utils/env";
import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from "skia-canvas";

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

export type CANVAS_CONTEXT_GETTER =
    (() => CanvasRenderingContext2D | null)
    | (() => NodeCanvasRenderingContext2D | null)