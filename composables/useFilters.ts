import { DataProductFiltersInput } from '~/data/DataProductFiltersInput'
import { DataRangeInput } from '~/data/DataRangeInput'
import { DataAttributeFilterInput } from '~/data/DataAttributeFilterInput'

export type FilterRange = {
    min: number | null
    max: number | null
}
export type FilterAttributes = {
    [key: string]: string[]
}
export type FilterValues = {
    priceRange: FilterRange
    ratingRange: FilterRange
    attributes: FilterAttributes
}
export const useFilters = () => {
    const filters = reactive<FilterValues>({
        priceRange: {
            min: null,
            max: null,
        },
        ratingRange: {
            min: null,
            max: null,
        },
        attributes: {},
    })

    function getInput() {
        return new DataProductFiltersInput(
            getRangeInput(filters.priceRange),
            getRangeInput(filters.ratingRange),
            getAttributesInput()
        )
    }

    function getRangeInput(rangeData: FilterRange) {
        if (rangeData.min !== null || rangeData.max !== null) {
            return new DataRangeInput<number>(rangeData.min, rangeData.max)
        }
        return null
    }

    function getAttributesInput(): DataAttributeFilterInput[] {
        const attributes: DataAttributeFilterInput[] = []
        for (const key in filters.attributes) {
            const values = filters.attributes[key]
            if (values) {
                attributes.push(new DataAttributeFilterInput(key, values))
            }
        }
        return attributes
    }

    return { filters, getInput }
}
