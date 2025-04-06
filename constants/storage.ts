export const STORAGE_URL = 'http://localhost:8080/storage'

export const getStorageUrl = (filename: string) => {
    return `${STORAGE_URL}/${filename}`
}