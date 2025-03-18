import { DataAttributeFilterInput } from '~/data/DataAttributeFilterInput'
import { DataRangeInput } from '~/data/DataRangeInput'

export class DataProductFiltersInput {
    priceRange: null | DataRangeInput<number>
    ratingRange: null | DataRangeInput<number>
    attributes: DataAttributeFilterInput[]

    constructor(
        priceRange: null | DataRangeInput<number>,
        ratingRange: null | DataRangeInput<number>,
        attributes: DataAttributeFilterInput[]
    ) {
        this.priceRange = priceRange
        this.ratingRange = ratingRange
        this.attributes = attributes
    }
}
