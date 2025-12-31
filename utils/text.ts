import type {
    Color,
    TextAreaFragment
} from "~/gql/graphql";
import { TextAreaFragmentDoc } from "~/gql/graphql";
import { useFragment } from "~/gql";
import type {
    BaseOrPreview,
    TextPieceArea,
    TextRenderData
} from "~/types/svg";
import type { CANVAS_CONTEXT_GETTER } from "~/types/canvas";
import type { InputTextLinesMap } from "~/types/product";

const AREA_PADDING_X = 0.1

export const calculateTextDataPos = (
    data: TextRenderData,
    area: TextPieceArea,
    canvasContextGetter: CANVAS_CONTEXT_GETTER
) => {
    const metrics = getTextMetrics(data, canvasContextGetter)

    const leftovers = area.height - metrics.height,
        zoneTop = area.y + leftovers / 2,
        zoneHeight = area.height - leftovers,
        zoneBottom = zoneTop + zoneHeight,
        areaBottom = area.y + area.height
    data.y = zoneBottom - metrics.descent / 2
    data.x = area.x + area.width / 2
}

const getTargetHeight = (area: TextPieceArea) => area.height - area.padding_y * area.height,
    getTargetWidth = (area: TextPieceArea) => area.width - AREA_PADDING_X * area.width

export const calculateFontSize = (
    canvasContextGetter: CANVAS_CONTEXT_GETTER,
    data: TextRenderData,
    area: TextPieceArea,
    precision: number = 0.01
) => {
    const targetWidth = getTargetWidth(area),
        targetHeight = getTargetHeight(area)

    const doesTextFit = (fontSize: number): boolean => {
        const metrics = getTextMetrics(data, canvasContextGetter, fontSize)
        const textWidth = metrics.width;
        const textHeight = metrics.height

        return textWidth <= targetWidth && textHeight <= targetHeight;
    };

    let fontSize = 1; // Начальный размер шрифта
    let step = fontSize / 2;     // Начальный шаг
    let lastAdjustment = 0;      // Последнее изменение (±)

    while (step >= precision) {
        const fits = doesTextFit(fontSize);

        let currentAdjustment = 0;

        if (fits) {
            currentAdjustment = step;
            fontSize += step;
        } else {
            currentAdjustment = -step;
            fontSize -= step;
        }

        // Проверяем, было ли изменение направления
        if (
            (lastAdjustment > 0 && currentAdjustment < 0) ||
            (lastAdjustment < 0 && currentAdjustment > 0)
        ) {
            step /= 2; // Меняем направление → уменьшаем шаг
        }

        lastAdjustment = currentAdjustment;
    }

    // Возвращаем последний подходящий размер шрифта
    return doesTextFit(fontSize) ? fontSize : fontSize - lastAdjustment;
}

const getTextMetrics = (data: TextRenderData, canvasContextGetter: CANVAS_CONTEXT_GETTER, fontSize?: number): TextMetricsReal => {
    const ctx = canvasContextGetter()
    if (ctx) {
        const size = fontSize ?? data.size
        ctx.textBaseline = 'alphabetic'
        ctx.font = `${size}px ${data.font}`;
        ctx.textAlign = "center"
        const metrics = ctx.measureText(data.value);
        const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        return {
            width: metrics.width,
            height,
            descent: metrics.actualBoundingBoxDescent,
            ascent: metrics.actualBoundingBoxAscent
        }
    }
    throw new Error('Cannot access canvas context')
}

type TextMetricsReal = {
    width: number,
    height: number,
    descent: number,
    ascent: number
}

export function computeTextLayout(
    base: BaseOrPreview,
    font: string | null | undefined,
    color: Color | null | undefined,
    sortedLines: InputTextLinesMap,
    canvasContextGetter: CANVAS_CONTEXT_GETTER
) {
    const usedDefIds: string[] = [];
    const areas = new Map<string, TextPieceArea>();
    const textsData: TextRenderData[] = [];

    function processTextArea(rect: TextAreaFragment): TextRenderData[] {
        let currentLineSeq = 0;
        const rectTexts: TextRenderData[] = [];

        for (const [id, value] of sortedLines) {
            if (++currentLineSeq < rect.first_line) continue;
            if (currentLineSeq - rect.first_line >= rect.lines) continue;
            if (!value) continue;

            const fill = rect.inherit_color && color ? color.hex : rect.text_color ?? '#fff';
            const fontFamily = font ?? 'sans-serif';

            const textData: TextRenderData = {
                id,
                value,
                font: fontFamily,
                fill,
                x: 0,
                y: 0,
                size: 0,
            };

            rectTexts.push(textData);
            usedDefIds.push(id);
        }

        if (rectTexts.length === 0) return rectTexts;

        const pieceAreaHeight = rect.height / rectTexts.length;

        for (let i = 0; i < rectTexts.length; i++) {
            const piece = rectTexts[i];
            const area: TextPieceArea = {
                id: piece.id,
                height: pieceAreaHeight,
                width: rect.width,
                x: rect.left,
                y: rect.top + pieceAreaHeight * i,
                padding_y: rect.padding_y,
            };
            areas.set(piece.id, area);
            piece.size = calculateFontSize(canvasContextGetter, piece, area);
        }

        const minFontSize = Math.max(1,
            rectTexts.reduce((min, t) => Math.min(t.size, min), Infinity)
        );

        for (const piece of rectTexts) {
            piece.size = minFontSize;
            const area = areas.get(piece.id);
            if (area) {
                calculateTextDataPos(piece, area, canvasContextGetter);
            }
        }

        return rectTexts;
    }

    base.text_areas?.forEach(area => {
        const rect = useFragment(TextAreaFragmentDoc, area);
        const textsInArea = processTextArea(rect);
        textsData.push(...textsInArea);
    });

    return {textsData, areas, usedDefIds};
}