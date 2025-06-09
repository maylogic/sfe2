import { getEnvOrPubVal } from "~/utils/env";

export const getSiteTitle = (title?: string): string => [title, getEnvOrPubVal('SITE_NAME')].filter(i => !!i).join(' | ')