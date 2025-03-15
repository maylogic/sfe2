import type { CombinedError } from '@urql/vue'

export type FieldErrors<T> = {
    [K in keyof T]: string[] | undefined
}

export function useCombinedErrorHandler<T extends FieldErrors<any>>() {
    const errors = ref<Partial<T>>({})

    const errorHandler = (error: CombinedError | undefined) => {
        errors.value = {}
        if (error && error.graphQLErrors) {
            error.graphQLErrors.forEach((err) => {
                if (err.extensions?.validation) {
                    // Добавляем ошибки вместо перезаписи
                    Object.entries(err.extensions.validation).forEach(
                        ([key, value]) => {
                            errors.value[key as keyof T] = value as string[]
                        }
                    )
                }
            })
        }
    }

    return { errors, errorHandler }
}
