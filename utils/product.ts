import type {
    Color,
    DesignItemFragment,
    Font,
    ProductBySlugQuery,
    ProductLineDefinition
} from "~/gql/graphql";

export type PersonalizeLineDefId = string
export type ProductOptionId = string
export type ProductOptionItemId = string
export type ProductSizeId = string
export type InputTextLinesMap = Map<PersonalizeLineDefId, string | null>
export type InputOptionsMap = Map<ProductOptionId, ProductOptionItemId>
export type PersonalizeInputData = {
    color: Color | null
    font: Font | null
    design: DesignItemFragment | null
    textLines: InputTextLinesMap
    size: ProductSizeId | null
    options: InputOptionsMap
}
export type PersonalizeValidity = {
    [K in keyof PersonalizeInputData]: boolean | null
}
export const validateOptions = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean => {
    return !!product?.getProductBySlug?.options?.every(option => {
        const value = input.options.get(option.id)
        return !!value || !option.required
    })
}
export const validateSize = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean => {
    return hasSizes(product) && input.size !== null
}
export const validateTextLines = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean => {
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
export const validatePerOption = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): Map<ProductOptionId, string> => {
    const errors = new Map<ProductOptionId, string>()

    !!product?.getProductBySlug?.options?.forEach(option => {
        const value = input.options.get(option.id)
        if (!value && option.required) {
            errors.set(option.id, 'Обязательное поле')
            return
        }
    })

    return errors
}
export const validateDesign = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean => {
    return designsBlockVisible(product) && input.design !== null
}
export const validateFont = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean => {
    if (input.font !== null && input.design !== null) {
        return !!input.design.fonts?.find(font => font.id === input.font?.id)
    }
    return false
}
export const validateColor = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean => {
    if (input.color !== null && input.design !== null) {
        return !!input.design.colors?.find(color => color.id === input.color?.id)
    }
    return false
}
export const getNullValidation = () => ({
    color: null,
    font: null,
    design: null,
    textLines: null,
    size: null,
    options: null
})
export const getSortedTextLines = (defs: ProductLineDefinition[], textLines: InputTextLinesMap): InputTextLinesMap => {
    const sortedTextLines = new Map<PersonalizeLineDefId, string | null>();
    for (const def of defs) {
        const textLine = textLines.get(def.id)
        if (textLine) sortedTextLines.set(def.id, textLine)
    }

    return sortedTextLines;
}

export const designsBlockVisible = (product: ProductBySlugQuery | undefined): boolean => !!product?.getProductBySlug?.designs.length
export const fontsBlockVisible = (input: PersonalizeInputData): boolean => !!input.design?.fonts?.length
export const colorsBlockVisible = (input: PersonalizeInputData): boolean => !!input.design?.colors?.length
export const textLinesBlockVisible = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): boolean =>
    input.design !== null && !!product?.getProductBySlug?.line_definitions?.length
export const hasSizes = (product: ProductBySlugQuery | undefined): boolean => !!product?.getProductBySlug?.sizes?.length

export const getBlocksVisibility = (product: ProductBySlugQuery | undefined, input: PersonalizeInputData): Map<number, boolean> => {
    const blocks = new Map<number, boolean>()
    blocks.set(1, designsBlockVisible(product))
    blocks.set(2, colorsBlockVisible(input))
    blocks.set(3, fontsBlockVisible(input))
    blocks.set(4, textLinesBlockVisible(product, input))
    blocks.set(5, hasSizes(product))
    const optionsCount = Number(product?.getProductBySlug?.options?.length)
    for (let i = 0; i < optionsCount; i++) {
        blocks.set(6 + i, true)
    }

    return blocks
}