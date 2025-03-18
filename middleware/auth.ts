import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()

    // Если пользователь авторизован, но пытается попасть на страницу входа
    if (authStore.isAuthenticated && to.meta.requiresGuest) {
        return navigateTo('/profile') // Перенаправляем на страницу профиля
    }

    // Если пользователь не авторизован, но пытается попасть на защищенный маршрут
    if (!authStore.isAuthenticated && to.meta.requiresAuth) {
        return navigateTo('/login') // Перенаправляем на страницу входа
    }
})
