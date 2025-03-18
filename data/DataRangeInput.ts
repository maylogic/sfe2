export class DataRangeInput<T> {
    min: T | null
    max: T | null

    constructor(min: T | null, max: T | null) {
        this.min = min
        this.max = max
    }
}
