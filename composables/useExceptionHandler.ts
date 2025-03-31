import type { CombinedError } from '@urql/vue'

export function useExceptionHandler() {
    const errors = ref<string[]>([])

    const errorHandler = (error: CombinedError | undefined) => {
        const newErrors: string[] = []
        if (error && error.graphQLErrors) {
            error.graphQLErrors.forEach((err) => {
                if (
                    err.extensions?.debugMessage &&
                    typeof err.extensions?.debugMessage == 'string'
                ) {
                    newErrors.push(err.extensions?.debugMessage)
                }
            })
        }
        errors.value = [...newErrors]
    }

    return { errors, errorHandler }
}
