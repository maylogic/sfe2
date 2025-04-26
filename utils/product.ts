import type {
    Color,
    DesignItemFragment,
    Font,
    ProductBySlugQuery,
    ProductLineDefinition
} from "~/gql/graphql";

export type PersonalizeLineDefId = string
export type InputTextLinesMap = Map<PersonalizeLineDefId, string | null>
export type PersonalizeInputData = {
    color: Color | null
    font: Font | null
    design: DesignItemFragment | null
    textLines: InputTextLinesMap
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
export const validatePerTextLine = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): Map<PersonalizeLineDefId, string> => {
    const errors = new Map<PersonalizeLineDefId, string>()

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
    if (input.font !== null && input.design !== null) {
        return !!input.design.fonts?.find(font => font.id === input.font?.id)
    }
    return false
}
export const validateColor = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean | null => {
    if (input.color !== null && input.design !== null) {
        return !!input.design.colors?.find(color => color.id === input.color?.id)
    }
    return false
}
export const getNullValidation = () => ({
    color: null,
    font: null,
    design: null,
    textLines: null
})
export const getSortedTextLines = (defs: ProductLineDefinition[], textLines: InputTextLinesMap): InputTextLinesMap => {
    const sortedTextLines = new Map<PersonalizeLineDefId, string | null>();
    for (const def of defs) {
        const textLine = textLines.get(def.id)
        if (textLine) sortedTextLines.set(def.id, textLine)
    }

    return sortedTextLines;
}