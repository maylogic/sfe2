import { useCookie } from '#app'

export function useAuth() {
    const token = useCookie('token')

    const isAuthenticated = !!token.value

    const logout = () => {
        token.value = null
        navigateTo('/login')
    }

    return { isAuthenticated, logout }
}
