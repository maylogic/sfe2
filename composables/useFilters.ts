export type FilterRange = {
    min: number
    max: number
}
export type FilterValues = {
    priceRange: FilterRange
    ratingRange: FilterRange
    attributes: {}
}
export const useFilters = () => {
    const filters = reactive<FilterValues>({
            priceRange: {
                min: 0,
                max: 0,
            },
            ratingRange: {
                min: 0,
                max: 0,
            },
            attributes: {},
        }),
        refetchKey = reactive(0)

    return { filters }
}
