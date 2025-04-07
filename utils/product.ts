import type {
    DesignItemFragment,
    ProductBySlugQuery
} from "~/gql/graphql";

export type PersonalizeInputData = {
    colorId: string | null
    fontId: string | null
    design: DesignItemFragment | null
    textLines: Map<string, string | null>
}
export type PersonalizeValidity = {
    [K in keyof PersonalizeInputData]: boolean | null
}
export const validateTextLines = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean | null => {
    return !!product?.getProductBySlug?.line_definitions?.every(def => {
        const line = input.textLines.get(def.id)
        if (!line) {
            return !def.required
        }
        return def.max_length >= line.length;
    })
}
export const validatePerTextLine = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): Map<string, string> => {
    const errors = new Map<string, string>()

    !!product?.getProductBySlug?.line_definitions?.forEach(def => {
        const line = input.textLines.get(def.id)
        if (!line && def.required) {
            errors.set(def.id, 'Обязательное поле')
            return
        }
        if (line && def.max_length < line.length) {
            errors.set(def.id, `Максимальная длина - ${def.max_length}`)
        }
    })

    return errors
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