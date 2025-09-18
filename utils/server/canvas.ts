import {
    Canvas,
    type CanvasRenderingContext2D
} from "skia-canvas";
import { getCanvasNodejsSize } from "~/utils/server/svg";

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