import type { CookieOptions } from "#app";

export function useBooleanCookie(name: string, options: CookieOptions = {}) {
    const cookie = useCookie(name, {...options, readonly: false})
    const value = ref<boolean>(!!cookie.value && cookie.value !== 'false')

    watch(
        () => value.value,
        (newValue) => {
            cookie.value = newValue ? 'true' : 'false'
        }
    )

    return value
}