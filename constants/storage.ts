export const STORAGE_URL = 'http://localhost/storage'

export const getStorageUrl = (filename: string) => {
    return `${STORAGE_URL}/${filename}`
}