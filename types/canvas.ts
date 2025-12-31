import type { CanvasRenderingContext2D as NodeCanvasRenderingContext2D } from "skia-canvas";

export type CANVAS_CONTEXT_GETTER =
    (() => CanvasRenderingContext2D | null)
    | (() => NodeCanvasRenderingContext2D | null)