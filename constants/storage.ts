import { getEnvOrPubVal } from "~/utils/env";

export const getStorageUrl = (filename: string): string => {
    const url = getEnvOrPubVal('STORAGE_URL')
    return `${url}/${filename}`
}