import {
    Canvas,
    type CanvasRenderingContext2D
} from "skia-canvas";
import { getEnvOrPubVal } from "~/utils/env";

let canvasContext: CanvasRenderingContext2D | null = null
export const getCanvasContextNodeJs = (): CanvasRenderingContext2D | null => {
    // if (!canvasContext) {
    const canvasSize = getCanvasNodejsSize()
    const sharedCanvas = new Canvas(canvasSize, canvasSize)
    // canvasContext = sharedCanvas.getContext('2d');
    return sharedCanvas.getContext('2d');
    // }
    // return canvasContext
}
export const getCanvasNodejsSize = () => Number(getEnvOrPubVal('CANVAS_SIZE')) // если будет слишком малым, то будет баг с шириной текста