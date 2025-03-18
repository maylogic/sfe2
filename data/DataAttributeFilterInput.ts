export class DataAttributeFilterInput {
    code: string
    values: string[]

    constructor(code: string, values: string[]) {
        this.code = code
        this.values = values
    }
}
