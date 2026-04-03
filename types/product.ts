import type {
    Color,
    DesignItemFragment
} from "~/gql/graphql";
import type { FrontendFont } from "~/data/types";

export type PersonalizeLineDefId = string
export type ProductOptionId = string
export type ProductOptionItemId = string
export type ProductSizeId = string
export type InputTextLinesMap = Map<PersonalizeLineDefId, string | null>
export type InputOptionsMap = Map<ProductOptionId, ProductOptionItemId>
export type PersonalizeInputData = {
    color: Color | null
    font: FrontendFont | null
    design: DesignItemFragment | null
    textLines: InputTextLinesMap
    size: ProductSizeId | null
    options: InputOptionsMap
}
export type PersonalizeValidity = {
    [K in keyof PersonalizeInputData]: boolean | null
}

