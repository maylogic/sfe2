import type {
    BaseFragmentFragment,
    BasePreviewFragmentFragment
} from "~/gql/graphql";

export type BaseOrPreview = BaseFragmentFragment | BasePreviewFragmentFragment

export type TextRenderData = {
    id: string,
    value: string,
    font: string,
    fill: string,
    x: number,
    y: number,
    size: number
}

export type TextPieceArea = {
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    padding_y: number
}