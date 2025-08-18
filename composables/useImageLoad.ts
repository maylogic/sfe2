import { ref, watch, type Ref } from 'vue'

export const useImageLoad = (imageRef: Ref<HTMLImageElement | undefined>) => {
    const loaded = ref(false)
    const error = ref(false)

    const handleLoad = () => {
        loaded.value = true
        error.value = false
    }

    const handleError = () => {
        loaded.value = true
        error.value = true
    }

    // Очистка предыдущих обработчиков
    let currentElement: HTMLImageElement | null = null

    const cleanup = () => {
        if (currentElement) {
            currentElement.removeEventListener('load', handleLoad)
            currentElement.removeEventListener('error', handleError)
            currentElement = null
        }
    }

    watch(
        imageRef,
        (imgElement) => {
            cleanup() // убираем старые обработчики

            if (!imgElement) return

            // Если изображение уже загружено (например, из кэша)
            if (imgElement.complete && imgElement.naturalWidth > 0) {
                loaded.value = true
                error.value = false
                return
            }

            // Если изображение завершено, но с ошибкой (например, битое)
            if (imgElement.complete && imgElement.naturalWidth === 0) {
                loaded.value = true
                error.value = true
                return
            }

            // В противном случае ждём событий
            imgElement.addEventListener('load', handleLoad)
            imgElement.addEventListener('error', handleError)
            currentElement = imgElement
        },
        { immediate: true }
    )

    // Очистка при разрушении компонента (если используется внутри setup)
    // В Nuxt/Vue это делается автоматически, если watch привязан к контексту
    return { loaded, error }
}