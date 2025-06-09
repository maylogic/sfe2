import { getEnvOrPubVal } from "~/utils/env";

export const getSiteTitle = (title?: string): string => [title, getEnvOrPubVal('SITE_NAME')].filter(i => !!i).join(' | ')
export const getCanonicalUrl = (url: string): string => `https://${getEnvOrPubVal('SITE_DOMAIN')}/${url}`