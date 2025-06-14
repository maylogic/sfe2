import {
    type Color,
    type DesignItemFragment,
    type OptionInput,
    type PersonalizeInput,
    type Price,
    type PriceFragment,
    PriceFragmentDoc,
    type ProductLineDefinition,
    type ProductPageFragment,
    type TextLineInput
} from "~/gql/graphql";
import { useFragment } from "~/gql";
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
export const validateOptions = (product: ProductPageFragment, input: PersonalizeInputData): boolean => {
    return !!product.options?.every(option => {
        const value = input.options.get(option.id)
        return !!value || !option.required
    })
}
export const validateSize = (product: ProductPageFragment, input: PersonalizeInputData): boolean => {
    return hasSizes(product) ? input.size !== null : true
}
export const validateTextLines = (product: ProductPageFragment, input: PersonalizeInputData): boolean => {
    return !!product.line_definitions?.every(def => {
        const line = input.textLines.get(def.id)
        if (!line) {
            return !def.required
        }
        return def.max_length >= line.length;
    })
}
export const validatePerTextLine = (product: ProductPageFragment, input: PersonalizeInputData): Map<PersonalizeLineDefId, string> => {
    const errors = new Map<PersonalizeLineDefId, string>()

    product.line_definitions?.forEach(def => {
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
export const validatePerOption = (product: ProductPageFragment, input: PersonalizeInputData): Map<ProductOptionId, string> => {
    const errors = new Map<ProductOptionId, string>()

    product.options.forEach(option => {
        const value = input.options.get(option.id)
        if (!value && option.required) {
            errors.set(option.id, 'Обязательное поле')
            return
        }
    })

    return errors
}
export const validateDesign = (product: ProductPageFragment, input: PersonalizeInputData): boolean => {
    return hasDesigns(product) ? input.design !== null : true
}
export const validateFont = (product: ProductPageFragment, input: PersonalizeInputData): boolean => {
    return hasFonts(input) ? !!input.design?.fonts?.find(font => font.id === input.font?.id) : true
}
export const validateColor = (product: ProductPageFragment, input: PersonalizeInputData): boolean => {
    return hasColors(input) ? !!input.design?.colors?.find(color => color.id === input.color?.id) : true
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
        sortedTextLines.set(def.id, textLine ?? null)
    }

    return sortedTextLines;
}

export const hasDesigns = (product: ProductPageFragment): boolean => !!product.designs.length
export const hasFonts = (input: PersonalizeInputData): boolean => !!input.design?.fonts?.length
export const hasColors = (input: PersonalizeInputData): boolean => !!input.design?.colors?.length
export const hasTextLines = (product: ProductPageFragment, input: PersonalizeInputData): boolean =>
    input.design !== null && !!product.line_definitions?.length
export const hasSizes = (product: ProductPageFragment): boolean => !!product.sizes?.length

export const getBlocksVisibility = (product: ProductPageFragment, input: PersonalizeInputData): Map<number, boolean> => {
    const blocks = new Map<number, boolean>()
    blocks.set(1, hasDesigns(product))
    blocks.set(2, hasColors(input))
    blocks.set(3, hasFonts(input))
    blocks.set(4, hasTextLines(product, input))
    blocks.set(5, hasSizes(product))
    const optionsCount = Number(product.options?.length)
    for (let i = 0; i < optionsCount; i++) {
        blocks.set(6 + i, true)
    }

    return blocks
}
export const getPersonalizeInputFromData = (inputData: PersonalizeInputData): PersonalizeInput => {
    const options: OptionInput[] = [],
        textLines: TextLineInput[] = []

    for (const [optionId, optionValueId] of inputData.options) {
        options.push({
            optionId,
            optionValueId
        })
    }
    for (const [productLineDefinitionId, value] of inputData.textLines) {
        if (value) {
            textLines.push({
                productLineDefinitionId,
                value
            })
        }
    }
    const colorId = inputData.color?.id ?? null,
        fontId = inputData.font?.id ?? null,
        designId = inputData.design?.id ?? null,
        sizeId = inputData.size ?? null

    return {
        colorId,
        fontId,
        designId,
        sizeId,
        options,
        textLines
    }
}
export const getFullProductPrice = (product: ProductPageFragment, inputData: PersonalizeInputData): Price => {
    const productPrice = useFragment(PriceFragmentDoc, product.price),
        sizePrice = useFragment(PriceFragmentDoc, product.sizes.find(size => size.id === inputData.size)?.price),
        optionPrices: PriceFragment[] = []
    for (const [optionId, optionItemId] of inputData.options) {
        const option = product.options.find(option => option.id === optionId)
        if (option) {
            const optionItem = option.items.find(item => item.id === optionItemId)
            if (optionItem) optionPrices.push(
                useFragment(PriceFragmentDoc, optionItem.price)
            )
        }
    }
    let regular = 0, discounted = 0, is_discounted = false
    if (productPrice) {
        regular += productPrice.regular
        discounted += productPrice.discounted
        is_discounted = productPrice.is_discounted
    }
    if (sizePrice) {
        regular += sizePrice.regular
        discounted += sizePrice.discounted
        is_discounted = is_discounted || sizePrice.is_discounted
    }
    optionPrices.forEach(price => {
        regular += price.regular
        discounted += price.discounted
        is_discounted = is_discounted || price.is_discounted
    })
    return {
        regular,
        discounted,
        is_discounted,
    }
}