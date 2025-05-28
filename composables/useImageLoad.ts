export const useImageLoad = (imageRef: Ref<HTMLImageElement | undefined, HTMLImageElement | undefined>) => {
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

    watch(
        imageRef,
        (imgElement) => {
            if (imgElement) {
                // Если изображение уже загружено (например, кэшировано)
                if (imgElement.complete && imgElement.naturalWidth !== 0) {
                    loaded.value = true
                    return
                }

                imgElement.addEventListener('load', handleLoad)
                imgElement.addEventListener('error', handleError)
            }
        },
        {immediate: true}
    )

    return {loaded, error}
}