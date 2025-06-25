export function useBooleanCookie(name: string, options = {}) {
    const cookie = useCookie(name, options)
    const value = ref<boolean>(!!cookie.value && cookie.value !== 'false')

    watch(
        () => value.value,
        (newValue) => {
            cookie.value = newValue ? 'true' : 'false'
        }
    )

    return value
}