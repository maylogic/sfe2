export const STORAGE_URL = useRuntimeConfig().public.storageUrl as string|undefined ?? 'http://localhost/storage'

export const getStorageUrl = (filename: string): string => {
    return `${STORAGE_URL}/${filename}`
}