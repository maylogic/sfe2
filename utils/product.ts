import type {
    DesignItemFragment,
    ProductBySlugQuery
} from "~/gql/graphql";

export type FilledTextLine = {
    id: string
    value: string
}
export type PersonalizeInputData = {
    colorId: string | null
    fontId: string | null
    design: DesignItemFragment | null
    textLines: FilledTextLine[]
}
export type PersonalizeValidity = {
    [K in keyof PersonalizeInputData]: boolean | null
}
export const validateTextLines = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean | null => {
    return !!product?.getProductBySlug?.line_definitions?.every(def => {
        const line = input.textLines.find(line => line.id === def.id)
        if (!line) {
            return !def.required
        }
        return def.max_length >= line.value.length;
    })
}
export const validateDesign = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean | null => {
    return !!product?.getProductBySlug?.designs.length && input.design !== null
}
export const validateFont = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean | null => {
    if (input.fontId !== null && input.design !== null) {
        return !!input.design.fonts?.find(font => font.id === input.fontId)
    }
    return false
}
export const validateColor = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean | null => {
    if (input.colorId !== null && input.design !== null) {
        return !!input.design.colors?.find(color => color.id === input.colorId)
    }
    return false
}
export const getNullValidation = () => ({
    colorId: null,
    fontId: null,
    design: null,
    textLines: null
})